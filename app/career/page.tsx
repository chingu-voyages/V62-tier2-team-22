// E:\V62-tier2-team-22\app\career\page.tsx
"use client";

import { useRouter } from "next/navigation";
import AnalysisEngine from "@/components/career-profile/AnalysisEngine";
import Navbar from "@/components/career-profile/Navbar";
import Footer from "@/components/career-profile/Footer";

export default function CareerPage() {
  const router = useRouter();

  const handleAnalysisComplete = () => {
    router.push("/learning-path");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnalysisEngine onComplete={handleAnalysisComplete} />
      </main>
      <Footer />
    </div>
  );
}