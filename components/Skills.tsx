// 'use client' because we use useEffect and useRef
// for the scroll reveal IntersectionObserver
"use client";

import { useEffect, useRef } from "react";

import Image from 'next/image'

// Tech icons data — each icon comes from the devicons GitHub repo
// This is a public repo that hosts SVG icons for all major technologies
// We use the raw URL to load them directly as <Image> tags
const techIcons = [
  {
    name: "JavaScript",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg",
  },
  {
    name: "TypeScript",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg",
  },
  {
    name: "Node.js",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "React",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
  },
  {
    name: "Java",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
  },
  {
    name: "HTML5",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",
  },
  {
    name: "Git",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
  },
];

// Skill groups — each group has a category, icon and list of skills with levels
// level is a percentage (0-100) that controls the width of the progress bar
// Update these percentages to accurately reflect your skill level
const skillGroups = [
  {
    category: "Languages",
    icon: "⌨️",
    skills: [
      { name: "JavaScript", level:75 },
      { name: "TypeScript", level: 50 },
      { name: "Java", level: 50 },
      { name: "Apex (Salesforce)", level: 75 },
    ],
  },
  {
    category: "Back-End",
    icon: "⚙️",
    skills: [
      { name: "Node.js", level: 75 },
      { name: "REST APIs", level: 50 },
      { name: "Express.js", level: 50 },
      { name: "Next.js API Routes", level: 75 },
    ],
  },
  {
    category: "Salesforce",
    icon: "☁️",
    skills: [
      { name: "Apex Development", level: 75 },
      { name: "LWC", level: 50 },
      { name: "Agentforce", level: 50 },
      { name: "Salesforce Platform", level: 75 },
    ],
  },
  {
    category: "Front-End & Tools",
    icon: "🛠️",
    skills: [
      { name: "React", level: 50 },
      { name: "HTML / CSS", level: 75 },
      { name: "Git / GitHub", level: 75 },
      { name: "NPM / Package Management", level: 75 },
    ],
  },
];

export default function Skills() {
  // Same IntersectionObserver pattern as About.tsx
  // Watches for .reveal elements and adds .visible class when they enter the viewport
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
    // id="skills" is the anchor target for the Navbar "Skills" link
    // bg-[#0a1628]/30 adds a slightly lighter background to visually
    // separate this section from About and Projects
    <section id="skills" ref={sectionRef} className="py-32 bg-[#0a1628]/30">
      <div className="max-w-6xl mx-auto px-6">
        {/* ---- Section Header ---- */}
        <div className="text-center mb-16 reveal">
          <p className="text-yellow-400 text-sm tracking-widest uppercase mb-3">
            Expertise
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Skills & Technologies
          </h2>
        </div>

        {/* ---- Tech Icon Strip ---- */}
        {/* flex-wrap allows icons to wrap to next line on smaller screens */}
        <div className="reveal flex flex-wrap justify-center gap-6 mb-16">
          {techIcons.map((icon) => (
            <div
              key={icon.name}
              // group allows child elements to react to hover on the parent
              // e.g. group-hover:text-slate-300 on the <span> below
              className="group flex flex-col items-center gap-2 card-glow bg-[#0a1628]/60 border border-white/5 rounded-xl p-4 w-20"
            >
              <Image
                src={icon.src}
                alt={icon.name}
                width={32}
                height={32}
              />
              <span className="text-slate-500 text-xs group-hover:text-slate-300 transition-colors">
                {icon.name}
              </span>
            </div>
          ))}
        </div>

        {/* ---- Skill Groups Grid ---- */}
        {/* 2 columns on desktop, 1 column on mobile */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="reveal card-glow bg-[#0a1628]/60 border border-white/5 rounded-xl p-6"
            >
              {/* Group header — icon + category name */}
              <h3 className="font-semibold text-white mb-5 flex items-center gap-2">
                <span>{group.icon}</span>
                {group.category}
              </h3>

              {/* Skill bars */}
              <div className="space-y-4">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    {/* Skill name + percentage on the same row */}
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-slate-300 text-sm">
                        {skill.name}
                      </span>
                      <span className="text-slate-500 text-xs">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress bar track — the grey background bar */}
                    <div className="h-1.5 bg-[#0f2040] rounded-full overflow-hidden">
                      {/* Progress bar fill — width is set dynamically from skill.level
                          The gradient goes from gold to blue matching our design tokens */}
                      <div
                        className="h-full rounded-full bg-linear-to-r from-yellow-400 to-blue-400"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
