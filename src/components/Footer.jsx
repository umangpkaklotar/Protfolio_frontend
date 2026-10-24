import React from 'react';
import { personalInfo } from '../data/portfolioData';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ padding: '3rem 0', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: '900', fontSize: '1.25rem', color: 'var(--text-primary)' }}>
            {personalInfo.shortName}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href={personalInfo.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s', fontSize: '0.875rem', fontWeight: '500' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
            GitHub
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s', fontSize: '0.875rem', fontWeight: '500' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
            LinkedIn
          </a>
          <a href={`mailto:${personalInfo.email}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s', fontSize: '0.875rem', fontWeight: '500' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
            Email
          </a>
          <button onClick={scrollToTop} style={{ 
            background: 'rgba(255,255,255,0.05)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            color: 'var(--text-primary)', 
            width: '40px', height: '40px', 
            borderRadius: '50%', 
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.3s, transform 0.3s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            ↑
          </button>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
