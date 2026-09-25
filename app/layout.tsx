import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Authentication/Providers";
import { Space_Grotesk } from "next/font/google";
import Navbar from "@/components/career-profile/Navbar";
import Footer from "@/components/career-profile/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Masari",
  description: "Build your personalized career path",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased  ${spaceGrotesk.variable}`}
    >
      <body className="min-h-full flex flex-col">
		<Providers>
			<Navbar/>
			<main className="flex-1">{children}</main>
			<Footer/>
		</Providers>
	  </body>
    </html>
  );
}
