import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience, education } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const comp = useRef();

  // Combine experience and education into a single timeline array
  const timelineData = [
    ...experience.map((exp, index) => ({
      id: `exp-${exp.id}`,
      date: exp.year || exp.duration,
      badge: 'Work Experience',
      badgeClass: 'badge-work',
      title: `${exp.role} — ${exp.company}`,
      subtitle: exp.duration,
      description: exp.description,
    })),
    ...education.map((edu, index) => ({
      id: `edu-${edu.id}`,
      date: edu.year,
      badge: 'Education',
      badgeClass: 'badge-edu',
      title: `${edu.qualification} — ${edu.institution}`,
      subtitle: '',
      description: '',
    })),
    {
      id: 'goal-1',
      date: 'Present',
      badge: 'Career Goal',
      badgeClass: 'badge-goal',
      title: 'Actively Seeking AI/ML & Full-Stack Roles',
      subtitle: '',
      description: 'Entry-level AI/ML Engineer and Full-Stack Developer passionate about building intelligent LLM applications, RAG systems, and high-performance web platforms.',
    }
  ];

  useLayoutEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.from('.timeline-header-anim', {
        opacity: 0,
        y: 26,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: comp.current,
          start: 'top 78%',
        },
      });

      // Smooth scrubbed progress line beam
      gsap.to('.timeline-line-progress', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 75%',
          end: 'bottom 65%',
          scrub: 0.35,
        },
      });

      // Alternating item entrances
      const items = gsap.utils.toArray('.timeline-item');
      items.forEach((item, i) => {
        const isLeft = i % 2 === 0;
        gsap.from(item, {
          x: isLeft ? -40 : 40,
          y: 35,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
        });
      });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={comp} className="timeline-section">
      <div className="container">
        <div className="timeline-header">
          <div className="timeline-eyebrow timeline-header-anim">
            <span className="timeline-eyebrow-dot" />
            <span>04 // CAREER TRAJECTORY</span>
          </div>
          <h2 className="timeline-title timeline-header-anim">
            Experience &amp; <span className="timeline-title-accent">Education</span>
          </h2>
        </div>
        
        <div className="timeline-container">
          <div className="timeline-line">
            <div className="timeline-line-progress" />
          </div>
          
          {timelineData.map((item, index) => (
            <div key={item.id} className="timeline-item">
              <div className="timeline-dot"></div>
              
              <div className="timeline-content">
                <span className="about-hud-corner about-hud-corner-tl" aria-hidden="true" />
                <span className="about-hud-corner about-hud-corner-tr" aria-hidden="true" />
                <span className="about-hud-corner about-hud-corner-bl" aria-hidden="true" />
                <span className="about-hud-corner about-hud-corner-br" aria-hidden="true" />

                <div className="timeline-badges">
                  <span className={`timeline-badge-date ${item.badgeClass}`}>
                    {item.date}
                  </span>
                  <span className="timeline-badge-type">
                    {item.badge}
                  </span>
                </div>
                
                <h3 className="timeline-item-title">{item.title}</h3>
                
                {item.subtitle && (
                  <div className="timeline-item-subtitle">{item.subtitle}</div>
                )}
                
                {item.description && (
                  <p className="timeline-item-desc">{item.description}</p>
                )}
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
};

export default Experience;
