"use client";

import {retrieveCurrentPath} from '@/lib/storage'
import { PathStep } from "@/schemas/learningPathSchemas";
import React, { useState,useEffect } from "react";
import { PathInformation } from '@/schemas/learningPathSchemas';
import {
  ChevronDown,
  ChevronUp,
  Check,
  BookOpen,
  ArrowRight,
  Sparkles,
  Clock,
} from "lucide-react";
import Link from 'next/link';

interface Resource {
  title: string;
  type: string;
  url?: string;
}




export default function LearningPath() {
  const [steps,setSteps] = useState<PathStep[]>([]);
  const [currentPath,setCurrentPath] = useState<PathInformation>();
  const [isLoading,setIsLoading] = useState(true)
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({
	1: true,
  });

  useEffect(() => {
    // 1. Safe to access localStorage on the client inside useEffect
    const path = retrieveCurrentPath();

    if (path) {
      setCurrentPath(path);
	  setSteps(path.steps)
    }
    
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading learning path...</div>;
  }

  if (!steps.length) {
    return <div>No learning path found. Please generate one first.</div>;
  }

  const completedCount = steps.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const toggleExpand = (position:number) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [position]: !prev[position],
    }));
  };

  const toggleComplete = (position: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSteps((prev) =>
      prev.map((step) => (step.position === position ? { ...step, completed: !step.completed } : step))
    );
  };


  const totalTime= currentPath!.steps.reduce((sum,num)=>sum+Number(num.estimatedTime.split(' ')[0]),0)
  const unit=currentPath!.steps[0].estimatedTime.split(' ')[1]

  return (
    
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 pb-16">
      {/* Top Header Bar */}
      {/* Hero Banner Header */}
      <div className="bg-[#0b1329] text-white px-6 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-sky-400 uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Your Personalized Trajectory</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {currentPath!.formData.currentLevel.toUpperCase()}<span className="text-slate-400 font-normal">→</span> {currentPath!.formData.targetRole.toUpperCase()}
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              A {currentPath!.formData.desiredTimeframe} path built around {currentPath!.formData.availableTime} hours per week{currentPath!.formData.learningPreference?`, using a ${currentPath!.formData.learningPreference} learning preference.`:'.'}
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
            <Link 
  href="/progress" 
  className="w-full text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 py-2 rounded flex items-center justify-center space-x-1 border border-slate-700/50 transition-colors"
>
  <span>Open progress view</span>
  <ArrowRight className="w-3.5 h-3.5 ml-1" />
</Link>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Skill Gap Model Box */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] font-bold text-sky-600 tracking-wider uppercase">Skill Gap Model</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">Current → target</h3>
              </div>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="oklch(64% 0.17 219)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gauge size-5 text-signal-strong" aria-hidden="true">
  <path d="m12 14 4-4"></path>
  <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
</svg>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Transferable Strengths</div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-700">Cloud</span>
                      <span className="text-emerald-600 font-semibold">86%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "86%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Priority Gaps</div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-700">Systems design</span>
                      <span className="text-slate-400">28%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="bg-indigo-300 h-1.5 rounded-full" style={{ width: "28%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-700">AI integration</span>
                      <span className="text-slate-400">36%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="bg-indigo-300 h-1.5 rounded-full" style={{ width: "36%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-700">Technical leadership</span>
                      <span className="text-slate-400">44%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="bg-indigo-300 h-1.5 rounded-full" style={{ width: "44%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 pt-3 border-t border-slate-100 leading-relaxed">
                Your path reuses strong foundations and concentrates effort where the target role demands it.
              </p>
            </div>
          </div>

          {/* Path Estimate Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center space-x-2 text-slate-700 text-sm font-bold mb-4">
<Clock className="w-4 h-4 text-signal-strong" />              
<span>Path estimate</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                <div className="text-xl font-black text-slate-900">{totalTime} {unit}</div>
                <div className="text-[11px] text-slate-500 font-medium">focused learning</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                <div className="text-xl font-black text-slate-900">{currentPath!.formData.desiredTimeframe}</div>
                <div className="text-[11px] text-slate-500 font-medium">target window</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Main Sequence List */}
        <section className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="text-[11px] font-bold text-sky-600 tracking-wider uppercase">Learning Sequence</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-0.5">The shortest credible route</h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {completedCount} of {steps.length} complete
            </span>
          </div>

          {/* steps Accordion List */}
          <div className="space-y-4">
            {steps.map((step) => {
              const isExpanded = !!expandedSteps[step.position];

              return (
                <div
                  key={step.position}
                  className={`bg-white border rounded-xl transition-all duration-200 overflow-hidden shadow-sm ${
                    step.completed
                      ? "border-emerald-200 bg-emerald-50/10"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {/* step Header Bar */}
                  <div
                    onClick={() => toggleExpand(step.position)}
                    className="p-5 flex items-start justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-start space-x-4 ">
                      {/* Badge / Number Circle */}
                      <button
                        onClick={(e) => toggleComplete(step.position, e)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border transition-all ${
                          step.completed
                            ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:bg-emerald-500/20 dark:border-emerald-500/40 dark:text-emerald-400"
                            : "bg-(--signal-strong)/10 border-(--signal-strong) text-(--signal-strong) hover:opacity-80"
                        }`}
                        title={step.completed ? "Mark incomplete" : "Mark complete"}
                      >
                        {step.completed ? (
                          <Check className="w-5 h-5 stroke-[2.5]" />
                        ) : (
                          <span>{step.position}</span>
                        )}
                      </button>

                      {/* Info & Title */}
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                          <span className="text-xs  text-slate-500">
                            {step.estimatedTime}
                          </span>
                          <span className="text-slate-300 text-xs">•</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 transition-colors">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    {/* Expand Chevron Icon */}
                    <div className="text-slate-400 hover:text-slate-600 p-1">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>

                  {/* step Expanded Details */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100  grid  gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 ">
                        {/* Why This Matters */}
                        <div className="md:col-span-2 space-y-1">
                          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            WHY THIS MATTERS
                          </h4>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {step.whyItMatters}
                          </p>
						  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
							DESCRIPTION
						  </h4>
						  <p className="text-sm text-slate-600 leading-relaxed pb-4 md:pb-0">
							{step.description}
						  </p>
                        </div>

                        <div className="space-y-3 flex flex-col justify-between">
                          <div>
                            <button
                              onClick={(e) => toggleComplete(step.position, e)}
                              className={`w-full hover:cursor-pointer text-xs font-semibold py-2 px-4 rounded-md border transition-all flex items-center justify-center space-x-1.5 ${
                                step.completed
                                  ? "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                                  : "bg-[#0c142b] border-[#0c142b] text-white hover:bg-slate-800 shadow-sm"
                              }`}
                            >
                              {step.completed ? (
                                <>
                                  <span className="text-slate-400 ">✕</span>
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
      </main>
    </div>
    
  );
}