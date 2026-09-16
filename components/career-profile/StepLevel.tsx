"use client";

import { CareerProfileInput } from "@/lib/validations/profile";

type FieldValue = string | string[] | number | undefined;

interface StepLevelProps {
  formData: CareerProfileInput;
  onChange: (field: keyof CareerProfileInput, value: FieldValue) => void;
}

export default function StepLevel({ formData, onChange }: StepLevelProps) {
  return (
    <div className="space-y-6">
      {/* Relevant Experience Input */}
      <div>
        <label className="block text-sm font-medium text-slate-800 mb-1">
          Relevant experience <span className="text-cyan-600">*</span>
        </label>
        <p className="text-xs text-slate-400 mb-2">One or two examples are enough</p>
        <textarea
          rows={3}
          value={formData.relevantExperience || ""}
          onChange={(e) => onChange("relevantExperience", e.target.value)}
          placeholder="e.g. React dashboard, REST API integration"
          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition text-sm resize-none"
        />
      </div>

      {/* Why Goal Matters Input */}
      <div>
        <label className="block text-sm font-medium text-slate-800 mb-1">
          Why this goal matters to you
        </label>
        <p className="text-xs text-slate-400 mb-2">Optional, but it helps us prioritize the path</p>
        <textarea
          rows={3}
          value={formData.whyGoalMatters || ""}
          onChange={(e) => onChange("whyGoalMatters", e.target.value)}
          placeholder="I want to move into work where I can..."
          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition text-sm resize-none"
        />
      </div>
    </div>
  );
}