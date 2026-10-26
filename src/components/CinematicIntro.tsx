"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, FastForward } from "lucide-react";

interface CinematicIntroProps {
  onComplete: () => void;
  onEnter?: () => void;
  onSkip?: () => void;
}

export default function CinematicIntro({ onComplete, onEnter, onSkip }: CinematicIntroProps) {
  // Initial state is deterministic across SSR and client to prevent hydration mismatch
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [scene, setScene] = useState<number>(1);

  // Track active timer IDs to cancel immediately upon Skip Intro
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Scenes in the 8-12 second cinematic sequence:
  // 1: Establishing architectural shot at dusk (0–2s)
  // 2: Blueprint linework & technical grid transition (2–4s)
  // 3: Sweeping beam of light revealing portrait (3–5.5s)
  // 4: Camera pullback to full portrait (5–7s)
  // 5: Film title typography & headline reveal (6.5–9s)
  // 6: ENTER MY WORLD CTA activation (9–12s)
  useEffect(() => {
    const checkMotion = setTimeout(() => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setIsReducedMotion(true);
        setScene(6);
      }
    }, 0);
    return () => clearTimeout(checkMotion);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    timersRef.current = [
      setTimeout(() => setScene(2), 1800),
      setTimeout(() => setScene(3), 3200),
      setTimeout(() => setScene(4), 5000),
      setTimeout(() => setScene(5), 6800),
      setTimeout(() => setScene(6), 8800),
    ];

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [isReducedMotion]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const handleEnter = () => {
    clearAllTimers();
    if (onEnter) {
      onEnter();
    } else {
      onComplete();
    }
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearAllTimers();
    if (onSkip) {
      onSkip();
    } else {
      onComplete();
    }
  };

  return (
    <div
      role="region"
      aria-label="Cinematic Personal Introduction"
      className="fixed inset-0 z-50 bg-[#06070A] text-white flex flex-col justify-between overflow-y-auto lg:overflow-hidden select-none"
    >
      {/* =========================================================================
          BACKGROUND ARCHITECTURAL CINEMATOGRAPHY
          Scene 1: Dusk architectural establishing shot with deep midnight shadows
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Photorealistic dusk architectural image with slow forward dolly */}
        <div
          className="absolute inset-0 transition-transform duration-[12000ms] ease-out will-change-transform"
          style={{
            transform: isReducedMotion
              ? "scale(1.02)"
              : scene <= 2
              ? "scale(1.12)"
              : "scale(1.03)",
          }}
        >
          <Image
            src="/projects/aamor-farmhouse-facade.jpg"
            alt="Luxury Architectural Estate at Dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.55] contrast-[1.12] saturate-[0.9]"
          />
        </div>

        {/* =========================================================================
            SCENE 2: BLUEPRINT-TO-REALITY TECHNICAL LINEWORK OVERLAY (2–4s)
            Precision CAD elevation lines, structural grid, and engineering callouts
            ========================================================================= */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            scene >= 2 && scene <= 4 ? "opacity-35" : scene > 4 ? "opacity-15" : "opacity-0"
          }`}
        >
          {/* Technical Drawing Grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.4) 1px, transparent 1px)`,
              backgroundSize: `44px 44px`,
            }}
          />

          {/* Blueprint Engineering Notation Elements */}
          <div className="absolute top-20 left-12 font-mono text-[10px] tracking-widest text-[#D4AF37]/80 uppercase space-y-1">
            <p>ELEVATION PROFILE: +14.200M</p>
            <p>STRUCTURAL FRAME: REINFORCED RCC</p>
            <p>COORDINATES: 28°28&apos;42&quot;N 77°02&apos;11&quot;E</p>
          </div>

          <div className="absolute bottom-24 right-12 font-mono text-[10px] tracking-widest text-[#D4AF37]/80 uppercase text-right space-y-1">
            <p>TOLERANCE: &plusmn;1.5MM SPEC</p>
            <p>QA/QC PROTOCOL: ZERO REWORK</p>
            <p>PROJECT: TURNKEY ESTATE EXECUTION</p>
          </div>
        </div>

        {/* =========================================================================
            SCENE 3: REALISTIC BEAM OF WARM LIGHT SWEEP (3–6s)
            Sweeps across the darkness like a film set luminaire
            ========================================================================= */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
            scene === 3 ? "opacity-75" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(105deg, transparent 20%, rgba(212, 175, 55, 0.18) 45%, rgba(255, 230, 180, 0.25) 50%, rgba(212, 175, 55, 0.18) 55%, transparent 80%)",
            transform: scene === 3 ? "translateX(100%)" : "translateX(-100%)",
            transition: "transform 2.4s cubic-bezier(0.2, 0.8, 0.3, 1), opacity 0.8s ease",
          }}
        />

        {/* Ambient Vignette & Cinema Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06070A] via-[#06070A]/60 to-[#06070A]/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#06070A]/65 to-[#06070A]" />
      </div>

      {/* Top Floating Brand & Skip Intro Bar */}
      <div className="relative z-30 max-w-7xl mx-auto w-full px-6 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[11px] font-sans uppercase tracking-[0.22em] text-[#D4AF37] shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span>Cinematic Introduction</span>
        </div>

        <button
          onClick={handleSkip}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-xs text-white/80 hover:text-white transition-all cursor-pointer shadow-xl hover:scale-105"
          aria-label="Skip introductory sequence"
        >
          <span className="font-sans text-[11px] uppercase tracking-wider">Skip Intro</span>
          <FastForward className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* =========================================================================
          CENTER STAGE: SAKET'S PORTRAIT & CINEMATIC PULLBACK (Scene 3, 4, 5)
          ========================================================================= */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto w-full px-6 sm:px-10 py-6 gap-8 lg:gap-14">
        {/* Left Column: Portrait Card with Pullback & Subtle Parallax */}
        <div
          className={`relative flex items-center justify-center transition-all duration-1000 ${
            scene >= 3 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_24px_90px_rgba(0,0,0,0.95)] border border-white/20 bg-[#0E0F14] transition-all duration-[2400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              scene >= 4
                ? "w-[220px] sm:w-[320px] lg:w-[420px] aspect-[4/5]"
                : "w-[240px] sm:w-[360px] lg:w-[460px] aspect-[4/5]"
            }`}
          >
            {/* The Authentic Formal Portrait (Photograph A) */}
            <div
              className="absolute inset-0 w-full h-full transition-transform duration-[3200ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
              style={{
                // Scene 3: Close crop of face and glasses
                // Scene 4+: Smooth camera-style pullback to full portrait
                transform: isReducedMotion
                  ? "scale(1.02) translateY(0%)"
                  : scene <= 3
                  ? "scale(2.6) translateY(18%)"
                  : "scale(1.02) translateY(0%)",
              }}
            >
              <Image
                src="/portrait-saket.jpg"
                alt="Saket Kumar Tiwari — Formal Portrait"
                fill
                priority
                sizes="(max-width: 640px) 340px, (max-width: 1024px) 460px, 500px"
                className="object-cover object-top filter contrast-[1.04] brightness-[0.98]"
              />
            </div>

            {/* Cinematic Shadow Scrim & Subtle Border Ring */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#06070A] via-transparent to-black/30 pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />

            {/* Precision Bronze Reticles */}
            <div
              className={`absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/80 transition-opacity duration-1000 ${
                scene >= 4 ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/80 transition-opacity duration-1000 ${
                scene >= 4 ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/80 transition-opacity duration-1000 ${
                scene >= 4 ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/80 transition-opacity duration-1000 ${
                scene >= 4 ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>

        {/* Right Column: Editorial Film Typography Reveal (Scene 5 & 6) */}
        <div className="flex-1 flex flex-col justify-center text-left max-w-xl">
          {/* Eyebrow & Name Reveal */}
          <div
            className={`transition-all duration-1000 ease-out ${
              scene >= 5
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8 pointer-events-none"
            }`}
          >
            {/* Eyebrow Discipline Badge */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#D4AF37]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#D4AF37] font-semibold">
                CIVIL ENGINEERING · CONSTRUCTION MANAGEMENT
              </span>
            </div>

            {/* Master Name */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.08] mb-4">
              SAKET KUMAR TIWARI
            </h1>
          </div>

          {/* Staggered Headline Reveal */}
          <div
            className={`transition-all duration-1000 delay-150 ease-out ${
              scene >= 5
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8 pointer-events-none"
            }`}
          >
            <p className="font-serif italic text-lg sm:text-2xl text-[#F2EEE6] font-light leading-snug mb-5 border-l-2 border-[#D4AF37] pl-4">
              &ldquo;Crafting Exceptional Spaces.
              <br />
              Delivering Engineering Excellence.&rdquo;
            </p>
          </div>

          {/* Professional Overview Narrative */}
          <div
            className={`transition-all duration-1000 delay-300 ease-out ${
              scene >= 5
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8 pointer-events-none"
            }`}
          >
            <p className="font-sans text-xs sm:text-sm text-[#B4B8C6] leading-relaxed mb-8">
              A civil engineering and construction management professional with <strong>9+ years of experience</strong> across 
              luxury residential developments, high-end interiors, hospitality, and high-rise construction. 
              My approach combines technical precision, disciplined execution, quality management, and collaborative leadership to deliver exceptional spaces.
            </p>
          </div>

          {/* Scene 6: ENTER MY WORLD CTA Activation */}
          <div
            className={`transition-all duration-1000 delay-500 ease-out ${
              scene >= 6
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8 pointer-events-none"
            }`}
          >
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleEnter}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#947854] hover:bg-[#806644] text-white text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-[0_12px_36px_rgba(148,120,84,0.45)] hover:scale-[1.03] cursor-pointer rounded-full group"
              >
                <span>ENTER MY WORLD</span>
                <ArrowRight className="w-4 h-4 text-[#FFD23F] group-hover:translate-x-1.5 transition-transform" />
              </button>

              <span className="text-[11px] font-sans text-white/50 tracking-wider hidden sm:inline">
                Explore documented projects &amp; engineering milestones
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Architectural Credibility Watermark */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 pb-6 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">
        <span>EST. 2015 · PAN-INDIA EXECUTION</span>
        <span className="hidden sm:inline">₹700CR+ PORTFOLIO · 9+ YEARS EXPERIENCE</span>
        <span>VARUN BEVERAGES · AAMOR INOX · SOBHA</span>
      </div>
    </div>
  );
}
