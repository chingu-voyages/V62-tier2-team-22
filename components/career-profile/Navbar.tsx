"use client";

import React, { useState, useEffect, useSyncExternalStore, useCallback } from "react";
import Link from "next/link";
import { AuthStatus } from "../Authentication/AuthButton";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentPathKey, retrieveCurrentPath } from "@/lib/storage";
import { useSession } from "next-auth/react";
import { PathInformation } from "@/schemas/learningPathSchemas";

interface NavbarProps {
  appName?: string;
}

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
  };
}

export const Navbar: React.FC<NavbarProps> = ({ appName = "Masari" }) => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id || null;
  const pathname = usePathname();
  const router = useRouter();

  // جلب مفتاح المسار الحالي بناءً على userId
  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return false;
    return Boolean(localStorage.getItem(getCurrentPathKey(userId)));
  }, [userId]);

  const [currentPath, setCurrentPath] = useState<PathInformation | null>(null);
  const hasPath = useSyncExternalStore(subscribeToStorage, getSnapshot, () => false);
  const [showStartOverConfirm, setShowStartOverConfirm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const isAuthenticated = status === "authenticated";

  const navLinks = [
    ...(isAuthenticated ? [{ name: "Learning Path", href: "/learning-path" }] : []),
  ];

  // تم إضافة userId إلى قائمة التبعيات لضمان إعادة الجلب عند تغير المستخدم
  useEffect(() => {
    async function fetchPath() {
      const path = await retrieveCurrentPath(userId);
      setCurrentPath(path ?? null);
    }
    fetchPath();
  }, [userId]);

  let deleteCurrent: boolean = false;
  if (Boolean(currentPath)) {
    for (let i = 0; i < currentPath!.steps.length; i++) {
      if (!currentPath!.steps[i].completed) {
        deleteCurrent = true;
        break;
      }
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-12 lg:px-16">
          
          {/* Logo & Main Nav Links */}
          <div className="flex items-center space-x-8 rtl:space-x-reverse">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="text-black flex items-center gap-2"
              aria-label={`${appName} home`}
            >
              <span className="grid size-8 place-items-center bg-cyan-400 rounded-md text-slate-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-route size-4"
                  aria-hidden="true"
                >
                  <circle cx="6" cy="19" r="3"></circle>
                  <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"></path>
                  <circle cx="18" cy="5" r="3"></circle>
                </svg>
              </span>
              <span className="font-display text-lg font-semibold">
                {appName}<span className="text-cyan-400">.</span>
              </span>
            </Link>

            {/* Navigation Links for Desktop */}
            <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-cyan-400 text-black hover:bg-cyan-300 font-semibold px-4 py-1.5 rounded-lg shadow-sm"
                        : "text-gray-600 hover:bg-cyan-100 px-4 py-1.5 rounded-lg"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop Auth & Action Button */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse text-sm font-medium text-gray-700">
            <AuthStatus />
            {pathname === "/learning-path" && hasPath ? (
              <button
                type="button"
                onClick={() => setShowStartOverConfirm(true)}
                className="inline-flex items-center cursor-pointer justify-center rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 transition-all active:scale-95"
              >
                Start A New Path
              </button>
            ) : (
              <Link
                href="/career"
                className="inline-flex items-center justify-center rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 transition-all active:scale-95"
              >
                Build My Path
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white px-6 py-4 space-y-3 flex flex-col items-stretch shadow-lg">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`text-base font-medium transition-colors px-2 py-1 rounded-md ${
                      isActive ? "bg-cyan-50 text-cyan-600 font-semibold" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex justify-start w-full px-2 py-1">
              <AuthStatus />
            </div>

            {/* Mobile Text-Style Buttons */}
            {pathname === "/learning-path" && hasPath ? (
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  setShowStartOverConfirm(true);
                }}
                className="w-full text-left text-base font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 px-2 py-1 rounded-md transition-colors"
              >
                Start A New Path
              </button>
            ) : (
              <Link
                href="/career"
                onClick={closeMobileMenu}
                className="w-full text-left text-base font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 px-2 py-1 rounded-md transition-colors"
              >
                Build My Path
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Confirmation Modal */}
      {pathname === "/learning-path" && showStartOverConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setShowStartOverConfirm(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="start-over-title"
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
          >
            <h2 id="start-over-title" className="text-lg font-semibold text-slate-900">
              Start a new learning path?
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Once your new path is generated, it will become your current path.
              Your progress on this path won&apos;t carry over.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowStartOverConfirm(false)}
                className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-300"
              >
                Keep current path
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowStartOverConfirm(false);
                  router.push(`/career?deleteCurrent=${deleteCurrent}`);
                }}
                className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-black hover:bg-cyan-300"
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