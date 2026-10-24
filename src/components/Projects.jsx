import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const comp = useRef();
  const containerRef = useRef();

  useLayoutEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card');
      
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { 
            y: 100, 
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 0.5,
            }
          }
        );
      });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={comp} style={{ minHeight: '150vh', padding: '15vh 0', position: 'relative' }}>
      <div className="container" ref={containerRef}>
        <div style={{ marginBottom: '5rem' }}>
          <span className="label" style={{ marginBottom: '1rem' }}>Portfolio</span>
          <div className="text-mask-wrapper">
            <h2 className="section-title">Selected Works</h2>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card" 
              style={{
                backgroundColor: project.color,
                borderRadius: '24px',
                padding: '4rem',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                transformOrigin: 'bottom center',
                position: 'sticky',
                top: `calc(10vh + ${index * 2}rem)`,
                border: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <p style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    {project.category}
                  </p>
                  <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', margin: 0 }}>{project.title}</h3>
                </div>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
