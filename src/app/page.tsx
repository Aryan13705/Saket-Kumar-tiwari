"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RecruiterHero from "@/components/RecruiterHero";
import ClientHero from "@/components/ClientHero";
import ImpactStrip from "@/components/ImpactStrip";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import FeaturedProjects from "@/components/FeaturedProjects";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Achievements from "@/components/Achievements";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollTower from "@/components/ScrollTower";
import CinematicIntro from "@/components/CinematicIntro";
import IdentitySelector, { PersonaType } from "@/components/IdentitySelector";
import PersonaBanner from "@/components/PersonaBanner";
import Recommendations from "@/components/Recommendations";

export default function Home() {
  // Screen sequence states:
  // 1. Cinematic 8-12s establishing sequence (default on initial visit)
  // 2. Netflix-style identity selector (after clicking ENTER MY WORLD)
  // Screen sequence states:
  // 1. Cinematic 8-12s establishing sequence (default on initial visit unless already seen in session)
  // 2. Netflix-style identity selector (after ENTER MY WORLD or SKIP INTRO)
  // 3. Personalized or complete portfolio presentation
  // Deterministic initial state across SSR and client initial render to prevent React hydration mismatches
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [showIdentitySelector, setShowIdentitySelector] = useState<boolean>(false);
  const [activePersona, setActivePersona] = useState<PersonaType>("all");

  // Synchronize client-specific state (sessionStorage, URL query params) once mounted on client
  useEffect(() => {
    const syncClientState = setTimeout(() => {
      try {
        const url = new URL(window.location.href);
        const view = url.searchParams.get("view");
        const personaParam = url.searchParams.get("persona") as PersonaType | null;

        if (view === "intro") {
          setShowIntro(true);
          setShowIdentitySelector(false);
        } else if (personaParam && ["recruiter", "client", "visitor", "all"].includes(personaParam)) {
          setShowIntro(false);
          setShowIdentitySelector(false);
          setActivePersona(personaParam);
        } else if (sessionStorage.getItem("skt_intro_seen") === "true" || view === "selector") {
          setShowIntro(false);
          setShowIdentitySelector(false);
          setActivePersona("all");
        }
      } catch {
        // Ignored
      }
    }, 0);

    return () => clearTimeout(syncClientState);
  }, []);

  // Real browser back and forward navigation handling via popstate
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window === "undefined") return;
      try {
        const url = new URL(window.location.href);
        const view = url.searchParams.get("view");
        const personaParam = url.searchParams.get("persona") as PersonaType | null;

        if (view === "intro") {
          setShowIntro(true);
          setShowIdentitySelector(false);
        } else if (view === "selector") {
          setShowIntro(false);
          setShowIdentitySelector(true);
        } else {
          setShowIntro(false);
          setShowIdentitySelector(false);
          if (personaParam && ["recruiter", "client", "visitor", "all"].includes(personaParam)) {
            setActivePersona(personaParam);
          } else {
            setActivePersona("all");
          }
        }
      } catch {
        // Ignored
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // A. ENTER MY WORLD →: immediately transition directly to All Works (Complete Portfolio)
  const handleEnterWorld = () => {
    try {
      sessionStorage.setItem("skt_intro_seen", "true");
    } catch {
      // Ignored
    }
    setActivePersona("all");
    setShowIntro(false);
    setShowIdentitySelector(false);
    try {
      window.history.pushState({ persona: "all" }, "", window.location.pathname);
    } catch {
      // Ignored
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // B. SKIP INTRO: immediately stop sequence and transition directly to All Works (Complete Portfolio)
  const handleSkipIntro = () => {
    try {
      sessionStorage.setItem("skt_intro_seen", "true");
    } catch {
      // Ignored
    }
    setActivePersona("all");
    setShowIntro(false);
    setShowIdentitySelector(false);
    try {
      window.history.pushState({ persona: "all" }, "", window.location.pathname);
    } catch {
      // Ignored
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // C. EXPLORE THE COMPLETE PORTFOLIO →: bypass Identity Selector and open Complete Portfolio directly
  const handleExploreAll = () => {
    try {
      sessionStorage.setItem("skt_intro_seen", "true");
    } catch {
      // Ignored
    }
    setActivePersona("all");
    setShowIdentitySelector(false);
    setShowIntro(false);
    try {
      window.history.pushState({ persona: "all" }, "", window.location.pathname);
    } catch {
      // Ignored
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle selecting a persona (Recruiter, Client, Visitor, or All)
  const handleSelectPersona = (persona: PersonaType) => {
    try {
      sessionStorage.setItem("skt_intro_seen", "true");
    } catch {
      // Ignored
    }
    setActivePersona(persona);
    setShowIdentitySelector(false);
    setShowIntro(false);
    try {
      if (persona === "all") {
        window.history.pushState({ persona: "all" }, "", window.location.pathname);
      } else {
        window.history.pushState({ persona }, "", "?persona=" + persona);
      }
    } catch {
      // Ignored
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Open identity selector manually from banner or navbar
  const handleOpenSelector = () => {
    setShowIdentitySelector(true);
    try {
      window.history.pushState({ view: "selector" }, "", "?view=selector");
    } catch {
      // Ignored
    }
  };

  // Close identity selector (support browser back or direct close)
  const handleCloseSelector = () => {
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get("view") === "selector") {
        window.history.back();
        return;
      }
    } catch {
      // Ignored
    }
    setShowIdentitySelector(false);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1A1B1E] relative">
      {/* 1. Realistic Cinematic Introduction (8–12s: Dusk establishing shot -> Blueprint lines -> Sweeping light -> Pullback -> Film title -> Enter My World) */}
      {showIntro && (
        <CinematicIntro
          onComplete={handleEnterWorld}
          onEnter={handleEnterWorld}
          onSkip={handleSkipIntro}
        />
      )}

      {/* 2. Netflix-Style Identity Selection Screen */}
      {showIdentitySelector && (
        <IdentitySelector
          onSelectPersona={handleSelectPersona}
          onClose={handleCloseSelector}
          canClose={true}
        />
      )}

      {/* Global Shared Navigation with Perspective Indicator & Resume Download */}
      <Navbar
        activePersona={activePersona}
        onChangePersona={handleOpenSelector}
        onExploreAll={handleExploreAll}
      />

      {/* Floating Perspective Status & Quick Switcher Pill */}
      {!showIntro && !showIdentitySelector && (
        <PersonaBanner
          activePersona={activePersona}
          onChangePersona={handleOpenSelector}
          onExploreAll={handleExploreAll}
        />
      )}

      {/* =========================================================================
          3. PERSONA-CURATED PORTFOLIO EXPERIENCES
          ========================================================================= */}

      {/* --- EXPERIENCE A: RECRUITER MODE --- */}
      {activePersona === "recruiter" && (
        <>
          <section data-skt-level="Executive Brief · Leadership Built on Execution">
            <RecruiterHero />
          </section>

          <section data-skt-level="Core Impact · ₹700Cr+ Track Record">
            <ImpactStrip />
          </section>

          <section data-skt-level="Career Timeline · 9+ Years Progression">
            <ExperienceTimeline />
          </section>

          <section data-skt-level="Achievements · Documented Milestones">
            <Achievements />
          </section>

          <section data-skt-level="Governance · Quality & Six Sigma">
            <Expertise />
          </section>

          <section data-skt-level="Project Dossier · Turnkey Execution">
            <FeaturedProjects />
          </section>

          <section data-skt-level="Education · B.Tech Civil Engineering">
            <Education />
          </section>

          <section data-skt-level="Testimonials · Leadership & Client Endorsements">
            <Recommendations />
          </section>

          <section data-skt-level="Recruiter Inquiries · Direct Contact">
            <Contact />
          </section>
        </>
      )}

      {/* --- EXPERIENCE B: CLIENT MODE --- */}
      {activePersona === "client" && (
        <>
          <section data-skt-level="Client Introduction · From Vision to Execution">
            <ClientHero />
          </section>

          <section data-skt-level="Project Gallery · Luxury Estates & High-Rise">
            <FeaturedProjects />
          </section>

          <section data-skt-level="Capabilities · Turnkey & Bespoke Finishes">
            <Expertise />
          </section>

          <section data-skt-level="Execution Approach · Schedule & QA/QC">
            <Achievements />
          </section>

          <section data-skt-level="Track Record · ₹700Cr+ Executed Valuation">
            <ImpactStrip />
          </section>

          <section data-skt-level="Leadership History · Corporate Track Record">
            <ExperienceTimeline />
          </section>

          <section data-skt-level="Client Testimonials · Project Delivery Endorsements">
            <Recommendations />
          </section>

          <section data-skt-level="Inquiries · Project Delivery Discussion">
            <Contact />
          </section>
        </>
      )}

      {/* --- EXPERIENCE C: VISITOR MODE --- */}
      {activePersona === "visitor" && (
        <>
          <section data-skt-level="Narrative · Every Space Has a Story">
            <Hero />
          </section>

          <section data-skt-level="The Work · 3D Architectural Showcase">
            <FeaturedProjects />
          </section>

          <section data-skt-level="Philosophy · Principles of Craftsmanship">
            <About />
          </section>

          <section data-skt-level="The Journey · 9+ Years in Construction">
            <ExperienceTimeline />
          </section>

          <section data-skt-level="The Craft · Structural & Interior Mastery">
            <Expertise />
          </section>

          <section data-skt-level="Milestones · Quantified Excellence">
            <Achievements />
          </section>

          <section data-skt-level="Credentials · Academic Foundations">
            <Education />
          </section>

          <section data-skt-level="Peer & Executive Testimonials · The Professional Story">
            <Recommendations />
          </section>

          <section data-skt-level="Connect · Start a Conversation">
            <Contact />
          </section>
        </>
      )}

      {/* --- EXPERIENCE D: COMPLETE PORTFOLIO (ALL) --- */}
      {activePersona === "all" && (
        <>
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
        </>
      )}

      {/* Shared Site Footer */}
      <Footer />

      {/* Real-time Ascending Construction Scroll Tower */}
      <ScrollTower floors={30} metersPerFloor={3.6} side="right" />
    </main>
  );
}
