'use client'


import React, { useState } from "react";
import Link from "next/link";

interface FooterProps {
  appName?: string;
}

export const Footer: React.FC<FooterProps> = ({ appName = "Masari" }) => {
  const [currentYear]=useState(()=>{
	if (typeof window == "undefined") return 2026
	return new Date().getFullYear()
  })

  return (
    <footer className="w-full border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10 lg:px-16">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {appName}
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} {appName}. All rights reserved.
            </p>
          </div>

          <div className="flex w-full flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400 md:w-auto">
            <Link
              href="/privacy-policy"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="https://github.com/chingu-voyages/V62-tier2-team-22"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              <svg
              className="size-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.1 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              <span>GitHub Repository</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;