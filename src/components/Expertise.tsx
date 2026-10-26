import React from "react";
import {
  HardHat,
  CalendarDays,
  ShieldCheck,
  Calculator,
  Truck,
  Home,
  Building2,
  Paintbrush,
  Users,
  FileCheck,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function Expertise() {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    "construction-execution": HardHat,
    "project-planning": CalendarDays,
    "qa-qc": ShieldCheck,
    "cost-boq": Calculator,
    "procurement-vendor": Truck,
    "luxury-residential": Home,
    "high-rise": Building2,
    "interior-fitouts": Paintbrush,
    "stakeholder-management": Users,
    "handover-documentation": FileCheck,
  };

  return (
    <section id="expertise" className="py-20 lg:py-28 bg-[#F2EFE9] border-t border-[#E2DDD4]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="w-8 h-[1px] bg-[#947854]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#947854] font-medium">
                DISCIPLINE &amp; COMPETENCIES
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1B1E] tracking-tight">
              Fields of Engineering Expertise
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#646770] max-w-md font-sans leading-relaxed">
            Core competencies across on-ground technical execution, quality governance, and commercial project leadership.
          </p>
        </div>

        {/* 10 Expertise Areas Grid — Streamlined, Clean & Architectural */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {PORTFOLIO_DATA.expertise.map((item, index) => {
            const Icon = iconMap[item.id] || ShieldCheck;
            const indexStr = String(index + 1).padStart(2, "0");

            return (
              <div
                key={item.id}
                className="group bg-[#FBF9F5] p-6 sm:p-7 border border-[#E2DDD4] hover:border-[#947854] transition-all duration-300 flex flex-col justify-between shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
              >
                <div>
                  {/* Top Bar with Number & Line Icon */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2DDD4]/60">
                    <span className="text-xs font-serif text-[#947854] tracking-widest font-medium">
                      {indexStr}
                    </span>
                    <div className="p-2 bg-[#F2EFE9] text-[#1A1B1E] group-hover:text-[#947854] group-hover:bg-[#EDE4D8] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#947854] font-sans font-medium block mb-1.5">
                    {item.category}
                  </span>

                  <h3 className="font-serif text-lg sm:text-xl text-[#1A1B1E] font-medium mb-2.5 group-hover:text-[#947854] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#595C62] leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
