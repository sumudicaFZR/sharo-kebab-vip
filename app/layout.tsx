import type { Metadata } from "next";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { BackgroundParallax } from "@/components/BackgroundParallax";
import { BackgroundMusic } from "@/components/BackgroundMusic";
import { SoundToggle } from "@/components/SoundToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "SHARO KEBAB VIP Club",
  description: "QR loyalty si AI marketing app pentru SHARO KEBAB Bucuresti.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body>
        <AnimatedBackground />
        <BackgroundParallax />
        <BackgroundMusic />
        <SoundToggle />
        {children}
      </body>
    </html>
  );
}
