"use client";

import { motion } from "framer-motion";
import Showcase from "./Showcase";

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-left">
        <motion.div 
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Lead UX Designer · Mumbai, India
        </motion.div>
        
        <motion.h1 
          className="hero-name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Shoumen R<br /><em>Pramanik</em>
        </motion.h1>

        <motion.p 
          className="hero-manifesto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          I design systems that make complexity disappear — not because it doesn't exist, but because the right architecture absorbs it before the user ever has to.
        </motion.p>

        <motion.p 
          className="hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          10 years building AI-native products and enterprise SaaS across healthcare, financial services, and K–12 education. I ask more questions than most designers before I open Figma.
        </motion.p>

        <motion.div 
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <a className="btn-primary" href="#work">View Work</a>
          <a className="btn-secondary" href="mailto:hello@shoumenrp.com">Get in Touch</a>
        </motion.div>

        <div className="scroll-cue">
          <div className="scroll-line"></div>
          <span className="scroll-label">Scroll</span>
        </div>
      </div>

      <div className="hero-right">
        <motion.img
          className="hero-portrait"
          src="/assets/portrait.png"
          alt="Shoumen R Pramanik — Lead UX Designer"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="hero-portrait-label">Shoumen R Pramanik</div>
      </div>

      <Showcase />
    </section>
  );
}
