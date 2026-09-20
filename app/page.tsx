import Link from "next/link";
import Navbar from "@/components/career-profile/Navbar";
import Footer from "@/components/career-profile/Footer";
import GridBackground from "@/components/career-profile/InteractiveGrid";
export default function Home() {
  return (
   <div className="font-sans bg-[#040914] text-white min-h-screen bg-grid-pattern relative flex flex-col justify-between overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header / Navbar */}
      <Navbar />
<GridBackground> 
      {/* Main Content Layout - Grid View */}
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10 flex-1 w-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Column: Hero Text & Action */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl  tracking-tight leading-[1.15] mb-4">
              Your tech career <br />
              has a destination. <br />
              <span className="text-cyan-400">Map the way there.</span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg font-normal leading-relaxed mb-6 max-w-xl">
              Masari understands your experience, finds the gaps between where you are and where you want to be, then builds a path around your time and learning style.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link 
                href="/career" 
                className="bg-cyan-400 hover:bg-cyan-300 text-slate-950  px-6 py-3 rounded-md flex items-center gap-2 transition cursor-pointer text-sm sm:text-base"
              >
                Map my career path &rarr;
              </Link>
              <span className="text-slate-400 text-xs sm:text-sm flex items-center gap-1.5">
                ⏱ Takes about 4 minutes
              </span>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl  text-white mb-0.5">4</div>
                <div className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider">profile dimensions</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl  text-white mb-0.5">5</div>
                <div className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider">analysis stages</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl  text-white mb-0.5">1</div>
                <div className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider">clear destination</div>
              </div>
            </div>
          </div>

          {/* Right Column: Trajectory Preview Box */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#071124]/90 border border-slate-800 rounded-xl p-6 backdrop-blur-sm shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[10px]  text-cyan-400 uppercase tracking-wider mb-0.5">Trajectory Preview</div>
                  <div className="text-xs sm:text-sm  text-slate-300">Frontend developer &rarr; AI product engineer</div>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] sm:text-xs px-2 py-0.5 rounded-full border border-emerald-500/20 whitespace-nowrap">
                  Personalized
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-lg bg-[#0a1734] border border-cyan-500/30 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">✓</div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white">Your profile</div>
                    <div className="text-[11px] text-slate-400">React · 3 years · 8h/week</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#09142b] border border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">2</div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white">Bridge applied AI systems</div>
                      <div className="text-[11px] text-slate-400">Models, evaluation, product integration</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-cyan-400 uppercase bg-cyan-400/10 px-1.5 py-0.5 rounded shrink-0">12 Weeks</span>
                </div>

                <div className="p-3 rounded-lg bg-[#09142b] border border-slate-800/80 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">3</div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white">Build portfolio evidence</div>
                    <div className="text-[11px] text-slate-400">Production-ready capstone</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#09142b] border border-slate-800/80 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-slate-800 text-[#00E5FF] flex items-center justify-center font-bold text-xs shrink-0">4</div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white">AI product engineer</div>
                    <div className="text-[11px] text-slate-400">Target readiness</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
      {/* Footer */}
      <Footer />
      </GridBackground>
	  

      
    </div>
	
  );
}