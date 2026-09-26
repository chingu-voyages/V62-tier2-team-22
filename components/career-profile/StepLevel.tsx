"use client";

import { learningPathRequest } from "../../schemas/formSchemas"; 
type FieldValue = string | string[] | number | undefined;

interface StepLevelProps {
  formData: learningPathRequest;
  onChange: (field: keyof learningPathRequest, value: FieldValue) => void;
  errors?: { [key: string]: string };
}

export default function StepLevel({ formData, onChange, errors }: StepLevelProps) {
  const hasExpError = !!errors?.relevantExperience;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-800 mb-1">
          Relevant experience <span className="text-cyan-600">*</span>
        </label>
        <p className="text-xs text-slate-400 mb-2">Mention 1-2 real projects, apps shipped, or production systems you've worked on</p>
        <textarea
          rows={3}
          value={formData.relevantExperience || ""}
          onChange={(e) => onChange("relevantExperience", e.target.value)}
          placeholder="I shipped a React dashboard and collaborated with a backend team..."
          className={`w-full bg-white rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none transition text-sm resize-none border ${
            hasExpError
              ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              : "border-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          }`}
        />
        {hasExpError && (
          <p className="text-xs font-medium text-rose-500 mt-1.5">
            * Relevant experience is required.
          </p>
        )}
      </div>

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