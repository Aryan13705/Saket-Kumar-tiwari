import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1C1E21",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Saket Kumar Tiwari | Civil Engineer & Construction Management Professional",
  description:
    "Civil engineering and construction management professional with 9+ years of experience delivering luxury residential farmhouses, high-end interiors, high-rise buildings, and hospitality conversions across India.",
  keywords: [
    "Saket Kumar Tiwari",
    "Civil Engineer",
    "Construction Manager",
    "Luxury Residential",
    "Farmhouse Construction",
    "Construction Management",
    "Quality Assurance QA QC",
    "High-Rise Construction",
    "Luxury Interiors",
    "Gurugram",
    "New Delhi",
  ],
  authors: [{ name: "Saket Kumar Tiwari" }],
  openGraph: {
    title: "Saket Kumar Tiwari | Civil Engineer & Construction Management Professional",
    description:
      "Crafting Exceptional Spaces. Delivering Engineering Excellence. 9+ years of documented experience in luxury residential, high-rise, and interior developments.",
    type: "website",
    locale: "en_IN",
    siteName: "Saket Kumar Tiwari Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saket Kumar Tiwari | Civil Engineer & Construction Management Professional",
    description:
      "Crafting Exceptional Spaces. Delivering Engineering Excellence.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#FBF9F5] text-[#1C1E21] font-sans antialiased selection:bg-[#947854] selection:text-white">
        {children}
      </body>
    </html>
  );
}
