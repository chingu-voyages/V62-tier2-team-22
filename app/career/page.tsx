"use client";

import CareerProfilePage from "@/components/career-profile/page";
export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <CareerProfilePage />
            </main>

        </div>
    );

}