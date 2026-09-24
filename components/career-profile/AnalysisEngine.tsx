"use client";

import React, { useState, useEffect } from "react";
import { Check, FlaskConical } from "lucide-react";
import { InteractiveGrid } from "../../components/career-profile/InteractiveGrid";

interface AnalysisEngineProps {
  targetRole?: string;
  onComplete?: () => void;
}

const ANALYSIS_LABELS = [
  "Analyzing your starting point",
  "Mapping role-critical skills",
  "Identifying capability gaps",
  "Building your learning sequence",
  "Optimizing for your weekly schedule",
];

export default function AnalysisEngine({
  targetRole = "Front end",
  onComplete,
}: AnalysisEngineProps) {
  const [analysisStep, setAnalysisStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev < ANALYSIS_LABELS.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (analysisStep === ANALYSIS_LABELS.length && onComplete) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [analysisStep, onComplete]);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 flex flex-col items-center justify-center p-4 font-sans overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <InteractiveGrid>
        <div className="relative z-10 w-full max-w-2xl text-center px-4 mx-auto">
          <div className="mx-auto w-16 h-16 rounded-full bg-emerald-950/40 border border-cyan-500/30 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(6,182,212,0.15)]">
            <FlaskConical className="w-7 h-7 text-cyan-400" />
          </div>
          <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
            MASARI ANALYSIS ENGINE
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-3 tracking-tight">
            Constructing your route to {targetRole}
          </h1>

          <p className="text-slate-400 text-sm max-w-lg mx-auto mb-10 leading-relaxed">
            Your answers are being translated into a capability model and realistic sequence.
          </p>

          <div className="bg-[#0b132b]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 md:p-8 text-left shadow-2xl divide-y divide-slate-800/60">
            {ANALYSIS_LABELS.map((label, index) => {
              const stepNum = index + 1;
              const isDone = analysisStep > stepNum;
              const isCurrent = analysisStep === stepNum;

              return (
                <div
                  key={label}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                        isDone
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : isCurrent
                          ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/60 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                          : "border border-slate-700 text-slate-500 bg-slate-900/40"
                      }`}
                    >
                      {isDone ? (
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : isCurrent ? (
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      ) : (
                        stepNum
                      )}
                    </div>

                    <span
                      className={`text-sm transition-colors duration-200 ${
                        isCurrent
                          ? "text-white font-medium"
                          : isDone
                          ? "text-slate-300"
                          : "text-slate-500"
                      }`}
                    >
                      {label}
                    </span>
                  </div>

                  {isCurrent && (
                    <span className="text-[11px] font-semibold tracking-wider text-cyan-400 uppercase flex items-center gap-1.5">
                      PROCESSING
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-xs text-slate-500 mt-8">
            Keep this tab open · typically under 10 seconds
          </p>
        </div>
      </InteractiveGrid>
    </div>
  );
}