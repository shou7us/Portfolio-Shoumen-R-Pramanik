"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectCardProps {
  project: any;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [showGate, setShowGate] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  const cleanTitle = project.title?.replace(/<\/?[^>]+(>|$)/g, "") || "";

  function handleClick() {
    if (!project.file) return;

    if (project.visibility === "private" && project.password) {
      const key = "unlocked_v2_" + project.slug;
      const stored = sessionStorage.getItem(key);
      if (stored === btoa(project.password)) {
        window.location.href = "/" + project.file;
        return;
      }
      setShowGate(true);
      return;
    }

    window.location.href = "/" + project.file;
  }

  function handleUnlock() {
    if (!password.trim()) return;
    setChecking(true);
    setTimeout(() => {
      if (password.trim() === project.password) {
        sessionStorage.setItem("unlocked_v2_" + project.slug, btoa(project.password));
        setShowGate(false);
        window.location.href = "/" + project.file;
      } else {
        setError(true);
        setPassword("");
        setTimeout(() => setError(false), 800);
      }
      setChecking(false);
    }, 350);
  }

  return (
    <>
      <motion.div
        className={`card ${featured ? "featured" : ""}`}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={handleClick}
      >
        <div className="card-thumb">
          <div className="thumb-grid"></div>
          {project.visibility === "private" && (
            <div className="badge badge-lock">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Private
            </div>
          )}
          {featured && <div className="badge badge-feat">Featured</div>}
          <div className="thumb-label">
            {cleanTitle.split(' ').slice(0, 3).join(' ')}...
          </div>
          <img
            src={project.coverImage}
            alt={cleanTitle}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>

        <div className="card-body">
          <div className="card-tags">
            {project.tags?.map((tag: string) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <h3 className="card-title" dangerouslySetInnerHTML={{ __html: project.title }} />
          <p className="card-desc">{project.description}</p>

          <div className="card-cta">
            <div className="cta-link">
              View Case Study
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="cta-year">{project.meta?.year}</span>
          </div>
        </div>
      </motion.div>

      {/* Password Gate Modal */}
      <AnimatePresence>
        {showGate && (
          <motion.div
            className="pw-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowGate(false)}
          >
            <motion.div
              className={`pw-card ${error ? "shake" : ""}`}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pw-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 className="pw-title">Protected Case Study</h3>
              <p className="pw-desc">This project is under NDA. Enter the password to view.</p>
              <input
                className={`pw-input ${error ? "error" : ""}`}
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                autoFocus
              />
              {error && <p className="pw-error">Incorrect password. Try again.</p>}
              <button className="pw-btn" onClick={handleUnlock} disabled={checking}>
                {checking ? "Checking…" : "Unlock"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
