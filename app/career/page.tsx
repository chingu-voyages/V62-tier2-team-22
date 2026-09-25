"use client";

import { useRouter } from "next/navigation";
import AnalysisEngine from "@/components/career-profile/AnalysisEngine";

export default function CareerPage() {
  const router = useRouter();

  const handleAnalysisComplete = () => {
    router.push("/learning-path");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        <AnalysisEngine onComplete={handleAnalysisComplete} />
      </main>
    </div>
  );
}