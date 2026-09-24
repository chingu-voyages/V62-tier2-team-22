"use client";

import { useState } from "react";
import AnalysisEngine from "@/components/career-profile/AnalysisEngine";
import LearningPath from "../learning-path/page";
import Navbar from "@/components/career-profile/Navbar";
import Footer from "@/components/career-profile/Footer";

export default function Home() {
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {!isAnalyzed ? (
          <AnalysisEngine onComplete={() => setIsAnalyzed(true)} />
        ) : (
          <LearningPath />
          
        )}
        
      </main>
      <Footer/>
    </div>
  );
}