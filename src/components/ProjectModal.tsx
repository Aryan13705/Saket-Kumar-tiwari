"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, MapPin, Building, Calendar, CheckCircle2, Layers, Quote, ArrowUpRight } from "lucide-react";
import { Project } from "@/data/portfolio";
import { getRecommendationsForProject } from "@/data/recommendations";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSubProjectIndex, setActiveSubProjectIndex] = useState(0);
  const [prevProjectId, setPrevProjectId] = useState(project?.id);

  if (project?.id !== prevProjectId) {
    setPrevProjectId(project?.id);
    setActiveImageIndex(0);
    setActiveSubProjectIndex(0);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentSubProject =
    project.subProjects && project.subProjects.length > 0
      ? project.subProjects[activeSubProjectIndex]
      : null;

  const activeGallery = currentSubProject?.gallery || project.gallery;

  const activeImage =
    activeGallery && activeGallery.length > 0
      ? activeGallery[activeImageIndex]?.url || (currentSubProject ? currentSubProject.image : project.image)
      : currentSubProject ? currentSubProject.image : project.image;

  const activeCaption =
    activeGallery && activeGallery.length > 0
      ? activeGallery[activeImageIndex]?.caption || (currentSubProject ? currentSubProject.imageCaption : project.imageCaption)
      : currentSubProject ? currentSubProject.imageCaption : project.imageCaption;

  const displayTitle = currentSubProject ? currentSubProject.title : project.title;
  const displayLocation = currentSubProject ? currentSubProject.location : project.location;
  const displaySummary = currentSubProject ? currentSubProject.summary : project.summary;
  const displayMetrics = currentSubProject?.metrics || project.metrics;
  const displayHighlights = currentSubProject?.highlights || project.highlights;
  const projectRecommendations = project ? getRecommendationsForProject(project.id) : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#FBF9F5] border border-[#E2DDD4] shadow-2xl flex flex-col overflow-hidden text-[#1A1B1E]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Title & Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2DDD4] bg-[#F2EFE9]/90 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.16em] font-sans font-medium px-2.5 py-0.5 bg-[#947854]/10 text-[#947854] border border-[#947854]/30">
              {project.category}
            </span>
            {project.subProjects && project.subProjects.length > 0 && (
              <span className="text-xs text-[#947854] font-medium font-sans flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Project {activeSubProjectIndex + 1} of {project.subProjects.length}
              </span>
            )}
            <span className="text-xs text-[#646770] font-sans hidden sm:inline">
              Case Study &amp; Technical Execution
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#1A1B1E] hover:text-[#947854] hover:bg-[#E8E4DC] transition-colors focus:outline-none cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto px-6 sm:px-10 py-8 space-y-7">
          {/* Main Title & Organization Banner */}
          <div>
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#646770] font-sans mb-3">
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#947854]" />
                <strong className="text-[#1A1B1E]">{project.organization}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#947854]" />
                {displayLocation}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#947854]" />
                {project.period}
              </span>
            </div>

            <h2 id="modal-project-title" className="font-serif text-2xl sm:text-4xl text-[#1A1B1E] font-normal tracking-tight mb-1.5">
              {displayTitle}
            </h2>
            <p className="text-xs uppercase tracking-[0.14em] text-[#947854] font-medium font-sans">
              Role: {project.role}
            </p>
          </div>

          {/* Sub-Projects (1, 2, 3, 4) Tab Switcher under the one company template */}
          {project.subProjects && project.subProjects.length > 0 && (
            <div className="bg-[#F2EFE9] border border-[#E2DDD4] p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-[#947854]">
                  Projects Under {project.organization} ({project.subProjects.length} Assets)
                </span>
                <span className="text-[11px] text-[#646770] font-sans">
                  Select 1, 2, 3, 4
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {project.subProjects.map((sp, sIdx) => {
                  const isSelected = activeSubProjectIndex === sIdx;
                  return (
                    <button
                      key={sp.id}
                      onClick={() => {
                        setActiveSubProjectIndex(sIdx);
                        setActiveImageIndex(0);
                      }}
                      className={`flex flex-col text-left p-2.5 border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#1A1B1E] text-white border-[#1A1B1E] shadow-sm"
                          : "bg-[#FAF7F2] text-[#1A1B1E] border-[#E2DDD4] hover:border-[#947854]/60"
                      }`}
                    >
                      <span className={`text-[10px] uppercase tracking-widest font-mono font-semibold ${isSelected ? "text-[#D4AF37]" : "text-[#947854]"}`}>
                        Project 0{sp.number}
                      </span>
                      <span className="text-xs font-medium font-serif truncate mt-0.5">
                        {sp.assetId || sp.title.replace(/^Project \d+:\s*/, "")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Project Image Banner */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] w-full bg-[#EDEAE3] border border-[#E2DDD4] overflow-hidden">
              <Image
                src={activeImage}
                alt={displayTitle}
                fill
                sizes="(max-width: 1024px) 100vw, 850px"
                className="object-cover transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-white text-[11px] font-sans leading-tight">
                {activeCaption}
              </div>
            </div>

            {/* Gallery Thumbnail Selector (when multiple images are available) */}
            {activeGallery && activeGallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1">
                {activeGallery.map((item, gIdx) => (
                  <button
                    key={gIdx}
                    onClick={() => setActiveImageIndex(gIdx)}
                    className={`group flex items-center gap-2 p-1.5 border transition-all text-left cursor-pointer shrink-0 ${
                      activeImageIndex === gIdx
                        ? "border-[#947854] bg-[#EDE4D8]/50 shadow-sm"
                        : "border-[#E2DDD4] bg-[#FAF7F2] hover:border-[#947854]/50"
                    }`}
                  >
                    <div className="relative w-12 h-10 bg-[#EDEAE3] overflow-hidden shrink-0">
                      <Image
                        src={item.url}
                        alt={item.caption}
                        fill
                        sizes="60px"
                        className="object-cover"
                      />
                    </div>
                    <div className="pr-2">
                      <span className="text-[10px] uppercase tracking-wider font-sans font-medium block text-[#1A1B1E] truncate max-w-[130px]">
                        {item.title ||
                          (item.type === "site"
                            ? "Site Photo"
                            : item.type === "render"
                            ? "3D Elevation"
                            : item.type === "plan"
                            ? "Floor Plan"
                            : `View 0${gIdx + 1}`)}
                      </span>
                      <span className="text-[9px] text-[#646770] font-sans">
                        0{gIdx + 1}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Metrics Strip if available */}
          {displayMetrics && displayMetrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {displayMetrics.map((m) => (
                <div key={m.label} className="p-3.5 bg-[#F2EFE9] border border-[#E2DDD4]">
                  <span className="text-[10px] uppercase tracking-wider text-[#646770] block mb-1">
                    {m.label}
                  </span>
                  <span className="font-serif text-lg sm:text-xl text-[#1A1B1E] font-medium">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Overview Narrative */}
          <div>
            <h3 className="font-serif text-xl text-[#1A1B1E] mb-2">Project Overview</h3>
            <p className="text-xs sm:text-sm text-[#595C62] leading-relaxed font-sans font-normal">
              {displaySummary}
            </p>
          </div>

          {/* Documented Highlights / Responsibilities */}
          {displayHighlights && displayHighlights.length > 0 && (
            <div>
              <h3 className="font-serif text-xl text-[#1A1B1E] mb-3">
                {currentSubProject ? "Key Project Highlights & Scope" : "Role & Responsibilities"}
              </h3>
              <ul className="space-y-2">
                {displayHighlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#595C62] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#947854] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical Execution & Standards */}
          <div className="pt-6 border-t border-[#E2DDD4]">
            <h3 className="font-serif text-xl text-[#1A1B1E] mb-3.5">Execution Approach &amp; Standards</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {project.technicalExecution.map((tech, idx) => (
                <div key={idx} className="p-3.5 bg-[#FAF7F2] border border-[#E2DDD4] text-xs text-[#595C62] leading-relaxed">
                  <span className="text-[10px] uppercase tracking-widest text-[#947854] font-medium block mb-1">
                    Standard 0{idx + 1}
                  </span>
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Verified Project Client & Leadership Recommendation */}
          {projectRecommendations.length > 0 && (
            <div className="pt-6 border-t border-[#E2DDD4]">
              <div className="p-5 sm:p-6 bg-[#FAF7F2] border border-[#947854]/40 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#947854] font-medium font-sans">
                    <Quote className="w-3.5 h-3.5 text-[#947854]" />
                    <span>Verified Project Testimonial</span>
                  </div>
                  <span className="text-[10px] text-[#646770] font-mono">
                    {projectRecommendations[0].date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#1A1B1E] italic leading-relaxed font-sans mb-4 whitespace-pre-line border-l-2 border-[#947854]/50 pl-3">
                  &ldquo;{projectRecommendations[0].text}&rdquo;
                </p>

                {projectRecommendations[0].isExcerpt && (
                  <p className="text-[10px] text-[#947854] font-sans italic mb-3">
                    * Note: Original LinkedIn recommendation continues beyond captured excerpt.
                  </p>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#E2DDD4]">
                  <div>
                    <h4 className="font-serif text-base text-[#1A1B1E] font-medium">
                      {projectRecommendations[0].name}
                    </h4>
                    <p className="text-[11px] text-[#595C62] font-sans">
                      {projectRecommendations[0].designation}
                    </p>
                  </div>

                  <a
                    href="#recommendations"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-xs text-[#947854] hover:text-[#1A1B1E] font-medium tracking-wider uppercase transition-colors shrink-0"
                  >
                    <span>View All Recommendations</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#F2EFE9] border-t border-[#E2DDD4] flex items-center justify-between">
          <span className="text-xs text-[#646770] font-sans">
            Saket Kumar Tiwari · Civil Engineering Portfolio
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1A1B1E] hover:bg-[#947854] text-white text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
}
