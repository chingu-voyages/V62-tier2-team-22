import Link from "next/link";

export default function NoPathFound(){
	return (
		<div className="min-h-screen w-full p-8 py-12 flex items-start justify-center">
			<div className="flex items-center justify-center flex-col bg-slate-100 min-h-[80vh] w-full text-center p-4 rounded-xl gap-12 sm:gap-8 sm:min-h-[50vh]">
				<span className="text-3xl text-slate-950 font-bold">No learning path found</span>
				<Link href="/career" className="bg-cyan-400 font-semibold text-lg rounded-xl p-4">Create a New Path</Link>
			</div>
		</div>
	)
}