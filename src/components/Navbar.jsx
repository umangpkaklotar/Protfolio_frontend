import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const navRef = useRef(null);
  const [activeHref, setActiveHref] = useState('#home');
  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const context = gsap.context(() => {
      gsap.from('.site-nav', {
        opacity: 0,
        y: -18,
        duration: 0.75,
        delay: 0.08,
        ease: 'power3.out',
      });
    }, navRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean);

    if (!('IntersectionObserver' in window) || sections.length === 0) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const visibleSection = entries.find((entry) => entry.isIntersecting);
      if (visibleSection) setActiveHref(`#${visibleSection.target.id}`);
    }, { rootMargin: '-42% 0px -48% 0px' });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header ref={navRef} className="site-nav-wrap">
      <nav className="site-nav" aria-label="Main navigation">
        <a className="site-brand" href="#home" onClick={closeMenu} aria-label="Umang Kaklotar home">
          UMANG<span>.</span>
        </a>

        <div className={`site-nav-links${menuOpen ? ' is-open' : ''}`} id="primary-navigation">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`site-nav-link${activeHref === item.href ? ' is-active' : ''}`}
              aria-current={activeHref === item.href ? 'page' : undefined}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="site-nav-actions">
          <a className="site-nav-cta" href="#contact" onClick={closeMenu}>
            Let&apos;s Talk <ArrowUpRight size={15} strokeWidth={2} />
          </a>
          <button
            className={`site-nav-toggle${menuOpen ? ' is-open' : ''}`}
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
