import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter: max 5 requests per 15 minutes per IP
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestCounts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);

  if (!record || now > record.resetAt) {
    ipRequestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

// Sanitize string to remove HTML tags and potential script injections
function sanitize(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    // 1. Identify Client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many inquiries sent from this IP. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    // 2. Parse request payload
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload provided." },
        { status: 400 }
      );
    }

    const { name, organization, email, projectType, message, _gotcha } = body;

    // 3. Honeypot check (anti-spam bot detection)
    if (_gotcha && String(_gotcha).trim().length > 0) {
      // Silently pretend success to prevent bot retry loops
      return NextResponse.json({ success: true, message: "Inquiry received." });
    }

    // 4. Validate required fields
    if (typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Please enter a detailed message (minimum 10 characters)." },
        { status: 400 }
      );
    }

    // 5. Sanitize fields
    const safeName = sanitize(name.slice(0, 100));
    const safeEmail = email.trim().slice(0, 120);
    const safeOrg = typeof organization === "string" ? sanitize(organization.slice(0, 120)) : "Not Specified";
    const safeProjectType = typeof projectType === "string" ? sanitize(projectType.slice(0, 80)) : "General Inquiry";
    const safeMessage = sanitize(message.slice(0, 3000));

    // 6. Inspect server-side email credentials (Resend)
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Saket Portfolio <onboarding@resend.dev>";

    // If Resend is NOT configured:
    // As per specification: "Never display success unless the provider confirms successful submission.
    // If recipient details or provider credentials are missing, implement the integration safely and document what must be configured."
    if (!resendApiKey) {
      return NextResponse.json(
        {
          success: false,
          configured: false,
          error:
            "Email service is awaiting RESEND_API_KEY environment variable. For direct contact, please reach out via LinkedIn or email.",
        },
        { status: 503 }
      );
    }

    if (!toEmail) {
      return NextResponse.json(
        {
          success: false,
          configured: false,
          error:
            "Email service is awaiting CONTACT_TO_EMAIL environment variable. For direct contact, please reach out via LinkedIn.",
        },
        { status: 503 }
      );
    }

    // 7. Dispatch via Resend HTTP API
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E2DDD4; background-color: #FAF7F2; color: #1A1B1E;">
        <div style="border-bottom: 2px solid #947854; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="margin: 0; color: #1A1B1E; font-size: 22px;">New Inquiry — Saket Kumar Tiwari Portfolio</h2>
          <p style="margin: 4px 0 0; color: #947854; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Category: ${safeProjectType}</p>
        </div>

        <div style="background-color: #FFFFFF; padding: 18px; border: 1px solid #E2DDD4; margin-bottom: 20px;">
          <p style="margin: 0 0 10px;"><strong>Client / Sender:</strong> ${safeName}</p>
          <p style="margin: 0 0 10px;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #947854;">${safeEmail}</a></p>
          <p style="margin: 0 0 10px;"><strong>Organization / Firm:</strong> ${safeOrg}</p>
          <p style="margin: 0;"><strong>Inquiry Type:</strong> ${safeProjectType}</p>
        </div>

        <div style="background-color: #FFFFFF; padding: 18px; border: 1px solid #E2DDD4; margin-bottom: 20px;">
          <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #646770; letter-spacing: 0.5px;">Project Scope & Message:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6; margin: 0; font-size: 14px; color: #1A1B1E;">${safeMessage}</p>
        </div>

        <div style="font-size: 11px; color: #646770; border-top: 1px solid #E2DDD4; padding-top: 12px;">
          Sent from Saket Kumar Tiwari Portfolio Contact Route · IP: ${ip}
        </div>
      </div>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: safeEmail,
        subject: `[Portfolio Inquiry] ${safeProjectType} — ${safeName}`,
        html: emailHtml,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("[Resend Error]:", resendData);
      return NextResponse.json(
        {
          success: false,
          error: resendData.message || "Email provider rejected the delivery request. Please contact via LinkedIn.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        id: resendData.id,
        message: "Your project inquiry has been successfully delivered.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected server error occurred while processing your inquiry." },
      { status: 500 }
    );
  }
}
