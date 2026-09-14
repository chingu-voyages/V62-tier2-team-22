"use client";

import { useState } from "react";
import Link from "next/link";

interface FormData {
  targetRole: string;
  currentLevel: string;
  background: string;
  skills: string[];
  relevantExperience: string;
  whyGoalMatters: string;
  availableTime: number;
  desiredTimeframe: string;
  learningPreference: string;
}

interface FormErrors {
  targetRole?: string;
  currentLevel?: string;
  background?: string;
  skills?: string;
}

interface SequenceModule {
  id: string;
  num: string;
  tag: string;
  title: string;
  detail: string;
  whyMatters: string;
  isCompleted: boolean;
  resources: { title: string; type: string }[];
}

const INITIAL_SKILLS = [
  "JavaScript", "TypeScript", "React", "Python", 
  "SQL", "Git", "Cloud", "UX Research", "Data Analysis", "APIs"
];

const INITIAL_MODULES: SequenceModule[] = [
  {
    id: "mod-1",
    num: "01",
    tag: "FOUNDATION",
    title: "Systems thinking for modern products",
    detail: "8 hours · Foundation",
    whyMatters: "Build the technical reasoning expected of a Front end, while connecting concepts to your Website.",
    isCompleted: true,
    resources: [
      { title: "Systems Design Primer", type: "Guide" },
      { title: "Architecture field notes", type: "Practice" },
    ],
  },
  {
    id: "mod-2",
    num: "02",
    tag: "CORE CAPABILITY",
    title: "Applied TypeScript & API design",
    detail: "14 hours · Intermediate",
    whyMatters: "Master strong typing patterns and REST/GraphQL interface architecture.",
    isCompleted: false,
    resources: [
      { title: "Advanced TypeScript Patterns", type: "Guide" },
      { title: "RESTful API Design Best Practices", type: "Practice" },
    ],
  },
  {
    id: "mod-3",
    num: "03",
    tag: "SPECIALIZATION",
    title: "Front end workflow laboratory",
    detail: "18 hours · Intermediate",
    whyMatters: "Optimize rendering performance and build reusable UI component libraries.",
    isCompleted: false,
    resources: [
      { title: "Next.js App Router In-Depth", type: "Course" },
      { title: "Performance Profiling Masterclass", type: "Lab" },
    ],
  },
  {
    id: "mod-4",
    num: "04",
    tag: "EVIDENCE",
    title: "Portfolio proof project",
    detail: "24 hours · Advanced",
    whyMatters: "Deliver a production-ready application demonstrating full domain mastery.",
    isCompleted: false,
    resources: [
      { title: "Capstone Architecture Spec", type: "Project" },
    ],
  },
];

