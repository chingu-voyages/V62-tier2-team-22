"use client";

import CareerProfilePage from "@/components/career-profile/page";
import Navbar from "@/components/career-profile/Navbar";
export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="grow">
                <CareerProfilePage />
            </main>

        </div>
    );
}