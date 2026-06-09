"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav id="nav" className={scrolled ? "scrolled" : ""}>
      <Link href="/" className="nav-logo">
        SRP<span>.</span>
      </Link>
      <div className="nav-links">
        <Link href="#work" className="nav-link">Work</Link>
        <Link href="#about" className="nav-link">About</Link>
        <a className="nav-cta" href="mailto:hello@shoumenrp.com">Contact</a>
      </div>

      <style jsx>{`
        #nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: 64px; padding: 0 40px;
          display: flex; align-items: center; justify-content: space-between;
          transition: background .3s, border-color .3s;
          border-bottom: 1px solid transparent;
        }
        #nav.scrolled {
          background: rgba(245, 242, 236, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-color: var(--bdr);
        }
        .nav-logo {
          font-family: 'Playfair Display', sans-serif; font-weight: 700; font-size: 15px;
          letter-spacing: -0.01em; cursor: pointer;
        }
        .nav-logo span { color: var(--acc); }
        .nav-links { display: flex; gap: 28px; align-items: center; }
        .nav-link {
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: .1em; text-transform: uppercase;
          color: var(--t3); transition: color .2s;
        }
        .nav-link:hover { color: var(--t1); }
        .nav-cta {
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: .1em; text-transform: uppercase;
          color: var(--acc);
          border: 1px solid rgba(244, 201, 93, .28);
          padding: 6px 16px; border-radius: 6px;
          transition: background .2s, border-color .2s;
        }
        .nav-cta:hover { background: var(--acc-dim); border-color: var(--acc); }
        
        @media(max-width: 600px) {
          #nav { padding: 0 20px; }
        }
      `}</style>
    </nav>
  );
}
