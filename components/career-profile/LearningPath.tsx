"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Check,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Clock,
} from "lucide-react";

interface Resource {
  title: string;
  type: string;
  url?: string;
}

interface Module {
  id: string;
  badge: string;
  badgeColor: string;
  hours: string;
  level: string;
  title: string;
  whyItMatters: string;
  dependsOn: string;
  resources: Resource[];
  completed: boolean;
}

const initialModules: Module[] = [
  {
    id: "01",
    badge: "FOUNDATION",
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
    hours: "8 hours",
    level: "Foundation",
    title: "Systems thinking for modern products",
    whyItMatters:
      "Build the technical reasoning expected of a Front end, while connecting concepts to your Website.",
    dependsOn: "None",
    resources: [
      { title: "Systems Design Primer", type: "Guide" },
      { title: "Architecture field guide", type: "Docs" },
    ],
    completed: true,
  },
  {
    id: "02",
    badge: "CORE CAPABILITY",
    badgeColor: "bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300",
    hours: "14 hours",
    level: "Intermediate",
    title: "Applied TypeScript & API design",
    whyItMatters:
      "Close a high-impact implementation gap and create a reliable base for production work.",
    dependsOn: "Module 01",
    resources: [
      { title: "TypeScript Handbook", type: "Docs" },
      { title: "API contract lab", type: "Project" },
    ],
    completed: false,
  },
  {
    id: "03",
    badge: "SPECIALIZATION",
    badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300",
    hours: "18 hours",
    level: "Intermediate",
    title: "Front end workflow laboratory",
    whyItMatters:
      "Master modern build tools, CI/CD pipelines, and front-end performance profiling.",
    dependsOn: "Module 02",
    resources: [
      { title: "Webpack & Vite Deep Dive", type: "Guide" },
      { title: "CI/CD for Front-end Developers", type: "Course" },
    ],
    completed: false,
  },
  {
    id: "04",
    badge: "EVIDENCE",
    badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
    hours: "24 hours",
    level: "Advanced",
    title: "Portfolio proof project",
    whyItMatters:
      "Synthesize all skills into a complex, production-grade application that showcases your capability.",
    dependsOn: "Module 03",
    resources: [
      { title: "Project Specification", type: "Brief" },
      { title: "Production Deployment Checklist", type: "Docs" },
    ],
    completed: false,
  },
  {
    id: "05",
    badge: "CAREER READINESS",
    badgeColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300",
    hours: "7 hours",
    level: "Focused",
    title: "Interview narratives & gap review",
    whyItMatters:
      "Prepare to articulate technical trade-offs, architecture decisions, and career experience clearly.",
    dependsOn: "Module 04",
    resources: [
      { title: "System Design Interview Prep", type: "Guide" },
      { title: "Behavioral Storytelling", type: "Workshop" },
    ],
    completed: false,
  },
];

