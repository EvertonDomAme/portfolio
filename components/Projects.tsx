// 'use client' because we use useEffect and useRef
// for the scroll reveal IntersectionObserver
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// Projects data array — add real projects here as they are built or in progress
// Each project has a title, description, tech stack, status, and links
// github and live can be set to null if not available yet
const projects = [
  {
    title: "Portfolio Website",
    description:
      "Personal portfolio built with Next.js 16, React, TypeScript and Tailwind CSS. Features smooth animations, contact form with Nodemailer, and responsive design.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Nodemailer"],
    status: "Live & Evolving",
    // statusColor controls the badge color for each status type
    statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    github: "https://github.com/EvertonDomAme",
    live: null, // No live URL yet — button will be hidden
    image: "/favicon.ico", // Placeholder image — replace with actual project screenshot
  },
  {
    title: "JAVA Inventory control System",
    description:
      "INventory control system built with JAVA, Spring Boot and MySQL. Features CRUD operations, user authentication and role-based access control. Designed for small businesses to manage stock and sales efficiently...",
    tech: ["JAVA", "Spring Boot", "MySQL"],
    status: "Under Development",
    statusColor: "text-slate-400 bg-slate-400/10 border-slate-400/30",
    github: null,
    live: null,
    image: "",
  },
];

export default function Projects() {
  // Same IntersectionObserver pattern used in About and Skills
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 },
    );
    sectionRef.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    // id="projects" is the anchor target for the Navbar "Projects" link
    <section id="projects" ref={sectionRef} className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* ---- Section Header ---- */}
        <div className="text-center mb-16 reveal">
          <p className="text-yellow-400 text-sm tracking-widest uppercase mb-3">
            Work
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            A selection of projects I&apos;ve built or contributed to. More on
            my GitHub.
          </p>
        </div>

        {/* ---- Projects Grid ---- */}
        {/* 2 columns on desktop, 1 column on mobile */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              // flex flex-col allows us to push the links to the bottom
              // using mt-auto on the links div below
              className="reveal card-glow bg-[#0a1628]/60 border border-white/5 rounded-xl p-6 flex flex-col"
            >
              {/* ---- Card Top Row — folder icon + status badge ---- */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#0f2040] border border-white/10 flex items-center justify-center overflow-hidden">
                  {project.image ? (
                    // If project has an image, show it
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={40}
                      height={40}
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    // If no image, fall back to folder emoji
                    <span className="text-yellow-400 text-lg">📁</span>
                  )}
                </div>

                {/* Status badge — color comes from statusColor in the data above */}
                <span
                  className={`text-xs px-2.5 py-1 rounded-full border ${project.statusColor}`}
                >
                  {project.status}
                </span>
              </div>

              {/* ---- Project Title & Description ---- */}
              <h3 className="font-display text-xl font-bold text-white mb-2">
                {project.title}
              </h3>
              {/* flex-1 makes the description take up all available space
                  pushing the tech tags and links to the bottom of the card */}
              <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              {/* ---- Tech Stack Tags ---- */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs text-slate-400 bg-[#0f2040] border border-white/5 px-2.5 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* ---- Links Row ---- */}
              {/* mt-auto pushes this to the bottom of the card regardless of content height */}
              <div className="flex gap-4 mt-auto">
                {/* GitHub link — only renders if github is not null */}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank" // Opens in new tab
                    rel="noopener noreferrer" // Security best practice
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {/* GitHub SVG icon */}
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                )}

                {/* Live Demo link — only renders if live is not null */}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-slate-400 hover:text-yellow-400 text-sm transition-colors"
                  >
                    {/* External link SVG icon */}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ---- GitHub CTA ---- */}
        {/* Encourages visitors to see more work on GitHub */}
        <div className="text-center mt-10 reveal">
          <a
            href="https://github.com/EvertonDomAme"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-yellow-400 transition-colors text-sm"
          >
            View all projects on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
