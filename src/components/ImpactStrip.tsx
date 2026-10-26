import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function ImpactStrip() {
  return (
    <section id="impact" className="relative z-20 bg-[#F2EFE9] border-y border-[#E2DDD4]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-[#E2DDD4]">
          {PORTFOLIO_DATA.impactStats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col justify-between ${
                idx !== 0 ? "pt-6 md:pt-0 md:pl-8 lg:pl-12" : ""
              }`}
            >
              <div>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1B1E] tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs uppercase tracking-[0.16em] text-[#947854] font-medium font-sans">
                    {stat.unit}
                  </span>
                </div>
                <h3 className="font-sans text-xs sm:text-sm uppercase tracking-[0.12em] font-medium text-[#1A1B1E] mb-1.5">
                  {stat.label}
                </h3>
              </div>
              <p className="text-xs text-[#646770] leading-relaxed font-sans">
                {stat.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Governance note ensuring transparency */}
        <div className="mt-8 pt-6 border-t border-[#E2DDD4]/60 flex items-center justify-between flex-wrap gap-4 text-[11px] text-[#646770] font-sans">
          <span>Documented career milestones across luxury residential, high-rise, and interior developments.</span>
          <span className="text-[#947854] uppercase tracking-wider font-medium">Documented Industry Performance</span>
        </div>
      </div>
    </section>
  );
}
