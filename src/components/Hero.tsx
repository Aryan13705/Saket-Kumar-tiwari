"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Building, MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import GrinIris from "@/components/originkit/ui/grin-iris";

export default function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const projects = PORTFOLIO_DATA.projects;
  const currentProject = projects[currentIdx];

  const handleNext = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const handlePrev = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  // Support left/right keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section className="relative min-h-[96vh] lg:min-h-screen flex flex-col justify-between overflow-hidden pt-24 pb-8">
      {/* Background Architectural Imagery with smooth fade */}
      <div className="absolute inset-0 z-0">
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIdx ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <Image
              src={proj.image}
              alt={proj.title}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}

        {/* Soft Contrast Scrim - engineered so background architectural photo is clearly visible, vibrant & sharp */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141517] via-black/35 to-black/30" />
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* Top / Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center flex flex-col items-center my-auto">
        {/* Eyebrow Label with Interactive Rolling Eyes */}
        <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/30 bg-black/40 backdrop-blur-md mb-6 shadow-xl rounded-full">
          <div className="flex items-center gap-1.5 shrink-0" title="Precision Engineering & Quality Oversight Eyes">
            <span className="w-5 h-5 rounded-full overflow-hidden inline-block relative border border-[#D4AF37]/80 shadow-[0_0_8px_rgba(212,175,55,0.4)] bg-black/60">
              <GrinIris
                background="transparent"
                follow="page"
                reach={10}
                wander={6}
                float={6}
                irisColor="#D4AF37"
                scleraColor="#FFFFFF"
                scale={125}
                advanced={{ maxTurn: 42, followMs: 35 }}
              />
            </span>
            <span className="w-5 h-5 rounded-full overflow-hidden inline-block relative border border-[#D4AF37]/80 shadow-[0_0_8px_rgba(212,175,55,0.4)] bg-black/60">
              <GrinIris
                background="transparent"
                follow="page"
                reach={10}
                wander={6}
                float={6}
                irisColor="#D4AF37"
                scleraColor="#FFFFFF"
                scale={125}
                advanced={{ maxTurn: 42, followMs: 35 }}
              />
            </span>
          </div>
          <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#E8E4DC] font-medium">
            {PORTFOLIO_DATA.personal.eyebrow}
          </span>
        </div>

        {/* Master Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.08] max-w-4xl mx-auto mb-4 text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          Crafting Exceptional Spaces.{" "}
          <span className="italic font-light text-[#F4EDE2] block sm:inline">
            Delivering Engineering Excellence.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="font-sans text-xs sm:text-base md:text-lg text-[#F2EFE9] max-w-2xl mx-auto leading-relaxed font-normal mb-8 text-balance drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]">
          {PORTFOLIO_DATA.personal.heroText}
        </p>

        {/* Primary Hero CTA */}
        <div className="flex items-center justify-center w-full sm:w-auto">
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#947854] hover:bg-[#806644] text-white text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 shadow-xl shadow-black/30 hover:scale-[1.02]"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Floating Get in Touch in the Right Corner */}
      <a
        href="#contact"
        aria-label="Get in Touch"
        className="fixed bottom-6 right-6 z-40 hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-[#1A1B1E]/90 hover:bg-[#947854] text-white border border-white/20 backdrop-blur-md text-xs uppercase tracking-[0.14em] font-medium shadow-2xl transition-all duration-300 hover:scale-105 group cursor-pointer"
      >
        <span>Get in Touch</span>
        <ArrowRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
      </a>

      {/* Interactive Project Showcase Bar (Scroll Left & Right in Hero) */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-8 mt-6">
        <div className="p-4 sm:p-5 bg-[#141517]/85 backdrop-blur-md border border-white/15 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Active Project Highlight Details */}
          <div className="flex items-center gap-4">
            {/* Project Index Badge */}
            <div className="flex flex-col items-center justify-center w-12 h-12 bg-white/10 border border-white/20 text-[#D4AF37] font-serif text-sm tracking-wider shrink-0">
              <span>0{currentIdx + 1}</span>
              <span className="text-[9px] text-white/50 -mt-0.5">/0{projects.length}</span>
            </div>

            {/* Title & Metadata */}
            <div className="text-left">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#D4AF37] font-sans font-medium px-2 py-0.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                  {currentIdx === 0 ? "Current Engagement" : currentProject.category}
                </span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl text-white font-medium leading-tight">
                {currentProject.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-white/70 font-sans mt-0.5">
                <span className="flex items-center gap-1">
                  <Building className="w-3 h-3 text-[#D4AF37]" />
                  {currentProject.organization}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#D4AF37]" />
                  {currentProject.location}
                </span>
              </div>
            </div>
          </div>

          {/* Left/Right Controls and Project Preview Rail */}
          <div className="flex items-center gap-3 justify-between md:justify-end">
            <span className="text-[10px] uppercase tracking-[0.16em] text-white/60 font-sans hidden sm:inline">
              Scroll Projects
            </span>

            {/* Left Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous project"
              className="p-2.5 bg-white/10 hover:bg-[#947854] text-white border border-white/20 transition-colors focus:outline-none cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Horizontal Mini Thumbnails Track */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-[260px] py-1">
              {projects.map((proj, pIdx) => (
                <button
                  key={proj.id}
                  onClick={() => setCurrentIdx(pIdx)}
                  aria-label={`Go to ${proj.title}`}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    pIdx === currentIdx
                      ? "w-8 bg-[#D4AF37]"
                      : "w-2.5 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              aria-label="Next project"
              className="p-2.5 bg-white/10 hover:bg-[#947854] text-white border border-white/20 transition-colors focus:outline-none cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scroll indicator anchor */}
        <div className="flex items-center justify-between mt-3 text-[10px] uppercase tracking-[0.16em] text-white/50 font-sans">
          <span>Use left / right arrows or buttons to browse projects</span>
          <a href="#impact" className="flex items-center gap-1 hover:text-white transition-colors">
            <span>Scroll Down</span>
            <ArrowDown className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
