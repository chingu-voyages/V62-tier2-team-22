export default function Loading(){
	return (
		<div className="min-h-screen w-full p-8 py-12 flex items-start justify-center">
			<div className="flex items-center justify-center flex-col bg-slate-100 min-h-[80vh] w-full text-center p-4 rounded-xl gap-16 sm:gap-8 sm:min-h-[50vh]">
				<span className="text-3xl text-slate-950 font-bold">Loading...</span>
				<p className="text-sm text-slate-500">Please hold on while we are loading your path...</p>
				<TailSpinner className="w-10 h-10 text-cyan-400"/>
			</div>
		</div>
	)
}

function TailSpinner({ className = "w-8 h-8 text-cyan-500" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}