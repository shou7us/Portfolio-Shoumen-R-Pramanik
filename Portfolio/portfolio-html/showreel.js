(function () {
  const DURATION = 5000;
  const LABEL = { intro: "Overview", problem: "Problem", wireframe: "Wireframe", final: "Final UI", metrics: "Impact" };

  // Fallback hardcoded data used until JSON loads
  const FALLBACK = [
    { id:"ai-logic-suggest", title:"AI Logic Suggest", year:"2024", category:"AI · Survey Builder", accent:"#F5A623", order:1, slides:[{ type:"intro", sub:"Reducing survey logic setup from 45 min to under 5" },{ type:"problem", heading:"Logic setup took 45+ minutes for non-technical users", decisions:["Natural language over rule-based UI","In-context suggestions, not a separate panel","Progressive disclosure for power users"] },{ type:"wireframe", caption:"Input-to-logic flow exploration", image:"" },{ type:"wireframe", caption:"Suggestion panel — empty / loading / result states", image:"" },{ type:"final", caption:"AI Suggest panel with live rule preview", image:"" },{ type:"metrics", stats:[{ v:"60%", l:"Reduction in setup time" },{ v:"3×", l:"Branching adoption" },{ v:"4.6/5", l:"Usability score" }] }] },
    { id:"tags-coverage-matrix", title:"Tags Coverage Matrix", year:"2024", category:"Data Viz · Enterprise", accent:"#38BDF8", order:2, slides:[{ type:"intro", sub:"Tag hygiene at a glance across every survey and question" },{ type:"problem", heading:"Zero visibility into which questions were missing tags", decisions:["Matrix over list — spatial scanning wins","Progress rings for instant status reads","Inline drawer — no page navigation to edit"] },{ type:"wireframe", caption:"Matrix layout with coverage ring states", image:"" },{ type:"final", caption:"Coverage Matrix with animated progress rings", image:"" },{ type:"metrics", stats:[{ v:"80%", l:"Faster tag audits" },{ v:"2 clicks", l:"To fix any gap" },{ v:"Zero", l:"Post-launch tickets" }] }] },
    { id:"raise-a-dialogue", title:"Raise a Dialogue", year:"2024", category:"Wizard · XM Platform", accent:"#A78BFA", order:3, slides:[{ type:"intro", sub:"Turning a 7-step ordeal into a 3-phase conversation" },{ type:"problem", heading:"7-step wizard causing 40%+ drop-off at step 3", decisions:["Collapsed 7 steps into 3 logical phases","Persistent summary panel for orientation","Inline validation — no submit-to-error cycle"] },{ type:"wireframe", caption:"7-step flow vs compressed 3-phase model", image:"" },{ type:"final", caption:"Redesigned wizard with persistent summary sidebar", image:"" },{ type:"metrics", stats:[{ v:"42%", l:"Drop-off reduction" },{ v:"3 phases", l:"Down from 7 steps" },{ v:"2.1 min", l:"Avg completion time" }] }] },
    { id:"voxco-directory", title:"Voxco Directory", year:"2023", category:"Feature Design · SaaS", accent:"#34D399", order:4, slides:[{ type:"intro", sub:"Derived fields that compute at runtime, not design-time" },{ type:"problem", heading:"Analysts needed custom fields but had no dev support", decisions:["Formula builder using familiar spreadsheet syntax","Live preview — see result before saving","Scope-aware — fields inherit from parent directory"] },{ type:"wireframe", caption:"Derived field configuration flow", image:"" },{ type:"final", caption:"Formula editor with live preview panel", image:"" },{ type:"metrics", stats:[{ v:"0 dev", l:"Support required" },{ v:"12 min", l:"Avg field setup time" },{ v:"94%", l:"Task completion rate" }] }] },
  ];

  const FILES = [
    'content/showreel/ai-logic-suggest.json',
    'content/showreel/tags-coverage-matrix.json',
    'content/showreel/raise-a-dialogue.json',
    'content/showreel/voxco-directory.json',
  ];

  function wireframeSVG(accent) {
    const uid = "wf" + accent.replace("#", "");
    return `<svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;position:absolute;inset:0">
      <defs><pattern id="${uid}" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.045)" stroke-width="0.5"/></pattern></defs>
      <rect width="760" height="420" fill="url(#${uid})"/>
      <rect width="760" height="44" fill="rgba(255,255,255,0.04)"/>
      <rect x="16" y="13" width="96" height="18" rx="3" fill="rgba(255,255,255,0.09)"/>
      <rect x="678" y="13" width="68" height="18" rx="5" fill="${accent}40"/>
      <rect x="0" y="44" width="164" height="376" fill="rgba(255,255,255,0.025)"/>
      ${[0,1,2,3,4,5].map(i=>`<rect x="12" y="${64+i*46}" width="140" height="28" rx="4" fill="${i===2?accent+'22':'rgba(255,255,255,0.04)'}"/>`).join('')}
      <rect x="180" y="60" width="564" height="60" rx="6" fill="rgba(255,255,255,0.04)"/>
      <rect x="196" y="75" width="180" height="13" rx="3" fill="rgba(255,255,255,0.09)"/>
      <rect x="644" y="70" width="84" height="26" rx="5" fill="${accent}3A"/>
      ${[0,1,2].map(i=>`<rect x="${180+i*196}" y="140" width="180" height="104" rx="6" fill="${i===1?accent+'18':'rgba(255,255,255,0.035)'}"/>`).join('')}
      <rect x="180" y="264" width="564" height="140" rx="6" fill="rgba(255,255,255,0.035)"/>
    </svg>`;
  }

  function finalUISVG(accent) {
    return `<svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;position:absolute;inset:0">
      <rect width="760" height="420" fill="#090910"/>
      <rect width="760" height="50" fill="#10101A"/>
      <circle cx="26" cy="25" r="10" fill="${accent}" opacity="0.9"/>
      <rect x="624" y="13" width="120" height="24" rx="6" fill="${accent}" opacity="0.88"/>
      <rect x="0" y="50" width="176" height="370" fill="#0C0C14"/>
      ${[0,1,2,3,4].map(i=>`<rect x="12" y="${76+i*54}" width="152" height="38" rx="6" fill="${i===1?accent+'1A':'transparent'}" stroke="${i===1?accent+'35':'transparent'}" stroke-width="1"/><rect x="40" y="${88+i*54}" width="${i===1?84:62+i*5}" height="13" rx="3" fill="${i===1?accent+'75':'rgba(255,255,255,0.11)'}"/>`).join('')}
      <rect x="192" y="66" width="552" height="50" rx="8" fill="#10101A"/>
      <rect x="640" y="75" width="92" height="22" rx="6" fill="${accent}" opacity="0.82"/>
      ${[0,1,2].map(i=>`<rect x="${192+i*192}" y="134" width="176" height="80" rx="8" fill="#10101A"/><rect x="${208+i*192}" y="170" width="${i===1?52:72}" height="26" rx="4" fill="${accent}" opacity="${0.42+i*0.14}"/>`).join('')}
      <rect x="192" y="232" width="360" height="172" rx="8" fill="#10101A"/>
      <rect x="568" y="232" width="176" height="172" rx="8" fill="#10101A" stroke="${accent}28" stroke-width="1"/>
      <rect x="584" y="252" width="110" height="13" rx="3" fill="${accent}60"/>
      <rect x="584" y="382" width="148" height="20" rx="6" fill="${accent}" opacity="0.82"/>
    </svg>`;
  }

  function slideHTML(slide, project, ap, total) {
    const a = project.accent;
    const pill = `display:inline-flex;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:${a};font-weight:700;font-family:Manrope,sans-serif;background:${a}18;padding:4px 12px;border-radius:20px;border:1px solid ${a}28`;

    switch (slide.type) {
      case "intro": return `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;padding:56px 80px">
          <div style="${pill}">${project.category}</div>
          <h2 style="font-family:'Cormorant Garamond',serif;font-size:clamp(32px,5vw,68px);font-weight:700;color:#fff;margin:28px 0 20px;line-height:1.03;letter-spacing:-.025em">${project.title}</h2>
          <p style="font-family:Manrope,sans-serif;font-size:18px;color:rgba(255,255,255,.48);font-weight:300;max-width:520px;line-height:1.65;margin:0">${slide.sub||''}</p>
          <div style="margin-top:48px;width:40px;height:1px;background:${a};opacity:.4"></div>
          <div style="margin-top:16px;font-size:12px;color:rgba(255,255,255,.22);letter-spacing:.12em;font-family:Manrope,sans-serif">${project.year} · Project ${ap+1} of ${total}</div>
        </div>`;

      case "problem": return `
        <div style="display:flex;height:100%">
          <div style="flex:1;padding:52px 48px;display:flex;flex-direction:column;justify-content:center">
            <div style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:${a};font-family:Manrope,sans-serif;font-weight:700;margin-bottom:24px">Problem Space</div>
            <h3 style="font-family:'Cormorant Garamond',serif;font-size:clamp(22px,2.5vw,36px);font-weight:600;color:#fff;margin:0 0 36px;line-height:1.2">${slide.heading||''}</h3>
            <div style="border-left:2px solid ${a}35;padding-left:24px">
              <div style="font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:${a};font-family:Manrope,sans-serif;font-weight:700;margin-bottom:18px">Key Decisions</div>
              ${(slide.decisions||[]).map((d,i)=>`
                <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:14px">
                  <span style="min-width:20px;height:20px;border-radius:50%;background:${a}18;border:1px solid ${a}35;display:flex;align-items:center;justify-content:center;font-size:10px;color:${a};font-family:Manrope,sans-serif;font-weight:700;flex-shrink:0;margin-top:2px">${i+1}</span>
                  <span style="font-family:Manrope,sans-serif;font-size:14px;color:rgba(255,255,255,.65);line-height:1.55">${d}</span>
                </div>`).join('')}
            </div>
          </div>
          <div style="width:42%;position:relative;overflow:hidden;border-left:1px solid rgba(255,255,255,.05)">
            ${wireframeSVG(a)}
            <div style="position:absolute;inset:0;background:linear-gradient(to right,#08080D 0%,transparent 40%)"></div>
          </div>
        </div>`;

      case "wireframe": return `
        <div style="position:relative;height:100%;overflow:hidden">
          ${slide.image ? `<img src="${slide.image}" alt="${slide.caption||''}" style="width:100%;height:100%;object-fit:cover">` : wireframeSVG(a)}
          <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(8,8,13,.94) 0%,transparent 52%)"></div>
          <div style="position:absolute;bottom:36px;left:44px">
            <div style="${pill}">Wireframe</div>
            <div style="font-family:Manrope,sans-serif;font-size:16px;color:rgba(255,255,255,.58);margin-top:12px">${slide.caption||''}</div>
          </div>
          ${!slide.image?`<div style="position:absolute;top:14px;right:16px;font-size:9px;color:rgba(255,255,255,.18);font-family:Manrope,sans-serif;letter-spacing:.1em;background:rgba(255,255,255,.05);padding:3px 10px;border-radius:10px">Upload image via CMS → Showreel Projects</div>`:''}
        </div>`;

      case "final": return `
        <div style="position:relative;height:100%;overflow:hidden">
          ${slide.image ? `<img src="${slide.image}" alt="${slide.caption||''}" style="width:100%;height:100%;object-fit:cover">` : finalUISVG(a)}
          <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(8,8,13,.94) 0%,transparent 52%)"></div>
          <div style="position:absolute;bottom:36px;left:44px">
            <div style="${pill}">Final UI</div>
            <div style="font-family:Manrope,sans-serif;font-size:16px;color:rgba(255,255,255,.58);margin-top:12px">${slide.caption||''}</div>
          </div>
          ${!slide.image?`<div style="position:absolute;top:14px;right:16px;font-size:9px;color:rgba(255,255,255,.18);font-family:Manrope,sans-serif;letter-spacing:.1em;background:rgba(255,255,255,.05);padding:3px 10px;border-radius:10px">Upload image via CMS → Showreel Projects</div>`:''}
        </div>`;

      case "metrics": return `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:56px 80px">
          <div style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:${a};font-family:Manrope,sans-serif;font-weight:700;margin-bottom:64px">Impact &amp; Outcomes</div>
          <div style="display:flex;gap:48px;align-items:flex-start;justify-content:center;flex-wrap:wrap">
            ${(slide.stats||[]).map(s=>`
              <div style="text-align:center;min-width:120px">
                <div style="font-family:'Cormorant Garamond',serif;font-size:clamp(48px,7vw,80px);font-weight:700;color:${a};line-height:1;margin-bottom:16px;filter:drop-shadow(0 0 36px ${a}45)">${s.v}</div>
                <div style="font-family:Manrope,sans-serif;font-size:13px;color:rgba(255,255,255,.42);max-width:130px;margin:0 auto;line-height:1.6">${s.l}</div>
              </div>`).join('')}
          </div>
        </div>`;

      default: return '';
    }
  }

  function buildHTML(PROJECTS, state) {
    const { ap, as_, prog, paused } = state;
    const project = PROJECTS[ap];
    const slide = project.slides[as_];
    const a = project.accent;

    return `
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        @keyframes srIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .sr-root *{box-sizing:border-box;margin:0;padding:0}
        .sr-root button{cursor:pointer;border:none;background:none;color:inherit;font-family:inherit}
        .sr-slide-in{animation:srIn .35s ease forwards}
        .sr-proj-btn:hover>div:first-child{color:rgba(255,255,255,.7)!important}
      </style>
      <div class="sr-root" style="display:flex;height:520px;background:#08080D;color:#fff;overflow:hidden;border-top:1px solid rgba(255,255,255,0.07);border-bottom:1px solid rgba(255,255,255,0.07)">

        <!-- Sidebar -->
        <div style="width:196px;background:#060609;border-right:1px solid rgba(255,255,255,.06);display:flex;flex-direction:column;flex-shrink:0">
          <div style="padding:18px 16px 14px;border-bottom:1px solid rgba(255,255,255,.05)">
            <div style="font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.2);font-family:Manrope,sans-serif;font-weight:700">More Work</div>
            <div style="font-size:12px;color:rgba(255,255,255,.5);font-weight:500;margin-top:4px;font-family:Manrope,sans-serif">Micro Projects</div>
          </div>
          <div style="flex:1;overflow-y:auto;padding-top:8px">
            ${PROJECTS.map((p,i)=>`
              <button class="sr-proj-btn" data-pi="${i}" style="width:100%;padding:9px 16px;text-align:left;background:${i===ap?p.accent+'0C':'transparent'};border-left:${i===ap?`2px solid ${p.accent}`:'2px solid transparent'};transition:all .2s">
                <div style="font-size:11px;font-weight:600;color:${i===ap?'#fff':'rgba(255,255,255,.35)'};font-family:Manrope,sans-serif;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.title}</div>
                <div style="font-size:9px;color:${i===ap?p.accent+'B0':'rgba(255,255,255,.15)'};font-family:Manrope,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.category}</div>
              </button>`).join('')}
          </div>
          <div style="padding:12px 16px 16px;border-top:1px solid rgba(255,255,255,.05)">
            <div style="font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.18);font-family:Manrope,sans-serif;font-weight:700;margin-bottom:8px">Slides</div>
            ${project.slides.map((s,i)=>`
              <button class="sr-slide-btn" data-si="${i}" style="display:flex;align-items:center;gap:8px;width:100%;padding:3px 0">
                <div style="width:4px;height:4px;border-radius:50%;background:${i===as_?a:'rgba(255,255,255,.2)'};flex-shrink:0;transition:background .2s"></div>
                <span style="font-size:10px;color:${i===as_?'#fff':'rgba(255,255,255,.28)'};font-family:Manrope,sans-serif;font-weight:${i===as_?600:400};flex:1;text-align:left">${LABEL[s.type]||s.type}</span>
                ${i===as_?`<div style="width:32px;height:2px;background:rgba(255,255,255,.08);border-radius:1px"><div class="sr-prog-inner" style="height:100%;background:${a};width:${prog}%;transition:width .04s linear;border-radius:1px"></div></div>`:''}
              </button>`).join('')}
          </div>
        </div>

        <!-- Main -->
        <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0">
          <!-- Topbar -->
          <div style="height:44px;display:flex;align-items:center;justify-content:space-between;padding:0 20px;border-bottom:1px solid rgba(255,255,255,.05);flex-shrink:0">
            <div style="display:flex;align-items:center;gap:8px;font-family:Manrope,sans-serif;min-width:0;overflow:hidden">
              <span style="font-size:11px;color:rgba(255,255,255,.28);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:160px">${project.title}</span>
              <span style="color:rgba(255,255,255,.14);flex-shrink:0">·</span>
              <span style="font-size:11px;color:${a};font-weight:600;flex-shrink:0">${LABEL[slide.type]||slide.type}</span>
              <span style="color:rgba(255,255,255,.14);flex-shrink:0">·</span>
              <span style="font-size:10px;color:rgba(255,255,255,.2);flex-shrink:0">${as_+1}/${project.slides.length}</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
              <button class="sr-prev" style="font-size:16px;color:rgba(255,255,255,.3);padding:4px 6px;line-height:1">‹</button>
              <button class="sr-pause" style="font-size:10px;color:${paused?a:'rgba(255,255,255,.4)'};letter-spacing:.1em;text-transform:uppercase;padding:4px 12px;border:1px solid ${paused?a+'40':'rgba(255,255,255,.1)'};border-radius:20px;font-family:Manrope,sans-serif;font-weight:600;transition:all .2s">${paused?'▶ Play':'⏸ Pause'}</button>
              <button class="sr-next" style="font-size:16px;color:rgba(255,255,255,.3);padding:4px 6px;line-height:1">›</button>
            </div>
          </div>
          <!-- Slide -->
          <div style="flex:1;position:relative;overflow:hidden">
            <div class="sr-slide-in" style="height:100%">${slideHTML(slide, project, ap, PROJECTS.length)}</div>
          </div>
          <!-- Progress -->
          <div style="height:2px;background:rgba(255,255,255,.05);flex-shrink:0">
            <div class="sr-prog-bar" style="height:100%;background:${a};width:${prog}%;transition:width .04s linear"></div>
          </div>
        </div>
      </div>`;
  }

  function mount(containerId, PROJECTS) {
    const root = document.getElementById(containerId);
    if (!root) return;

    let ap = 0, as_ = 0, prog = 0, paused = false;
    let rafId = null, startTime = null;

    function render() {
      root.innerHTML = buildHTML(PROJECTS, { ap, as_, prog, paused });
      root.querySelectorAll('.sr-proj-btn').forEach(btn =>
        btn.addEventListener('click', () => switchTo(+btn.dataset.pi, 0)));
      root.querySelectorAll('.sr-slide-btn').forEach(btn =>
        btn.addEventListener('click', () => switchTo(ap, +btn.dataset.si)));
      root.querySelector('.sr-pause').addEventListener('click', () => { paused = !paused; render(); startAnim(); });
      root.querySelector('.sr-prev').addEventListener('click', prev);
      root.querySelector('.sr-next').addEventListener('click', next);
    }

    function switchTo(pi, si) {
      ap = pi; as_ = si; prog = 0;
      cancelAnimationFrame(rafId);
      render(); startAnim();
    }

    function next() {
      const n = PROJECTS[ap].slides.length;
      if (as_ + 1 < n) switchTo(ap, as_ + 1);
      else switchTo((ap + 1) % PROJECTS.length, 0);
    }

    function prev() {
      if (as_ > 0) switchTo(ap, as_ - 1);
      else { const p = (ap - 1 + PROJECTS.length) % PROJECTS.length; switchTo(p, PROJECTS[p].slides.length - 1); }
    }

    function startAnim() {
      cancelAnimationFrame(rafId);
      if (paused) return;
      startTime = performance.now() - (prog / 100) * DURATION;
      function tick(now) {
        prog = Math.min(((now - startTime) / DURATION) * 100, 100);
        root.querySelectorAll('.sr-prog-bar, .sr-prog-inner').forEach(b => b.style.width = prog + '%');
        if (prog < 100) rafId = requestAnimationFrame(tick);
        else next();
      }
      rafId = requestAnimationFrame(tick);
    }

    root.setAttribute('tabindex', '0');
    root.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      else if (e.key === ' ') { e.preventDefault(); paused = !paused; render(); startAnim(); }
    });

    render();
    startAnim();
  }

  function initShowreel(containerId) {
    const ts = '?t=' + Date.now();
    Promise.all(FILES.map(f => fetch(f + ts).then(r => r.ok ? r.json() : null).catch(() => null)))
      .then(results => {
        const loaded = results.filter(Boolean);
        const data = loaded.length >= 2
          ? loaded.sort((a, b) => (a.order || 99) - (b.order || 99))
          : FALLBACK;
        mount(containerId, data);
      })
      .catch(() => mount(containerId, FALLBACK));
  }

  window.initShowreel = initShowreel;
})();
