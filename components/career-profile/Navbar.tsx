"use client";

import React from "react";
import Link from "next/link";
import { AuthStatus } from "../Authentication/AuthButton";

interface NavbarProps {
  appName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ appName = "Masari" }) => {


  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-12 lg:px-16">
        
        <div className="flex items-center space-x-2">
          <Link 
            href="/" 
            className="text-black flex items-center gap-2" 
            aria-label={`${appName} home`}
          >
            <span className="grid size-8 place-items-center bg-cyan-400 rounded-md bg-lab text-signal">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-route size-4" aria-hidden="true">
                <circle cx="6" cy="19" r="3"></circle>
                <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"></path>
                <circle cx="18" cy="5" r="3"></circle>
              </svg>
            </span>
            <span className="font-display text-lg font-semibold">
              {appName}<span className="text-signal-strong text-cyan-400">.</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm font-medium text-gray-700">
           <AuthStatus />
          <Link
            href="/career"
            className="inline-flex items-center justify-center rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 transition-all active:scale-95"
          >
            Build My Path
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;