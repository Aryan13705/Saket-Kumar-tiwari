import React from "react";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function ExperienceTimeline() {
  const typeBadgeColors: Record<string, string> = {
    "Construction Management": "bg-[#947854]/10 text-[#947854] border-[#947854]/30",
    "Quality & Interiors": "bg-[#5B6652]/10 text-[#5B6652] border-[#5B6652]/30",
    "Hospitality Infrastructure": "bg-[#486581]/10 text-[#486581] border-[#486581]/30",
    "Civil Engineering": "bg-[#846358]/10 text-[#846358] border-[#846358]/30",
    Entrepreneurship: "bg-[#7A5C98]/10 text-[#7A5C98] border-[#7A5C98]/30",
    Internship: "bg-[#627D98]/10 text-[#627D98] border-[#627D98]/30",
  };

  return (
    <section id="experience" className="py-24 lg:py-32 bg-[#F2EFE9] border-t border-[#E2DDD4]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="w-8 h-[1px] bg-[#947854]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#947854] font-medium">
              CAREER TRAJECTORY
            </span>
            <span className="w-8 h-[1px] bg-[#947854]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1B1E] tracking-tight mb-4">
            Professional Experience Timeline
          </h2>
          <p className="text-xs sm:text-sm text-[#646770] font-sans leading-relaxed">
            A documented 9.5+ year progression across construction management, heavy high-rise execution, luxury interiors, and early-stage entrepreneurship.
          </p>
        </div>

        {/* Timeline Spine */}
        <div className="relative border-l border-[#D5CFBF] ml-4 sm:ml-8 md:ml-32 pl-6 sm:pl-10 space-y-12">
          {PORTFOLIO_DATA.experienceTimeline.map((item) => {
            const badgeStyle =
              typeBadgeColors[item.type] ||
              "bg-[#947854]/10 text-[#947854] border-[#947854]/30";

            return (
              <div key={item.id} className="relative group">
                {/* Timeline Marker Dot */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#FBF9F5] border-2 border-[#947854] group-hover:bg-[#947854] group-hover:scale-125 transition-all duration-300" />

                {/* Left Date Label for Desktop */}
                <div className="hidden md:block absolute -left-36 top-1 text-right w-24">
                  <span className="text-xs font-serif text-[#947854] tracking-wider block font-medium">
                    {item.period.split("–")[0].trim()}
                  </span>
                  <span className="text-[10px] text-[#646770] font-sans block">
                    {item.period.split("–")[1]?.trim() || "Present"}
                  </span>
                </div>

                {/* Main Card */}
                <div className="bg-[#FBF9F5] p-6 sm:p-8 border border-[#E2DDD4] hover:border-[#947854]/60 transition-all duration-300 shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
                  {/* Top Meta Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] uppercase tracking-[0.14em] font-sans font-medium px-2.5 py-0.5 border ${badgeStyle}`}
                    >
                      {item.type}
                    </span>

                    <div className="flex items-center gap-3 text-xs text-[#646770] font-sans md:hidden">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#947854]" />
                        {item.period}
                      </span>
                    </div>
                  </div>

                  {/* Company & Role */}
                  <div className="mb-4">
                    <h3 className="font-serif text-2xl text-[#1A1B1E] font-medium leading-snug">
                      {item.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#595C62] font-sans mt-1">
                      <span className="font-medium text-[#1A1B1E] flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-[#947854]" />
                        {item.company}
                      </span>
                      <span className="flex items-center gap-1.5 text-[#646770]">
                        <MapPin className="w-3.5 h-3.5 text-[#947854]" />
                        {item.location}
                      </span>
                      <span className="hidden md:inline-flex items-center gap-1.5 text-[#646770]">
                        <Calendar className="w-3.5 h-3.5 text-[#947854]" />
                        {item.period}
                      </span>
                    </div>
                  </div>

                  {/* Overview */}
                  <p className="text-xs sm:text-sm text-[#595C62] leading-relaxed font-sans mb-5">
                    {item.overview}
                  </p>

                  {/* Documented Responsibilities / Achievements */}
                  <div className="pt-4 border-t border-[#E2DDD4] space-y-2.5">
                    {item.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2.5 text-xs text-[#595C62] leading-relaxed">
                        <span className="text-[#947854] text-sm leading-none shrink-0 mt-0.5">
                          ◉
                        </span>
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
