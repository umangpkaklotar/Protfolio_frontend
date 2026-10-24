import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { process } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
  const comp = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.process-card');
      
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: comp.current,
          start: 'top 75%',
        }
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={comp} style={{ padding: '15vh 0', position: 'relative' }}>
      <div className="container">
        <span className="label" style={{ marginBottom: '1rem', display: 'block', textAlign: 'center' }}>Workflow</span>
        <h2 className="section-title" style={{ marginBottom: '4rem', textAlign: 'center' }}>Development Process</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem' 
        }}>
          {process.map((step, idx) => (
            <div key={idx} className="process-card" style={{
              padding: '3rem 2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '20px',
              border: '1px solid var(--card-border)',
              borderTop: '4px solid var(--accent)',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--card-border)';
            }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--accent)', fontWeight: '900', opacity: 0.3, marginBottom: '1.5rem' }}>
                {step.step}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{step.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
