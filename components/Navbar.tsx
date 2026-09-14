"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-[#040914] text-white border-b border-slate-800 px-6 py-3.5 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-6 h-6 bg-cyan-400 rounded-sm flex items-center justify-center text-[#040914] text-xs font-black">
            ✦
          </div>
          <span>Masari<span className="text-cyan-400">.</span></span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-1 text-sm text-slate-400 font-medium">
          <Link 
            href="/" 
            className={`px-3 py-1.5 rounded-md transition ${pathname === '/' ? 'text-white bg-slate-800/60' : 'hover:text-slate-200'}`}
          >
            Home
          </Link>
         {/*  <Link 
            href="/career-profile" 
            className={`px-3 py-1.5 rounded-md transition ${pathname === '/career-profile' ? 'text-white bg-slate-800/60' : 'hover:text-slate-200'}`}
          >
            Career profile
          </Link>
         */}
          
          
        </nav>
      </div>

      <Link
        href="/career-profile"
        className="bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-md border border-slate-700 flex items-center gap-1.5 transition"
      >
        Build my path &rarr;
      </Link>
      
    </header>
  );
}