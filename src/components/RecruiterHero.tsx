"use client";

import React from "react";
import Image from "next/image";
import {
  FileText,
  Briefcase,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { LinkedInIcon } from "./Icons";

export default function RecruiterHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center bg-[#0F1015] text-white pt-28 pb-16 overflow-hidden border-b border-white/10">
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)`,
          backgroundSize: `40px 40px`,
        }}
      />
      <div className="absolute inset-0 bg-radial from-transparent via-[#0F1015]/80 to-[#0F1015] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        {/* Top Perspective Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#D4AF37]/15 border border-[#D4AF37]/40 rounded-full text-[11px] font-sans uppercase tracking-[0.2em] text-[#D4AF37] mb-6">
          <Briefcase className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Recruiter Perspective · Executive Dossier</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Executive Value Proposition */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.08] mb-4">
              Leadership Built on <span className="italic text-[#D4AF37]">Execution.</span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-[#C2C6D4] leading-relaxed mb-6 max-w-2xl">
              Civil Engineering and Construction Management professional with <strong>9+ years of experience</strong> orchestrating 
              a combined <strong>₹700Cr+ track record</strong> across luxury turnkey estates, high-rise residential towers, and ultra-prime interiors. 
              Currently driving civil operations as <strong>Manager at Varun Beverages Limited</strong>.
            </p>

            {/* Quick-Scan Executive Key Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-[#A0A4B2] font-sans block mb-1">
                  Overall Track Record
                </span>
                <span className="font-serif text-2xl font-bold text-[#D4AF37] block">
                  ₹700Cr+
                </span>
                <span className="text-[11px] text-white/70 font-sans">
                  Cumulative project valuation
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-[#A0A4B2] font-sans block mb-1">
                  Industry Experience
                </span>
                <span className="font-serif text-2xl font-bold text-[#D4AF37] block">
                  9+ Years
                </span>
                <span className="text-[11px] text-white/70 font-sans">
                  Pan-India civil governance
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase tracking-wider text-[#A0A4B2] font-sans block mb-1">
                  Quality & Methodology
                </span>
                <span className="font-serif text-xl font-bold text-[#EDEAE3] block">
                  LSSGB
                </span>
                <span className="text-[11px] text-white/70 font-sans">
                  Lean Six Sigma Green Belt
                </span>
              </div>
            </div>

            {/* Documented Core Competencies */}
            <div className="space-y-2 mb-8">
              <div className="flex items-center gap-2.5 text-xs text-[#EDEAE3] font-sans">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>
                  <strong>Turnkey Construction Management:</strong> Site mobilization, BOQs, P&L stewardship, and multi-tier contractor governance.
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#EDEAE3] font-sans">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>
                  <strong>Schedule & Budget Adherence:</strong> Delivered 15% reduction in project delays at Aamor Inox and 19 on-time launches at OYO.
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#EDEAE3] font-sans">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>
                  <strong>QA/QC & Zero-Rework Standards:</strong> Boosted ISO compliance by 20% and achieved 10% rework cost savings at La Sorogeeka.
                </span>
              </div>
            </div>

            {/* Recruiter Primary CTAs: Download Verified Resume & Schedule Discussion */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/Profile.pdf"
                download="Saket_Kumar_Tiwari_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#D4AF37] hover:bg-[#C29E2E] text-black text-xs uppercase tracking-[0.16em] font-bold rounded-xl transition-all shadow-[0_8px_25px_rgba(212,175,55,0.35)] hover:scale-[1.02] cursor-pointer"
              >
                <FileText className="w-4 h-4 text-black" />
                <span>Download Executive Resume (PDF)</span>
              </a>

              <a
                href="#experience"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-[0.16em] font-medium rounded-xl border border-white/15 transition-all cursor-pointer"
              >
                <span>View Career Timeline</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={PORTFOLIO_DATA.personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 hover:bg-[#0077B5] text-white rounded-xl border border-white/15 transition-colors"
                title="LinkedIn Profile"
                aria-label="Visit Saket's LinkedIn Profile"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Executive Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden border border-white/20 bg-[#161820] shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              <Image
                src="/portrait-saket.jpg"
                alt="Saket Kumar Tiwari — Formal Portrait"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-cover object-top filter contrast-[1.03]"
              />

              {/* Bottom Scrim & Current Position Plaque */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E14] via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#12141C]/92 backdrop-blur-md border border-white/15">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#D4AF37] font-sans font-medium block">
                  Current Engagement (2026–Present)
                </span>
                <p className="font-serif text-lg text-white font-medium">
                  Manager · Civil Operations
                </p>
                <p className="text-xs text-[#9FA3B2] font-sans">
                  Varun Beverages Limited
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
