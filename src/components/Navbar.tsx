"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  RefreshCw,
  Layers,
  FileText,
  Briefcase,
  Building2,
  Compass,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { PersonaType } from "./IdentitySelector";
import { LinkedInIcon } from "./Icons";

interface NavbarProps {
  activePersona?: PersonaType;
  onChangePersona?: () => void;
  onExploreAll?: () => void;
}

export default function Navbar({
  activePersona = "all",
  onChangePersona,
  onExploreAll,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = [
        "about",
        "expertise",
        "projects",
        "experience",
        "achievements",
        "recommendations",
        "contact",
      ];
      const scrollPosition = window.scrollY + 220;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Expertise", href: "#expertise" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Achievements", href: "#achievements" },
    { label: "Recommendations", href: "#recommendations" },
    { label: "Contact", href: "#contact" },
  ];

  const personaLabelMap = {
    recruiter: { label: "Recruiter", icon: Briefcase, color: "#D4AF37" },
    client: { label: "Client", icon: Building2, color: "#FF7A3D" },
    visitor: { label: "Visitor", icon: Compass, color: "#60A5FA" },
    all: { label: "All Works", icon: Layers, color: "#947854" },
  };

  const currentPersona = personaLabelMap[activePersona] || personaLabelMap.all;
  const PersonaIcon = currentPersona.icon;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FBF9F5]/94 backdrop-blur-md shadow-[0_1px_0_0_rgba(226,221,212,0.85)] py-3.5"
            : "bg-[#0A0B0E]/75 backdrop-blur-sm py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Typographic Monogram & Wordmark */}
          <a
            href="#"
            className="group flex items-center gap-3 focus:outline-none"
            aria-label="Saket Kumar Tiwari - Home"
          >
            <div
              className={`w-9 h-9 border flex items-center justify-center text-xs font-serif tracking-widest transition-all duration-300 ${
                isScrolled
                  ? "border-[#947854]/40 bg-[#FAF7F2] text-[#1A1B1E] group-hover:border-[#947854] group-hover:bg-[#947854] group-hover:text-white"
                  : "border-white/30 bg-white/10 backdrop-blur-sm text-white group-hover:border-white group-hover:bg-white group-hover:text-[#1A1B1E]"
              }`}
            >
              {PORTFOLIO_DATA.personal.monogram}
            </div>
            <div className="flex flex-col">
              <span
                className={`font-serif text-base sm:text-lg tracking-tight font-medium leading-none transition-colors ${
                  isScrolled
                    ? "text-[#1A1B1E] group-hover:text-[#947854]"
                    : "text-white group-hover:text-[#D4AF37]"
                }`}
              >
                {PORTFOLIO_DATA.personal.name}
              </span>
              <span
                className={`text-[9px] sm:text-[10px] tracking-[0.16em] uppercase font-sans mt-0.5 ${
                  isScrolled ? "text-[#646770]" : "text-[#D5D2CA]"
                }`}
              >
                Civil Engineering
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-7 text-xs font-sans tracking-[0.12em] uppercase"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-200 ${
                    isScrolled
                      ? isActive
                        ? "text-[#947854] font-medium"
                        : "text-[#595C62] hover:text-[#1A1B1E]"
                      : isActive
                      ? "text-[#D4AF37] font-medium"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] animate-fade-in ${
                        isScrolled ? "bg-[#947854]" : "bg-[#D4AF37]"
                      }`}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls: Persona Badge + Change Perspective + Resume */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Perspective Status Pill */}
            {onChangePersona && (
              <button
                onClick={onChangePersona}
                title="Click to change your perspective (Recruiter, Client, Visitor, All)"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-sans uppercase tracking-wider transition-all cursor-pointer ${
                  isScrolled
                    ? "bg-[#FAF7F2] border-[#E2DDD4] text-[#1A1B1E] hover:border-[#947854]"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                }`}
              >
                <PersonaIcon className="w-3 h-3" style={{ color: currentPersona.color }} />
                <span>{currentPersona.label}</span>
                <RefreshCw className="w-2.5 h-2.5 opacity-60 ml-0.5" />
              </button>
            )}

            {/* Explore All Option */}
            {activePersona !== "all" && onExploreAll && (
              <button
                onClick={onExploreAll}
                title="Switch to complete portfolio"
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-[11px] font-sans uppercase tracking-wider transition-all cursor-pointer ${
                  isScrolled
                    ? "bg-[#FAF7F2] border-[#E2DDD4] text-[#1A1B1E] hover:border-[#947854]"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                }`}
              >
                <Layers className="w-3 h-3 text-[#D4AF37]" />
                <span className="hidden md:inline">Explore All</span>
              </button>
            )}

            {/* Resume Download Link */}
            <a
              href="/Profile.pdf"
              download="Saket_Kumar_Tiwari_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              title="Download verified resume / dossier"
              className={`p-2 rounded-lg border transition-colors ${
                isScrolled
                  ? "border-[#E2DDD4] text-[#1A1B1E] hover:bg-[#FAF7F2]"
                  : "border-white/20 text-white hover:bg-white/10"
              }`}
              aria-label="Download Profile PDF"
            >
              <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
            </a>

            {/* LinkedIn Profile Link */}
            <a
              href={PORTFOLIO_DATA.personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Connect with Saket Kumar Tiwari on LinkedIn"
              className={`p-2 rounded-lg border transition-all ${
                isScrolled
                  ? "border-[#E2DDD4] text-[#1A1B1E] hover:border-[#0A66C2]/40 hover:bg-[#FAF7F2]"
                  : "border-white/20 text-white hover:border-white/40 hover:bg-white/10"
              }`}
              aria-label="Saket Kumar Tiwari LinkedIn Profile"
            >
              <LinkedInIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
            </a>

            {/* Primary Get in Touch CTA */}
            <a
              href="#contact"
              className={`inline-flex items-center gap-1.5 px-4 py-2 border text-[11px] uppercase tracking-[0.16em] font-medium transition-all duration-300 rounded-md ${
                isScrolled
                  ? "border-[#947854] bg-[#947854] text-white hover:bg-[#806644] shadow-sm"
                  : "border-white/50 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-[#1A1B1E] shadow-md"
              }`}
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3 h-3 opacity-80" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            {onChangePersona && (
              <button
                onClick={onChangePersona}
                className="p-1.5 rounded-md border border-white/20 bg-white/10 text-white text-[10px] uppercase tracking-wider flex items-center gap-1"
                aria-label="Change perspective"
              >
                <PersonaIcon className="w-3 h-3" style={{ color: currentPersona.color }} />
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-none transition-colors ${
                isScrolled ? "text-[#1A1B1E] hover:text-[#947854]" : "text-white hover:text-[#D4AF37]"
              }`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 bg-[#0F1015] text-white flex flex-col justify-between pt-28 pb-10 px-8 sm:hidden animate-fade-in"
        >
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-sans">
                Curated Navigation
              </span>
              {onChangePersona && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onChangePersona();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-white"
                >
                  <RefreshCw className="w-3 h-3 text-[#D4AF37]" />
                  <span>Switch Perspective</span>
                </button>
              )}
            </div>

            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-2xl text-white hover:text-[#D4AF37] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/15 flex flex-col space-y-3">
            <a
              href="/Profile.pdf"
              download="Saket_Kumar_Tiwari_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 border border-white/20 bg-white/5 text-white text-xs uppercase tracking-[0.16em] font-medium rounded-lg flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#D4AF37]" />
              <span>Download Verified Resume</span>
            </a>

            <a
              href={PORTFOLIO_DATA.personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 border border-white/20 bg-white/5 text-white text-xs uppercase tracking-[0.16em] font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
            >
              <LinkedInIcon className="w-4 h-4 text-[#0A66C2]" />
              <span>Connect on LinkedIn</span>
            </a>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 border border-[#947854] bg-[#947854] text-white text-xs uppercase tracking-[0.16em] font-medium rounded-lg shadow-md"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </>
  );
}
