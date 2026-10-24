import React, { useRef, useLayoutEffect, useState, useMemo } from 'react';
import { ArrowUpRight, Sparkles, FolderGit2, CheckCircle2, Mic, Code2, Cpu, Activity } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

// Project-specific metrics & highlights
const PROJECT_HIGHLIGHTS = {
  1: {
    metrics: ['98.4% Precision', '60 FPS Real-time', 'YOLO / OpenCV'],
    statusDot: 'red',
    systemLabel: 'LIVE CV SCANNER // CAM_01',
    systemBadge: 'PASS // 1 ALERT',
  },
  4: {
    metrics: ['<100ms Check-in', 'Zero Duplication', 'AES-256 Auth'],
    statusDot: 'green',
    systemLabel: 'AUTH GATEWAY // SECURE',
    systemBadge: 'ENCRYPTED',
  },
  5: {
    metrics: ['96.8% Accuracy', 'Indic Regional Model', 'Acoustic NLP'],
    statusDot: 'orange',
    systemLabel: 'ACOUSTIC STREAM // GUJ-IN',
    systemBadge: '44.1 kHz',
  },
  6: {
    metrics: ['AST Semantic Mapping', 'Multi-Language', 'Zero Syntax Loss'],
    statusDot: 'purple',
    systemLabel: 'SYNTAX TRANSFORM // LLM',
    systemBadge: 'PROMPT-V4',
  },
  7: {
    metrics: ['0.942 R² Score', '18 Feature Weights', 'Gradient Boosting'],
    statusDot: 'blue',
    systemLabel: 'REGRESSION MATRIX // ML',
    systemBadge: 'VALUATION',
  },
};

