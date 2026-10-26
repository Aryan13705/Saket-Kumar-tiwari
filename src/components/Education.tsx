import React from "react";
import { GraduationCap, Award, BookOpen, CheckCircle, Shield } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function Education() {
  return (
    <section className="py-24 lg:py-32 bg-[#F2EFE9] border-t border-[#E2DDD4]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="w-8 h-[1px] bg-[#947854]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#947854] font-medium">
              CREDENTIALS &amp; ACADEMICS
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1B1E] tracking-tight mb-4">
            Education, Certifications &amp; Honors
          </h2>
          <p className="text-xs sm:text-sm text-[#646770] font-sans leading-relaxed">
            Formal civil engineering foundation complemented by Lean Six Sigma quality governance, continuous professional training, and documented peer recognitions.
          </p>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Column 1: Academic Background */}
          <div className="bg-[#FBF9F5] p-8 border border-[#E2DDD4] flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div>
              <div className="flex items-center gap-3 pb-5 mb-6 border-b border-[#E2DDD4]">
                <div className="p-2 bg-[#F2EFE9] text-[#947854]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#1A1B1E] font-medium">
                    Formal Education
                  </h3>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#646770] font-sans">
                    Academic Qualifications
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {PORTFOLIO_DATA.education.map((edu, idx) => (
                  <div key={idx} className="pb-5 border-b border-[#E2DDD4]/60 last:border-none last:pb-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#947854] font-sans font-medium block mb-1">
                      {edu.period}
                    </span>
                    <h4 className="font-serif text-base text-[#1A1B1E] font-medium leading-snug">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-[#1A1B1E] font-sans font-medium mt-0.5">
                      {edu.field}
                    </p>
                    <p className="text-xs text-[#646770] font-sans mt-0.5">
                      {edu.institution}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E2DDD4] text-[11px] text-[#646770] font-sans">
              Rigorous grounding in structural mechanics, materials testing, and survey engineering.
            </div>
          </div>

          {/* Column 2: Professional Certifications & Training */}
          <div className="bg-[#FBF9F5] p-8 border border-[#E2DDD4] flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div>
              <div className="flex items-center gap-3 pb-5 mb-6 border-b border-[#E2DDD4]">
                <div className="p-2 bg-[#F2EFE9] text-[#947854]">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#1A1B1E] font-medium">
                    Certifications &amp; Training
                  </h3>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#646770] font-sans">
                    Quality &amp; Management Mastery
                  </span>
                </div>
              </div>

              {/* Formal Certification */}
              <div className="p-4 bg-[#F2EFE9] border border-[#E2DDD4] mb-6">
                <span className="text-[9px] uppercase tracking-[0.18em] font-sans text-[#947854] font-medium block mb-1">
                  Verified Formal Certification
                </span>
                <h4 className="font-serif text-lg text-[#1A1B1E] font-medium leading-snug">
                  {PORTFOLIO_DATA.certificationsAndTraining.credentials[0].title}
                </h4>
                <p className="text-[11px] text-[#646770] font-sans mt-1 leading-relaxed">
                  {PORTFOLIO_DATA.certificationsAndTraining.credentials[0].focus}
                </p>
              </div>

              {/* Training Courses (clearly separated) */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.16em] font-sans text-[#646770] font-medium block mb-3">
                  Documented Professional Training Courses
                </span>
                <ul className="space-y-3">
                  {PORTFOLIO_DATA.certificationsAndTraining.trainingCourses.map((tc, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#595C62]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#947854] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1A1B1E] block font-medium font-sans">
                          {tc.title}
                        </strong>
                        <span className="text-[11px] text-[#646770] leading-tight block">
                          {tc.focus}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E2DDD4] text-[11px] text-[#646770] font-sans">
              Distinguishing formal credentials (LSSGB) from continuing professional education.
            </div>
          </div>

          {/* Column 3: Honors & Awards */}
          <div className="bg-[#FBF9F5] p-8 border border-[#E2DDD4] flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div>
              <div className="flex items-center gap-3 pb-5 mb-6 border-b border-[#E2DDD4]">
                <div className="p-2 bg-[#F2EFE9] text-[#947854]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#1A1B1E] font-medium">
                    Honors &amp; Awards
                  </h3>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#646770] font-sans">
                    Documented Recognition
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {PORTFOLIO_DATA.certificationsAndTraining.honors.map((honor, idx) => (
                  <div key={idx} className="p-4 bg-[#FAF7F2] border border-[#E2DDD4]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-serif text-[#947854]">0{idx + 1}</span>
                      <h4 className="font-serif text-base text-[#1A1B1E] font-medium">
                        {honor.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#646770] font-sans leading-relaxed">
                      {honor.context}
                    </p>
                  </div>
                ))}
                <div className="pt-2 text-right">
                  <a
                    href="#achievements"
                    className="inline-flex items-center gap-1 text-[11px] font-sans uppercase tracking-wider text-[#947854] font-medium hover:underline"
                  >
                    <span>Inspect Original Certificates &rarr;</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Entrepreneurial Mention */}
            <div className="pt-6 mt-6 border-t border-[#E2DDD4] p-4 bg-[#F2EFE9] border border-[#E2DDD4]">
              <div className="flex items-center gap-2 text-xs font-medium text-[#1A1B1E] mb-1">
                <BookOpen className="w-3.5 h-3.5 text-[#947854]" />
                <span>Entrepreneurial Foundation</span>
              </div>
              <p className="text-[11px] text-[#646770] font-sans leading-relaxed">
                Co-Founder of College Laundry (2016–2017) scaling early-stage customer logistics and operational teams across 3 colleges in 3 months.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
