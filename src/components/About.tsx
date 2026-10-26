import React from "react";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Ruler, Users2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function About() {
  const pillars = [
    {
      icon: Ruler,
      title: "Technical Execution",
      desc: "Deep on-ground civil engineering command—from foundation RCC works to millimeter-tolerance finishes."
    },
    {
      icon: ShieldCheck,
      title: "Quality Governance (QA/QC)",
      desc: "ISO compliance audits, Inspection & Test Plans (ITP), and Lean Six Sigma methodology."
    },
    {
      icon: Users2,
      title: "Owner & Consultant Liaison",
      desc: "Harmonizing relationships between private clients, prominent architects, consultants, and contractors."
    },
    {
      icon: CheckCircle2,
      title: "Commercial & Schedule Rigor",
      desc: "Disciplined BOQ takeoffs, PO reconciliations, and critical-path resource optimization."
    }
  ];

  return (
    <section id="about" className="relative py-24 lg:py-32 bg-[#FBF9F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-14 lg:mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="w-8 h-[1px] bg-[#947854]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#947854] font-medium">
              THE PROFESSIONAL
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1B1E] tracking-tight leading-tight">
            Engineering Precision. Architectural Vision.
          </h2>
        </div>

        {/* Split Screen Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Visual Storytelling */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="relative aspect-[4/5] w-full bg-[#EDEAE3] border border-[#E2DDD4] overflow-hidden shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85"
                alt="Architectural detailing, construction blueprints, and precision measurement instruments"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B1E]/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[9px] uppercase tracking-[0.18em] font-sans text-[#EDE4D8] block mb-1">
                  On-Ground Discipline
                </span>
                <p className="font-serif text-lg leading-snug">
                  Aligning structural reality with refined architectural intent.
                </p>
              </div>
            </div>

            {/* Quick credentials card */}
            <div className="p-6 bg-[#F2EFE9] border border-[#E2DDD4] flex flex-col space-y-3">
              <span className="text-[10px] tracking-[0.18em] uppercase text-[#947854] font-medium">
                Current Role &amp; Location
              </span>
              <p className="font-serif text-xl text-[#1A1B1E]">
                Manager – Construction
              </p>
              <p className="text-xs text-[#646770] leading-relaxed">
                Varun Beverages Limited · Private Luxury Farmhouse Construction, New Delhi.
              </p>
              <div className="pt-2 border-t border-[#E2DDD4] flex items-center justify-between text-[11px] text-[#646770]">
                <span>Credentials: LSSGB I (Lean Six Sigma)</span>
                <span className="text-[#1A1B1E] font-medium">9+ Years Exp</span>
              </div>
            </div>
          </div>

          {/* Right Column: First-Person Professional Narrative */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div className="prose prose-stone max-w-none">
              <p className="font-serif text-xl sm:text-2xl text-[#1A1B1E] leading-relaxed font-light mb-6">
                &ldquo;{PORTFOLIO_DATA.personal.introduction}&rdquo;
              </p>

              <div className="space-y-4 text-sm sm:text-base text-[#595C62] leading-relaxed font-sans font-normal">
                {PORTFOLIO_DATA.personal.aboutExtended.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* 4 Pillars Grid */}
            <div className="pt-6 border-t border-[#E2DDD4]">
              <h3 className="text-xs uppercase tracking-[0.18em] font-medium text-[#1A1B1E] mb-6">
                Core Execution Foundations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={pillar.title} className="flex items-start gap-3.5">
                      <div className="p-2 bg-[#F2EFE9] border border-[#E2DDD4] text-[#947854] shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-sans uppercase tracking-[0.12em] font-medium text-[#1A1B1E] mb-1">
                          {pillar.title}
                        </h4>
                        <p className="text-xs text-[#646770] leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Signature & Outro */}
            <div className="pt-6 border-t border-[#E2DDD4] flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="font-serif text-2xl text-[#1A1B1E] block">Saket Kumar Tiwari</span>
                <span className="text-xs text-[#646770] uppercase tracking-wider font-sans">
                  Civil Engineer · B.Tech
                </span>
              </div>
              <a
                href={PORTFOLIO_DATA.personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-medium text-[#947854] hover:text-[#7D6444] transition-colors"
              >
                <span>View LinkedIn Profile</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
