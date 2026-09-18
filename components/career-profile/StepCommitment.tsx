"use client";

import { Check } from "lucide-react";
import { learningPathRequest } from "../../schemas/formSchemas"; 
type FieldValue = string | string[] | number | undefined;

interface StepCommitmentProps {
  formData: learningPathRequest;
  onChange: (field: keyof learningPathRequest, value: FieldValue) => void;
}

const timeframes = ["2 months", "4 months", "6 months", "Flexible"];

const preferences = [
  "Project-based",
  "Structured lessons",
  "Reading-first",
  "Mixed",
];

export default function StepCommitment({ formData, onChange }: StepCommitmentProps) {
  const min = 2;
  const max = 20;
  const val = Number(formData.availableTime) || 8;
  const percentage = ((val - min) / (max - min)) * 100;

  return (
    <div className="space-y-6">
      {/* Hours Slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-slate-800">
            Available time · <span className="text-slate-900 font-bold">{formData.availableTime || 8} hours/week</span> <span className="text-cyan-600">*</span>
          </label>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step="1"
          value={formData.availableTime || 8}
          onChange={(e) => onChange("availableTime", Number(e.target.value))}
          style={{
            background: `linear-gradient(to right, #06b6d4 ${percentage}%, #e2e8f0 ${percentage}%)`
          }}
          className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>2h</span>
          <span>20h</span>
        </div>
      </div>

      {/* Desired Timeframe */}
      <div>
        <label className="block text-sm font-medium text-slate-800 mb-3">
          Desired timeframe <span className="text-cyan-600">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {timeframes.map((tf) => {
            const isSelected = formData.desiredTimeframe === tf;
            return (
              <button
                key={tf}
                type="button"
                onClick={() => onChange("desiredTimeframe", tf)}
                className={`p-3.5 rounded-lg border text-left flex items-center justify-between transition ${
                  isSelected
                    ? "bg-cyan-50/50 border-cyan-400 text-slate-900 font-medium"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                <span className="text-sm">{tf}</span>
                {isSelected && <Check className="w-4 h-4 text-cyan-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Learning Preference */}
      <div>
        <label className="block text-sm font-medium text-slate-800 mb-3">
          Learning preference <span className="text-cyan-600">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {preferences.map((pref) => {
            const isSelected = formData.learningPreference === pref;
            return (
              <button
                key={pref}
                type="button"
                onClick={() => onChange("learningPreference", pref)}
                className={`p-3.5 rounded-lg border text-left flex items-center justify-between transition ${
                  isSelected
                    ? "bg-cyan-50/50 border-cyan-400 text-slate-900 font-medium"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                <span className="text-sm">{pref}</span>
                {isSelected && <Check className="w-4 h-4 text-cyan-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}