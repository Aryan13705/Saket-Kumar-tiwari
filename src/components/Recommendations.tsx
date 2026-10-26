"use client";

import React, { useState } from "react";
import {
  Quote,
  Calendar,
  Building,
  ArrowUpRight,
  UserCheck,
  SendHorizontal,
  FolderGit2,
} from "lucide-react";
import {
  Recommendation,
  getRecommendationsByType,
} from "@/data/recommendations";

interface RecommendationsProps {
  onSelectProjectById?: (projectId: string) => void;
  compact?: boolean;
}

export default function Recommendations({
  onSelectProjectById,
  compact = false,
}: RecommendationsProps) {
  const [activeTab, setActiveTab] = useState<"received" | "given">("received");

  const receivedRecommendations = getRecommendationsByType("received");
  const givenRecommendations = getRecommendationsByType("given");

  const currentList =
    activeTab === "received" ? receivedRecommendations : givenRecommendations;

  // Generate consistent initials for the visual monogram badge
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <section
      id="recommendations"
      aria-label="Professional Recommendations & Project Testimonials"
      className={`${compact ? "py-16 lg:py-20" : "py-24 lg:py-32"} bg-[#FBF9F5] border-t border-[#E2DDD4]`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="w-8 h-[1px] bg-[#947854]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#947854] font-medium">
                PEER &amp; CLIENT TESTIMONIALS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1B1E] tracking-tight mb-3">
              Recommendations
            </h2>
            <p className="text-xs sm:text-sm text-[#646770] font-sans leading-relaxed">
              What colleagues, leaders, and project collaborators say about working with me.
            </p>
          </div>

          {/* Tab Controls: Received vs. Given */}
          <div
            role="tablist"
            aria-label="Recommendation Category"
            className="inline-flex items-center p-1 bg-[#F2EFE9] border border-[#E2DDD4] rounded-lg self-start md:self-auto"
          >
            <button
              role="tab"
              id="tab-received"
              aria-selected={activeTab === "received"}
              aria-controls="panel-received"
              onClick={() => setActiveTab("received")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 text-xs font-sans uppercase tracking-[0.12em] font-medium transition-all duration-200 cursor-pointer rounded-md ${
                activeTab === "received"
                  ? "bg-[#1A1B1E] text-white shadow-sm"
                  : "text-[#646770] hover:text-[#1A1B1E]"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Received</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === "received"
                    ? "bg-[#947854] text-white"
                    : "bg-[#E2DDD4] text-[#646770]"
                }`}
              >
                {receivedRecommendations.length}
              </span>
            </button>

            <button
              role="tab"
              id="tab-given"
              aria-selected={activeTab === "given"}
              aria-controls="panel-given"
              onClick={() => setActiveTab("given")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 text-xs font-sans uppercase tracking-[0.12em] font-medium transition-all duration-200 cursor-pointer rounded-md ${
                activeTab === "given"
                  ? "bg-[#1A1B1E] text-white shadow-sm"
                  : "text-[#646770] hover:text-[#1A1B1E]"
              }`}
            >
              <SendHorizontal className="w-3.5 h-3.5" />
              <span>Given</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === "given"
                    ? "bg-[#947854] text-white"
                    : "bg-[#E2DDD4] text-[#646770]"
                }`}
              >
                {givenRecommendations.length}
              </span>
            </button>
          </div>
        </div>

        {/* Tab Context Subtitle */}
        <div className="mb-8 flex items-center justify-between text-xs text-[#646770] font-sans border-b border-[#E2DDD4] pb-3">
          <span>
            {activeTab === "received"
              ? "Verified testimonials written by executive leaders, founders, and project directors on LinkedIn."
              : "Professional endorsements written by Saket Kumar Tiwari for trusted team members and collaborators."}
          </span>
          <span className="hidden sm:inline text-[11px] uppercase tracking-wider text-[#947854]">
            Documented on LinkedIn
          </span>
        </div>

        {/* Recommendation Cards Grid */}
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {currentList.map((item: Recommendation, idx: number) => {
            const initials = getInitials(item.name);

            return (
              <article
                key={item.id}
                className="bg-[#FAF7F2] p-7 sm:p-8 border border-[#E2DDD4] hover:border-[#947854] transition-all duration-300 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] group hover:-translate-y-0.5"
              >
                <div>
                  {/* Top Header: Monogram Avatar, Name & Date */}
                  <div className="flex items-start justify-between gap-3 mb-5 pb-5 border-b border-[#E2DDD4]">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-full bg-[#1A1B1E] text-[#D4AF37] font-serif text-sm font-medium flex items-center justify-center border border-[#947854]/40 shadow-sm shrink-0">
                        {initials}
                      </div>
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl text-[#1A1B1E] font-medium leading-tight group-hover:text-[#947854] transition-colors">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 text-[11px] text-[#646770] font-sans mt-0.5">
                          <Calendar className="w-3 h-3 text-[#947854]" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>

                    <Quote className="w-6 h-6 text-[#947854]/30 shrink-0 group-hover:text-[#947854]/60 transition-colors" />
                  </div>

                  {/* Professional Designation */}
                  <div className="mb-4">
                    <p className="text-xs text-[#595C62] font-sans leading-relaxed line-clamp-3">
                      {item.designation}
                    </p>
                  </div>

                  {/* Relationship Context Tag */}
                  {item.relationship && (
                    <div className="mb-5 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F2EFE9] border border-[#E2DDD4] text-[10px] uppercase tracking-wider text-[#646770] font-medium">
                      <Building className="w-3 h-3 text-[#947854]" />
                      <span>{item.relationship}</span>
                    </div>
                  )}

                  {/* Testimonial Quote Text */}
                  <div className="relative pl-3 border-l-2 border-[#947854]/40 mb-6">
                    <p className="text-xs sm:text-sm text-[#1A1B1E] leading-relaxed font-sans whitespace-pre-line italic font-normal">
                      &ldquo;{item.text}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Card Footer: Excerpt Notification & Project Attribution */}
                <div className="pt-4 border-t border-[#E2DDD4]/70 space-y-2.5">
                  {/* Truncation / Excerpt Notice */}
                  {item.isExcerpt && (
                    <div className="text-[10px] text-[#947854] font-sans italic flex items-center gap-1 bg-[#947854]/10 p-2 border border-[#947854]/25">
                      <span>* Note: Original LinkedIn recommendation continues beyond captured excerpt.</span>
                    </div>
                  )}

                  {/* Associated Verified Project Link */}
                  {item.projectId && item.projectName && (
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#646770] font-sans flex items-center gap-1">
                        <FolderGit2 className="w-3 h-3 text-[#947854]" />
                        <span>Related Project:</span>
                      </span>
                      {onSelectProjectById ? (
                        <button
                          onClick={() => onSelectProjectById(item.projectId!)}
                          className="text-[#947854] hover:text-[#1A1B1E] font-medium text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span className="underline underline-offset-2">{item.projectName}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <a
                          href="#projects"
                          className="text-[#947854] hover:text-[#1A1B1E] font-medium text-xs inline-flex items-center gap-1 transition-colors"
                        >
                          <span className="underline underline-offset-2">{item.projectName}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}

                  {/* Source Stamp */}
                  <div className="flex items-center justify-between text-[10px] text-[#9B9EAA] font-mono pt-1">
                    <span>SOURCE: LINKEDIN</span>
                    <span>ENTRY 0{idx + 1}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
