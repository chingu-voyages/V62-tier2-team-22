interface ProgressOverviewProps {
	progress?:number
}

export default function ProgressOverview({ progress=0 }){
	const clampedProgress=Math.min(100,Math.max(0,progress))	
	return (
		<div className="flex flex-col w-full md:w-64 border border-slate-600 bg-slate-800/80 rounded max-h-30 gap-2">
			<div className="flex flex-row justify-between items-center text-sm p-4 pb-4">
				<div className="text-slate-500">Path progress</div>
				<div className="text-slate-300">{clampedProgress}%</div>
			</div>
			<div className="mx-auto h-2.5 w-4/5 bg-slate-900/90 rounded-full overflow-hidden p-px">
				<div 
				className="h-full bg-linear-to-r from-cyan-500 to-cyan-300 rounded-full transition-all duration-500 ease-out"
				style={{ width: `${clampedProgress}%`}}
				>
				</div>
			</div>
		</div>
	)
}