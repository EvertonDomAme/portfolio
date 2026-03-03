
"use client";

// useEffect → runs code after the component appears on screen
// useRef → gives us a reference to the actual HTML element in the DOM
// We need the ref to tell IntersectionObserver WHICH elements to watch
import { useEffect, useRef } from "react";

// Static data for the stats cards
// Defined outside the component so it doesn't get recreated on every render
const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "3", label: "Certifications" },
  { value: "1+", label: "Projects Delivered" }, // Cosidering portfolio as first and more to come.
  { value: "2", label: "Countries Worked" },
];

export default function About() {
  // sectionRef attaches to the <section> element
  // It makes able to search for .reveal elements INSIDE this section only
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // IntersectionObserver watches elements and fires a callback
    // when they enter or leave the viewport (visible area of the browser)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When the element becomes visible, add the 'visible' class
          // This triggers the CSS animation defined in globals.css
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }, // Trigger when 10% of the element is visible
    );

    // Find all elements with class 'reveal' inside this section
    // and tell the observer to watch them
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });

    // Cleanup: stop observing when component is removed from the page
    return () => observer.disconnect();
  }, []); // Empty [] = run only once when component mounts

  return (
    // id="about" is the anchor target for the Navbar "About" link
    // ref={sectionRef} connects this element to our useRef above
    <section id="about" ref={sectionRef} className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Two column layout on desktop, single column on mobile
            grid-cols-1 = mobile (1 column)
            lg:grid-cols-2 = desktop (2 columns) */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ---- LEFT COLUMN — Bio Text ---- */}
          <div>
            {/* Section label + title — reveal class triggers scroll animation */}
            <div className="reveal">
              {/* Small uppercase label above the title — common design pattern */}
              <p className="text-yellow-400 text-sm tracking-widest uppercase mb-3">
                About Me
              </p>
              {/* gold-underline is our custom CSS class from globals.css */}
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 gold-underline">
                Who I Am
              </h2>
            </div>

            {/* Bio paragraphs — mt-10 adds space below the underline */}
            <div className="reveal space-y-4 text-slate-400 leading-relaxed mt-10">
              <p>
                I&apos;m{" "}
                <span className="text-white font-semibold">
                  Everton de Oliveira Melo
                </span>
                , a Back-End Developer based in{" "}
                <span className="text-white font-semibold">
                  Santo André, Brazil
                </span>
                , with 2+ years of hands-on experience building large-scale
                e-commerce solutions on the Salesforce Commerce Cloud platform.
              </p>
              <p>
                At <span className="text-white font-semibold">OSF Digital</span>
                , I worked on the Back-End development team using the SFRA
                architecture, delivering solutions for globally recognised
                brands such as{" "}
                <span className="text-yellow-400">Tiffany & Co</span> and{" "}
                <span className="text-yellow-400">Toys&quot;R&quot;Us</span>. My
                work involved REST/SOAP API integrations, server-side
                performance optimisation, bug fixing, and technical
                documentation.
              </p>
              <p>
                I hold certifications in{" "}
                <span className="text-yellow-400">
                  Salesforce Platform Developer I
                </span>{" "}
                and{" "}
                <span className="text-yellow-400">Agentforce Specialist</span>,
                and I&apos;m continuously expanding my expertise across the
                Salesforce ecosystem and modern Back-End technologies like
                Node.js and TypeScript.
              </p>
            </div>

            {/* Action buttons */}
            <div className="reveal mt-8 flex flex-wrap gap-3">
              {/* Primary button — scrolls to contact section */}

              <a
                href="#contact"
                className="px-6 py-2.5 bg-yellow-400 text-[#020817] rounded font-semibold text-sm hover:bg-yellow-500 transition-colors"
              >
                Let&apos;s Talk
              </a>

              {/* Secondary button — downloads resume */}

              <a
                href="/assets/Resume.pdf"
                download
                className="px-6 py-2.5 border border-white/20 text-white rounded font-semibold text-sm hover:border-yellow-400/60 hover:text-yellow-400 transition-colors"
              >
                Download Resume ↓
              </a>
            </div>
          </div>

          {/* ---- RIGHT COLUMN — Stats Cards ---- */}
          <div className="reveal">
            {/* 2x2 grid of stat cards */}
            <div className="grid grid-cols-2 gap-5">
              {/* Map over the stats array to render each card*/}
              {stats.map((stat) => (
                <div
                  key={stat.label} // key is required by React when rendering lists
                  className="card-glow bg-[#0a1628]/60 border border-white/5 rounded-xl p-8 text-center"
                >
                  {/* gradient-text is our custom CSS class from globals.css */}
                  <p className="font-display text-4xl font-bold gradient-text mb-2">
                    {stat.value}
                  </p>
                  <p className="text-slate-400 text-sm tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Location badge below the stats grid */}
            <div className="mt-5 flex items-center gap-3 bg-[#0a1628]/40 border border-white/5 rounded-xl px-5 py-4">
              {/* Green pulsing dot = "currently active / available" signal */}
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <p className="text-slate-400 text-sm">
                Based in <span className="text-white font-medium">Brazil</span>{" "}
                · Open to remote opportunities worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
