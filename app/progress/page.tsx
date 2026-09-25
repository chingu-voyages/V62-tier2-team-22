'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  ArrowRight 
} from 'lucide-react';
import Link from 'next/link';
// Interfaces for component state & props
interface Module {
  id: number;
  title: string;
  status: 'Not started' | 'In progress' | 'Completed';
  duration: string;
}

export default function CareerProgress() {
  // State management
  const [completionPercentage, setCompletionPercentage] = useState<number>(0);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [currentModuleIndex, setCurrentModuleIndex] = useState<number>(1);

  const modules: Module[] = [
    { id: 1, title: 'Systems thinking for modern products', status: 'Not started', duration: '8 hours' },
    { id: 2, title: 'Applied TypeScript & API design', status: 'Not started', duration: '14 hours' },
    { id: 3, title: 'Front end workflow laboratory', status: 'Not started', duration: '18 hours' },
    { id: 4, title: 'Portfolio proof project', status: 'Not started', duration: '24 hours' },
    { id: 5, title: 'Interview narratives & gap review', status: 'Not started', duration: '7 hours' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800  antialiased">
      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-6">

        {/* Back Link */}
        <Link 
          href="/learning-path" 
          className="items-center space-x-2 text-sm font-medium text-gray-600 hover:text-slate-900 mb-6 transition-colors inline-flex"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to path</span>
        </Link>

        {/* Top Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          
          {/* Main Hero Progress Card (Dark Background) */}
          <div className="lg:col-span-7 bg-[#0b1320] text-white rounded-xl p-8 flex flex-col justify-between relative overflow-hidden shadow-sm">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 block mb-2">
                CAREER TRAJECTORY
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold mb-8">
                Progress toward Front end
              </h1>

              {/* Stat Highlight */}
              <div className="flex items-baseline space-x-3 mb-6">
                <span className="text-6xl sm:text-7xl font-extrabold text-cyan-400">
                  {completionPercentage}%
                </span>
                <span className="text-gray-400 text-sm font-medium">overall completion</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 h-2 rounded-full mb-10 overflow-hidden">
                <div 
                  className="bg-cyan-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Bottom Details Grid */}
            <div className="grid grid-cols-3 gap-4 border-t border-slate-800/80 pt-6">
              <div>
                <p className="text-2xl font-bold text-white">{completedCount}/{modules.length}</p>
                <p className="text-xs text-gray-400 mt-1">modules complete</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">71h</p>
                <p className="text-xs text-gray-400 mt-1">estimated remaining</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Module {currentModuleIndex}</p>
                <p className="text-xs text-gray-400 mt-1">current focus</p>
              </div>
            </div>
          </div>

          {/* Next Milestone Side Card */}
          <div className="lg:col-span-5 bg-white border border-gray-200 rounded-xl p-8 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 block mb-2">
                NEXT MILESTONE
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 leading-snug">
                Systems thinking for modern products
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-8">
                Complete this module to move your capability model forward.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4 mb-6">
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-signal-strong" />
                  <span>8 hours</span>
                </div>
                <span className="font-medium text-gray-600">Foundation</span>
              </div>

              <Link 
                href="/learning-path" 
                className="w-full bg-[#0b1320] hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <span>Continue learning</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* Learning Record Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">Learning record</h2>
            <span className="text-xs text-gray-400">Updates as you complete modules</span>
          </div>

          {/* Modules List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((mod) => (
              <div 
                key={mod.id} 
                className="bg-white border border-gray-200 rounded-lg p-5 flex items-start space-x-4 hover:border-gray-300 transition-all shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 font-semibold text-sm flex items-center justify-center shrink-0">
                  {mod.id}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900 truncate">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {mod.status} · {mod.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}