// Footer is a simple server component — no interactivity needed
export default function Footer() {
  // new Date().getFullYear() gets the current year dynamically
  // This means the copyright year updates automatically every year
  // without needing to manually change it
  const year = new Date().getFullYear();

  return (
    // border-t adds a subtle top border to separate footer from Contact section
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* ---- Logo ---- */}
        {/* Same logo style as the Navbar for consistency */}
        <a href="#hero" className="font-display text-lg font-bold">
          Everton
          {/* Gold dot — signature design detail used throughout the portfolio */}
          <span className="text-yellow-400">.</span>
        </a>

        {/* ---- Copyright ---- */}
        <p className="text-slate-600 text-sm">
          © {year} Everton Oliveira. Built with Next.js & Tailwind CSS.
        </p>

        {/* ---- Social Links ---- */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/EvertonDomAme"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-white transition-colors text-sm"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/evertondeoliveiramelo/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-white transition-colors text-sm"
          >
            LinkedIn
          </a>
          <a
            href="mailto:everton.oliveira.sf@gmail.com"
            className="text-slate-600 hover:text-white transition-colors text-sm"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
