// 'use client' because we use useEffect and useRef
// for the scroll reveal IntersectionObserver
"use client";

import { useEffect, useRef } from "react";

// Import Next.js optimized Image component
import Image from "next/image";

// Certifications data array
// badge → references images added to /public/assets/ folder
// verifyUrl → the official URL to verify the certification
// color and borderColor → gradient and border for each card
const certifications = [
  {
    title: "Salesforce Certified Platform Developer I",
    issuer: "Salesforce",
    date: "December 2024",
    credentialId: "5457586",
    badge: "/assets/platform_dev_badge.png",
    verifyUrl: "https://sforce.co/verifycerts",
    color: "from-blue-600/20 to-blue-400/5",
    borderColor: "border-blue-400/20",
  },
  {
    title: "Salesforce Certified Agentforce Specialist",
    issuer: "Salesforce",
    date: "December 2024",
    credentialId: "5486655",
    badge: "/assets/agentforce_badge.png",
    verifyUrl: "https://sforce.co/verifycerts",
    color: "from-purple-600/20 to-purple-400/5",
    borderColor: "border-purple-400/20",
  },
  {
    title: "JavaScript: Understanding the Weird Parts",
    issuer: "Udemy",
    date: "October 2023",
    credentialId: "UC-38a4d099-5229-4504-ab63-441f4cff7d61",
    badge: "/assets/udemy_logo_white_bg.png",
    verifyUrl: "https://ude.my/UC-38a4d099-5229-4504-ab63-441f4cff7d61",
    color: "from-amber-600/20 to-amber-400/5",
    borderColor: "border-amber-400/20",
  },
];

export default function Certifications() {
  // IntersectionObserver watches .reveal elements and adds .visible class when they enter the viewport
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
    // id="certifications" the anchor target for the Navbar link
    // bg-[#0a1628]/30 alternates the background to visually separate sections
    <section
      id="certifications"
      ref={sectionRef}
      className="py-32 bg-[#0a1628]/30"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* ---- Section Header ---- */}
        <div className="text-center mb-16 reveal">
          <p className="text-yellow-400 text-sm tracking-widest uppercase mb-3">
            Credentials
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Certifications
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Verified credentials from industry-leading platforms.
          </p>
        </div>

        {/* ---- Certifications Grid ---- */}
        {/* 3 columns on desktop, 1 column on mobile */}
        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              // bg-gradient-to-br applies the gradient from the data above
              // flex flex-col lets us push the verify link to the bottom
              className={`reveal card-glow bg-linear-to-br ${cert.color} border ${cert.borderColor} rounded-xl p-6 flex flex-col`}
            >
              {/* ---- Badge Image ---- */}
              <div className="flex justify-center mb-5">
                {/* Next.js Image component */}
                <Image
                  src={cert.badge}
                  alt={cert.title}
                  width={96}
                  height={96}
                  className="object-contain rounded-lg"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>

              {/* ---- Cert Info ---- */}
              <h3 className="font-semibold text-white text-center text-sm mb-1 leading-snug">
                {cert.title}
              </h3>
              <p className="text-slate-400 text-xs text-center mb-1">
                {cert.issuer}
              </p>
              <p className="text-slate-500 text-xs text-center mb-4">
                {cert.date}
              </p>

              {/* ---- Credential ID + Verify Link ---- */}
              {/* mt-auto pushes this block to the bottom of the card */}
              <div className="mt-auto pt-4 border-t border-white/5">
                {/* Credential ID — truncate prevents long IDs from breaking layout */}
                <p className="text-slate-600 text-xs text-center mb-3 truncate">
                  ID: {cert.credentialId}
                </p>

                {/* Verify link — opens the official verification page in a new tab */}

                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  {/* Checkmark SVG icon */}
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Verify Certificate
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
