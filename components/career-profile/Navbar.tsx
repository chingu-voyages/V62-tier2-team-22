"use client";

import React, { use } from "react";
import Link from "next/link";
import { AuthStatus } from "../Authentication/AuthButton";
import { usePathname } from "next/navigation";
import {useSyncExternalStore} from 'react'
import {retrieveCurrentPath} from '@/lib/storage'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'


interface NavbarProps {
  appName?: string;
}

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
  }}
function hasCurrentPath() {
    return Boolean(retrieveCurrentPath());
  }

export const Navbar: React.FC<NavbarProps> = ({ appName = "Masari" }) => {
  const pathname = usePathname();
  const hasPath = useSyncExternalStore(subscribeToStorage, hasCurrentPath, () => false);
  const [showStartOverConfirm, setShowStartOverConfirm] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!showStartOverConfirm) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowStartOverConfirm(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
    }, [showStartOverConfirm]);



  return (
    <>
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
           {
            pathname === "/learning-path" && hasPath ? (
              <button  
              type="button"
              onClick={() => setShowStartOverConfirm(true)}
              className="inline-flex items-center justify-center rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 transition-all active:scale-95">
                Start A New Path
              </button>
            ) : (
              <Link
            href="/career"
            className="inline-flex items-center justify-center rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 transition-all active:scale-95"
          >
            Build My Path
          </Link>
            )
           }
        </div>
      </div>
    </header>
    {
      pathname === "/learning-path" && showStartOverConfirm && (
          <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setShowStartOverConfirm(false);
            } 
          }}>

            <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="start-over-title"
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

              <h2 id="start-over-title" className="text-lg font-semibold text-slate-900">
                Start a new learning path?
              </h2>
              <p className="mt-3 text-sm text-slate-600">   
                Once your new path is generated, it will become your current path.
                Your progress on this path won&apos;t carry over
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                type="button"
                onClick={() => setShowStartOverConfirm(false)}
                className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-black"
                >
                  Keep current path 
                </button>
                <button
                type="button"
                onClick={() => {
                  setShowStartOverConfirm(false);
                  router.push("/career");

                }}
                className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-black"
                >
                  Start new path
                </button>
              </div>
            </div>
          </div>
        )}
    </>
    
  );
};

export default Navbar;