export default function LearningPath() {
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    "01": true,
  });

  const completedCount = modules.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / modules.length) * 100);

  const toggleExpand = (id: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleComplete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setModules((prev) =>
      prev.map((mod) => (mod.id === id ? { ...mod, completed: !mod.completed } : mod))
    );
  };

  const handleStartOver = () => {
    setModules((prev) => prev.map((m) => ({ ...m, completed: false })));
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 font-sans pb-16">
      {/* Top Header Bar */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30 px-6 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 font-bold text-xl tracking-tight text-slate-900">
              <span className="bg-slate-900 text-white rounded p-1 text-xs">M</span>
              <span>Masari.</span>
            </div>

            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
              <a href="#" className="hover:text-slate-900 transition-colors">Home</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Career profile</a>
              <a href="#" className="text-slate-900 font-semibold border-b-2 border-slate-900 pb-0.5">Learning path</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Progress</a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm font-semibold text-slate-700">
              {progressPercent}% complete
            </span>
            <button
              onClick={handleStartOver}
              className="flex items-center space-x-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Start over</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner Header */}
      <div className="bg-[#0b1329] text-white px-6 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-sky-400 uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Your Personalized Trajectory</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Early career <span className="text-slate-400 font-normal">→</span> Front end
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              A 4 months path built around 8 hours per week, using a project-based approach.
            </p>
          </div>

          {/* Path Progress Box */}
          <div className="bg-[#121c38] border border-slate-800 rounded-lg p-4 min-w-[280px] w-full md:w-auto shadow-lg">
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
            <button className="w-full text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 py-2 rounded flex items-center justify-center space-x-1 border border-slate-700/50 transition-colors">
              <span>Open progress view</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
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
              <div className="w-6 h-6 rounded-full border-2 border-dashed border-sky-500 flex items-center justify-center text-sky-500 text-xs font-bold">
                C
              </div>
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
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Path estimate</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                <div className="text-xl font-black text-slate-900">71h</div>
                <div className="text-[11px] text-slate-500 font-medium">focused learning</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                <div className="text-xl font-black text-slate-900">4 months</div>
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
              {completedCount} of {modules.length} complete
            </span>
          </div>

          {/* Modules Accordion List */}
          <div className="space-y-4">
            {modules.map((module) => {
              const isExpanded = !!expandedModules[module.id];

              return (
                <div
                  key={module.id}
                  className={`bg-white border rounded-xl transition-all duration-200 overflow-hidden shadow-sm ${
                    module.completed
                      ? "border-emerald-200 bg-emerald-50/10"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {/* Module Header Bar */}
                  <div
                    onClick={() => toggleExpand(module.id)}
                    className="p-5 flex items-start justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-start space-x-4">
                      {/* Badge / Number Circle */}
                      <button
                        onClick={(e) => toggleComplete(module.id, e)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border transition-all ${
                          module.completed
                            ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                            : "bg-white border-slate-300 text-slate-600 hover:border-slate-400"
                        }`}
                        title={module.completed ? "Mark incomplete" : "Mark complete"}
                      >
                        {module.completed ? (
                          <Check className="w-5 h-5 stroke-[2.5]" />
                        ) : (
                          <span>{module.id}</span>
                        )}
                      </button>

                      {/* Info & Title */}
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded tracking-wider ${module.badgeColor}`}>
                            {module.badge}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">
                            {module.hours}
                          </span>
                          <span className="text-slate-300 text-xs">•</span>
                          <span className="text-xs font-semibold text-slate-500">
                            {module.level}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 hover:text-sky-600 transition-colors">
                          {module.title}
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

                  {/* Module Expanded Details */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-5 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Why This Matters */}
                        <div className="md:col-span-2 space-y-1">
                          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            WHY THIS MATTERS
                          </h4>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {module.whyItMatters}
                          </p>
                        </div>

                        {/* Depends On & Action Button */}
                        <div className="space-y-3 flex flex-col justify-between">
                          <div>
                            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                              DEPENDS ON
                            </h4>
                            <p className="text-sm font-medium text-slate-700 mt-1">
                              {module.dependsOn}
                            </p>
                          </div>

                          <div>
                            <button
                              onClick={(e) => toggleComplete(module.id, e)}
                              className={`w-full text-xs font-semibold py-2 px-4 rounded-md border transition-all flex items-center justify-center space-x-1.5 ${
                                module.completed
                                  ? "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                                  : "bg-[#0c142b] border-[#0c142b] text-white hover:bg-slate-800 shadow-sm"
                              }`}
                            >
                              {module.completed ? (
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

                      {/* Recommended Resources List */}
                      {module.resources && module.resources.length > 0 && (
                        <div className="space-y-2 pt-2">
                          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            RECOMMENDED RESOURCES
                          </h4>
                          <div className="space-y-2">
                            {module.resources.map((res, idx) => (
                              <div
                                key={idx}
                                className="border border-slate-200 rounded-lg p-3 flex items-center justify-between hover:border-slate-300 hover:bg-slate-50/50 transition-all group cursor-pointer"
                              >
                                <div className="flex items-center space-x-2.5">
                                  <BookOpen className="w-4 h-4 text-sky-600" />
                                  <span className="text-xs font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">
                                    {res.title}
                                  </span>
                                  <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-medium">
                                    {res.type}
                                  </span>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform group-hover:translate-x-0.5" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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