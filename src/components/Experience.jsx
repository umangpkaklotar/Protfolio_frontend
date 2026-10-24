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
    if (isReducedMotion) return;

    let ctx = gsap.context(() => {
      // Line animation
      gsap.from('.timeline-line', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 60%',
        }
      });

      // Item animations
      const items = gsap.utils.toArray('.timeline-item');
      items.forEach((item, i) => {
        gsap.from(item, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          }
        });
      });
      
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={comp} className="timeline-section">
      <div className="container">
        <div className="timeline-header">
          <span className="timeline-eyebrow">MY PATH & EXPERIENCE</span>
          <h2 className="timeline-title">Experience & Education</h2>
        </div>
        
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          {timelineData.map((item, index) => (
            <div key={item.id} className="timeline-item">
              <div className="timeline-dot"></div>
              
              <div className="timeline-content">
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
