// 'use client' tells Next.js this component runs in the browser
// By default, Next.js renders components on the SERVER (faster initial load)
// But Navbar needs to detect scroll and handle clicks — those are browser-only features
// So it is marked as a client component
"use client";

// useState → lets us store and update values (like "is the menu open?")
// useEffect → lets us run code when the component loads or when something changes
import { useState, useEffect } from "react";

export default function Navbar() {
  // scrolled stores whether the user has scrolled past 40px
  // false = at the top, true = scrolled down
  // Used to change the navbar background (transparent → dark)
  const [scrolled, setScrolled] = useState(false);

  // menuOpen stores whether the mobile hamburger menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false);

  // useEffect runs code AFTER the component appears on screen
  // Here we listen for scroll events on the window
  useEffect(() => {
    // This function runs every time the user scrolls
    const onScroll = () => {
      // If scrolled more than 40px, set scrolled to true — otherwise false
      setScrolled(window.scrollY > 40);
    };

    // Add the scroll listener to the browser window
    window.addEventListener("scroll", onScroll);

    // Cleanup: remove the listener when the component is removed from the page
    // This prevents memory leaks
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // The empty [] means this effect runs only ONCE when the component loads

  return (
    // The scrolled state changes the className dynamically
    // When scrolled is true add a dark background and blur effect
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#020817]/95 backdrop-blur-md shadow-lg border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      {/* max-w-6xl centers the content and limits its width on large screens */}
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo — clicking it will scroll back to the top of the page */}
        <a href="#hero" className="text-xl font-bold tracking-tight">
          <span className="text-white">Everton</span>
          {/* The gold dot is a small design detail */}
          <span className="text-yellow-400">.</span>
        </a>

        {/* Desktop navigation links — hidden on mobile (hidden md:flex) */}
        <ul className="hidden md:flex items-center gap-8">
          {/* Each link scrolls to a section using anchor IDs like #about */}
          <li>
            <a
              href="#about"
              className="text-sm text-slate-400 hover:text-yellow-400 transition-colors"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#skills"
              className="text-sm text-slate-400 hover:text-yellow-400 transition-colors"
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="text-sm text-slate-400 hover:text-yellow-400 transition-colors"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#certifications"
              className="text-sm text-slate-400 hover:text-yellow-400 transition-colors"
            >
              Certifications
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-sm text-slate-400 hover:text-yellow-400 transition-colors"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Resume download button — only visible on desktop (hidden md:inline-flex) */}

        <a
          href="/assets/Resume.pdf"
          download // This attribute tells the browser to download the file instead of opening it
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-yellow-400/60 text-yellow-400 text-sm rounded hover:bg-yellow-400 hover:text-[#020817] transition-all duration-200 font-semibold"
        >
          Resume ↓
        </a>

        {/* Mobile hamburger button — only visible on small screens (md:hidden) */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)} // Toggle menu open/close on click
          aria-label="Toggle menu" // Accessibility
        >
          {/* Show X icon when menu is open, hamburger icon when closed */}
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile dropdown menu — only renders when menuOpen is true */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a1628] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {/* onClick closes the menu when a link is clicked */}
          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
            className="text-slate-300 hover:text-yellow-400 transition-colors text-sm"
          >
            About
          </a>
          <a
            href="#skills"
            onClick={() => setMenuOpen(false)}
            className="text-slate-300 hover:text-yellow-400 transition-colors text-sm"
          >
            Skills
          </a>
          <a
            href="#projects"
            onClick={() => setMenuOpen(false)}
            className="text-slate-300 hover:text-yellow-400 transition-colors text-sm"
          >
            Projects
          </a>
          <a
            href="#certifications"
            onClick={() => setMenuOpen(false)}
            className="text-slate-300 hover:text-yellow-400 transition-colors text-sm"
          >
            Certifications
          </a>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="text-slate-300 hover:text-yellow-400 transition-colors text-sm"
          >
            Contact
          </a>
          <a
            href="/assets/Resume.pdf"
            download
            className="text-yellow-400 border border-yellow-400/60 px-4 py-2 rounded text-sm w-fit hover:bg-yellow-400 hover:text-[#020817] transition-all font-semibold"
          >
            Resume ↓
          </a>
        </div>
      )}
    </header>
  );
}
