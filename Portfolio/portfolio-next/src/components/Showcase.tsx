"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projectsData from "../data/projects.json";

export default function Showcase() {
  const [index, setIndex] = useState(0);
  const projects = projectsData.projects;
  const duration = 5; // seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % projects.length);
    }, duration * 1000);
    return () => clearInterval(timer);
  }, [projects.length]);

  const currentProject = projects[index];

  return (
    <motion.div 
      className="hero-showcase"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="showcase-visual">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentProject.slug}
            src={currentProject.coverImage}
            alt={currentProject.title}
            className="showcase-img"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>
      <div className="showcase-content">
        <div className="showcase-tag">Latest Case Study</div>
        <AnimatePresence mode="wait">
          <motion.h3 
            key={currentProject.slug}
            className="showcase-title"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.4 }}
          >
            {currentProject.title}
          </motion.h3>
        </AnimatePresence>
        <div className="showcase-link">
          Read Case Study
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="showcase-progress-bg">
          <motion.div 
            key={index}
            className="showcase-progress"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
