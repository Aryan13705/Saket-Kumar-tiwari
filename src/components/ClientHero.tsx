"use client";

import React from "react";
import Image from "next/image";
import {
  Building2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function ClientHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center bg-[#101216] text-white pt-28 pb-16 overflow-hidden border-b border-white/10">
      {/* Background Architectural Photo: Aamor Inox Luxury Farmhouse */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/projects/aamor-farmhouse-facade.jpg"
          alt="Luxury Farmhouse Estate Construction"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.45] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101216] via-[#101216]/70 to-[#101216]/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        {/* Top Perspective Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#FF7A3D]/15 border border-[#FF7A3D]/40 rounded-full text-[11px] font-sans uppercase tracking-[0.2em] text-[#FF7A3D] mb-6">
          <Building2 className="w-3.5 h-3.5 text-[#FF7A3D]" />
          <span>Client Perspective · Construction Execution & Delivery</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Client Assurance & Project Delivery Value */}
          <div className="lg:col-span-8 flex flex-col text-left">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.08] mb-4">
              From Vision to <span className="italic text-[#FF7A3D]">Meticulous Execution.</span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-[#D4D7E2] leading-relaxed mb-6 max-w-2xl">
              Transforming complex architectural blueprints into delivered landmarks. 
              Specializing in the turnkey construction of <strong>luxury farmhouses, bespoke residential estates, high-rise developments</strong>, 
              and <strong>ultra-luxury interior fit-outs</strong> with rigorous schedule, budget, and material quality governance.
            </p>

            {/* Client Confidence Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
              <div className="p-4 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md">
                <span className="text-[10px] uppercase tracking-wider text-[#FF7A3D] font-sans font-medium block mb-1">
                  Luxury Farmhouses
                </span>
                <span className="font-serif text-xl font-bold text-white block">
                  Turnkey Estates
                </span>
                <span className="text-[11px] text-[#A8ACB9] font-sans">
                  Deep foundations to Italian marble & bespoke millwork
                </span>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md">
                <span className="text-[10px] uppercase tracking-wider text-[#FF7A3D] font-sans font-medium block mb-1">
                  High-Rise Towers
                </span>
                <span className="font-serif text-xl font-bold text-white block">
                  SOBHA City
                </span>
                <span className="text-[11px] text-[#A8ACB9] font-sans">
                  Twin G+18 residential towers delivered to exact specs
                </span>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md">
                <span className="text-[10px] uppercase tracking-wider text-[#FF7A3D] font-sans font-medium block mb-1">
                  Contractor Governance
                </span>
                <span className="font-serif text-xl font-bold text-white block">
                  Zero Rework
                </span>
                <span className="text-[11px] text-[#A8ACB9] font-sans">
                  Multi-tier QA/QC and vendor milestone enforcement
                </span>
              </div>
            </div>

            {/* Scope of Management Services */}
            <div className="space-y-2 mb-8">
              <div className="flex items-center gap-2.5 text-xs text-[#EDEAE3] font-sans">
                <CheckCircle2 className="w-4 h-4 text-[#FF7A3D] shrink-0" />
                <span>
                  <strong>Architect & Consultant Harmony:</strong> Seamless coordination between lead design architects, MEP engineers, and structural consultants.
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#EDEAE3] font-sans">
                <CheckCircle2 className="w-4 h-4 text-[#FF7A3D] shrink-0" />
                <span>
                  <strong>Material & BOQ Precision:</strong> Exact verification of high-value consignments, imported stones, timber joinery, and structural steel.
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#EDEAE3] font-sans">
                <CheckCircle2 className="w-4 h-4 text-[#FF7A3D] shrink-0" />
                <span>
                  <strong>On-Time Milestone Assurance:</strong> 15% reduction in project delays through proactive critical-path scheduling and resource leveling.
                </span>
              </div>
            </div>

            {/* Client CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#FF7A3D] hover:bg-[#E0662D] text-white text-xs uppercase tracking-[0.16em] font-bold rounded-xl transition-all shadow-[0_8px_25px_rgba(255,122,61,0.35)] hover:scale-[1.02] cursor-pointer"
              >
                <span>Explore Delivered Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-[0.16em] font-medium rounded-xl border border-white/15 transition-all cursor-pointer"
              >
                <span>Discuss Project Delivery</span>
              </a>
            </div>
          </div>

          {/* Right Column: Featured Estate Vignette */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden border border-white/20 bg-[#161820] shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              <Image
                src="/projects/aamor-farmhouse-interior.jpg"
                alt="Luxury Farmhouse Interior Craftsmanship"
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover filter contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/85 backdrop-blur-md border border-white/15">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#FF7A3D] font-sans font-medium block">
                  Delivered Farmhouse Estate
                </span>
                <p className="font-serif text-lg text-white font-medium">
                  Aamor Inox Limited
                </p>
                <p className="text-xs text-[#A8ACB9] font-sans">
                  Turnkey Civil & Ultra-Luxury Interiors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
