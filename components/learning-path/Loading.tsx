export default function Loading(){
	return (
		<div className="min-h-screen w-full p-8 flex items-center justify-center bg-gray-50 dark:bg-gray-950">
			<div className="flex flex-col items-center w-full max-w-md mx-auto gap-4 p-6 sm:p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border text-center border-gray-100 dark:border-gray-800">
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