import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hakim Razak - Software Developer",
  description: "Software Developer specializing in modern web technologies, scalable architecture, and crafting intuitive digital experiences.",
  keywords: ["Software Developer", "Web Developer", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Hakim Razak" }],
  openGraph: {
    title: "Hakim Razak - Software Developer",
    description: "Software Developer specializing in modern web technologies, scalable architecture, and crafting intuitive digital experiences.",
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
    <html
      lang="en"
      className={`${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased">
        <div className="overflow-x-clip">
          <div className="max-w-[782px] mx-auto px-4 sm:px-6 py-6">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
