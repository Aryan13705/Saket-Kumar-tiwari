"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  RotateCcw,
  Shuffle,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Building,
  MapPin,
  Calendar,
  Sparkles,
  Flame,
} from "lucide-react";
import { Project } from "@/data/portfolio";

interface Projects3DRotaryCarouselProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export default function Projects3DRotaryCarousel({
  projects,
  onSelectProject,
}: Projects3DRotaryCarouselProps) {
  // If fewer than 5 projects, pad ring to maintain 6-card symmetrical cylinder
  const displayItems = React.useMemo(() => {
    if (projects.length === 0) return [];
    if (projects.length >= 5) return projects;
    const repeated: Project[] = [];
    while (repeated.length < 6) {
      for (const p of projects) {
        repeated.push(p);
        if (repeated.length >= 6) break;
      }
    }
    return repeated;
  }, [projects]);

  const count = displayItems.length;
  const angleStep = 360 / Math.max(count, 1);

  // Core carousel state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isTheater, setIsTheater] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [radius, setRadius] = useState<number>(490);

  // 5-Second Hover "Emerge from Den" states
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverProgress, setHoverProgress] = useState<number>(0); // 0 to 1
  const [emergingIndex, setEmergingIndex] = useState<number | null>(null);

  // Physics & Animation refs for 120fps/60fps silky smooth rotation
  const currentRotRef = useRef<number>(0);
  const targetRotRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartRotRef = useRef<number>(0);
  const lastDragXRef = useRef<number>(0);
  const lastDragTimeRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(true);
  const hoveredIndexRef = useRef<number | null>(null);
  const hoverStartTimeRef = useRef<number | null>(null);
  const lastProgressUpdateRef = useRef<number>(0);
  const emergingIndexRef = useRef<number | null>(null);

  // Direct DOM references to cards for zero-react-render GPU updates
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Responsive radius
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 640) setRadius(290);
      else if (w < 1024) setRadius(390);
      else setRadius(500);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Sync ref values safely outside render
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    hoveredIndexRef.current = hoveredIndex;
    emergingIndexRef.current = emergingIndex;
  }, [isPlaying, hoveredIndex, emergingIndex]);

  // Update a single card's 3D transform directly on the DOM node (super smooth, 0 jank)
  const updateCardTransforms = useCallback(
    (rot: number) => {
      const r = radius;
      let closestIdx = 0;
      let minDiff = 999;

      for (let i = 0; i < count; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        const cardBaseAngle = i * angleStep;
        const netAngle = ((cardBaseAngle + rot) % 360 + 360) % 360;
        const normalized = netAngle > 180 ? netAngle - 360 : netAngle;
        const diff = Math.abs(normalized);

        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = i;
        }

        const rad = (normalized * Math.PI) / 180;
        const x = r * Math.sin(rad);
        const z = r * (Math.cos(rad) - 1);
        const rotY = -normalized;

        const depthFactor = (Math.cos(rad) + 1) / 2; // 0 (back) to 1 (front)
        const isEmerging = emergingIndexRef.current === i;

        // If card is emerging from den: dramatic forward surge!
        if (isEmerging) {
          el.style.transform = `translate3d(${x}px, -40px, ${z + 280}px) rotateY(0deg) scale(1.25)`;
          el.style.opacity = "1";
          el.style.zIndex = "500";
          el.style.filter = "brightness(1.15) drop-shadow(0 0 60px rgba(212,175,55,0.9))";
        } else {
          const scale = 0.72 + depthFactor * 0.28;
          const opacity = 0.35 + depthFactor * 0.65;
          const zIndex = Math.round(100 + depthFactor * 100);
          const blur = (1 - depthFactor) * 2;
          const brightness = 0.65 + depthFactor * 0.35;

          el.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${rotY}deg) scale(${scale})`;
          el.style.opacity = `${opacity}`;
          el.style.zIndex = `${zIndex}`;
          el.style.filter = `brightness(${brightness}) blur(${blur}px)`;
        }
      }

      return closestIdx;
    },
    [count, angleStep, radius]
  );

  // Silky-Smooth Physics & 5-Second Hover Emergence RAF Loop
  useEffect(() => {
    let lastTime = performance.now();
    let lastActiveCalc = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // 1. Handle 5-second continuous hover "Emerge from Den" timer
      if (hoveredIndexRef.current !== null && emergingIndexRef.current === null) {
        if (!hoverStartTimeRef.current) {
          hoverStartTimeRef.current = now;
          lastProgressUpdateRef.current = now;
        }
        const elapsed = now - hoverStartTimeRef.current;
        const prog = Math.min(1, elapsed / 5000);

        // Exact 60ms throttle to eliminate frame-by-frame React re-renders during hover
        if (now - lastProgressUpdateRef.current >= 60 || elapsed >= 5000) {
          lastProgressUpdateRef.current = now;
          setHoverProgress(prog);
        }

        // When 5 seconds of continuous hover complete: EMERGE FROM DEN!
        if (elapsed >= 5000) {
          const targetIdx = hoveredIndexRef.current;
          setEmergingIndex(targetIdx);
          emergingIndexRef.current = targetIdx;

          // Rotate to bring the emerging card perfectly front and center
          targetRotRef.current = -targetIdx * angleStep;

          // Trigger full case study modal after the dramatic emergence surge!
          setTimeout(() => {
            const chosen = displayItems[targetIdx];
            if (chosen) {
              onSelectProject(chosen);
            }
            setEmergingIndex(null);
            setHoverProgress(0);
            hoverStartTimeRef.current = null;
            lastProgressUpdateRef.current = 0;
          }, 750);
        }
      } else if (emergingIndexRef.current === null) {
        hoverStartTimeRef.current = null;
        lastProgressUpdateRef.current = 0;
        setHoverProgress(0);
      }

      // 2. Physics-based rotation
      if (isDraggingRef.current) {
        // Direct tracking handled by pointer events
      } else {
        // Apply inertia friction
        if (Math.abs(velocityRef.current) > 0.005) {
          targetRotRef.current += velocityRef.current;
          velocityRef.current *= 0.94; // smooth exponential decay
        } else if (
          isPlayingRef.current &&
          hoveredIndexRef.current === null &&
          emergingIndexRef.current === null
        ) {
          // Smooth, clearly visible auto-rotation drift (~17 deg/sec)
          targetRotRef.current -= 0.28 * (dt * 60);
        }
      }

      // Smooth Spring-Damper Interpolation (Lerp)
      // This completely eliminates stutter by smoothly gliding currentRot to targetRot
      const lerpSpeed = isDraggingRef.current ? 0.35 : 0.08;
      currentRotRef.current +=
        (targetRotRef.current - currentRotRef.current) * lerpSpeed;

      // Apply transforms directly to DOM elements
      const closest = updateCardTransforms(currentRotRef.current);

      // Throttled active index sync for UI labels (every ~100ms)
      if (now - lastActiveCalc > 100) {
        lastActiveCalc = now;
        setActiveIndex((prev) => (prev !== closest ? closest : prev));
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [angleStep, displayItems, onSelectProject, updateCardTransforms]);

  // Pointer drag events for smooth direct spinning
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartRotRef.current = targetRotRef.current;
    lastDragXRef.current = e.clientX;
    lastDragTimeRef.current = performance.now();
    velocityRef.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(now - lastDragTimeRef.current, 1);
    const delta = e.clientX - lastDragXRef.current;

    // Direct responsive spin
    targetRotRef.current += delta * 0.32;
    velocityRef.current = (delta / dt) * 3.8;
    lastDragXRef.current = e.clientX;
    lastDragTimeRef.current = now;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Step rotation
  const rotateStep = useCallback(
    (direction: "left" | "right") => {
      const delta = direction === "right" ? -angleStep : angleStep;
      targetRotRef.current =
        Math.round((targetRotRef.current + delta) / angleStep) * angleStep;
      velocityRef.current = 0;
    },
    [angleStep]
  );

  const handleReset = () => {
    targetRotRef.current = 0;
    velocityRef.current = 0;
  };

  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * count);
    targetRotRef.current = -randomIndex * angleStep;
    velocityRef.current = 0;
  };

  // Hover handlers for 5-second "Emerge from Den" effect
  const handleCardMouseEnter = useCallback((idx: number) => {
    setHoveredIndex(idx);
  }, []);

  const handleCardMouseLeave = useCallback((idx: number) => {
    setHoveredIndex((prev) => (prev === idx ? null : prev));
  }, []);

  const activeProject = displayItems[activeIndex];

  return (
    <div
      ref={containerRef}
      className={`relative w-full select-none transition-all duration-700 ${
        isTheater
          ? "fixed inset-0 z-50 bg-[#0A0B0E] flex flex-col justify-between p-4 sm:p-8"
          : "min-h-[600px] sm:min-h-[660px] lg:min-h-[720px] bg-gradient-to-b from-[#141518] via-[#0E0F12] to-[#16171B] text-white border border-[#2B2D33] shadow-2xl rounded-2xl overflow-hidden py-8 sm:py-12"
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ touchAction: "none" }}
    >
      {/* Deep Cave / Den Volumetric Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(ellipse at 50% 35%, rgba(148, 120, 84, 0.35) 0%, rgba(10, 11, 14, 0) 75%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `linear-gradient(#947854 1px, transparent 1px), linear-gradient(90deg, #947854 1px, transparent 1px)`,
            backgroundSize: `48px 48px`,
          }}
        />
      </div>

      {/* Top Floating Control Bar */}
      <div className="relative z-30 max-w-7xl mx-auto w-full px-6 flex items-center justify-between gap-4">
        {/* Left Status & 5s Hover Hint Badge */}
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/15 rounded-full text-[11px] font-sans uppercase tracking-[0.18em] text-[#D4AF37]">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>3D Rotary Den</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#A2A6B4] font-sans">
            <Flame className="w-3.5 h-3.5 text-[#FF7A3D]" />
            <span>Hover card for 5s to emerge from the den</span>
          </span>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 bg-[#1C1E24]/90 backdrop-blur-md p-1.5 rounded-xl border border-white/15 shadow-lg">
          {/* Theater Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsTheater((t) => !t);
            }}
            title={isTheater ? "Exit Theater View" : "Expand to Theater View"}
            className="p-2 sm:p-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
          >
            {isTheater ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>

          {/* Shuffle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShuffle();
            }}
            title="Random Project"
            className="p-2 sm:p-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          {/* Play / Pause */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying((p) => !p);
            }}
            title={isPlaying ? "Pause Rotation" : "Resume Auto-Rotation"}
            className={`p-2 sm:p-2.5 rounded-lg transition-colors focus:outline-none cursor-pointer ${
              isPlaying
                ? "bg-[#947854] text-white shadow-md"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 fill-white ml-0.5" />
            )}
          </button>

          {/* Reset */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReset();
            }}
            title="Reset Rotation to Start"
            className="p-2 sm:p-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3D Cylindrical Stage Centerpiece */}
      <div
        className="relative z-20 w-full flex-grow flex items-center justify-center my-6 overflow-visible"
        style={{
          perspective: "1300px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          className="relative w-full h-[400px] sm:h-[460px] lg:h-[500px] flex items-center justify-center pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          {displayItems.map((project, idx) => {
            const isHoveredThis = hoveredIndex === idx;
            const isEmergingThis = emergingIndex === idx;
            const secondsLeft = Math.max(0, (5 - hoverProgress * 5)).toFixed(1);

            return (
              <div
                key={`${project.id}-${idx}`}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                onMouseEnter={() => handleCardMouseEnter(idx)}
                onMouseLeave={() => handleCardMouseLeave(idx)}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectProject(project);
                }}
                className={`absolute pointer-events-auto cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden group select-none will-change-transform ${
                  isEmergingThis
                    ? "ring-4 ring-[#D4AF37] shadow-[0_0_90px_rgba(212,175,55,0.95)]"
                    : isHoveredThis
                    ? "ring-2 ring-[#FF7A3D] shadow-[0_20px_50px_rgba(255,122,61,0.4)]"
                    : "ring-1 ring-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.6)] hover:ring-[#D4AF37]"
                }`}
                style={{
                  width:
                    radius < 320 ? "230px" : radius < 420 ? "280px" : "330px",
                  height:
                    radius < 320 ? "320px" : radius < 420 ? "390px" : "460px",
                  transformOrigin: "center center",
                  // No inline transition during RAF updates so GPU runs at 120fps!
                  transition: isEmergingThis
                    ? "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease"
                    : "none",
                }}
              >
                {/* Project Image */}
                <div className="relative w-full h-full bg-[#121316] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="360px"
                    className={`object-cover transition-transform duration-700 ease-out ${
                      isEmergingThis ? "scale-110" : "group-hover:scale-105"
                    }`}
                  />

                  {/* Dark Vignette Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/20" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.16em] font-sans font-medium px-2.5 py-1 bg-black/65 backdrop-blur-md text-[#EDEAE3] border border-white/15 rounded-md">
                      {project.category}
                    </span>

                    <span className="w-8 h-8 rounded-full bg-[#947854] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* 5-Second Hover "Emerging from Den" Visual Feedback Overlay */}
                  {isHoveredThis && !isEmergingThis && (
                    <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center animate-fade-in pointer-events-none">
                      {/* Circular Progress Ring */}
                      <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="3.5"
                            fill="none"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="#FF7A3D"
                            strokeWidth="4"
                            strokeDasharray={176}
                            strokeDashoffset={176 * (1 - hoverProgress)}
                            strokeLinecap="round"
                            fill="none"
                            className="transition-all duration-75"
                          />
                        </svg>
                        <span className="absolute font-mono text-sm font-bold text-white">
                          {secondsLeft}s
                        </span>
                      </div>

                      <span className="text-xs uppercase tracking-wider text-[#FF7A3D] font-semibold font-sans block">
                        Emerging from Den...
                      </span>
                      <span className="text-[10px] text-white/70 font-sans mt-0.5">
                        Hold cursor or click to open
                      </span>
                    </div>
                  )}

                  {/* Active Emergence State Banner */}
                  {isEmergingThis && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#947854]/40 via-transparent to-transparent flex flex-col items-center justify-center p-4 animate-pulse">
                      <div className="px-4 py-2 bg-[#D4AF37] text-black font-serif font-bold text-sm tracking-wider uppercase rounded-full shadow-2xl">
                        ✦ EMERGING FROM DEN ✦
                      </div>
                    </div>
                  )}

                  {/* Bottom Card Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-left flex flex-col justify-end">
                    <div className="flex items-center gap-2 text-[11px] text-[#C4C7D0] font-sans mb-1.5">
                      <span className="flex items-center gap-1 font-medium text-white">
                        <Building className="w-3 h-3 text-[#D4AF37]" />
                        {project.organization}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 truncate max-w-[120px]">
                        <MapPin className="w-3 h-3 text-[#D4AF37]" />
                        {project.location}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl text-white font-medium leading-snug line-clamp-2 mb-1 group-hover:text-[#D4AF37] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-[10px] uppercase tracking-[0.14em] text-[#D4AF37] font-medium font-sans mb-2">
                      Role: {project.role}
                    </p>

                    <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-[#A6ABB7] font-sans flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#D4AF37]" />
                        {project.period}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-sans uppercase tracking-wider text-[#D4AF37] font-semibold">
                        <span>View Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Controls & Focused Project Info Strip */}
      <div className="relative z-30 max-w-7xl mx-auto w-full px-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        {/* Navigation Step Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              rotateStep("left");
            }}
            aria-label="Rotate ring left"
            className="p-3 bg-white/10 hover:bg-[#947854] text-white border border-white/15 rounded-xl transition-all hover:scale-105 focus:outline-none cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              rotateStep("right");
            }}
            aria-label="Rotate ring right"
            className="p-3 bg-white/10 hover:bg-[#947854] text-white border border-white/15 rounded-xl transition-all hover:scale-105 focus:outline-none cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Active Card Indicator */}
          <div className="text-left ml-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-sans block">
              Active Focus ({activeIndex + 1}/{count})
            </span>
            <span className="text-xs font-serif text-white font-medium truncate max-w-[220px] block">
              {activeProject?.title}
            </span>
          </div>
        </div>

        {/* Center Dots Indicator */}
        <div className="flex items-center gap-1.5">
          {displayItems.slice(0, projects.length).map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                targetRotRef.current = -i * angleStep;
                velocityRef.current = 0;
              }}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeIndex % projects.length === i
                  ? "w-7 bg-[#D4AF37]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              title={`Jump to project ${i + 1}`}
            />
          ))}
        </div>

        {/* Primary Case Study Launcher for Active Project */}
        {activeProject && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProject(activeProject);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#947854] hover:bg-[#A88B63] text-white rounded-xl text-xs uppercase tracking-[0.14em] font-medium transition-all shadow-lg hover:shadow-[#947854]/30 cursor-pointer"
          >
            <span>Open {activeProject.organization} Case Study</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
