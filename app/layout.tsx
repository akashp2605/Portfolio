import type { Metadata } from "next";
import { JetBrains_Mono, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const plex = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Akash — Portfolio",
  description: "Full-stack developer portfolio. Building things that matter.",
  icons: { icon: [] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jetbrains.variable} ${plex.variable} ${grotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
