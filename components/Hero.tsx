// 'use client' because we use useState and useEffect for the typewriter animation
"use client";

import { useState, useEffect } from "react";

// The list of roles that cycle through in the typewriter animation
// Add or remove roles here anytime
const roles = [
  "Back-End Developer",
  "Salesforce Developer",
  "Node.js Engineer",
  "Problem Solver",
];

export default function Hero() {
  // roleIndex tracks WHICH role we are currently typing (0 = first, 1 = second, etc.)
  const [roleIndex, setRoleIndex] = useState(0);

  // displayed is the text currently shown on screen (grows and shrinks as we type/delete)
  const [displayed, setDisplayed] = useState("");

  // typing tracks whether we are currently typing (true) or deleting (false)
  const [typing, setTyping] = useState(true);

  // This effect runs every time displayed, typing or roleIndex changes
  // It controls the typewriter animation logic
  useEffect(() => {
    const current = roles[roleIndex]; // Get the current role we're animating

    if (typing) {
      // TYPING MODE: add one character at a time
      if (displayed.length < current.length) {
        // Not finished typing yet — add the next character after 60ms
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, 60);
        return () => clearTimeout(t); // Cleanup timer on re-render
      } else {
        // Finished typing the full word — pause for 2 seconds then start deleting
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      // DELETING MODE: remove one character at a time
      if (displayed.length > 0) {
        // Not finished deleting yet — remove last character after 35ms
        const t = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 35);
        return () => clearTimeout(t);
      } else {

        // Finished deleting — move to next role and start typing again
        // Wrapping in setTimeout(0) moves the state updates out of the
        // synchronous effect body — fixes the cascading renders warning
        // 0ms means it runs as soon as possible but NOT synchronously
        setTimeout(() => {
          setRoleIndex((i) => (i + 1) % roles.length)
          setTyping(true)
        }, 0)
      }
    }
  }, [displayed, typing, roleIndex]);

  return (
    // min-h-screen makes the hero fill the full viewport height
    // flex + items-center + justify-center centers the content vertically and horizontally
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative"
    >
      {/* Centered content container — max-w-4xl limits width on large screens */}
      <div className="text-center max-w-4xl mx-auto px-6">
        {/* Name heading — font-bold and large text size */}
        <h1 className="text-6xl md:text-8xl font-bold mb-4">
          <span className="text-white">Everton </span>
          {/* gradient-text is a custom CSS class defined in globals.css */}
          <span className="gradient-text">Oliveira</span>
        </h1>

        {/* Typewriter container — fixed height prevents layout shift as text changes */}
        <div className="h-10 flex items-center justify-center mb-6">
          <p className="text-xl md:text-2xl text-slate-300">
            {displayed}
            {/* Blinking cursor — animate-pulse makes it blink using Tailwind */}
            <span className="inline-block w-0.5 h-6 bg-yellow-400 ml-1 animate-pulse" />
          </p>
        </div>

        {/* Tagline */}
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Building robust back-end systems with clean architecture and a passion
          for developer experience. Bridging traditional development with the
          Salesforce ecosystem.
        </p>

        {/* CTA buttons row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary CTA — gold background, scrolls to projects */}

          <a
            href="#projects"
            className="px-8 py-3 bg-yellow-400 text-[#020817] rounded font-semibold text-sm hover:bg-yellow-500 transition-colors"
          >
            View My Work
          </a>

          {/* Secondary CTA — outline style, scrolls to contact */}

          <a
            href="#contact"
            className="px-8 py-3 border border-white/20 text-white rounded font-semibold text-sm hover:border-yellow-400/60 hover:text-yellow-400 transition-colors"
          >
            Get In Touch
          </a>

          {/* Download CV — subtle style, downloads resume PDF */}

          <a
            href="/assets/Resume.pdf"
            download
            className="px-8 py-3 border border-white/20 text-slate-300 rounded font-semibold text-sm hover:border-yellow-400/60 hover:text-yellow-400 transition-colors"
          >
            Download CV ↓
          </a>
        </div>

        {/* Social links row */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <a
            href="https://github.com/EvertonDomAme"
            target="_blank" // Opens in a new tab
            rel="noopener noreferrer" // Security best practice when using target="_blank"
            className="text-slate-500 hover:text-white transition-colors text-sm"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/evertondeoliveiramelo/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white transition-colors text-sm"
          >
            LinkedIn
          </a>

          <a
            href="mailto:everton.oliveira.sf@gmail.com"
            className="text-slate-500 hover:text-white transition-colors text-sm"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
