import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const comp = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.contact-content', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
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
    <section id="contact" ref={comp} style={{ minHeight: '90vh', padding: '15vh 0 5vh 0', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          <div>
            <h2 className="contact-content section-title" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', textTransform: 'uppercase' }}>
              {personalInfo.contactHeading}
            </h2>
            <p className="contact-content" style={{ maxWidth: '500px', margin: '2rem 0', fontSize: '1.125rem' }}>
              Have a project idea, a development opportunity, or an interesting collaboration in mind? Let's connect.
            </p>
            
            <div className="contact-content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
              <a href={`mailto:${personalInfo.email}`} style={{ color: 'var(--text-primary)', fontSize: '1.25rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}>
                <span style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)' }}>✉</span>
                {personalInfo.email}
              </a>
            </div>
          </div>
          
          <div className="contact-content" style={{ backgroundColor: 'var(--card-bg)', padding: '3rem', borderRadius: '24px', border: '1px solid var(--card-border)' }}>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Name</label>
                <input type="text" placeholder="John Doe" style={{ width: '100%', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontFamily: 'var(--font-body)', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Email</label>
                <input type="email" placeholder="john@example.com" style={{ width: '100%', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontFamily: 'var(--font-body)', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Subject</label>
                <input type="text" placeholder="Project Inquiry" style={{ width: '100%', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontFamily: 'var(--font-body)', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Message</label>
                <textarea rows="4" placeholder="How can I help you?" style={{ width: '100%', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical' }}></textarea>
              </div>
              <button type="button" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Send Message
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
