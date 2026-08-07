import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#050505",
};

export const metadata: Metadata = {
  title: "Akash — Java Full Stack Developer",
  description: "Full Stack Developer specializing in Java, Spring Boot, React, and Next.js. Building fast, scalable, and resilient software systems.",
  keywords: ["Akash", "Full Stack Developer", "Software Engineer", "Java", "Spring Boot", "React", "Next.js", "Portfolio"],
  authors: [{ name: "Akash" }],
  creator: "Akash",
  openGraph: {
    title: "Akash — Java Full Stack Developer",
    description: "Building fast, scalable, and resilient software systems using Java, Spring Boot, React, and Next.js.",
    type: "website",
    locale: "en_US",
    siteName: "Akash Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akash — Java Full Stack Developer",
    description: "Building fast, scalable, and resilient software systems",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Akash",
  jobTitle: "Full Stack Developer",
  knowsAbout: ["Java", "Spring Boot", "React", "Next.js", "TypeScript", "REST APIs", "MySQL", "Docker"],
  sameAs: [
    "https://github.com/akashp2605",
    "https://linkedin.com/in/akashp2605",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${jetbrains.variable} ${plex.variable} ${grotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
