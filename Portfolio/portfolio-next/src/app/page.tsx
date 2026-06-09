import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Shapes from "@/components/Shapes";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Shapes />
      <Work />
      
      <section id="about" className="section-wrap">
        <div className="about-grid">
          <div>
            <h2 className="about-h2">Building tools that think alongside us.</h2>
            <p className="about-p">I believe the most effective AI isn't the one that replaces the user, but the one that makes them more capable. I spend my time designing the interfaces and architectures that enable this partnership.</p>
            <a className="about-email" href="mailto:hello@shoumenrp.com">
              hello@shoumenrp.com
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
          <div className="caps-panel">
            <div className="caps-item">
              <div className="caps-name">Agentic Design Systems</div>
              <div className="caps-desc">Designing dynamic components that adapt to model confidence and intent.</div>
            </div>
            <div className="caps-item">
              <div className="caps-name">Enterprise SaaS Architecture</div>
              <div className="caps-desc">Complexity management for regulated industries and high-density data.</div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="foot-copy">© 2024 Shoumen R Pramanik</div>
        <div className="foot-loc">Based in Mumbai, working globally.</div>
      </footer>
    </main>
  );
}
