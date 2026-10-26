"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Briefcase,
  Building2,
  Compass,
  ArrowRight,
  Layers,
  X,
  Sparkles,
  CheckCircle,
} from "lucide-react";

export type PersonaType = "recruiter" | "client" | "visitor" | "all";

interface IdentitySelectorProps {
  onSelectPersona: (persona: PersonaType) => void;
  onClose?: () => void;
  canClose?: boolean;
}

export default function IdentitySelector({
  onSelectPersona,
  onClose,
  canClose = false,
}: IdentitySelectorProps) {
  const [hoveredCard, setHoveredCard] = useState<PersonaType | null>(null);
  const [selectedCard, setSelectedCard] = useState<PersonaType | null>(null);
  const [mousePos, setMousePos] = useState<{ [key: string]: { x: number; y: number; rotX: number; rotY: number } }>({});

  // Support Escape key to go back/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && canClose && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canClose, onClose]);

  const handleSelect = (persona: PersonaType) => {
    setSelectedCard(persona);
    setTimeout(() => {
      onSelectPersona(persona);
    }, 450);
  };

  // 3D Tilt calculation based on mouse position relative to each card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: PersonaType) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -9; // Max 9 deg tilt
    const rotY = ((x - centerX) / centerX) * 9;

    setMousePos((prev) => ({
      ...prev,
      [id]: { x, y, rotX, rotY },
    }));
  };

  const handleMouseLeave = (id: PersonaType) => {
    setHoveredCard(null);
    setMousePos((prev) => ({
      ...prev,
      [id]: { x: 0, y: 0, rotX: 0, rotY: 0 },
    }));
  };

  const personas = [
    {
      id: "recruiter" as PersonaType,
      title: "Recruiter",
      subtitle: "Experience. Leadership. Impact.",
      description:
        "Explore my career journey, construction leadership, professional achievements, and technical expertise.",
      cta: "EXPLORE MY WORLD",
      icon: Briefcase,
      image: "/portrait-saket-award.png",
      accent: "#D4AF37", // Warm Gold
      accentBg: "rgba(212, 175, 55, 0.16)",
      glowClass: "from-[#D4AF37]/25 to-transparent",
      badge: "9+ Yrs · ₹700Cr+ Portfolio",
      highlights: [
        "Varun Beverages · Aamor Inox · SOBHA",
        "Lean Six Sigma Green Belt (LSSGB)",
        "Zero-Rework Quality Audits",
      ],
    },
    {
      id: "client" as PersonaType,
      title: "Client",
      subtitle: "Projects. Execution. Quality.",
      description:
        "Discover my experience in luxury residential construction, farmhouse projects, premium interiors, and project execution.",
      cta: "EXPLORE MY WORLD",
      icon: Building2,
      image: "/projects/aamor-farmhouse-facade.jpg",
      accent: "#FF7A3D", // Warm Bronze/Amber
      accentBg: "rgba(255, 122, 61, 0.16)",
      glowClass: "from-[#FF7A3D]/25 to-transparent",
      badge: "Luxury Farmhouses & High-Rise",
      highlights: [
        "Turnkey Estate Construction",
        "Italian Marble & Bespoke Joinery",
        "Strict Schedule & Budget Governance",
      ],
    },
    {
      id: "visitor" as PersonaType,
      title: "Visitor",
      subtitle: "The story. The work. The journey.",
      description:
        "Explore my professional story, career progression, selected projects, and the experience behind my work.",
      cta: "EXPLORE MY WORLD",
      icon: Compass,
      image: "/projects/sobha-city-tower-1.jpg",
      accent: "#60A5FA", // Slate Ice Blue
      accentBg: "rgba(96, 165, 250, 0.16)",
      glowClass: "from-[#60A5FA]/25 to-transparent",
      badge: "The Narrative & Craftsmanship",
      highlights: [
        "Architectural Vision & Execution",
        "Pan-India Project Dossier",
        "Interactive 3D Rotary Showcase",
      ],
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="identity-heading"
      className="fixed inset-0 z-50 bg-[#07080B]/98 backdrop-blur-2xl text-white flex flex-col justify-between overflow-y-auto px-6 py-8 sm:p-12 animate-fade-in select-none"
    >
      {/* Ambient Radial Spotlight in Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.25) 0%, rgba(7, 8, 11, 0) 65%)`,
        }}
      />

      {/* Top Bar with Optional Close / Back Control */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-[11px] font-sans uppercase tracking-[0.2em] text-[#D4AF37] shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Curated Perspectives</span>
        </div>

        {canClose && onClose && (
          <button
            onClick={onClose}
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 hover:text-white transition-all cursor-pointer shadow-lg"
            aria-label="Return to previous screen"
          >
            <span className="font-sans text-[11px] uppercase tracking-wider hidden sm:inline">Back</span>
            <X className="w-4 h-4 text-white/80 group-hover:rotate-90 transition-transform" />
          </button>
        )}
      </div>

      {/* Center Section: Master Question & 3D Tilt Card Grid */}
      <div className="relative z-10 max-w-6xl mx-auto w-full my-auto py-8 text-center flex flex-col items-center">
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-6 h-[1px] bg-[#D4AF37]" />
          <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#D4AF37] font-medium">
            Identity Architecture
          </span>
          <span className="w-6 h-[1px] bg-[#D4AF37]" />
        </div>

        {/* Master Headline */}
        <h2
          id="identity-heading"
          className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.08] mb-3 max-w-3xl text-balance"
        >
          Before we begin, what brings you here?
        </h2>

        {/* Supporting Subtext */}
        <p className="font-sans text-xs sm:text-base text-[#9FA3B0] max-w-xl mx-auto mb-10 sm:mb-14 text-balance">
          Choose the perspective that matters to you for a tailored narrative.
        </p>

        {/* 3 Interactive 3D Perspective Tilt Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-5xl"
          style={{ perspective: "1200px" }}
        >
          {personas.map((persona, idx) => {
            const isHovered = hoveredCard === persona.id;
            const isSelected = selectedCard === persona.id;
            const isAnyHovered = hoveredCard !== null;
            const isDimmed = isAnyHovered && !isHovered;

            const Icon = persona.icon;
            const pos = mousePos[persona.id] || { x: 0, y: 0, rotX: 0, rotY: 0 };

            return (
              <div
                key={persona.id}
                onMouseEnter={() => setHoveredCard(persona.id)}
                onMouseMove={(e) => handleMouseMove(e, persona.id)}
                onMouseLeave={() => handleMouseLeave(persona.id)}
                onClick={() => handleSelect(persona.id)}
                className={`relative flex flex-col justify-between text-left rounded-3xl border bg-[#111319] overflow-hidden cursor-pointer group will-change-transform ${
                  isSelected
                    ? "scale-105 border-white ring-4 ring-white/60 shadow-[0_0_90px_rgba(255,255,255,0.45)]"
                    : isHovered
                    ? "shadow-2xl border-white/40"
                    : "border-white/10 shadow-xl"
                } ${isDimmed ? "opacity-60 scale-[0.98]" : "opacity-100"}`}
                style={{
                  minHeight: "450px",
                  transform: isSelected
                    ? "scale(1.05) translateZ(40px)"
                    : isHovered
                    ? `perspective(1200px) rotateX(${pos.rotX}deg) rotateY(${pos.rotY}deg) scale3d(1.04, 1.04, 1.04) translateZ(25px)`
                    : "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
                  transition: isHovered
                    ? "transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease"
                    : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease",
                  animationDelay: `${idx * 120}ms`,
                }}
              >
                {/* Dynamic Cursor Spotlight Sheen */}
                {isHovered && (
                  <div
                    className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle 240px at ${pos.x}px ${pos.y}px, ${persona.accent}30, transparent 75%)`,
                    }}
                  />
                )}

                {/* Background Image with Cinematic Architectural Vignette */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={persona.image}
                    alt={persona.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className={`object-cover transition-transform duration-700 ease-out filter contrast-[1.05] ${
                      isHovered ? "scale-110" : "scale-100"
                    }`}
                  />
                  {/* Subtle Grain & Atmospheric Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-[#0A0C10]/85 to-[#0A0C10]/45" />
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 0%, ${persona.accent} 0%, transparent 70%)`,
                    }}
                  />
                </div>

                {/* Card Top: Persona Icon, Badge, and Title */}
                <div className="relative z-10 p-6 sm:p-7">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="w-11 h-11 rounded-2xl flex items-center justify-center border shadow-lg transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: persona.accentBg,
                        borderColor: `${persona.accent}50`,
                        color: persona.accent,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </span>

                    <span
                      className="text-[10px] uppercase tracking-[0.18em] font-sans font-medium px-2.5 py-1 rounded-full border backdrop-blur-md"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.6)",
                        borderColor: `${persona.accent}55`,
                        color: persona.accent,
                      }}
                    >
                      {persona.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-1 tracking-tight">
                    {persona.title}
                  </h3>

                  <p
                    className="font-sans text-xs uppercase tracking-[0.16em] font-semibold mb-3"
                    style={{ color: persona.accent }}
                  >
                    {persona.subtitle}
                  </p>

                  <p className="font-sans text-xs text-[#B5B9C8] leading-relaxed line-clamp-3">
                    {persona.description}
                  </p>
                </div>

                {/* Card Bottom: Highlights & Signature "EXPLORE MY WORLD" CTA */}
                <div className="relative z-10 p-6 sm:p-7 pt-0 border-t border-white/10 mt-4">
                  {/* Persona Feature Bullets */}
                  <ul className="space-y-1.5 my-4">
                    {persona.highlights.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        className="flex items-center gap-2 text-[11px] text-[#A6ABB9] font-sans"
                      >
                        <CheckCircle
                          className="w-3 h-3 shrink-0"
                          style={{ color: persona.accent }}
                        />
                        <span className="truncate">{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Primary "EXPLORE MY WORLD" CTA Button */}
                  <button
                    className="w-full inline-flex items-center justify-between px-5 py-3.5 rounded-xl text-xs uppercase tracking-[0.18em] font-bold transition-all duration-300 shadow-lg cursor-pointer"
                    style={{
                      backgroundColor: isHovered ? persona.accent : "rgba(255,255,255,0.08)",
                      color: isHovered ? (persona.id === "visitor" ? "#0A0B0E" : "#FFFFFF") : "#FFFFFF",
                      border: isHovered ? `1px solid ${persona.accent}` : "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    <span>{persona.cta}</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Complete Portfolio Bypass Option */}
        <div className="mt-12 sm:mt-14 pt-6 border-t border-white/10 w-full max-w-2xl flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
          <span className="text-xs text-[#8E93A3] font-sans">
            Prefer to explore without a filter?
          </span>
          <button
            onClick={() => handleSelect("all")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/20 text-xs font-sans uppercase tracking-[0.18em] text-[#EDEAE3] hover:text-white transition-all cursor-pointer shadow-lg hover:scale-[1.02]"
          >
            <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Explore the Complete Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      </div>

      {/* Bottom Legal / Trust Watermark */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/35 font-mono pt-4">
        <span>EST. 2015 · PAN-INDIA CIVIL GOVERNANCE</span>
        <span>Switch perspectives or go back anytime</span>
      </div>
    </div>
  );
}
