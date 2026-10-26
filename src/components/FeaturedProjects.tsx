"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  MapPin,
  Calendar,
  Building,
  ChevronLeft,
  ChevronRight,
  Orbit,
  LayoutGrid,
} from "lucide-react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolio";
import ProjectModal from "./ProjectModal";
import Projects3DRotaryCarousel from "./Projects3DRotaryCarousel";

export default function FeaturedProjects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<"3d" | "rail">("3d");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sync browser back navigation with modal state
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== "undefined" && !window.location.hash.startsWith("#project-")) {
        setActiveProject(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSelectProject = (project: Project) => {
    setActiveProject(project);
    try {
      if (typeof window !== "undefined" && !window.location.hash.startsWith("#project-")) {
        window.history.pushState({ modalProject: project.id }, "", "#project-" + project.id);
      }
    } catch {
      // Ignored
    }
  };

  const handleCloseProject = () => {
    setActiveProject(null);
    try {
      if (typeof window !== "undefined" && window.location.hash.startsWith("#project-")) {
        window.history.back();
      }
    } catch {
      // Ignored
    }
  };

  const categories = [
    "All",
    "Luxury Residential",
    "High-Rise Development",
    "Luxury Interiors",
    "Hospitality",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === selectedCategory);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -420, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 420, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="py-24 lg:py-32 bg-[#FBF9F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Left/Right Scroll Controls & View Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="w-8 h-[1px] bg-[#947854]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#947854] font-medium">
                PORTFOLIO OF WORKS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1B1E] tracking-tight">
              Documented Projects
            </h2>
          </div>

          {/* View Switcher & Rail Controls */}
          <div className="flex items-center gap-3">
            {/* View Mode Toggle: 3D Orbit vs Editorial Rail */}
            <div className="inline-flex items-center p-1 bg-[#F2EFE9] border border-[#E2DDD4] rounded-lg">
              <button
                onClick={() => setViewMode("3d")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                  viewMode === "3d"
                    ? "bg-[#1A1B1E] text-white font-medium shadow-sm"
                    : "text-[#646770] hover:text-[#1A1B1E]"
                }`}
                title="3D Rotating Cylinder View"
              >
                <Orbit className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">3D Rotation</span>
              </button>
              <button
                onClick={() => setViewMode("rail")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                  viewMode === "rail"
                    ? "bg-[#1A1B1E] text-white font-medium shadow-sm"
                    : "text-[#646770] hover:text-[#1A1B1E]"
                }`}
                title="Classic Horizontal Rail View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Classic Rail</span>
              </button>
            </div>

            {viewMode === "rail" && (
              <div className="flex items-center gap-2">
                <button
                  onClick={scrollLeft}
                  aria-label="Scroll projects left"
                  className="p-2.5 bg-[#F2EFE9] hover:bg-[#947854] text-[#1A1B1E] hover:text-white border border-[#E2DDD4] transition-colors focus:outline-none cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={scrollRight}
                  aria-label="Scroll projects right"
                  className="p-2.5 bg-[#F2EFE9] hover:bg-[#947854] text-[#1A1B1E] hover:text-white border border-[#E2DDD4] transition-colors focus:outline-none cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-[#E2DDD4] scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 text-xs uppercase tracking-[0.14em] font-sans transition-all whitespace-nowrap focus:outline-none cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#1A1B1E] text-white font-medium"
                  : "bg-transparent text-[#646770] hover:text-[#1A1B1E] hover:bg-[#F2EFE9]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Primary View: 3D Rotary Cylindrical Gallery */}
        {viewMode === "3d" && (
          <div className="mb-4 animate-fade-in">
            <Projects3DRotaryCarousel
              projects={filteredProjects}
              onSelectProject={(project) => handleSelectProject(project)}
            />
          </div>
        )}
      </div>

      {/* Secondary View: Horizontal Scrollable Projects Showcase Rail */}
      {viewMode === "rail" && (
        <div className="w-full px-6 sm:px-8 lg:px-12 animate-fade-in">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 sm:gap-8 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "thin" }}
        >
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => handleSelectProject(project)}
              className="group cursor-pointer flex-shrink-0 w-[310px] sm:w-[380px] lg:w-[420px] snap-start bg-[#FAF7F2] border border-[#E2DDD4] hover:border-[#947854] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm"
            >
              {/* Project Image Container */}
              <div className="relative aspect-[16/10] w-full bg-[#EDEAE3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 310px, (max-width: 1024px) 380px, 420px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-75 group-hover:opacity-50 transition-opacity" />

                {/* Top Overlay Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.16em] font-sans font-medium px-2.5 py-0.5 bg-[#1A1B1E]/85 backdrop-blur-sm text-white">
                    {project.category}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1A1B1E] group-hover:bg-[#947854] group-hover:text-white transition-colors shadow-sm">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Concise Content Block (No heavy text clutter) */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#646770] font-sans mb-2">
                    <span className="flex items-center gap-1 text-[#1A1B1E] font-medium">
                      <Building className="w-3 h-3 text-[#947854]" />
                      {project.organization}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#947854]" />
                      {project.location}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#1A1B1E] font-medium leading-snug group-hover:text-[#947854] transition-colors mb-1">
                    {project.title}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#947854] font-medium font-sans mb-2">
                    Role: {project.role}
                  </p>

                  {/* Sub-projects Indicator (e.g. 1, 2, 3, 4) */}
                  {project.subProjects && project.subProjects.length > 0 && (
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-[10px] uppercase tracking-wider text-[#947854] font-medium mr-1 font-sans">
                        Separate Projects:
                      </span>
                      {project.subProjects.map((sp) => (
                        <span
                          key={sp.id}
                          className="w-5 h-5 rounded-full bg-[#947854]/15 border border-[#947854]/30 text-[#947854] text-[10px] font-mono flex items-center justify-center font-semibold"
                          title={sp.title}
                        >
                          {sp.number}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-[#595C62] leading-relaxed font-sans line-clamp-2">
                    {project.summary}
                  </p>
                </div>

                {/* Action Link */}
                <div className="pt-4 mt-4 border-t border-[#E2DDD4] flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-[#646770] font-sans">
                    <Calendar className="w-3 h-3 text-[#947854]" />
                    {project.period}
                  </span>
                  <span className="text-[#1A1B1E] group-hover:text-[#947854] font-medium tracking-wider uppercase text-[11px] inline-flex items-center gap-1 transition-colors">
                    <span>View Case Study</span>
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      )}

      {/* Interactive Modal for Full Technical Details */}
      <ProjectModal key={activeProject?.id} project={activeProject} onClose={handleCloseProject} />
    </section>
  );
}
