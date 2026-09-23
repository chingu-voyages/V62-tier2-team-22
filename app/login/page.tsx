'use client'

import { Suspense } from "react";
import { SignInButtons } from "@/components/Authentication/AuthButton";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ERROR_MESSAGES: Record<string, string> = {
  AccessDenied: "Sign-in was canceled. You can try logging in again whenever you're ready.",
  OAuthCallbackError: "Could not complete sign-in with your provider. Please try again.",
  Configuration: "Something went wrong on our end. Please try again later.",
  Default: "An error occurred during sign-in. Please try again.",
}

export function LoginContent() {
  const searchParams = useSearchParams()
  const errorKey = searchParams.get("error")

  const errorMessage = errorKey ? (ERROR_MESSAGES[errorKey] ?? ERROR_MESSAGES.Default) : null

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome Back
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Sign in to your account to continue
        </p>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="mb-6 rounded-lg bg-red-50 dark:bg-red-950/50 p-4 text-sm text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/50 flex items-start gap-3">
          <svg className="h-5 w-5 shrink-0 text-red-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Authentication Buttons (Google & GitHub) */}
      <SignInButtons />

      {/* Footer / Links */}
      <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
        By signing in, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-gray-800 dark:hover:text-gray-200">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-gray-800 dark:hover:text-gray-200">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-950">
      <Suspense fallback={
        <div className="flex items-center justify-center p-8 text-sm text-gray-500 animate-pulse">
          Loading login options...
        </div>
      }>
        <LoginContent />
      </Suspense>
    </div>
  )
}