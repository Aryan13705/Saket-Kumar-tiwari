"use client";

import React, { useState } from "react";
import { ArrowUpRight, Send, CheckCircle2, AlertCircle, MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { LinkedInIcon } from "./Icons";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    projectType: "Luxury Residential",
    message: "",
    _gotcha: "",
  });

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please complete all required fields (Name, Email, and Message).");
      setFormStatus("error");
      return;
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      setFormStatus("error");
      return;
    }

    setFormStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
        setErrorMessage(
          data.error || "Unable to send your inquiry at this moment. Please reach out directly on LinkedIn."
        );
      }
    } catch {
      setFormStatus("error");
      setErrorMessage("A network error occurred while submitting. Please check your connection or connect via LinkedIn.");
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#FBF9F5] border-t border-[#E2DDD4]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Verified Channels */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div>
              <div className="inline-flex items-center gap-2.5 mb-3.5">
                <span className="w-8 h-[1px] bg-[#947854]" />
                <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#947854] font-medium">
                  PROFESSIONAL INQUIRY
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1B1E] tracking-tight mb-4">
                Have a Project in Mind?
              </h2>
              <p className="text-sm sm:text-base text-[#595C62] font-sans leading-relaxed">
                Let&apos;s connect to discuss construction execution, project coordination, quality management, and opportunities to deliver exceptional spaces.
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-4">
              {/* LinkedIn Verified Card */}
              <a
                href={PORTFOLIO_DATA.personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-[#FAF7F2] border border-[#E2DDD4] hover:border-[#947854] transition-all duration-300 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#1A1B1E] text-white group-hover:bg-[#947854] transition-colors">
                    <LinkedInIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.16em] text-[#947854] font-sans font-medium block">
                      Primary Professional Network
                    </span>
                    <span className="font-serif text-lg text-[#1A1B1E] group-hover:text-[#947854] transition-colors font-medium">
                      Connect on LinkedIn
                    </span>
                    <span className="text-xs text-[#646770] font-sans block mt-0.5">
                      Verified Profile · Direct Messaging
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#646770] group-hover:text-[#947854] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Geographic Hub */}
              <div className="p-6 bg-[#FAF7F2] border border-[#E2DDD4] flex items-center gap-4">
                <div className="p-3 bg-[#F2EFE9] border border-[#E2DDD4] text-[#947854]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#646770] font-sans font-medium block">
                    Operating Geography
                  </span>
                  <span className="font-serif text-base text-[#1A1B1E] font-medium">
                    {PORTFOLIO_DATA.personal.location}
                  </span>
                  <span className="text-xs text-[#646770] font-sans block mt-0.5">
                    Available for marquee residential &amp; infrastructure projects
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-[#FAF7F2] p-8 sm:p-10 border border-[#E2DDD4] shadow-sm">
            <div className="mb-6 pb-6 border-b border-[#E2DDD4]">
              <h3 className="font-serif text-2xl text-[#1A1B1E] font-medium">
                Send a Direct Project Inquiry
              </h3>
              <p className="text-xs text-[#646770] font-sans mt-1">
                Provide preliminary details regarding your development, consultation, or project scope.
              </p>
            </div>

            {formStatus === "success" ? (
              <div className="p-8 bg-[#FBF9F5] border border-[#947854] flex flex-col items-center text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-[#947854]/10 text-[#947854] flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl text-[#1A1B1E]">
                  Inquiry Delivered Successfully
                </h4>
                <p className="text-xs sm:text-sm text-[#595C62] max-w-md font-sans leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your project inquiry regarding &ldquo;{formData.projectType}&rdquo; has been transmitted to Saket Kumar Tiwari. You will receive a response at <strong>{formData.email}</strong>.
                </p>
                <div className="p-4 bg-[#F2EFE9] border border-[#E2DDD4] text-xs text-[#646770] text-left w-full space-y-1.5">
                  <span className="font-medium text-[#1A1B1E] block">Direct Professional Connection:</span>
                  <p>
                    For urgent site consultations or executive scheduling, feel free to also reach out directly via LinkedIn:
                  </p>
                  <a
                    href={PORTFOLIO_DATA.personal.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#947854] font-medium hover:underline pt-1"
                  >
                    <span>Message on LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
                <button
                  onClick={() => {
                    setFormStatus("idle");
                    setFormData({
                      name: "",
                      organization: "",
                      email: "",
                      projectType: "Luxury Residential",
                      message: "",
                      _gotcha: "",
                    });
                  }}
                  className="px-6 py-2.5 border border-[#1A1B1E] text-xs uppercase tracking-[0.14em] font-medium text-[#1A1B1E] hover:bg-[#1A1B1E] hover:text-white transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Honeypot anti-spam bot field */}
                <div style={{ display: "none" }} aria-hidden="true">
                  <input
                    type="text"
                    name="_gotcha"
                    value={formData._gotcha}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {formStatus === "error" && (
                  <div className="p-3.5 bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-sans uppercase tracking-[0.12em] font-medium text-[#1A1B1E] mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#E2DDD4] text-xs text-[#1A1B1E] placeholder:text-[#9B9EAA] focus:border-[#947854] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="organization"
                      className="block text-xs font-sans uppercase tracking-[0.12em] font-medium text-[#1A1B1E] mb-1.5"
                    >
                      Organization / Firm
                    </label>
                    <input
                      id="organization"
                      name="organization"
                      type="text"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="e.g. Architectural Studio / Estate Owner"
                      className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#E2DDD4] text-xs text-[#1A1B1E] placeholder:text-[#9B9EAA] focus:border-[#947854] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-sans uppercase tracking-[0.12em] font-medium text-[#1A1B1E] mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. contact@domain.com"
                      className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#E2DDD4] text-xs text-[#1A1B1E] placeholder:text-[#9B9EAA] focus:border-[#947854] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-xs font-sans uppercase tracking-[0.12em] font-medium text-[#1A1B1E] mb-1.5"
                    >
                      Inquiry Category
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#E2DDD4] text-xs text-[#1A1B1E] focus:border-[#947854] focus:outline-none transition-colors"
                    >
                      <option value="Luxury Residential">Luxury Residential / Farmhouse</option>
                      <option value="High-Rise Development">High-Rise Residential</option>
                      <option value="Luxury Interiors">Luxury Interior Fit-Out</option>
                      <option value="Hospitality Infrastructure">Hospitality Conversion</option>
                      <option value="Quality Advisory">Quality Assurance &amp; ISO Audits</option>
                      <option value="Executive Opportunity">Executive Project Leadership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-sans uppercase tracking-[0.12em] font-medium text-[#1A1B1E] mb-1.5"
                  >
                    Project Scope &amp; Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your project requirements, location, estimated schedule, or role expectations..."
                    className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#E2DDD4] text-xs text-[#1A1B1E] placeholder:text-[#9B9EAA] focus:border-[#947854] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-[11px] text-[#646770]">
                    * Required fields
                  </span>

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#1A1B1E] hover:bg-[#947854] text-white text-xs uppercase tracking-[0.16em] font-medium transition-colors disabled:opacity-50"
                  >
                    {formStatus === "submitting" ? (
                      <span>Validating...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
