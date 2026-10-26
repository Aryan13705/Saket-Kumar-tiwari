"use client";

import React from "react";
import {
  RefreshCw,
  Layers,
  FileText,
  Briefcase,
  Building2,
  Compass,
} from "lucide-react";
import { PersonaType } from "./IdentitySelector";

interface PersonaBannerProps {
  activePersona: PersonaType;
  onChangePersona: () => void;
  onExploreAll: () => void;
}

export default function PersonaBanner({
  activePersona,
  onChangePersona,
  onExploreAll,
}: PersonaBannerProps) {
  const personaConfig = {
    recruiter: {
      label: "Recruiter Journey",
      tagline: "Leadership Built on Execution",
      icon: Briefcase,
      color: "#D4AF37",
      bgClass: "bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37]",
    },
    client: {
      label: "Client Journey",
      tagline: "From Vision to Meticulous Execution",
      icon: Building2,
      color: "#FF7A3D",
      bgClass: "bg-[#FF7A3D]/10 border-[#FF7A3D]/30 text-[#FF7A3D]",
    },
    visitor: {
      label: "Visitor Journey",
      tagline: "Every Space Has a Story",
      icon: Compass,
      color: "#60A5FA",
      bgClass: "bg-[#60A5FA]/10 border-[#60A5FA]/30 text-[#60A5FA]",
    },
    all: {
      label: "Complete Portfolio",
      tagline: "Comprehensive Engineering & Construction Dossier",
      icon: Layers,
      color: "#947854",
      bgClass: "bg-[#947854]/15 border-[#947854]/40 text-[#947854]",
    },
  };

  const current = personaConfig[activePersona] || personaConfig.all;
  const Icon = current.icon;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-4xl animate-fade-in pointer-events-auto select-none"
    >
      <div className="bg-[#12141A]/95 backdrop-blur-xl border border-white/15 px-4 sm:px-6 py-3 rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.7)] flex flex-wrap items-center justify-between gap-3 text-white">
        {/* Left: Persona Status Badge & Headline */}
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-sans uppercase tracking-[0.16em] font-medium border ${current.bgClass}`}
          >
            <Icon className="w-3.5 h-3.5" style={{ color: current.color }} />
            <span>{current.label}</span>
          </span>

          <span className="hidden md:inline text-xs font-serif italic text-[#EDEAE3] font-light truncate max-w-xs lg:max-w-md">
            &ldquo;{current.tagline}&rdquo;
          </span>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs font-sans">
          {/* Download Resume Link (Genuine /Profile.pdf) */}
          <a
            href="/Profile.pdf"
            download="Saket_Kumar_Tiwari_Profile.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="Download verified resume / dossier"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-[#EDEAE3] hover:text-white rounded-lg transition-colors border border-white/10 text-[11px] uppercase tracking-wider font-medium cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Resume</span>
          </a>

          {/* Switch to Complete Portfolio if in curated persona */}
          {activePersona !== "all" && (
            <button
              onClick={onExploreAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-[#947854] text-[#EDEAE3] hover:text-white rounded-lg transition-all border border-white/10 text-[11px] uppercase tracking-wider font-medium cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Explore All</span>
            </button>
          )}

          {/* Change Perspective Modal Trigger */}
          <button
            onClick={onChangePersona}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#947854] hover:bg-[#A88B63] text-white rounded-lg transition-all text-[11px] uppercase tracking-wider font-semibold shadow-md cursor-pointer hover:scale-[1.02]"
          >
            <RefreshCw className="w-3 h-3 text-white" />
            <span>Change Perspective</span>
          </button>
        </div>
      </div>
    </div>
  );
}
