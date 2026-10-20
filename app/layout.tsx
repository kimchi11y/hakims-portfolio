import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hakimrazak.com";

const siteTitle =
  "Hakim Razak — Computer Science Student | Software Engineer Intern Candidate";
const siteDescription =
  "Computer Science student at International Islamic University Malaysia seeking a six-month software engineering internship (February – August 2027). Builds full-stack web applications with React, Next.js, ASP.NET Core and SvelteKit, deployed with Docker and GitHub Actions.";

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
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Software Engineer Intern",
    "Full Stack Developer",
    "Computer Science Student",
    "React",
    "Next.js",
    "TypeScript",
    "ASP.NET Core",
    "SvelteKit",
  ],
  authors: [{ name: "Hakim Razak" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Hakim Razak",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

/** Must match `THEME_STORAGE_KEY` in components/theme-toggle.tsx. */
const THEME_STORAGE_KEY = "theme";

/** Runs before the first paint, so the chosen scheme is never flashed over.
 *  Always writes `data-theme` (resolving the OS preference itself) — CSS reads
 *  that attribute as the single source of truth. */
const themeScript = `(function(){try{
var m=window.matchMedia("(prefers-color-scheme: dark)"),el=document.documentElement;
function stored(){try{var v=localStorage.getItem("${THEME_STORAGE_KEY}");return v==="dark"||v==="light"?v:null}catch(e){return null}}
function apply(){el.dataset.theme=stored()||(m.matches?"dark":"light")}
apply();
m.addEventListener("change",function(){if(!stored())apply()});
}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        {/* Theme before content: the parser reaches this synchronously, and the
            first paint waits on the head stylesheet, so there is no flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
        {/* ASCII Magic runtime: one module for the whole site. It upgrades the
            <ascii-art> elements and loads only the piece they name. */}
        <Script
          type="module"
          src="https://www.ascii-magic.com/ascii/ascii.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
