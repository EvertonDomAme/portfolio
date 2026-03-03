// 'use client' because we use useState for the form state
// and useEffect + useRef for the scroll reveal
"use client";

import { useState, useEffect, useRef } from "react";

export default function Contact() {
  // sectionRef attaches to the <section> element
  // used by IntersectionObserver to watch .reveal elements
  const sectionRef = useRef<HTMLDivElement>(null);

  // form stores all the input field values as a single object
  // We update individual fields using the name attribute of each input
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // status tracks the current state of the form submission
  // idle    → form is ready to be filled
  // sending → form was submitted, waiting for API response
  // success → email was sent successfully
  // error   → something went wrong
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  // Same IntersectionObserver pattern used in all other sections
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

  // handleChange updates the form state when the user types in any field
  // e.target.name matches the name attribute of the input (e.g. "name", "email")
  // e.target.value is what the user typed
  // ...prev spreads the previous form values so we only update the changed field
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // handleSubmit runs when the user clicks the Send button
  const handleSubmit = async (e: React.FormEvent) => {
    // preventDefault stops the browser from refreshing the page on form submit
    // which is the default HTML form behaviour
    e.preventDefault();
    setStatus("sending");

    try {
      // POST request to our Next.js API route
      // We send the form data as JSON in the request body
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        // Email sent successfully
        setStatus("success");
        // Clear the form back to empty fields
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      // Network error or API route crashed
      setStatus("error");
    }
  };

  return (
    // id="contact" is the anchor target for the Navbar "Contact" link
    <section id="contact" ref={sectionRef} className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* ---- Section Header ---- */}
        <div className="text-center mb-16 reveal">
          <p className="text-yellow-400 text-sm tracking-widest uppercase mb-3">
            Contact
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Have a project in mind or just want to connect? Reach out via any
            channel below.
          </p>
        </div>

        {/* ---- Two Column Layout ---- */}
        {/* Left = quick contact buttons, Right = contact form */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* ---- LEFT COLUMN — Quick Contact Options ---- */}
          <div className="reveal space-y-5">
            <h3 className="font-semibold text-white text-lg mb-6">
              Quick Contact
            </h3>

            {/* ---- Email Button ---- */}

            <a
              href="mailto:everton.oliveira.sf@gmail.com"
              className="card-glow flex items-center gap-4 bg-[#0a1628]/60 border border-white/5 rounded-xl p-5 group"
            >
              {/* Icon container — group-hover changes bg color when card is hovered */}
              <div className="w-12 h-12 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 group-hover:bg-red-500/20 transition-colors">
                {/* Email SVG icon */}
                <svg
                  className="w-5 h-5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  Send an Email
                </p>
                <p className="text-slate-500 text-xs">
                  everton.oliveira.sf@gmail.com
                </p>
              </div>
              {/* Arrow icon — group-hover changes color when card is hovered */}
              <svg
                className="w-4 h-4 text-slate-600 ml-auto group-hover:text-yellow-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>

            {/* ---- WhatsApp Button ---- */}
            {/* wa.me is WhatsApp's official link format
                The number comes from the environment variable
                process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
                NEXT_PUBLIC_ prefix makes it available in the browser
                The message is pre-filled using URL encoding (%20 = space) */}

            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%20Everton%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect!`}
              target="_blank"
              rel="noopener noreferrer"
              className="card-glow flex items-center gap-4 bg-[#0a1628]/60 border border-white/5 rounded-xl p-5 group"
            >
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                {/* WhatsApp SVG icon */}
                <svg
                  className="w-5 h-5 text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  Message on WhatsApp
                </p>
                <p className="text-slate-500 text-xs">
                  Opens a chat — number stays private
                </p>
              </div>
              <svg
                className="w-4 h-4 text-slate-600 ml-auto group-hover:text-yellow-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>

            {/* ---- LinkedIn Button ---- */}

            <a
              href="https://www.linkedin.com/in/evertondeoliveiramelo/"
              target="_blank"
              rel="noopener noreferrer"
              className="card-glow flex items-center gap-4 bg-[#0a1628]/60 border border-white/5 rounded-xl p-5 group"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                {/* LinkedIn SVG icon */}
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  Connect on LinkedIn
                </p>
                <p className="text-slate-500 text-xs">
                  Send a message directly via LinkedIn
                </p>
              </div>
              <svg
                className="w-4 h-4 text-slate-600 ml-auto group-hover:text-yellow-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>

          {/* ---- RIGHT COLUMN — Contact Form ---- */}
          <div className="reveal">
            <h3 className="font-semibold text-white text-lg mb-6">
              Send a Message
            </h3>

            {/* onSubmit calls our handleSubmit function above */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ---- Name + Email Row ---- */}
              {/* grid-cols-2 puts name and email side by side on desktop */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs mb-1.5 tracking-wide">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name" // must match the key in form state
                    required // HTML5 validation — blocks submit if empty
                    value={form.name} // controlled input — value comes from state
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-[#0a1628]/60 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-yellow-400/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1.5 tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-[#0a1628]/60 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-yellow-400/50 transition-colors"
                  />
                </div>
              </div>

              {/* ---- Subject Field ---- */}
              <div>
                <label className="block text-slate-400 text-xs mb-1.5 tracking-wide">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project enquiry"
                  className="w-full bg-[#0a1628]/60 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-yellow-400/50 transition-colors"
                />
              </div>

              {/* ---- Message Field ---- */}
              <div>
                <label className="block text-slate-400 text-xs mb-1.5 tracking-wide">
                  Message
                </label>
                {/* textarea is a multi-line input
                    rows={5} sets the default height
                    resize-none prevents the user from resizing it */}
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="w-full bg-[#0a1628]/60 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-yellow-400/50 transition-colors resize-none"
                />
              </div>

              {/* ---- Submit Button ---- */}
              <button
                type="submit"
                // disabled prevents multiple submissions while sending
                disabled={status === "sending"}
                className="w-full py-3.5 bg-yellow-400 text-[#020817] rounded-lg font-semibold text-sm hover:bg-yellow-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {/* Show spinner + "Sending..." text while waiting for API response */}
                {status === "sending" ? (
                  <>
                    {/* Spinning SVG circle — animate-spin rotates it continuously */}
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              {/* ---- Status Messages ---- */}
              {/* Only renders when status is 'success' or 'error' */}
              {status === "success" && (
                <p className="text-emerald-400 text-sm text-center">
                  ✓ Message sent! I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm text-center">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
