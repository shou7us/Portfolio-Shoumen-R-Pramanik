"use client";

import projectsData from "../data/projects.json";
import ProjectCard from "./ProjectCard";
import { Reveal } from "./Reveal";

export default function Work() {
  const projects = projectsData.projects;
  const highlighted = projects.filter(p => (p as any).highlight);
  const others = projects.filter(p => !(p as any).highlight);

  return (
    <section id="work" className="section-wrap">
      <Reveal>
        <div className="section-header">
          <div className="eyebrow">Selected Work</div>
          <h2 className="section-h2">Designing for <em>complexity</em> & scale.</h2>
        </div>
      </Reveal>

      <div className="grid-featured">
        {highlighted.map((p, i) => (
          <Reveal key={p.slug} delay={0.1 * i}>
            <ProjectCard project={p} featured />
          </Reveal>
        ))}
      </div>

      <div className="grid-rest">
        {others.map((p, i) => (
          <Reveal key={p.slug} delay={0.05 * i}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
