"use client";

import { useState } from "react";
import StepGoal from "@/components/career-profile/StepGoal";
import StepLevel from "@/components/career-profile/StepLevel";
import StepBackground from "@/components/career-profile/StepBackground";
import StepCommitment from "@/components/career-profile/StepCommitment";
import { saveCareerProfile } from "@/lib/actions/profile";
import { CareerProfileInput } from "@/lib/validations/profile";
import { Check, Compass, Layers, BookOpen, Target } from "lucide-react";

type FieldValue = string | string[] | number | undefined;

const STEPS = [
  { id: 1, title: "Destination", num: "01", heading: "Where do you want to go?", icon: Target, comp: StepGoal },
  { id: 2, title: "Starting point", num: "02", heading: "What do you already know?", icon: Layers, comp: StepBackground },
  { id: 3, title: "Your context", num: "03", heading: "What experience do you bring?", icon: BookOpen, comp: StepLevel },
  { id: 4, title: "Learning mode", num: "04", heading: "How do you want to learn?", icon: Compass, comp: StepCommitment },
];

export default function CareerProfilePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CareerProfileInput>({
    targetRole: "", currentLevel: "", background: "", skills: [],
    relevantExperience: "", whyGoalMatters: "", availableTime: "8", desiredTimeframe: "", learningPreference: "",
  });

  const updateField = (field: keyof CareerProfileInput, value: FieldValue) => setFormData((prev) => ({ ...prev, [field]: value }));

  const isStepValid = () => {
    if (step === 1) return formData.targetRole?.trim() !== "" && formData.currentLevel !== "";
    if (step === 2) return formData.background?.trim() !== "" && (formData.skills?.length ?? 0) > 0;
    if (step === 3) return formData.relevantExperience?.trim() !== "";
    return formData.availableTime !== "" && formData.desiredTimeframe !== "" && formData.learningPreference !== "";
  };

  const handleSubmit = async () => {
    setLoading(true);
    try { await saveCareerProfile(formData); }
    catch (err) { alert(err instanceof Error ? err.message : "An unexpected error occurred"); }
    finally { setLoading(false); }
  };

  const curr = STEPS[step - 1];
  const StepComp = curr.comp;
  const StepIcon = curr.icon;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-20">
      <div className="max-w-4xl mx-auto pt-10 px-6 mb-8">
        <span className="text-xs font-bold tracking-wider text-cyan-600 uppercase">CAREER PROFILE</span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Let’s understand where you’re headed.</h1>
        <p className="text-slate-500 text-sm mt-1">Your answers shape the sequence, pace, and depth of your path.</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200/80 p-2 shadow-sm space-y-1">
          {STEPS.map((s) => (
            <div key={s.id} className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors ${step === s.id ? "bg-slate-50 font-semibold text-slate-900 border-l-2 border-cyan-500" : "text-slate-500"}`}>
              <div className="flex items-center gap-3">
                <span className={`text-xs ${step === s.id ? "text-cyan-600 font-bold" : "text-slate-400"}`}>{s.num}</span>
                <span>{s.title}</span>
              </div>
              {step > s.id && <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm relative">
          <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <StepIcon className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">STEP {step} OF 4</span>
          <h2 className="text-xl font-bold text-slate-900 mt-2 mb-6">{curr.heading}</h2>

          <StepComp formData={formData} onChange={updateField} />

          <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
            {step > 1 ? <button type="button" onClick={() => setStep((s) => s - 1)} className="text-slate-600 hover:text-slate-900 text-sm font-medium transition px-2 py-1 cursor-pointer">Back</button> : <div />}
            <button type="button" onClick={step < 4 ? () => setStep((s) => s + 1) : handleSubmit} disabled={loading || !isStepValid()} className="bg-[#0F172A] hover:bg-slate-800 text-white font-medium px-6 py-2.5 rounded-lg text-sm flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer">
              {step < 4 ? "Continue →" : loading ? "Analyzing..." : "Analyze my profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}