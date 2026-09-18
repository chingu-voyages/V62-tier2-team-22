"use client";

import { useState } from "react";
import CareerProfilePage from "../../components/career-profile/page";

export default function Home() {
  const [showProfile, setShowProfile] = useState(false);

  if (showProfile) {
    return <CareerProfilePage />;
  }

  return (
    <div className="bg-[#040914] text-white min-h-screen bg-grid-pattern relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-8">
          <span>✦ PERSONAL CAREER NAVIGATION LAB</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6">
          Your tech career <br />
          has a destination. <br />
          <span className="text-cyan-400">Map the way there.</span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-normal leading-relaxed mb-10">
          Masari understands your experience, finds the gaps between where you are and where you want to be, then builds a path around your time and learning style.
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-16">
          <button
            onClick={() => setShowProfile(true)}
            className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold px-6 py-3.5 rounded-md flex items-center gap-2 transition cursor-pointer"
          >
            Map my career path &rarr;
          </button>
          <span className="text-slate-400 text-sm flex items-center gap-1.5">
            ⏱ Takes about 4 minutes
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-slate-800/80 mb-16">
          <div>
            <div className="text-4xl font-bold text-white mb-1">4</div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">profile dimensions</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-1">5</div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">analysis stages</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-1">1</div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">clear destination</div>
          </div>
        </div>

        {/* Trajectory Preview Section */}
        <div className="bg-[#071124]/90 border border-slate-800 rounded-xl p-8 max-w-3xl mx-auto backdrop-blur-sm shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">Trajectory Preview</div>
              <div className="text-sm font-semibold text-slate-300">Frontend developer &rarr; AI product engineer</div>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-500/20">
              Personalized
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-[#0a1734] border border-cyan-500/30 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm">✓</div>
              <div>
                <div className="text-sm font-bold text-white">Your profile</div>
                <div className="text-xs text-slate-400">React · 3 years · 8h/week</div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#09142b] border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <div className="text-sm font-bold text-white">Bridge applied AI systems</div>
                  <div className="text-xs text-slate-400">Models, evaluation, product integration</div>
                </div>
              </div>
              <span className="text-xs font-semibold text-cyan-400 uppercase bg-cyan-400/10 px-2 py-0.5 rounded">12 Weeks</span>
            </div>

            <div className="p-4 rounded-lg bg-[#09142b] border border-slate-800/80 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <div className="text-sm font-bold text-white">Build portfolio evidence</div>
                <div className="text-xs text-slate-400">Production-ready capstone</div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#09142b] border border-slate-800/80 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-[#00E5FF] flex items-center justify-center font-bold text-sm">4</div>
              <div>
                <div className="text-sm font-bold text-white">AI product engineer</div>
                <div className="text-xs text-slate-400">Target readiness</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}