const Projects = () => {
  const comp = useRef(null);
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Filter categories
  const categories = useMemo(() => [
    { key: 'ALL', label: 'All Works', count: projects.length },
    { key: 'AI_ML', label: 'AI & Machine Learning', count: 3 },
    { key: 'WEB', label: 'Web Applications', count: 1 },
    { key: 'CV_NLP', label: 'CV & NLP', count: 2 },
  ], []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return projects;
    if (activeFilter === 'AI_ML') {
      return projects.filter(p => 
        p.category.toLowerCase().includes('machine learning') || 
        p.category.toLowerCase().includes('ai')
      );
    }
    if (activeFilter === 'WEB') {
      return projects.filter(p => p.category.toLowerCase().includes('web'));
    }
    if (activeFilter === 'CV_NLP') {
      return projects.filter(p => 
        p.category.toLowerCase().includes('vision') || 
        p.category.toLowerCase().includes('nlp')
      );
    }
    return projects;
  }, [activeFilter]);

  // Handle interactive mouse spotlight
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  useLayoutEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.from('.projects-header-anim', {
        opacity: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: comp.current,
          start: 'top 75%',
        },
      });

      // Cards stacking and scroll animation
      const cards = gsap.utils.toArray('.project-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            y: 70,
            opacity: 0,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 0.4,
            },
          }
        );
      });
    }, comp);

    // Refresh ScrollTrigger when filter updates
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [filteredProjects]);

  // Render bespoke interactive preview for each project
  const renderPreview = (project) => {
    const meta = PROJECT_HIGHLIGHTS[project.id] || {
      statusDot: 'orange',
      systemLabel: 'SYSTEM ACTIVE',
      systemBadge: 'ONLINE',
      metrics: ['Optimized', 'Performant'],
    };

    return (
      <div className="project-preview-frame">
        <div className="preview-top-hud">
          <span className="preview-hud-title">
            <span className={`preview-dot ${meta.statusDot}`} />
            {meta.systemLabel}
          </span>
          <span className="preview-hud-badge">{meta.systemBadge}</span>
        </div>

        <div className="preview-canvas-wrap">
          <div className="preview-scanlines" aria-hidden="true" />

          {/* 1. PCB Defect Detection Visual */}
          {project.id === 1 && (
            <div className="pcb-preview-box">
              <svg className="pcb-circuit-svg" viewBox="0 0 320 180" fill="none">
                <path d="M 20 40 H 80 V 100 H 140 V 60 H 220 V 130 H 300" stroke="#ff7628" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 4" />
                <path d="M 40 160 V 110 H 110 V 150 H 200 V 80 H 290" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.25" />
                <path d="M 10 90 H 60 V 45 H 160 V 120 H 240 V 35 H 310" stroke="#10b981" strokeWidth="1.2" strokeOpacity="0.2" />
                <circle cx="80" cy="100" r="4" fill="#ff7628" />
                <circle cx="140" cy="60" r="4" fill="#ff7628" />
                <circle cx="220" cy="130" r="4" fill="#ff7628" />
                <circle cx="110" cy="110" r="3.5" fill="#3b82f6" />
                <circle cx="200" cy="80" r="3.5" fill="#3b82f6" />
                <rect x="120" y="60" width="80" height="50" rx="6" fill="rgba(255, 118, 40, 0.06)" stroke="rgba(255, 118, 40, 0.35)" strokeWidth="1" />
                <text x="160" y="90" textAnchor="middle" fill="#ff8a4b" fontSize="8" fontFamily="monospace">MICROCHIP-AI</text>
              </svg>
              <div className="pcb-scan-laser" />
              <div className="pcb-defect-bbox">
                <span className="bbox-tag">ALERT: SHORT_CIRCUIT</span>
                <span className="bbox-conf">98.4% CONF</span>
              </div>
            </div>
          )}

          {/* 2. QR Registration System Visual */}
          {project.id === 4 && (
            <div className="qr-preview-box">
              <div className="qr-matrix-card">
                <div className="qr-pattern">
                  <div className="qr-block corner" />
                  <div className="qr-block" />
                  <div className="qr-block" />
                  <div className="qr-block" />
                  <div className="qr-block corner" />
                  <div className="qr-block" />
                  <div className="qr-block corner" />
                  <div className="qr-block" />
                  <div className="qr-block" />
                  <div className="qr-block" />
                  <div className="qr-block" />
                  <div className="qr-block" />
                  <div className="qr-block corner" />
                  <div className="qr-block" />
                  <div className="qr-block" />
                  <div className="qr-block" />
                  <div className="qr-block" />
                  <div className="qr-block" />
                  <div className="qr-block corner" />
                  <div className="qr-block" />
                  <div className="qr-block corner" />
                  <div className="qr-block" />
                  <div className="qr-block" />
                  <div className="qr-block" />
                  <div className="qr-block corner" />
                </div>
                <div className="qr-laser-line" />
              </div>
              <div className="qr-badge-info">
                <span className="qr-badge-title">VIP ACCESS PASS</span>
                <span className="qr-badge-pass">
                  <CheckCircle2 size={12} /> VERIFIED // GATE 02
                </span>
                <span className="qr-badge-meta">USER: #ATT-8941<br />SEAT: SECTION A-12</span>
              </div>
            </div>
          )}

          {/* 3. Gujarati Speech Recognition Visual */}
          {project.id === 5 && (
            <div className="audio-preview-box">
              <div className="audio-spectrum-bars">
                {[45, 80, 35, 92, 60, 85, 40, 95, 70, 50, 85, 65, 90, 40, 85, 55, 75, 35, 65, 50].map((h, i) => (
                  <span
                    key={i}
                    className="audio-spec-bar"
                    style={{
                      '--target-h': `${h}%`,
                      animationDelay: `${i * 0.06}s`,
                    }}
                  />
                ))}
              </div>
              <div className="audio-transcription-card">
                <div className="audio-guj-text">"નમસ્તે, કેમ છો? (Welcome)"</div>
                <div className="audio-trans-meta">
                  <span><Mic size={10} style={{ display: 'inline', marginRight: 4 }} />CONF: 96.8%</span>
                  <span>LANG: GU-IN // CTC</span>
                </div>
              </div>
            </div>
          )}

          {/* 4. AI Code Converter Visual */}
          {project.id === 6 && (
            <div className="code-preview-box">
              <div className="code-pane">
                <div className="code-pane-header">Python</div>
                <code>
                  <span className="syn-kw">def</span> <span className="syn-fn">predict</span>(x):<br />
                  &nbsp;&nbsp;<span className="syn-var">val</span> = model(x)<br />
                  &nbsp;&nbsp;<span className="syn-kw">return</span> <span className="syn-var">val</span> &gt; <span className="syn-str">0.5</span>
                </code>
              </div>
              <div className="code-beam-center">
                <Sparkles size={16} />
              </div>
              <div className="code-pane">
                <div className="code-pane-header">TypeScript</div>
                <code>
                  <span className="syn-kw">const</span> <span className="syn-fn">predict</span> = (x) =&gt; &#123;<br />
                  &nbsp;&nbsp;<span className="syn-kw">const</span> <span className="syn-var">val</span> = model(x);<br />
                  &nbsp;&nbsp;<span className="syn-kw">return</span> <span className="syn-var">val</span> &gt; <span className="syn-str">0.5</span>;<br />
                  &#125;
                </code>
              </div>
            </div>
          )}

          {/* 5. Home Price Prediction Visual */}
          {project.id === 7 && (
            <div className="ml-preview-box">
              <div className="ml-svg-chart-wrap">
                <svg className="ml-svg-chart" viewBox="0 0 280 100">
                  <defs>
                    <linearGradient id="chartG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff7628" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#ff7628" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <line x1="15" y1="25" x2="265" y2="25" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                  <line x1="15" y1="55" x2="265" y2="55" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                  <line x1="15" y1="85" x2="265" y2="85" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                  <path d="M 15 85 Q 65 75, 105 60 T 185 35 T 265 18 L 265 85 Z" fill="url(#chartG)" />
                  <path d="M 15 85 Q 65 75, 105 60 T 185 35 T 265 18" fill="none" stroke="#ff7628" strokeWidth="2.5" />
                  <circle cx="105" cy="60" r="3.5" fill="#3b82f6" />
                  <circle cx="185" cy="35" r="3.5" fill="#10b981" />
                  <circle cx="265" cy="18" r="5" fill="#ff7628" className="ml-point-pulse" />
                </svg>
                <div className="ml-valuation-banner">
                  <span className="ml-val-label">ESTIMATED VALUE</span>
                  <span className="ml-val-price">$485,200</span>
                </div>
              </div>

              <div className="ml-bars-mini">
                <div className="ml-bar-row">
                  <span>Area SqFt</span>
                  <div className="ml-bar-track"><div className="ml-bar-fill" style={{ width: '84%' }} /></div>
                  <span>84%</span>
                </div>
                <div className="ml-bar-row">
                  <span>Location</span>
                  <div className="ml-bar-track"><div className="ml-bar-fill" style={{ width: '76%' }} /></div>
                  <span>76%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="preview-bottom-hud">
          <span>LATENCY: &lt;40ms</span>
          <span className="preview-hud-ok">
            <Activity size={11} /> STATUS // NOMINAL
          </span>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" ref={comp} className="cinematic-projects">
      <div className="projects-ambient-glow" aria-hidden="true" />

      <div className="container" ref={containerRef}>
        <div className="projects-header">
          <div className="projects-eyebrow projects-header-anim">
            <span className="projects-status-dot" />
            <span>03 // FEATURED ARCHITECTURE</span>
          </div>

          <h2 className="projects-title projects-header-anim">
            Selected <span className="projects-title-accent">Works</span>
          </h2>

          <p className="projects-lead-text projects-header-anim">
            A curated collection of full-stack web platforms, machine learning systems, and interactive interfaces built with precision.
          </p>

          {/* Interactive Filter Pills */}
          <div className="projects-filters projects-header-anim">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                className={`project-filter-btn ${activeFilter === cat.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat.key)}
              >
                <span>{cat.label}</span>
                <span className="project-filter-count">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="projects-stack-container">
          {filteredProjects.map((project, index) => {
            const meta = PROJECT_HIGHLIGHTS[project.id] || {
              metrics: ['High Performance', 'Clean Architecture'],
            };

            return (
              <div
                key={project.id}
                className="project-card"
                onMouseMove={handleMouseMove}
                style={{
                  top: `calc(12vh + ${index * 1.8}rem)`,
                }}
              >
                <span className="about-hud-corner about-hud-corner-tl" aria-hidden="true" />
                <span className="about-hud-corner about-hud-corner-tr" aria-hidden="true" />
                <span className="about-hud-corner about-hud-corner-bl" aria-hidden="true" />
                <span className="about-hud-corner about-hud-corner-br" aria-hidden="true" />

                {/* Left Column: Details & Tech */}
                <div className="project-card-left">
                  <div className="project-card-top">
                    <span className="project-card-category">
                      <Sparkles size={13} /> {project.category}
                    </span>
                    <span className="project-card-num">
                      PROJECT // {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="project-card-body">
                    <h3 className="project-card-title">{project.title}</h3>
                    {project.description && (
                      <p className="project-card-desc">{project.description}</p>
                    )}

                    {/* Quick Metric Badges */}
                    <div className="project-metrics-row">
                      {meta.metrics.map((m, mIdx) => (
                        <span key={mIdx} className="project-metric-pill">
                          <Cpu size={11} /> {m}
                        </span>
                      ))}
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="project-card-tags">
                      {project.tech && project.tech.map((item, i) => (
                        <span key={i} className="project-card-tag">{item}</span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="project-card-actions">
                    <a
                      className="project-btn-primary"
                      href={project.link || '#'}
                      target={project.link && project.link !== '#' ? '_blank' : undefined}
                      rel="noreferrer"
                    >
                      <span>Explore Project</span>
                      <ArrowUpRight size={16} />
                    </a>

                    <a
                      className="project-btn-secondary"
                      href="#contact"
                    >
                      <FolderGit2 size={15} />
                      <span>Case Details</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Bespoke High-Tech Visual Mockup */}
                <div className="project-card-right">
                  {renderPreview(project)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
