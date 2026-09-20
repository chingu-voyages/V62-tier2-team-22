"use client";

import { Check } from "lucide-react";
import { learningPathRequest } from "../../schemas/formSchemas"; 
type FieldValue = string | string[] | number | undefined;

interface StepGoalProps {
  formData: learningPathRequest;
  onChange: (field: keyof learningPathRequest, value: FieldValue) => void;
  errors?: { [key: string]: string };
}

const levels = [
  { id: "beginner", label: "Beginner" },
  { id: "early_career", label: "Early career" },
  { id: "mid_level", label: "Mid-level" },
  { id: "senior", label: "Senior" },
  { id: "switching", label: "Switching" },
];

export default function StepGoal({ formData, onChange, errors }: StepGoalProps) {
  const hasTargetRoleError = !!errors?.targetRole;

  return (
    <div className="space-y-6">
      {/* Target Role Input */}
      <div>
        <label className="block text-sm font-medium text-slate-800 mb-1">
          Target role <span className="text-rose-500">*</span>
        </label>
        <p className="text-xs text-slate-400 mb-2">Be specific enough to shape the skill model</p>
        <input
          type="text"
          value={formData.targetRole || ""}
          onChange={(e) => onChange("targetRole", e.target.value)}
          placeholder="e.g. Front end, AI Product Engineer"
          className={`w-full bg-white border rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none transition text-sm ${
            hasTargetRoleError
              ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              : "border-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          }`}
        />
        {hasTargetRoleError && (
          <p className="text-xs font-medium text-rose-500 mt-1.5">
            * Target role is required.
          </p>
        )}
      </div>

      {/* Current Level Grid */}
      <div>
        <label className="block text-sm font-medium text-slate-800 mb-3">
          Current level <span className="text-cyan-600">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {levels.map((lvl) => {
            const isSelected = formData.currentLevel === lvl.id;
            return (
              <button
                key={lvl.id}
                type="button"
                onClick={() => onChange("currentLevel", lvl.id)}
                className={`p-4 rounded-lg border text-left flex items-center justify-between transition ${
                  isSelected
                    ? "bg-cyan-50/50 border-cyan-400 text-slate-900"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                <span className="text-sm font-medium">{lvl.label}</span>
                {isSelected && <Check className="w-4 h-4 text-cyan-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}