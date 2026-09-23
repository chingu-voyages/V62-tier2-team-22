"use client";

import { learningPathRequest } from "../../schemas/formSchemas";


type FieldValue = string | string[] | number | undefined;

interface StepBackgroundProps {
	formData: learningPathRequest;
	onChange: (field: keyof learningPathRequest, value: FieldValue) => void;
	errors?: { [key: string]: string };
}


export default function StepBackground({ formData, onChange, errors }: StepBackgroundProps) {
	const hasBgError = !!errors?.background;

	return (
		<div className="space-y-6">
			{/* Background Input */}
			<div>
				<label className="block text-sm font-medium text-slate-800 mb-1">
					Background <span className="text-cyan-600">*</span>
				</label>
				<p className="text-xs text-slate-400 mb-2">Summarize your education, degree, or non-traditional path into tech.</p>
				<textarea
					rows={3}
					value={formData.background || ""}
					onChange={(e) => onChange("background", e.target.value)}
					placeholder="e.g. Self-taught web developer with 2 years building client websites."
					className={`w-full bg-white border rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none transition text-sm resize-none ${hasBgError
							? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
							: "border-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
						}`}
				/>
				{hasBgError && (
					<p className="text-xs font-medium text-rose-500 mt-1.5">
						* Background is required.
					</p>
				)}
			</div>
			<div>
				<label className="block text-sm font-medium text-slate-800 mb-2">
				Skills you can already use <span className="text-cyan-600">*</span>



				</label>
				<p className="text-xs text-slate-400 mb-2">
					Mention any skills you're confident in using today	
				</p>

				<textarea
					rows={2}
					value={formData.skills || ""}
					onChange={(e) => onChange("skills", e.target.value)}
					placeholder="e.g. TypeScript, Prompt engineering, System design etc."
					className="w-full bg-white border rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none transition text-sm resize-none border-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
				/>
			</div>
		</div>
	);
}