"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { LinkedInIcon } from "./Icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#141517] text-[#D5D2CA] pt-16 pb-12 border-t border-[#2C2E33]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2C2E33]">
          {/* Brand & Designation */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-[#947854] bg-[#1A1B1E] flex items-center justify-center text-xs font-serif tracking-widest text-[#E8DFD3]">
                {PORTFOLIO_DATA.personal.monogram}
              </div>
              <span className="font-serif text-xl tracking-tight text-white font-medium">
                {PORTFOLIO_DATA.personal.name}
              </span>
            </div>

            <p className="text-xs text-[#9B9EAA] max-w-sm font-sans leading-relaxed">
              {PORTFOLIO_DATA.personal.headline}
            </p>
            <p className="text-[11px] text-[#646770] font-sans">
              Civil Engineer | Construction &amp; Project Management | Luxury Residential Developments
            </p>
          </div>

          {/* Sitemap Links */}
          <div className="md:col-span-4 flex flex-col space-y-2.5">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#947854] font-medium font-sans mb-1">
              Index
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-sans">
              <a href="#about" className="text-[#9B9EAA] hover:text-white transition-colors">
                The Professional
              </a>
              <a href="#expertise" className="text-[#9B9EAA] hover:text-white transition-colors">
                Expertise Areas
              </a>
              <a href="#projects" className="text-[#9B9EAA] hover:text-white transition-colors">
                Featured Projects
              </a>
              <a href="#experience" className="text-[#9B9EAA] hover:text-white transition-colors">
                Career Timeline
              </a>
              <a href="#achievements" className="text-[#9B9EAA] hover:text-white transition-colors">
                Verified Metrics
              </a>
              <a href="#contact" className="text-[#9B9EAA] hover:text-white transition-colors">
                Contact &amp; Inquiries
              </a>
            </div>
          </div>

          {/* Back to top & LinkedIn */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between space-y-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#2C2E33] hover:border-[#947854] bg-[#1A1B1E] text-xs uppercase tracking-[0.14em] text-[#D5D2CA] hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>

            <a
              href={PORTFOLIO_DATA.personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-[#947854] hover:text-[#E8DFD3] transition-colors"
            >
              <LinkedInIcon className="w-4 h-4" />
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </div>

        {/* Bottom Credits & Integrity */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#646770] font-sans">
          <p>
            &copy; 2026 Saket Kumar Tiwari. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Civil Engineering &amp; Construction Management · Portfolio
          </p>
        </div>
      </div>
    </footer>
  );
}
