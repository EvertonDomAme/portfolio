// This is the main page of the portfolio
// In Next.js App Router, page.tsx is the entry point for the "/" route

// We import each section as a separate component
import Navbar from "@/components/Navbar"; // Fixed navigation bar at the top
import Hero from "@/components/Hero"; // Hero section with name, title and call to action
import About from "@/components/About"; // About section with profile picture and bio
import Skills from "@/components/Skills"; // Skills section with skill bars and categories
import Projects from "@/components/Projects"; // Projects section with descriptions and links
import Certifications from "@/components/Certifications"; // Certifications is imported but not used here — it will be included in the RootLayout so it appears on every page
import Contact from "@/components/Contact"; // Contact is imported but not used here — it will be included in the RootLayout so it appears on every page
import Footer from "@/components/Footer"; // Footer is imported but not used here — it will be included in the RootLayout so it appears on every page

// This is the default export — Next.js requires this to render the page
export default function Home() {
  return (
    // <main> is a semantic HTML tag — it tells browsers and search engines
    // that this is the main content of the page (SEO and accessibility)
    <main>
      <Navbar /> {/* Fixed navigation bar at the top */}
      <Hero /> {/* First section the user sees when they land on the page */}
      <About /> {/* About section with skills and experience */}
      <Skills /> {/* Skills section with skill bars */}
      <Projects /> {/* Featured projects with descriptions and links */}
      <Certifications />{" "}
      {/* Certifications section with badges and verify links */}
      <Contact /> {/* Contact section with email, LinkedIn, WhatsApp */}
      <Footer /> {/* Footer with copyright and social links */}
    </main>
  );
}
