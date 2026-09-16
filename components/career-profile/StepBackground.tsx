"use client";

import { CareerProfileInput } from "@/lib/validations/profile";
import { Check } from "lucide-react";

type FieldValue = string | string[] | number | undefined;

interface StepBackgroundProps {
  formData: CareerProfileInput;
  onChange: (field: keyof CareerProfileInput, value: FieldValue) => void;
}

const AVAILABLE_SKILLS = [
  "JavaScript", "TypeScript", "React", "Python", "SQL",
  "Git", "Cloud", "UX Research", "Data Analysis", "APIs"
];

export default function StepBackground({ formData, onChange }: StepBackgroundProps) {
  const toggleSkill = (skill: string) => {
    const currentSkills = formData.skills || [];
    if (currentSkills.includes(skill)) {
      onChange("skills", currentSkills.filter((s) => s !== skill));
    } else {
      onChange("skills", [...currentSkills, skill]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Background Input */}
      <div>
        <label className="block text-sm font-medium text-slate-800 mb-1">
          Background <span className="text-cyan-600">*</span>
        </label>
        <p className="text-xs text-slate-400 mb-2">Education, work, or projects that shaped your starting point</p>
        <textarea
          rows={3}
          value={formData.background || ""}
          onChange={(e) => onChange("background", e.target.value)}
          placeholder="e.g. Computer Science Student, Website developer"
          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition text-sm resize-none"
        />
      </div>

      {/* Skills Pill Selector */}
      <div>
        <label className="block text-sm font-medium text-slate-800 mb-2">
          Skills you can already use <span className="text-cyan-600">*</span>
        </label>
        <div className="flex flex-wrap gap-2.5 mt-2">
          {AVAILABLE_SKILLS.map((skill) => {
            const isSelected = formData.skills?.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`px-4 py-2 rounded-full text-xs font-medium border flex items-center gap-1.5 transition ${
                  isSelected
                    ? "bg-cyan-50 border-cyan-400 text-slate-900"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-cyan-600" />}
                {skill}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}