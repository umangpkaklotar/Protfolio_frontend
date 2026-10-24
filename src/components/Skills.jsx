import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/portfolioData';
import { Layout, Server, Brain, Database, Globe, Wrench, ArrowRight, Layers, LayoutTemplate, DatabaseZap, Cpu, ShoppingBag, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  "Frontend Development": <LayoutTemplate size={48} color="rgba(255, 138, 75, 0.75)" strokeWidth={1} />,
  "Backend Development": <Server size={48} color="rgba(255, 138, 75, 0.75)" strokeWidth={1} />,
  "AI & Machine Learning": <Brain size={48} color="rgba(255, 138, 75, 0.75)" strokeWidth={1} />,
  "Databases": <DatabaseZap size={48} color="rgba(255, 138, 75, 0.75)" strokeWidth={1} />,
  "Web & E-commerce": <ShoppingBag size={48} color="rgba(255, 138, 75, 0.75)" strokeWidth={1} />,
  "Tools & Development": <Terminal size={48} color="rgba(255, 138, 75, 0.75)" strokeWidth={1} />
};

const shortIconMap = {
  "Frontend": <Layout size={16} />,
  "Backend": <Server size={16} />,
  "AI/ML": <Cpu size={16} />,
  "Databases": <Database size={16} />,
  "Web & E-comm": <Globe size={16} />,
  "Tools": <Wrench size={16} />
};

const descMap = {
  "Frontend Development": "Building responsive, modern and interactive web interfaces.",
  "Backend Development": "Working with server-side technologies and building APIs.",
  "AI & Machine Learning": "Exploring intelligent solutions and real-world AI applications.",
  "Databases": "Managing and working with structured and unstructured data.",
  "Web & E-commerce": "Creating dynamic websites and custom e-commerce solutions.",
  "Tools & Development": "Tools I use to build, test and deploy applications."
};

const SkillCard = ({ skillGroup, index }) => {
  return (
    <div className="ref-skill-card" style={{ opacity: 1 }}>
      <span className="about-hud-corner about-hud-corner-tl" aria-hidden="true" />
      <span className="about-hud-corner about-hud-corner-tr" aria-hidden="true" />
      <span className="about-hud-corner about-hud-corner-bl" aria-hidden="true" />
      <span className="about-hud-corner about-hud-corner-br" aria-hidden="true" />

      <div className="ref-card-header">
        <span className="ref-card-num">{String(index + 1).padStart(2, '0')} // SKILL</span>
        <div className="ref-card-icon-large">
          {iconMap[skillGroup.category] || <LayoutTemplate size={48} color="rgba(255, 138, 75, 0.75)" strokeWidth={1} />}
        </div>
      </div>
      
      <h3 className="ref-card-title">{skillGroup.category}</h3>
      <p className="ref-card-desc">{descMap[skillGroup.category] || "Exploring technologies and creating solutions."}</p>
      
      <div className="ref-card-tags">
        {skillGroup.items.map((item, i) => (
          <span key={i} className="ref-card-tag">
            <span className="ref-tag-icon">
              <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item.toLowerCase().replace(/[^a-z0-9]/g, '')}/${item.toLowerCase().replace(/[^a-z0-9]/g, '')}-original.svg`} 
                   onError={(e) => { e.target.style.display='none'; }} 
                   style={{ width: '12px', height: '12px', marginRight: '6px' }} 
                   alt="" />
            </span>
            {item}
          </span>
        ))}
      </div>
      
      <div className="ref-card-arrow">
        <ArrowRight size={16} />
      </div>
    </div>
  );
};

const Skills = () => {
  const comp = useRef();
  const [activeTab, setActiveTab] = useState('All Skills');
  const [filteredSkills, setFilteredSkills] = useState(skills);
  
  useEffect(() => {
    if (activeTab === 'All Skills') {
      setFilteredSkills(skills);
    } else {
      setFilteredSkills(skills.filter(s => s.shortCategory === activeTab));
    }
  }, [activeTab]);

  useLayoutEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    let ctx = gsap.context(() => {
      // Re-run animation when filteredSkills changes
      gsap.fromTo('.ref-skill-card', 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ref-skills-grid',
            start: 'top 90%',
          }
        }
      );
      
      gsap.to('.ref-globe-bg', {
        rotate: 5,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: comp.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }, comp);
    
    // Refresh ScrollTrigger after DOM updates
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => ctx.revert();
  }, [filteredSkills]);

  return (
    <section id="skills" ref={comp} className="ref-skills-section">
      <div className="ref-globe-bg"></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        <div className="ref-explore-pointer">
          <span>Explore My<br/><span style={{ color: '#ff7628' }}>●</span> Skills</span>
          <svg width="40" height="40" viewBox="0 0 100 100" style={{ position: 'absolute', top: '100%', right: '50%', transform: 'rotate(20deg)' }}>
            <path d="M10,10 Q50,90 90,90 M80,80 L90,90 L90,80" fill="none" stroke="rgba(255, 118, 40, 0.5)" strokeWidth="2" />
          </svg>
        </div>

        <div className="ref-skills-header">
          <div className="ref-eyebrow">
            <span className="ref-line"></span> WHAT I KNOW &amp; BUILD WITH <span className="ref-line"></span>
          </div>
          
          <h2 className="ref-title">
            My <span className="ref-title-accent">Tech Stack</span>
          </h2>
          
          <p className="ref-subtitle">
            Technologies I use to turn ideas into real, scalable and impactful digital experiences.
          </p>
        </div>
        
        <div className="ref-tabs-container">
          <div 
            className={`ref-tab ${activeTab === 'All Skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('All Skills')}
          >
            <Layers size={18} style={{ marginRight: '8px' }}/> All Skills
          </div>
          {skills.map((s, i) => (
            <div 
              key={i} 
              className={`ref-tab ${activeTab === s.shortCategory ? 'active' : ''}`}
              onClick={() => setActiveTab(s.shortCategory)}
            >
              {shortIconMap[s.shortCategory] || <Layout size={16} />} 
              <span style={{ marginLeft: '8px' }}>{s.shortCategory}</span>
            </div>
          ))}
        </div>
        
        <div className="ref-skills-grid">
          {filteredSkills.map((skillGroup, idx) => (
            <SkillCard key={skillGroup.category} skillGroup={skillGroup} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
