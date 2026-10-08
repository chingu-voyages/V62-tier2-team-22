import Link from "next/link";

export default function NoPathFound(){
	return (
		<div className="min-h-screen w-full p-8 flex items-center justify-center bg-gray-50 dark:bg-gray-950">
			<div className="flex flex-col items-center w-full max-w-md mx-auto gap-10 p-6 sm:p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border text-center border-gray-100 dark:border-gray-800">
				<span className="text-2xl text-slate-950 font-bold">No learning path found</span>
				<Link href="/career" className="bg-cyan-400 font-semibold text-md rounded-xl p-2">Create a New Path</Link>
			</div>
		</div>
	)
}