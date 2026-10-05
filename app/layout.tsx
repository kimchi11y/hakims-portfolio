import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hakimrazak.com";

/** Parse the canonical site URL, falling back to relative metadata on bad input. */
function resolveSiteUrl(): URL | undefined {
  try {
    return new URL(siteUrl);
  } catch {
    return undefined;
  }
}

export const metadata: Metadata = {
  metadataBase: resolveSiteUrl(),
  title: "Hakim Razak - Software Developer",
  description: "Software Developer specializing in modern web technologies, scalable architecture, and crafting intuitive digital experiences.",
  keywords: ["Software Developer", "Web Developer", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Hakim Razak" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hakim Razak - Software Developer",
    description: "Software Developer specializing in modern web technologies, scalable architecture, and crafting intuitive digital experiences.",
    url: "/",
    siteName: "Hakim Razak",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakim Razak - Software Developer",
    description: "Software Developer specializing in modern web technologies, scalable architecture, and crafting intuitive digital experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        {/* Reveal starts hidden so it can fade in without a flash. Restore it
            when JS never runs, otherwise the page would render blank. */}
        <noscript>
          <style>{".reveal{opacity:1;transform:none}"}</style>
        </noscript>
        <div className="overflow-x-clip">
          <div className="max-w-[782px] mx-auto px-4 sm:px-6 py-6">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
