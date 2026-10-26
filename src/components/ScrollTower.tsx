"use client";

import React, { useEffect, useState, useRef, useSyncExternalStore } from "react";
import { Eye, EyeOff } from "lucide-react";

interface ScrollTowerProps {
  floors?: number;
  side?: "right" | "left";
  heightVh?: number;
  metersPerFloor?: number;
  accentColor?: string;
  craneColor?: string;
}

const emptySubscribe = () => () => {};

export default function ScrollTower({
  floors = 30,
  side = "right",
  heightVh = 85,
  metersPerFloor = 3.6,
  accentColor = "#FF7A3D",
  craneColor = "#FFD23F",
}: ScrollTowerProps) {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [activeFloorCount, setActiveFloorCount] = useState<number>(0);
  const [activeLevelLabel, setActiveLevelLabel] = useState<string>("Foundation");
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const rafRef = useRef<number | null>(null);

  const FH = 17; // Floor height in SVG units
  const H = 582; // Total tower frame height in SVG units

  useEffect(() => {
    const updateScrollProgress = () => {
      if (typeof window === "undefined") return;

      const docEl = document.documentElement;
      const scrollY = window.scrollY || docEl.scrollTop;
      const scrollHeight = docEl.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollY / scrollHeight)) : 0;

      const n = Math.round(progress * floors);
      setActiveFloorCount(n);

      // Detect active level from sections with [data-skt-level]
      const marks = Array.from(document.querySelectorAll<HTMLElement>("[data-skt-level]"));
      if (marks.length > 0) {
        let currentMark = marks[0];
        const halfScreen = window.innerHeight * 0.45;

        for (const m of marks) {
          const rect = m.getBoundingClientRect();
          if (rect.top <= halfScreen) {
            currentMark = m;
          }
        }

        const label = currentMark.getAttribute("data-skt-level") || "";
        setActiveLevelLabel(label);
      }
    };

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [floors]);

  if (!isClient) return null;

  const currentHeightMeters = Math.round(activeFloorCount * metersPerFloor);

  return (
    <>
      {/* Floating Construction HUD Pill */}
      <aside
        aria-hidden="true"
        className={`fixed top-20 z-40 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0E1017]/85 backdrop-blur-md border border-white/15 text-[#F5F1EA] shadow-xl text-xs font-sans transition-all duration-300 ${
          side === "right"
            ? "right-4 sm:right-8"
            : "left-4 sm:left-8"
        }`}
      >
        {/* Pulsing Safety Amber Light */}
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0 animate-ping"
          style={{
            backgroundColor: accentColor,
            boxShadow: `0 0 10px ${accentColor}`,
          }}
        />

        {/* Meters Counter */}
        <span
          className="font-mono font-bold tracking-tight shrink-0"
          style={{ color: craneColor }}
        >
          +{currentHeightMeters} m
        </span>

        {/* Dynamic Section Level Label */}
        {activeLevelLabel && (
          <>
            <span className="text-white/20 select-none">|</span>
            <span className="text-white/90 font-medium truncate max-w-[130px] sm:max-w-[220px]">
              {activeLevelLabel}
            </span>
          </>
        )}

        {/* Toggle Visibility Button */}
        <button
          onClick={() => setIsVisible((v) => !v)}
          title={isVisible ? "Minimize Tower" : "Show Tower"}
          className="ml-1 p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>
      </aside>

      {/* 3D Vertical Construction Tower SVG */}
      {isVisible && (
        <div
          aria-hidden="true"
          className={`fixed bottom-0 z-40 pointer-events-none transition-all duration-500 hidden md:block ${
            side === "right"
              ? "right-2 sm:right-4 lg:right-7"
              : "left-2 sm:left-4 lg:left-7"
          }`}
          style={{
            height: `${heightVh}vh`,
            width: "auto",
          }}
        >
          <svg
            viewBox="0 0 160 600"
            className="h-full w-auto drop-shadow-2xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sktg" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1B2342" />
                <stop offset="100%" stopColor="#2D3A6B" />
              </linearGradient>
              <linearGradient id="sktCraneGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFD23F" />
                <stop offset="100%" stopColor="#FF7A3D" />
              </linearGradient>
            </defs>

            {/* Ghost outline scaffold */}
            <rect
              x="20"
              y="0"
              width="100"
              height={H}
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeDasharray="4 5"
              strokeWidth="1.2"
            />

            {/* Generated Structural Floors */}
            {Array.from({ length: floors }).map((_, i) => {
              const y = H - (i + 1) * FH;
              const isBuilt = i < activeFloorCount;

              return (
                <g
                  key={i}
                  className="transition-opacity duration-300 ease-out"
                  style={{ opacity: isBuilt ? 1 : 0 }}
                >
                  {/* Floor slab block */}
                  <rect
                    x="20"
                    y={y}
                    width="100"
                    height={FH - 1}
                    fill="url(#sktg)"
                    stroke="#5A6AA8"
                    strokeWidth="0.8"
                  />

                  {/* Lit vs unlit architectural windows */}
                  {Array.from({ length: 5 }).map((_, j) => {
                    const isLit = (i * 7 + j * 3) % 5 < 3;
                    return (
                      <rect
                        key={j}
                        x={28 + j * 18}
                        y={y + 4}
                        width="10"
                        height="9"
                        fill={isLit ? "#FFC15E" : "#2A3560"}
                        rx="1"
                      />
                    );
                  })}
                </g>
              );
            })}

            {/* Heavy Base Concrete Foundation */}
            <rect x="0" y={H} width="160" height="18" fill="#10142A" />
            <rect x="0" y={H} width="160" height="3" fill={accentColor} />

            {/* Ascending Tower Crane with Aviation Warning Light */}
            <g
              className="transition-transform duration-300 ease-out"
              style={{
                transform: `translateY(${-activeFloorCount * FH}px)`,
              }}
            >
              {/* Crane Mast Truss */}
              <g transform="translate(0,-70)">
                <path
                  d="M126 582V500M138 582V500M126 570l12-10M126 550l12-10M126 530l12-10M126 510l12-10"
                  stroke={craneColor}
                  strokeWidth="2"
                  fill="none"
                />
              </g>

              {/* Jib, Counterweight, Cabin & Winch */}
              <g transform="translate(0,-82)">
                <path
                  d="M70 500H156M70 500l56-26 12 26M156 500l-30-26"
                  stroke={craneColor}
                  strokeWidth="2"
                  fill="none"
                />
                {/* Hoist Cable & Hook */}
                <path d="M80 500v22" stroke={accentColor} strokeWidth="2" />
                <rect x="74" y="522" width="12" height="7" fill={accentColor} rx="1" />

                {/* Operator Cabin */}
                <rect x="122" y="492" width="14" height="12" fill="#1A213D" stroke={craneColor} strokeWidth="1" rx="1" />

                {/* Flashing Red Aviation Beacon on Crane Apex */}
                <circle cx="126" cy="470" r="3" fill="#FF3B30" className="animate-pulse" />
              </g>
            </g>
          </svg>
        </div>
      )}
    </>
  );
}
