"use client";

import CareerProfilePage from "../../components/career-profile/page";
import Navbar from "../../components/career-profile/Navbar";
import Footer from "../../components/career-profile/Footer"; 
export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <CareerProfilePage />
            </main>
            <Footer />
        </div>
    );
}