export default function CareerProfilePage() {
  const [step, setStep] = useState<number>(1);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // States for interactive UI elements
  const [activeTab, setActiveTab] = useState<"profile" | "path" | "progress">("profile");
  const [modules, setModules] = useState<SequenceModule[]>(INITIAL_MODULES);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>("mod-1");
  const [showProgressModal, setShowProgressModal] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState<FormData>({
    targetRole: "",
    currentLevel: "",
    background: "",
    skills: ["TypeScript", "Python"],
    relevantExperience: "",
    whyGoalMatters: "",
    availableTime: 8,
    desiredTimeframe: "4 months",
    learningPreference: "Project-based",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const toggleSkill = (skill: string) => {
    setFormData((prev) => {
      const exists = prev.skills.includes(skill);
      const newSkills = exists
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];
      
      if (newSkills.length > 0 && errors.skills) {
        setErrors((err) => ({ ...err, skills: undefined }));
      }
      return { ...prev, skills: newSkills };
    });
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {};

    if (currentStep === 1) {
      if (!formData.targetRole.trim()) {
        newErrors.targetRole = "Please enter a career goal before generating your path.";
      }
      if (!formData.currentLevel) {
        newErrors.currentLevel = "Please select your current skill level.";
      }
    }

    if (currentStep === 2) {
      if (!formData.background.trim()) {
        newErrors.background = "Please enter your background and existing skills.";
      }
      if (formData.skills.length === 0) {
        newErrors.skills = "Please select at least one skill you can already use.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleStartAnalysis = () => {
    if (!validateStep(step)) return;

    setIsAnalyzing(true);
    setTimeout(() => setAnalysisStep(2), 1000);
    setTimeout(() => setAnalysisStep(3), 2000);
    setTimeout(() => setAnalysisStep(4), 3000);
    setTimeout(() => setAnalysisStep(5), 4000);
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsCompleted(true);
      setActiveTab("path");
    }, 5000);
  };

  const toggleModuleCompletion = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setModules((prev) =>
      prev.map((mod) => (mod.id === id ? { ...mod, isCompleted: !mod.isCompleted } : mod))
    );
  };

  const toggleAccordion = (id: string) => {
    setExpandedModuleId((prev) => (prev === id ? null : id));
  };

  const completedCount = modules.filter((m) => m.isCompleted).length;
  const progressPercent = Math.round((completedCount / modules.length) * 100);

  if (isAnalyzing) {
    return (
      <div className="bg-[#040914] text-white min-h-[calc(100vh-65px)] bg-grid-pattern flex flex-col items-center justify-center p-6 relative">
        <div className="text-center max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto mb-6 text-2xl animate-pulse">
            ⌂
          </div>
          
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">
            Masari ANALYSIS ENGINE
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Constructing your route to {formData.targetRole || "Target Role"}
          </h2>

          <p className="text-slate-400 text-sm mb-10">
            Your answers are being translated into a capability model and realistic sequence.
          </p>

          <div className="bg-[#071124] border border-slate-800 rounded-xl p-6 space-y-4 text-left">
            {[
              "Analyzing your starting point",
              "Mapping role-critical skills",
              "Identifying capability gaps",
              "Building your learning sequence",
              "Optimizing for your weekly schedule",
            ].map((label, index) => {
              const stepNum = index + 1;
              const isDone = analysisStep > stepNum;
              const isCurrent = analysisStep === stepNum;

              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isDone
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : isCurrent
                          ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 animate-pulse"
                          : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {isDone ? "✓" : stepNum}
                    </div>
                    <span
                      className={`text-sm ${
                        isDone || isCurrent ? "text-slate-200 font-medium" : "text-slate-500"
                      }`}
                    >
                      {label}
                    </span>
                  </div>

                  {isCurrent && (
                    <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-mono animate-pulse">
                      PROCESSING
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-xs text-slate-500 mt-6">
            Keep this tab open · typically under 10 seconds
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Sub-Header Navigation bar for Learning Path & Progress */}
      <div className="bg-[#040914] text-white border-b border-slate-800 px-6 py-2.5 flex items-center justify-between">
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                activeTab === "profile" ? "bg-slate-800 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              Career profile
            </button>
            <button
              onClick={() => isCompleted && setActiveTab("path")}
              disabled={!isCompleted}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                activeTab === "path"
                  ? "bg-slate-800 text-white font-bold"
                  : isCompleted
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-600 cursor-not-allowed"
              }`}
            >
              Learning path
            </button>
            <button
              onClick={() => isCompleted && setActiveTab("progress")}
              disabled={!isCompleted}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                activeTab === "progress"
                  ? "bg-slate-800 text-white font-bold"
                  : isCompleted
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-600 cursor-not-allowed"
              }`}
            >
              Progress
            </button>
          </div>

          {isCompleted && (
            <div className="flex items-center gap-4 text-xs">
              <span className="text-cyan-400 font-semibold">{progressPercent}% complete</span>
              <button
                onClick={() => {
                  setIsCompleted(false);
                  setStep(1);
                  setActiveTab("profile");
                }}
                className="text-slate-400 hover:text-white flex items-center gap-1"
              >
                🔄 Start over
              </button>
            </div>
          )}
        </div>
      </div>

      {/* RENDER FORM IF ACTIVE TAB IS PROFILE OR NOT COMPLETED */}
      {(!isCompleted || activeTab === "profile") && (
        <div className="max-w-4xl mx-auto px-6 pt-10">
          <div className="text-xs font-bold text-cyan-600 uppercase tracking-wider mb-1">
            CAREER PROFILE
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
            Let’s understand where you’re headed.
          </h1>
          <p className="text-slate-500 text-sm mb-8">
            Your answers shape the sequence, pace, and depth of your path.
          </p>

          <div className="bg-slate-100/80 p-2 rounded-xl border border-slate-200/80 mb-8 grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { num: "01", title: "Destination" },
              { num: "02", title: "Starting point" },
              { num: "03", title: "Your context" },
              { num: "04", title: "Learning mode" },
            ].map((s, idx) => {
              const stepNum = idx + 1;
              const isActive = step === stepNum;
              const isDone = step > stepNum;

              return (
                <div
                  key={s.num}
                  onClick={() => isDone && setStep(stepNum)}
                  className={`p-3 rounded-lg flex items-center justify-between text-xs font-medium transition ${
                    isActive
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200 font-bold"
                      : isDone
                      ? "text-slate-700 cursor-pointer hover:bg-white/50"
                      : "text-slate-400"
                  }`}
                >
                  <div className="flex items-center gap-2">
                     {isDone && <span  className="text-emerald-600 font-bold ,text-slate-400">{s.num}</span>}
                     {isDone && <span  className="text-emerald-600 font-bold ,text-slate-400">{s.title}</span>}
                     {!isDone && <span  className="text-slate-400">{s.title}</span>}

                  </div>
                  {isDone && <span className="text-emerald-600 font-bold">✓</span>}
                </div>
              );
            })}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">STEP 1 OF 4</div>
                    <h2 className="text-2xl font-bold text-slate-900 mt-1">Where do you want to go?</h2>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center text-lg">🎯</div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    Target role <span className="text-cyan-600">*</span>
                  </label>
                  <p className="text-xs text-slate-400">Be specific enough to shape the skill model</p>
                  <input
                    type="text"
                    placeholder="e.g. Front end, AI Product Engineer"
                    value={formData.targetRole}
                    onChange={(e) => {
                      setFormData({ ...formData, targetRole: e.target.value });
                      if (errors.targetRole) setErrors({ ...errors, targetRole: undefined });
                    }}
                    className={`w-full px-4 py-3 rounded-lg border text-sm text-slate-900 focus:outline-none transition ${
                      errors.targetRole ? "border-red-500 bg-red-50/30" : "border-slate-200 focus:border-cyan-500"
                    }`}
                  />
                  {errors.targetRole && <p className="text-xs text-red-500 font-medium">{errors.targetRole}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    Current level <span className="text-cyan-600">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {["Beginner", "Early career", "Mid-level", "Senior / switching"].map((level) => {
                      const isSelected = formData.currentLevel === level;
                      return (
                        <button
                          key={level}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, currentLevel: level });
                            if (errors.currentLevel) setErrors({ ...errors, currentLevel: undefined });
                          }}
                          className={`p-4 rounded-lg border text-left text-sm font-semibold flex items-center justify-between transition ${
                            isSelected
                              ? "border-cyan-500 bg-cyan-50/40 text-slate-900"
                              : "border-slate-200 hover:border-slate-300 text-slate-700"
                          }`}
                        >
                          <span>{level}</span>
                          {isSelected && <span className="text-cyan-600">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                  {errors.currentLevel && <p className="text-xs text-red-500 font-medium">{errors.currentLevel}</p>}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">STEP 2 OF 4</div>
                    <h2 className="text-2xl font-bold text-slate-900 mt-1">What do you already know?</h2>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center text-lg">📚</div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    Background <span className="text-cyan-600">*</span>
                  </label>
                  <p className="text-xs text-slate-400">Education, work, or projects that shaped your starting point</p>
                  <textarea
                    rows={3}
                    placeholder="Website..."
                    value={formData.background}
                    onChange={(e) => {
                      setFormData({ ...formData, background: e.target.value });
                      if (errors.background) setErrors({ ...errors, background: undefined });
                    }}
                    className={`w-full px-4 py-3 rounded-lg border text-sm text-slate-900 focus:outline-none transition ${
                      errors.background ? "border-red-500 bg-red-50/30" : "border-slate-200 focus:border-cyan-500"
                    }`}
                  />
                  {errors.background && <p className="text-xs text-red-500 font-medium">{errors.background}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    Skills you can already use <span className="text-cyan-600">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {INITIAL_SKILLS.map((skill) => {
                      const isSelected = formData.skills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`px-4 py-2 rounded-full text-xs font-semibold border transition flex items-center gap-1.5 ${
                            isSelected
                              ? "border-cyan-500 bg-cyan-50 text-cyan-900"
                              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          {isSelected && <span className="text-cyan-600 font-bold">✓</span>}
                          <span>{skill}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.skills && <p className="text-xs text-red-500 font-medium">{errors.skills}</p>}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">STEP 3 OF 4</div>
                    <h2 className="text-2xl font-bold text-slate-900 mt-1">What experience do you bring?</h2>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center text-lg">📖</div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    Relevant experience <span className="text-cyan-600">*</span>
                  </label>
                  <p className="text-xs text-slate-400">One or two examples are enough</p>
                  <textarea
                    rows={3}
                    placeholder="React dashboard"
                    value={formData.relevantExperience}
                    onChange={(e) => setFormData({ ...formData, relevantExperience: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">Why this goal matters to you</label>
                  <p className="text-xs text-slate-400">Optional, but it helps us prioritize the path</p>
                  <textarea
                    rows={3}
                    placeholder="I want to move into work where I can..."
                    value={formData.whyGoalMatters}
                    onChange={(e) => setFormData({ ...formData, whyGoalMatters: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">STEP 4 OF 4</div>
                    <h2 className="text-2xl font-bold text-slate-900 mt-1">How do you want to learn?</h2>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center text-lg">📖</div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-800">
                    Available time · <span className="text-slate-900 font-extrabold">{formData.availableTime} hours/week</span> <span className="text-cyan-600">*</span>
                  </label>
                  <input
                    type="range"
                    min={2}
                    max={20}
                    step={1}
                    value={formData.availableTime}
                    onChange={(e) => setFormData({ ...formData, availableTime: Number(e.target.value) })}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-medium">
                    <span>2h</span>
                    <span>20h</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    Desired timeframe <span className="text-cyan-600">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["2 months", "4 months", "6 months", "Flexible"].map((timeframe) => {
                      const isSelected = formData.desiredTimeframe === timeframe;
                      return (
                        <button
                          key={timeframe}
                          type="button"
                          onClick={() => setFormData({ ...formData, desiredTimeframe: timeframe })}
                          className={`p-4 rounded-lg border text-left text-sm font-semibold flex items-center justify-between transition ${
                            isSelected
                              ? "border-cyan-500 bg-cyan-50/40 text-slate-900"
                              : "border-slate-200 hover:border-slate-300 text-slate-700"
                          }`}
                        >
                          <span>{timeframe}</span>
                          {isSelected && <span className="text-cyan-600">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    Learning preference <span className="text-cyan-600">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Project-based", "Structured lessons", "Reading-first", "Mixed"].map((pref) => {
                      const isSelected = formData.learningPreference === pref;
                      return (
                        <button
                          key={pref}
                          type="button"
                          onClick={() => setFormData({ ...formData, learningPreference: pref })}
                          className={`p-4 rounded-lg border text-left text-sm font-semibold flex items-center justify-between transition ${
                            isSelected
                              ? "border-cyan-500 bg-cyan-50/40 text-slate-900"
                              : "border-slate-200 hover:border-slate-300 text-slate-700"
                          }`}
                        >
                          <span>{pref}</span>
                          {isSelected && <span className="text-cyan-600">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-8 border-t border-slate-100 mt-8">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-slate-600 hover:text-slate-900 text-sm font-semibold px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
                >
                  Back
                </button>
              ) : <div />}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#0b1426] hover:bg-slate-800 text-white text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition"
                >
                  Continue &rarr;
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStartAnalysis}
                  className="bg-[#0b1426] hover:bg-slate-800 text-white text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition"
                >
                  ✦ Analyze my profile
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* RENDER LEARNING PATH RESULT WHEN COMPLETED AND ACTIVE TAB IS PATH */}
      {isCompleted && (activeTab === "path" || activeTab === "progress") && (
        <div>
          {/* Top Header Card */}
          <div className="bg-[#040914] text-white pt-10 pb-12 px-6 border-b border-slate-800">
            <div className="max-w-4xl mx-auto">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">
                YOUR PERSONALIZED TRAJECTORY
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
                {formData.currentLevel || "Early career"} &rarr; {formData.targetRole || "Front end"}
              </h1>
              <p className="text-slate-400 text-sm md:text-base mb-8">
                A {formData.desiredTimeframe} path built around {formData.availableTime} hours per week, using a {formData.learningPreference.toLowerCase()} approach.
              </p>

              {/* Path Progress Bar Card with Interactive Modal Toggle */}
              <div className="bg-[#081329] border border-slate-800 rounded-lg p-5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                  <span>Path progress</span>
                  <span className="text-cyan-400">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <button
                  onClick={() => setShowProgressModal(!showProgressModal)}
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1 transition font-medium"
                >
                  Open progress view &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Modal / Panel for Progress View */}
          {showProgressModal && (
            <div className="bg-cyan-950/20 border-b border-cyan-500/20 py-4 px-6">
              <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-slate-300">
                <span>Completed modules: <strong>{completedCount} of {modules.length}</strong></span>
                <button
                  onClick={() => setShowProgressModal(false)}
                  className="text-cyan-400 hover:underline font-semibold"
                >
                  Close view
                </button>
              </div>
            </div>
          )}

          {/* Main Path Content */}
          <div className="max-w-4xl mx-auto px-6 pt-10 space-y-8">
            {/* Skill Gap Model */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="text-xs font-bold text-cyan-600 uppercase tracking-wider mb-1">
                SKILL GAP MODEL
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-6">Current &rarr; target</h3>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                    TRANSFERABLE STRENGTHS
                  </span>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>TypeScript</span>
                        <span className="text-emerald-600">86%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="w-[86%] h-full bg-emerald-500 rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Python</span>
                        <span className="text-emerald-600">77%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="w-[77%] h-full bg-emerald-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                    PRIORITY GAPS
                  </span>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Systems design</span>
                        <span className="text-indigo-600">28%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="w-[28%] h-full bg-indigo-500 rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>AI integration</span>
                        <span className="text-indigo-600">36%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="w-[36%] h-full bg-indigo-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 pt-2 border-t border-slate-100">
                  Your path reuses strong foundations and concentrates effort where the target role demands it.
                </p>
              </div>
            </div>

            {/* Time Estimates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-400 font-medium mb-1">⏱ Path estimate</div>
                <div className="text-3xl font-extrabold text-slate-900">71h</div>
                <div className="text-xs text-slate-400 mt-1">focused learning</div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-400 font-medium mb-1">Target timeframe</div>
                <div className="text-3xl font-extrabold text-slate-900">{formData.desiredTimeframe}</div>
                <div className="text-xs text-slate-400 mt-1">target window</div>
              </div>
            </div>

            {/* LEARNING SEQUENCE ACCORDIONS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider block">
                    LEARNING SEQUENCE
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">The shortest credible route</h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {completedCount} of {modules.length} complete
                </span>
              </div>

              {modules.map((mod) => {
                const isExpanded = expandedModuleId === mod.id;

                return (
                  <div
                    key={mod.id}
                    className={`bg-white rounded-xl border transition shadow-sm overflow-hidden ${
                      isExpanded ? "border-2 border-cyan-500/50" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {/* Accordion Header */}
                    <div
                      onClick={() => toggleAccordion(mod.id)}
                      className="p-5 flex items-center justify-between cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          onClick={(e) => toggleModuleCompletion(mod.id, e)}
                          title={mod.isCompleted ? "Mark incomplete" : "Mark complete"}
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition cursor-pointer ${
                            mod.isCompleted
                              ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                              : "border border-slate-300 text-slate-400 hover:border-cyan-500 hover:text-cyan-600"
                          }`}
                        >
                          {mod.isCompleted ? "✓" : mod.num}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold text-cyan-700 uppercase bg-cyan-50 px-1.5 py-0.5 rounded">
                              {mod.tag}
                            </span>
                            <span className="text-xs text-slate-400">{mod.detail}</span>
                          </div>
                          <h4 className="text-sm md:text-base font-bold text-slate-900 mt-0.5">
                            {mod.title}
                          </h4>
                        </div>
                      </div>

                      <div className="text-slate-400 text-xs font-bold transition-transform duration-200">
                        {isExpanded ? "▲" : "▼"}
                      </div>
                    </div>

                    {/* Accordion Body Details (If Expanded) */}
                    {isExpanded && (
                      <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-4 text-xs">
                        <div>
                          <span className="font-bold text-slate-400 uppercase block mb-1">
                            WHY THIS MATTERS
                          </span>
                          <p className="text-slate-600 font-medium">{mod.whyMatters}</p>
                        </div>

                        {mod.resources.length > 0 && (
                          <div>
                            <span className="font-bold text-slate-400 uppercase block mb-2">
                              RECOMMENDED RESOURCES
                            </span>
                            <div className="space-y-2">
                              {mod.resources.map((res, rIdx) => (
                                <div
                                  key={rIdx}
                                  className="p-3 rounded-lg border border-slate-200 flex items-center justify-between hover:border-cyan-500 hover:bg-cyan-50/20 cursor-pointer transition"
                                >
                                  <span className="font-semibold text-slate-800">
                                    📖 {res.title} <span className="text-slate-400 font-normal">({res.type})</span>
                                  </span>
                                  <span className="text-slate-400">&rarr;</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-end pt-2 border-t border-slate-100">
                          <button
                            onClick={(e) => toggleModuleCompletion(mod.id, e)}
                            className={`text-xs font-semibold border rounded-md px-3 py-1.5 transition ${
                              mod.isCompleted
                                ? "text-slate-600 border-slate-300 hover:bg-slate-100"
                                : "text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
                            }`}
                          >
                            {mod.isCompleted ? "✕ Mark incomplete" : "✓ Mark complete"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}