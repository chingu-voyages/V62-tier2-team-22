"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  deleteUserPath,
  getCurrentPathKey,
  getStorageKey,
  retrieveAllUserPaths,
} from "@/lib/storage";
import { retrievePath, updatePath } from "@/app/actions/path-actions";
import type { PathInformation } from "@/schemas/learningPathSchemas";
import {
  Trash2,
  Plus,
  ArrowRight,
  CheckCircle2,
  X,
} from "lucide-react";

interface LearningPath {
  id: string;
  title: string;
  category: string;
  date: string;
  progress: number;
}

function PathsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userId = session?.user?.id || null;
  
  const [showBanner, setShowBanner] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedPathToDelete, setSelectedPathToDelete] = useState<LearningPath | null>(null);

  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const migrationRef = useRef<Promise<boolean> | null>(null);
  useEffect(() => {
  if (status === "loading") return;

  async function fetchUserPaths() {
    try {
      setIsLoading(true);
      if (userId) {
  if (!migrationRef.current) {
    migrationRef.current = (async () => {
      const guestKey = getCurrentPathKey(null);
      const guestJson = sessionStorage.getItem(guestKey);
      if (!guestJson) return false;

      const guestPath = JSON.parse(guestJson) as PathInformation;
      await updatePath(guestPath);

      if (!(await retrievePath(guestPath.id))) {
        throw new Error("Guest path was not saved to the account.");
      }

      const storageKey = getStorageKey(userId);
      const saved = localStorage.getItem(storageKey);
      const paths: Record<string, PathInformation> = saved
        ? JSON.parse(saved)
        : {};

      paths[guestPath.id] = guestPath;
      localStorage.setItem(storageKey, JSON.stringify(paths));
      localStorage.setItem(getCurrentPathKey(userId), guestPath.id);
      sessionStorage.removeItem(guestKey);

      return true;
    })().catch((error) => {
      migrationRef.current = null;
      throw error;
    });
  }

  if (await migrationRef.current) setShowBanner(true);
}



      
      const allPathsData = retrieveAllUserPaths(userId);

      if (allPathsData && allPathsData.length > 0) {
        const mappedPaths: LearningPath[] = allPathsData.map((pathData) => {
          const steps = pathData.steps ?? [];
          const completedCount = steps.filter((m) => m.completed).length;
          const progressPercent = steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0;

          return {
            id: pathData.id,
            title: `${pathData.formData.currentLevel} to ${pathData.formData.targetRole}`,
            category: pathData.formData.learningPreference || "Early career",
            date: pathData.createdAt ? new Date(pathData.createdAt).toLocaleDateString("en-GB") : new Date().toLocaleDateString("en-GB"),
            progress: progressPercent,
          };
        });

        setPaths(mappedPaths);
      } else {
        setPaths([]);
      }
    } catch (error) {
      console.error("Failed to fetch learning paths:", error);
    } finally {
      setIsLoading(false);
    }
  }

  fetchUserPaths();
}, [userId, status]);

  const handleDeleteClick = (path: LearningPath) => {
    setSelectedPathToDelete(path);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedPathToDelete) {
      await deleteUserPath(selectedPathToDelete.id, userId);
      setPaths(paths.filter((p) => p.id !== selectedPathToDelete.id));
    }
    setIsDeleteModalOpen(false);
    setSelectedPathToDelete(null);
  };
  const handleOpen = (pathId: string) => {
  if (!userId) return;

  localStorage.setItem(getCurrentPathKey(userId), pathId);
  router.push("/learning-path");
};

  if (isLoading || status === "loading") {
    return <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] text-slate-600">Loading your paths...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 relative">
      {showBanner && (
        <div className="bg-[#E6F4EA] border-b border-[#CEEAD6] px-8 py-3 flex items-center justify-between text-[#137333] text-sm font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#137333]" />
            <span>Your guest learning path is now saved to your account.</span>
          </div>
          <button 
            onClick={() => setShowBanner(false)}
            className="p-1 hover:bg-[#d0ebd6] rounded-full transition-colors"
            aria-label="Close banner"
          >
            <X className="w-4 h-4 text-[#137333] cursor-pointer" />
          </button>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-8 py-10">
        <div className="flex items-start justify-between mb-8"> 
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7] block mb-1">
              YOUR ACCOUNT
            </span>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              My learning paths
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Every path you generate is saved here permanently.
            </p>
          </div>

          <div>
            <button
              onClick={() => router.push("/career")}
              className="flex cursor-pointer items-center gap-2 px-5 py-2.5 text-sm font-medium text-black hover:bg-cyan-300 bg-cyan-400 rounded-xl transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              New path
            </button>
          </div>
        </div>
       
        {paths.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl">
            <p className="text-slate-500 text-sm mb-4">No learning paths found yet.</p>
            <button
              onClick={() => router.push("/career")}
              className="px-5 py-2.5 text-sm font-medium bg-cyan-400 hover:bg-cyan-300 text-black rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              Create your first path
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paths.map((path) => (
              <div 
                key={path.id}
                className="bg-white border border-[#99D8D0] rounded-2xl p-6 shadow-sm flex flex-col justify-between relative"
              >
                <div>
                  <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
                    <span>{path.category} · {path.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-6">
                    {path.title}
                  </h2>

                  <div className="mb-6">
                    <div className="flex justify-between text-xs font-medium text-slate-600 mb-2">
                      <span>Progress</span>
                      <span>{path.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#0B1F33] h-full rounded-full" 
                        style={{ width: `${path.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => handleOpen(path.id)}
                    className="flex-1 cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-black rounded-xl text-sm font-medium transition-colors shadow-sm"
                  >
                    Open
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteClick(path)}
                    className="p-2.5 cursor-pointer text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-slate-200"
                    title="Delete path"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4" onClick={() => setIsDeleteModalOpen(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Delete this path?
            </h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              &quot;{selectedPathToDelete?.title}&quot; and its progress will be permanently removed from your account.
            </p>
            
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-5 cursor-pointer py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Keep it
              </button>
              
              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 cursor-pointer rounded-xl hover:bg-cyan-300 bg-cyan-400 text-black text-sm font-medium transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MyPathPage(){
  return (
    <Suspense fallback={<div>Loading</div>}>
      <PathsPage/>
    </Suspense>
  )
}