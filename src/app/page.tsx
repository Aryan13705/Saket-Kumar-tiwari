"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ImpactStrip from "@/components/ImpactStrip";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import FeaturedProjects from "@/components/FeaturedProjects";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Achievements from "@/components/Achievements";
import Education from "@/components/Education";
import Recommendations from "@/components/Recommendations";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollTower from "@/components/ScrollTower";
import CinematicIntro from "@/components/CinematicIntro";

export default function Home() {
  // 1. Realistic Cinematic Introduction (8–12s: Dusk establishing shot -> Blueprint lines -> Sweeping light -> Pullback -> Film title -> Enter My World)
  // Always active on visit
  const [showIntro, setShowIntro] = useState<boolean>(true);

  // Clear any legacy session storage flag on mount so intro always plays on visit/reload
  useEffect(() => {
    try {
      sessionStorage.removeItem("skt_intro_seen");
    } catch {
      // Ignored
    }
  }, []);

  // ENTER MY WORLD →: exit cinematic intro and transition directly into All Works
  const handleEnterWorld = () => {
    setShowIntro(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SKIP INTRO: immediately exit cinematic intro and transition directly into All Works
  const handleSkipIntro = () => {
    setShowIntro(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1A1B1E] relative">
      {/* 1. Realistic Cinematic Introduction (Plays on site visit) */}
      {showIntro && (
        <CinematicIntro
          onComplete={handleEnterWorld}
          onEnter={handleEnterWorld}
          onSkip={handleSkipIntro}
        />
      )}

      {/* Global Shared Navigation with Project Links, Resume Download & LinkedIn */}
      <Navbar activePersona="all" />

      {/* =========================================================================
          COMPLETE PORTFOLIO (ALL WORKS)
          ========================================================================= */}
      <section data-skt-level="Foundation · Site Mobilization">
        <Hero />
      </section>

      <section data-skt-level="Ground Floor · Core Metrics">
        <ImpactStrip />
      </section>

      <section data-skt-level="Level 01 · Engineering Philosophy">
        <About />
      </section>

      <section data-skt-level="Level 02 · Technical Governance">
        <Expertise />
      </section>

      <section data-skt-level="Level 03 · Documented Projects">
        <FeaturedProjects />
      </section>

      <section data-skt-level="Level 04 · Career Trajectory">
        <ExperienceTimeline />
      </section>

      <section data-skt-level="Level 05 · Quantified Milestones & Awards">
        <Achievements />
      </section>

      <section data-skt-level="Level 06 · Peer & Client Recommendations">
        <Recommendations />
      </section>

      <section data-skt-level="Level 07 · Credentials & ISO Standards">
        <Education />
      </section>

      <section data-skt-level="Penthouse · Contact & Inquiries">
        <Contact />
      </section>

      {/* Shared Site Footer */}
      <Footer />

      {/* Real-time Ascending Construction Scroll Tower */}
      <ScrollTower floors={30} metersPerFloor={3.6} side="right" />
    </main>
  );
}
