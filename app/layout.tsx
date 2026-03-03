// layout.tsx is the ROOT layout of the entire app

// Metadata used for setting the page title and description(browser tabs and Google search results (SEO))
import type { Metadata } from "next";

// next/font/google loads Google Fonts in the most optimised way possible
// It downloads the font at BUILD TIME — no extra network request in the browser
import { Playfair_Display, DM_Sans } from "next/font/google";

// Import our global CSS file
import "./globals.css";

// Playfair Display used for headings and the name
// variable: '--font-display' creates a CSS variable we can use in Tailwind
const playfair = Playfair_Display({
  subsets: ["latin"], // Only load latin characters (smaller file size)
  variable: "--font-display", // CSS variable name
  display: "swap", // Show fallback font while loading to prevent invisible text
});

// DM Sans is our BODY font (paragraphs, buttons, labels)
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Metadata object — Next.js reads this and injects it into the <head> of the page
export const metadata: Metadata = {
  // title → browser tab name
  title: "Everton Oliveira — Back-End Developer",
  // description → shown in Google search results
  description:
    "Back-End Developer specializing in Node.js, JavaScript, and Salesforce. Based in Brazil.",
  // keywords → helps search engines understand the page
  keywords: [
    "Back-End Developer",
    "Node.js",
    "JavaScript",
    "Salesforce",
    "Portfolio",
  ],
  // openGraph → controls how the page looks when shared on LinkedIn, WhatsApp etc.
  openGraph: {
    title: "Everton Oliveira — Back-End Developer",
    description:
      "Back-End Developer specializing in Node.js, JavaScript, and Salesforce.",
    type: "website",
  },
};

// RootLayout is the wrapper component
// { children } is whatever page is currently being rendered — in our case page.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // lang="en" tells browsers and screen readers the page language (accessibility + SEO)
    // scroll-smooth enables smooth scrolling for all anchor links (like #about, #contact)
    <html lang="en" className="scroll-smooth">
      {/* Apply both font variables to the body so they are available everywhere
          font-sans sets DM Sans as the default body font via Tailwind
          bg-[#020817] sets dark navy background color
          text-white makes all text white by default
          antialiased smooths out font rendering on screens */}
      <body
        className={`${playfair.variable} ${dmSans.variable} font-sans bg-[#020817] text-white antialiased`}
      >
        {/* children is the actual page content — Next.js injects page.tsx here automatically */}
        {children}
      </body>
    </html>
  );
}
