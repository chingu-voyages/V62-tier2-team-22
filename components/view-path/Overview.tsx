'use client'
import { learningPathRequest } from "@/schemas/formSchemas";
import { Sparkles } from "lucide-react";
import { parseBundlerArgs } from "next/dist/lib/bundler";
import { useEffect, useState } from "react";
import ProgressOverview from "./ProgressOverview";


export default function Overview(){
	const [formData,setFormData]=useState<learningPathRequest | null>(null)
	const [isChecking,setIsChecking] = useState(true)
	useEffect(()=>{
		const saved=localStorage.getItem("careerFormState")
		if (saved){
			const parsed=JSON.parse(saved)
			setFormData(parsed)
		}
		setIsChecking(false)
	},[])
	if (isChecking)
		return (
			<div className="w-full"></div>
		)
	if (!formData)
		return (
			<div className="text-5xl text-center p-10">
				Build a path first!
			</div>
		)
	return (
		<div className="flex flex-row justify-between w-full bg-path-background p-12">
			<div>
				<div className="flex gap-2 pt-4 text-cyan-100">
					<Sparkles className="w-5 h-5" />
					<div className="text-6xs sm:text-3xs font-light uppercase">your personalized trajectory</div>
				</div>
				<div className="text-2xl sm:text-5xl text-slate-50 capitalize pt-4 font-semibold">
					{formData?.currentLevel}  → {formData?.targetRole}
				</div>
				<div className="text-slate-300 text-6xs sm:text-sm pt-4 sm:pt-6">
					A {formData?.desiredTimeframe} path built around {formData?.availableTime} hours per week, using a {formData?.learningPreference} approach.
				</div>
			</div>
			<ProgressOverview progress={80}/>
		</div>	
	)
}