import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  Terminal,
  Layers,
  ArrowUpRight,
  Mail,
  GraduationCap,
  Briefcase,
  Code2,
  FolderGit2,
  MapPin,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo, experience, education, projects, skills } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('dossier');

  useLayoutEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionPreference.matches) return undefined;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.about-header-anim', {
        opacity: 0,
        y: 26,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      // Bento cards and stat capsules staggered entry
      gsap.from('.about-card-anim, .about-stat-capsule', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const latestExp = experience[0] || {};
  const eduInfo = education[0] || {};

  return (
    <section id="about" ref={sectionRef} className="cinematic-about">
      {/* Atmosphere & Tech Grid matching the Hero */}
      <div className="about-atmosphere" aria-hidden="true">
        <span className="about-ambient-glow" />
        <span className="about-grid-overlay" />
      </div>

      <div className="container">
        {/* Section Header */}
        <div className="about-header-wrap">
          <div className="about-telemetry-tag about-header-anim">
            <span className="about-status-dot" />
            <span>02 // ENGINEERING DOSSIER</span>
            <span className="about-telemetry-pill">SYS.STATUS: OPERATIONAL</span>
          </div>

          <h2 className="about-main-heading about-header-anim">
            <span>PASSION FOR CODE, </span>
            <span className="about-heading-accent">DRIVEN BY INNOVATION.</span>
          </h2>

          <p className="about-lead-text about-header-anim">
            Bridging the gap between expressive creative design and deep technical architecture.
            A glimpse into my mindset, engineering pillars, and the systems I build.
          </p>
        </div>

        {/* Bento Grid Architecture */}
        <div className="about-bento-grid">
          {/* Card 1: Main Story & Philosophy */}
          <div className="about-card about-card-story about-card-anim">
            <span className="about-hud-corner about-hud-corner-tl" aria-hidden="true" />
            <span className="about-hud-corner about-hud-corner-tr" aria-hidden="true" />
            <span className="about-hud-corner about-hud-corner-bl" aria-hidden="true" />
            <span className="about-hud-corner about-hud-corner-br" aria-hidden="true" />

            <div>
              <div className="about-card-top-tag">
                <span className="about-card-badge">
                  <Terminal size={14} /> ORIGIN &amp; PHILOSOPHY
                </span>
                <span className="about-card-serial">ID: UK-DEV // 2025</span>
              </div>

              <h3 className="about-story-headline">
                Crafting digital experiences where intuitive design meets resilient engineering.
              </h3>

              <div className="about-story-paragraphs">
                <p className="about-story-p">
                  I'm <strong>Umang P. Kaklotar</strong>, a Web Developer, Frontend Specialist, and AI/ML Enthusiast.
                  With a solid foundation from my <strong>Bachelor of Computer Applications (BCA)</strong> and hands-on
                  production experience at <strong>Jemistry Info Solutions</strong>, I focus on turning complex technical
                  ideas into seamless, user-centric software.
                </p>
                <p className="about-story-p">
                  My work lives at the convergence of two passions: crafting ultra-smooth, responsive 60fps web interfaces
                  using modern frameworks like <strong>React, GSAP, and Vite</strong>, and exploring practical machine learning
                  solutions from computer vision defect detection to localized speech models.
                </p>
              </div>

              <div className="about-quote-box">
                <p>
                  "Great software isn't just about syntax—it's about empathy, performance, and constructing interfaces that feel effortless to touch."
                </p>
              </div>
            </div>

            <div className="about-author-signature">
              <div className="about-author-info">
                <span className="about-author-avatar-dot" />
                <div>
                  <div className="about-author-name">Umang Kaklotar</div>
                  <div className="about-author-role">Web Developer &amp; AI Explorer</div>
                </div>
              </div>
              <div className="about-sig-script">Umang</div>
            </div>
          </div>

          {/* Card 2: Interactive Mecha Terminal HUD */}
          <div className="about-card about-card-terminal about-card-anim">
            <span className="about-hud-corner about-hud-corner-tl" aria-hidden="true" />
            <span className="about-hud-corner about-hud-corner-tr" aria-hidden="true" />
            <span className="about-hud-corner about-hud-corner-bl" aria-hidden="true" />
            <span className="about-hud-corner about-hud-corner-br" aria-hidden="true" />

            <div className="about-terminal-header">
              <div className="about-terminal-dots">
                <span className="about-dot about-dot-red" />
                <span className="about-dot about-dot-amber" />
                <span className="about-dot about-dot-green" />
              </div>
              <span className="about-terminal-title">umang@terminal: ~/profile</span>
              <span className="about-terminal-status">
                <span className="about-status-dot" style={{ width: 6, height: 6 }} /> ONLINE
              </span>
            </div>

            <div className="about-terminal-tabs">
              <button
                type="button"
                className={`about-tab-btn ${activeTab === 'dossier' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('dossier')}
              >
                <Code2 size={13} /> dossier.json
              </button>
              <button
                type="button"
                className={`about-tab-btn ${activeTab === 'stack' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('stack')}
              >
                <Layers size={13} /> capabilities.config
              </button>
              <button
                type="button"
                className={`about-tab-btn ${activeTab === 'mindset' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('mindset')}
              >
                <Terminal size={13} /> workflow.sh
              </button>
            </div>

            <div className="about-terminal-body">
              {activeTab === 'dossier' && (
                <div>
                  <span className="about-json-punct">{'{'}</span>
                  <br />
                  &nbsp;&nbsp;<span className="about-json-key">"name"</span>: <span className="about-json-string">"Umang P. Kaklotar"</span>,
                  <br />
                  &nbsp;&nbsp;<span className="about-json-key">"degree"</span>: <span className="about-json-string">"{eduInfo.qualification || 'BCA (2025)'}"</span>,
                  <br />
                  &nbsp;&nbsp;<span className="about-json-key">"institution"</span>: <span className="about-json-string">"{eduInfo.institution || 'Smt ZS Patel College'}"</span>,
                  <br />
                  &nbsp;&nbsp;<span className="about-json-key">"productionRole"</span>: <span className="about-json-string">"{latestExp.role || 'Frontend Developer Intern'}"</span>,
                  <br />
                  &nbsp;&nbsp;<span className="about-json-key">"experience"</span>: <span className="about-json-string">"{latestExp.company || 'Jemistry Info Solutions'} ({latestExp.duration || '6 months'})"</span>,
                  <br />
                  &nbsp;&nbsp;<span className="about-json-key">"location"</span>: <span className="about-json-string">"Surat, Gujarat, India"</span>,
                  <br />
                  &nbsp;&nbsp;<span className="about-json-key">"status"</span>: <span className="about-json-string">"Available for freelance &amp; high-impact roles"</span>,
                  <br />
                  &nbsp;&nbsp;<span className="about-json-key">"shippedProjects"</span>: <span className="about-json-number">{projects.length}</span>,
                  <br />
                  &nbsp;&nbsp;<span className="about-json-key">"coreFocus"</span>: <span className="about-json-punct">[</span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="about-json-string">"Frontend Engineering"</span>,
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="about-json-string">"Applied Computer Vision"</span>,
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="about-json-string">"AI-Powered Web Apps"</span>
                  <br />
                  &nbsp;&nbsp;<span className="about-json-punct">]</span>
                  <br />
                  <span className="about-json-punct">{'}'}</span>
                </div>
              )}

              {activeTab === 'stack' && (
                <div>
                  <div className="about-stack-group">
                    <span className="about-stack-label">// Frontend &amp; Motion</span>
                    <div className="about-stack-pills">
                      <span className="about-stack-pill">React</span>
                      <span className="about-stack-pill">JavaScript ES6+</span>
                      <span className="about-stack-pill">GSAP</span>
                      <span className="about-stack-pill">Tailwind CSS</span>
                      <span className="about-stack-pill">HTML5 / CSS3</span>
                      <span className="about-stack-pill">Vite</span>
                    </div>
                  </div>

                  <div className="about-stack-group">
                    <span className="about-stack-label">// AI &amp; Computer Vision</span>
                    <div className="about-stack-pills">
                      <span className="about-stack-pill">Python</span>
                      <span className="about-stack-pill">OpenCV</span>
                      <span className="about-stack-pill">YOLO</span>
                      <span className="about-stack-pill">NumPy</span>
                      <span className="about-stack-pill">NLP</span>
                      <span className="about-stack-pill">Pandas</span>
                    </div>
                  </div>

                  <div className="about-stack-group">
                    <span className="about-stack-label">// Backend &amp; Architecture</span>
                    <div className="about-stack-pills">
                      <span className="about-stack-pill">Node.js</span>
                      <span className="about-stack-pill">FastAPI</span>
                      <span className="about-stack-pill">REST APIs</span>
                      <span className="about-stack-pill">MySQL</span>
                      <span className="about-stack-pill">MongoDB</span>
                      <span className="about-stack-pill">Git / GitHub</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'mindset' && (
                <div>
                  <p className="about-sh-cmd">$ ./engineering_mindset.sh</p>
                  <p className="about-sh-out">
                    <span className="about-sh-accent">[01] ARCHITECTURE:</span> Clean, modular codebases designed to scale.
                  </p>
                  <p className="about-sh-out">
                    <span className="about-sh-accent">[02] PERFORMANCE:</span> 60fps micro-animations, fast paint times, zero layout shifts.
                  </p>
                  <p className="about-sh-out">
                    <span className="about-sh-accent">[03] AI_INTEGRATION:</span> Embedding practical intelligence directly into user interfaces.
                  </p>
                  <p className="about-sh-out">
                    <span className="about-sh-accent">[04] RAPID_ITERATION:</span> Moving swiftly from prototype to production-ready solution.
                  </p>
                  <p className="about-sh-cmd" style={{ marginTop: '0.8rem' }}>
                    $ ready_to_collaborate --status=true <span className="about-status-dot" style={{ display: 'inline-block', width: 6, height: 6 }} />
                  </p>
                </div>
              )}
            </div>
          </div>



          {/* Card 4: Quick Metrics & Dossier Badges */}
          <div className="about-stats-row">
            <div className="about-stat-capsule">
              <div className="about-stat-ico">
                <GraduationCap size={18} />
              </div>
              <div className="about-stat-meta">
                <small>Education</small>
                <strong>BCA Graduate</strong>
                <span>{eduInfo.institution || 'Smt ZS Patel College'} (2025)</span>
              </div>
            </div>

            <div className="about-stat-capsule">
              <div className="about-stat-ico">
                <Briefcase size={18} />
              </div>
              <div className="about-stat-meta">
                <small>Experience</small>
                <strong>Frontend Intern</strong>
                <span>{latestExp.company || 'Jemistry Info Solutions'} (6 Mos)</span>
              </div>
            </div>

            <div className="about-stat-capsule">
              <div className="about-stat-ico">
                <FolderGit2 size={18} />
              </div>
              <div className="about-stat-meta">
                <small>Track Record</small>
                <strong>{projects.length}+ Shipped Apps</strong>
                <span>Full-Stack &amp; Computer Vision</span>
              </div>
            </div>

            <div className="about-stat-capsule">
              <div className="about-stat-ico">
                <MapPin size={18} />
              </div>
              <div className="about-stat-meta">
                <small>Location</small>
                <strong>Surat, India</strong>
                <span>Available for Remote &amp; Freelance</span>
              </div>
            </div>
          </div>

          {/* Card 5: Action Row / Connect */}
          <div className="about-card about-cta-bar about-card-anim">
            <span className="about-hud-corner about-hud-corner-tl" aria-hidden="true" />
            <span className="about-hud-corner about-hud-corner-tr" aria-hidden="true" />
            <span className="about-hud-corner about-hud-corner-bl" aria-hidden="true" />
            <span className="about-hud-corner about-hud-corner-br" aria-hidden="true" />

            <div className="about-cta-text">
              <h4>Ready to build something unforgettable together?</h4>
              <p>Explore my featured projects or initiate contact to discuss ideas and collaborations.</p>
            </div>

            <div className="about-cta-actions">
              <a className="hero-button hero-button-primary" href="#projects">
                Explore Projects <ArrowUpRight size={17} strokeWidth={1.8} />
              </a>
              <a className="hero-button hero-button-secondary" href="#contact">
                Contact Me <Mail size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
