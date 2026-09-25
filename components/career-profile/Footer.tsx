'use client'


import React, { useEffect,useState } from "react";
import Link from "next/link";

interface FooterProps {
  appName?: string;
}

export const Footer: React.FC<FooterProps> = ({ appName = "Masari" }) => {
  const [currentYear,setCurrentYear]=useState(2026)

  useEffect(()=>{
	setCurrentYear(new Date().getFullYear())
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

          <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;