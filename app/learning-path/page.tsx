"use client";

import { retrieveCurrentPath } from "@/lib/storage";
import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { storePath } from "@/lib/storage";
import { PathInformation } from "@/schemas/learningPathSchemas";
import {
  ChevronDown,
  ChevronUp,
  Check,
  Sparkles,
  Clock,
} from "lucide-react";

export default function LearningPath() {
  const [currentPath, setCurrentPath] = useState<PathInformation | null>(() => {
    if (typeof window === "undefined") return null;
    return retrieveCurrentPath() ?? null;
  });

  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({
    1: true,
  });

  const [isCelebrationDismissed, setIsCelebrationDismissed] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const steps = currentPath?.steps ?? [];
  const completedCount = steps.filter((m) => m.completed).length;
  const progressPercent = steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0;

  const isFinished = progressPercent === 100 && steps.length > 0;
  const showCelebration = isFinished && !isCelebrationDismissed;

  useEffect(() => {
    if (isFinished) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isFinished]);

  useEffect(() => {
    if (!showCelebration) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsCelebrationDismissed(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCelebration]);

  if (!steps.length) {
    return <div>No learning path found. Please generate one first.</div>;
  }

  const toggleExpand = (position: number) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [position]: !prev[position],
    }));
  };

  const toggleComplete = (position: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentPath) return;

    const updatedSteps = currentPath.steps.map((step) => {
      if (step.position === position) {
        const nextCompleted = !step.completed;
        if (!nextCompleted) {
          setIsCelebrationDismissed(false);
        }
        return { ...step, completed: nextCompleted };
      }
      return step;
    });

    const updatedPath = { ...currentPath, steps: updatedSteps };
    setCurrentPath(updatedPath);
    storePath(updatedPath);
  };

  const keyframesStyle = `
  @keyframes popIn {
    0% { transform: scale(0.5); opacity: 0; }
    70% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  .animate-pop-in {
    animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }
`;

  const totalTime = currentPath!.steps.reduce(
    (sum, num) => sum + Number(num.estimatedTime.split(" ")[0]),
    0
  );
  const unit = currentPath!.steps[0].estimatedTime.split(" ")[1];

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 pb-16">
      {/* Hero Banner Header */}
      <div className="bg-[#0b1329] text-white px-6 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-sky-400 uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Your Personalized Trajectory</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {currentPath!.formData.currentLevel.toUpperCase()}
              <span className="text-slate-400 font-normal">→</span>{" "}
              {currentPath!.formData.targetRole.toUpperCase()}
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              A {currentPath!.formData.desiredTimeframe} path built around{" "}
              {currentPath!.formData.availableTime} hours per week
              {currentPath!.formData.learningPreference
                ? `, using a ${currentPath!.formData.learningPreference} learning preference.`
                : "."}
            </p>
          </div>

          {/* Path Progress Box */}
          <div className="bg-[#121c38] border border-slate-800 rounded-lg p-4 min-w-70 w-full md:w-auto shadow-lg">
            <div className="flex justify-between items-center text-xs font-semibold mb-2">
              <span className="text-slate-400">Path progress</span>
              <span className="text-sky-400 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mb-3">
              <div
                className="bg-sky-400 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="text-center text-xs font-bold text-slate-300 bg-slate-800/60 py-2 rounded border border-slate-700/50">
              Completed {completedCount} of {steps.length}
            </div>
          </div>
        </div>
      </div>

      {/* Celebration Modal Overlay */}
      {showCelebration && (
        <>
          <style>{keyframesStyle}</style>
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div
              ref={modalRef}
              className="bg-gradient-to-br from-emerald-600 via-teal-600 to-sky-700 text-white rounded-3xl p-8 md:p-10 text-center shadow-2xl border border-emerald-400/30 animate-pop-in relative overflow-hidden w-full max-w-md aspect-square flex flex-col items-center justify-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsCelebrationDismissed(true)}
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/10 hover:bg-black/20 rounded-full p-2 transition-all cursor-pointer"
                title="Close"
              >
                ✕
              </button>

              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.25),transparent_70%)] pointer-events-none" />

              <div className="inline-flex p-4 bg-white/10 rounded-2xl mb-5 backdrop-blur-md shadow-inner border border-white/10">
                <Sparkles className="w-10 h-10 text-yellow-300 animate-pulse" />
              </div>

              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3 drop-shadow-md">
                Congratulations! 🎉
              </h2>

              <p className="text-emerald-100 text-base md:text-lg font-medium leading-relaxed mb-6">
                You have completed your path!
              </p>

              <button
                onClick={() => setIsCelebrationDismissed(true)}
                className="bg-white text-emerald-800 font-bold px-6 py-2.5 rounded-xl hover:bg-emerald-50 transition-all shadow-md active:scale-95 text-sm cursor-pointer"
              >
                Continue
              </button>
            </div>
          </div>
        </>
      )}

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-8 space-y-4">
          <div className="space-y-4">
            {steps.map((step) => {
              const isExpanded = !!expandedSteps[step.position];

              return (
                <div
                  key={step.position}
                  className={`border rounded-xl transition-all duration-300 overflow-hidden shadow-sm relative ${
                    step.completed
                      ? "border-emerald-400 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-sky-500/10 shadow-emerald-100"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div
                    onClick={() => toggleExpand(step.position)}
                    className="p-5 flex items-start justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-start space-x-4">
                      <button
                        onClick={(e) => toggleComplete(step.position, e)}
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border transition-all ${
                          step.completed
                            ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:bg-emerald-500/20 dark:border-emerald-500/40 dark:text-emerald-400"
                            : "bg-sky-500/10 border-sky-500 text-sky-600 hover:opacity-80"
                        }`}
                        title={step.completed ? "Mark incomplete" : "Mark complete"}
                      >
                        {step.completed ? (
                          <Check className="w-5 h-5 stroke-[2.5]" />
                        ) : (
                          <span>{step.position}</span>
                        )}
                      </button>

                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                          <span className="text-xs text-slate-500">
                            {step.estimatedTime}
                          </span>

                          {step.completed && (
                            <>
                              <span className="text-slate-300 text-xs">•</span>
                              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Check className="w-3 h-3" /> Completed
                              </span>
                            </>
                          )}
                        </div>

                        <h3
                          className={`text-lg font-bold transition-all ${
                            step.completed
                              ? "line-through text-slate-400"
                              : "text-slate-900"
                          }`}
                        >
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    <div className="text-slate-400 hover:text-slate-600 p-1">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 grid gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="md:col-span-2 space-y-1">
                          <h4 className="text-[11px] font-bold text-black uppercase tracking-wider">
                            DESCRIPTION
                          </h4>
                          <p className="text-sm text-slate-600 leading-relaxed pb-4 md:pb-0">
                            {step.description}
                          </p>
                          <br />
                          <h4 className="text-[11px] font-bold text-black uppercase tracking-wider">
                            WHY THIS MATTERS
                          </h4>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {step.whyItMatters}
                          </p>
                        </div>

                        <div className="space-y-3 flex flex-col justify-end pt-8 md:pt-0 md:pl-6">
                          <div>
                            <button
                              onClick={(e) => toggleComplete(step.position, e)}
                              className={`w-full md:w-auto md:min-w-[160px] hover:cursor-pointer text-xs md:text-sm font-semibold py-2 px-4 rounded-md border transition-all flex items-center justify-center space-x-1.5 ${
                                step.completed
                                  ? "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                                  : "bg-[#0c142b] border-[#0c142b] text-white hover:bg-slate-800 shadow-sm"
                              }`}
                            >
                              {step.completed ? (
                                <>
                                  <span className="text-slate-400">✕</span>
                                  <span>Mark incomplete</span>
                                </>
                              ) : (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Mark complete</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center space-x-2 text-slate-700 text-sm font-bold mb-4">
              <Clock className="w-4 h-4 text-sky-500" />
              <span>Path estimate</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                <div className="text-xl font-black text-slate-900">
                  {totalTime} {unit}
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  focused learning
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                <div className="text-xl font-black text-slate-900">
                  {currentPath!.formData.desiredTimeframe}
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  target window
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}