"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Building2,
  CheckCircle2,
  Award,
  Maximize2,
  X,
  Calendar,
  Sparkles,
  Quote,
} from "lucide-react";
import { PORTFOLIO_DATA, AwardItem } from "@/data/portfolio";

export default function Achievements() {
  const [selectedAward, setSelectedAward] = useState<AwardItem | null>(null);

  const awards = PORTFOLIO_DATA.certificationsAndTraining.awardsAndRecognitions || [];

  return (
    <section id="achievements" className="py-24 lg:py-32 bg-[#FBF9F5] border-t border-[#E2DDD4]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header: Part 1 - Quantified Impact */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="w-8 h-[1px] bg-[#947854]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#947854] font-medium">
              VERIFIED IMPACT &amp; AWARDS
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1B1E] tracking-tight mb-4">
            Documented Engineering &amp; Operational Milestones
          </h2>
          <p className="text-xs sm:text-sm text-[#646770] font-sans leading-relaxed">
            Every metric below is strictly contextualized and attributed to its documented assignment, reflecting concrete improvements in schedule, quality governance, procurement, and commercial delivery.
          </p>
        </div>

        {/* 6 Achievements Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {PORTFOLIO_DATA.achievements.map((item, idx) => (
            <div
              key={item.label}
              className="bg-[#FAF7F2] p-8 border border-[#E2DDD4] hover:border-[#947854] transition-all duration-300 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
            >
              <div>
                {/* Organization Pill & Context */}
                <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[#E2DDD4]">
                  <span className="text-[10px] uppercase tracking-[0.16em] font-sans font-medium text-[#947854] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    {item.organization}
                  </span>
                  <span className="text-[10px] text-[#646770] font-sans">
                    0{idx + 1}
                  </span>
                </div>

                {/* Big Metric Display */}
                <div className="mb-4">
                  <span className="font-serif text-4xl sm:text-5xl text-[#1A1B1E] font-normal tracking-tight block">
                    {item.metric}
                  </span>
                  <h3 className="font-serif text-lg text-[#1A1B1E] font-medium mt-1">
                    {item.label}
                  </h3>
                </div>

                {/* Context Description */}
                <p className="text-xs text-[#595C62] leading-relaxed font-sans mb-6">
                  {item.context}
                </p>
              </div>

              {/* Operational Significance Footer */}
              <div className="pt-4 border-t border-[#E2DDD4]/60">
                <div className="flex items-start gap-2 text-[11px] text-[#646770]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#947854] shrink-0 mt-0.5" />
                  <span className="leading-snug">{item.significance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Header: Part 2 - Physical Appreciations & Crystal Trophies Showcase */}
        <div className="pt-16 border-t border-[#E2DDD4] mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#947854]/10 border border-[#947854]/30 rounded-full text-[11px] font-sans uppercase tracking-[0.2em] text-[#947854] mb-3">
                <Award className="w-3.5 h-3.5 text-[#947854]" />
                <span>Documented Honors &amp; Corporate Recognitions</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1A1B1E] font-normal tracking-tight">
                Authentic Certificates, Trophies &amp; Award Citations
              </h3>
            </div>
            <p className="text-xs text-[#646770] font-sans max-w-md">
              Click any certificate or crystal trophy below to inspect the original high-resolution citation and issuer details.
            </p>
          </div>

          {/* 4 Awards & Recognitions Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {awards.map((award) => (
              <div
                key={award.id}
                onClick={() => setSelectedAward(award)}
                className="group cursor-pointer bg-[#FAF7F2] border border-[#E2DDD4] hover:border-[#947854] rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                {/* Certificate / Trophy Image Container */}
                <div className="relative aspect-[4/3] w-full bg-[#EDEAE3] overflow-hidden">
                  <Image
                    src={award.image}
                    alt={award.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.14em] font-sans font-medium px-2 py-0.5 bg-black/75 backdrop-blur-sm text-white rounded">
                      {award.badge}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1A1B1E] group-hover:bg-[#947854] group-hover:text-white transition-colors shadow">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Bottom Image Overlay Strip */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white/90 font-sans">
                    <span className="flex items-center gap-1 font-medium">
                      <Building2 className="w-3 h-3 text-[#D4AF37]" />
                      {award.organization}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] opacity-80">
                      <Calendar className="w-3 h-3 text-[#D4AF37]" />
                      {award.date}
                    </span>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h4 className="font-serif text-lg text-[#1A1B1E] font-medium leading-snug group-hover:text-[#947854] transition-colors mb-2">
                      {award.title}
                    </h4>

                    {/* Official Citation Snippet */}
                    <p className="text-xs text-[#595C62] leading-relaxed font-sans line-clamp-3 mb-4 italic">
                      &ldquo;{award.citation}&rdquo;
                    </p>
                  </div>

                  {/* Issuer Footer */}
                  <div className="pt-3 border-t border-[#E2DDD4] flex items-center justify-between text-[11px] text-[#646770] font-sans">
                    <span className="truncate max-w-[170px]" title={award.issuer}>
                      By: {award.issuer}
                    </span>
                    <span className="text-[#947854] font-medium tracking-wider uppercase text-[10px] inline-flex items-center gap-1">
                      <span>View</span>
                      <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* High-Resolution Certificate Lightbox Modal */}
      {selectedAward && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="award-modal-title"
          onClick={() => setSelectedAward(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#111318] text-white max-w-4xl w-full rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#947854]/20 border border-[#947854]/40 flex items-center justify-center text-[#D4AF37]">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#D4AF37] font-sans font-medium block">
                    {selectedAward.badge} · {selectedAward.organization}
                  </span>
                  <h3 id="award-modal-title" className="font-serif text-lg sm:text-xl text-white font-medium">
                    {selectedAward.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedAward(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close award preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: High-Resolution Photo + Verified Citation */}
            <div className="p-4 sm:p-6 overflow-y-auto flex flex-col md:flex-row gap-6 items-center">
              {/* Photo Display */}
              <div className="relative w-full md:w-3/5 aspect-[4/3] rounded-xl overflow-hidden bg-black/80 border border-white/15 shadow-xl shrink-0">
                <Image
                  src={selectedAward.image}
                  alt={selectedAward.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-contain"
                />
              </div>

              {/* Citation & Sign-off Details */}
              <div className="w-full md:w-2/5 flex flex-col justify-between text-left space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-sans mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{selectedAward.date}</span>
                  </div>

                  <h4 className="font-serif text-xl sm:text-2xl text-white font-medium leading-snug mb-3">
                    {selectedAward.title}
                  </h4>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
                    <Quote className="w-4 h-4 text-[#D4AF37] mb-1.5 opacity-80" />
                    <p className="text-xs text-[#D5D8E4] leading-relaxed font-sans italic">
                      &ldquo;{selectedAward.citation}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-1 text-xs text-[#9FA3B2] font-sans">
                  <p>
                    <strong className="text-white">Organization:</strong> {selectedAward.organization}
                  </p>
                  <p>
                    <strong className="text-white">Awarded By:</strong> {selectedAward.issuer}
                  </p>
                  <p>
                    <strong className="text-white">Scope:</strong> {selectedAward.category}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
