import React, { useLayoutEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Code2, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portrait from '../assets/umang-portrait.jpeg';
import { experience, projects } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const projectCount = projects.length;
  const internshipDuration = experience.find((item) => item.duration)?.duration;

  useLayoutEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionPreference.matches) return undefined;

    const context = gsap.context(() => {
      const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } });

      entrance
        .from('.hero-availability', { opacity: 0, y: 14, duration: 0.55 })
        .from('.hero-name-line', {
          clipPath: 'inset(0 0 100% 0)',
          y: 28,
          duration: 0.82,
          stagger: 0.13,
        }, '-=0.24')
        .from('.hero-role, .hero-copy', {
          opacity: 0,
          y: 18,
          duration: 0.6,
          stagger: 0.12,
        }, '-=0.34')
        .from('.hero-actions .hero-button', {
          opacity: 0,
          y: 16,
          duration: 0.5,
          stagger: 0.1,
        }, '-=0.25')
        .from('.hero-stat', {
          opacity: 0,
          y: 14,
          duration: 0.45,
          stagger: 0.09,
        }, '-=0.2')
        .from('.hero-scroll-cue', { opacity: 0, duration: 0.4 }, '-=0.1')
        .from('.hero-portrait-frame', {
          clipPath: 'inset(12% 0 0 0 round 180px 180px 20px 20px)',
          opacity: 0,
          scale: 1.035,
          duration: 1.1,
          ease: 'power2.out',
        }, 0.18)
        .from('.hero-photo-caption, .hero-floating-card', {
          opacity: 0,
          y: 14,
          duration: 0.55,
          stagger: 0.12,
        }, '-=0.4');

      // Floating card gentle hover loop
      gsap.to('.hero-floating-card', {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 2.6,
        ease: 'sine.inOut',
      });

      // Continuous 360° Orbit Rings Rotation
      gsap.to('.hero-orbit-outer', {
        rotate: 360,
        repeat: -1,
        duration: 40,
        ease: 'linear',
      });

      gsap.to('.hero-orbit-inner', {
        rotate: -360,
        repeat: -1,
        duration: 50,
        ease: 'linear',
      });

      // Scroll Parallax Scrub
      gsap.to('.hero-portrait-frame', {
        y: 45,
        scale: 0.97,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.to('.hero-ambient-glow', {
        y: 80,
        x: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <section id="home" ref={heroRef} className="cinematic-hero">
      <div className="hero-atmosphere" aria-hidden="true">
        <span className="hero-ambient-glow" />
        <span className="hero-grid" />
      </div>

      <div className="container hero-layout">
        <div className="hero-intro">
          <div className="hero-availability">
            <span className="hero-status-dot" />
            <span>Available for freelance</span>
          </div>

          <h1 className="hero-heading">
            <span className="hero-name-mask"><span className="hero-name-line">UMANG</span></span>
            <span className="hero-name-mask hero-name-mask-accent"><span className="hero-name-line">KAKLOTAR</span></span>
          </h1>

          <p className="hero-role">Web Developer <span>|</span> Creative Developer <span>|</span> AI/ML Enthusiast</p>
          <p className="hero-copy">
            I build modern websites, interactive interfaces, and AI-powered applications using creative design and technology.
          </p>

          <div className="hero-actions">
            <a className="hero-button hero-button-primary" href="#projects">
              Explore My Work <ArrowUpRight size={17} strokeWidth={1.8} />
            </a>
            <a className="hero-button hero-button-secondary" href="#contact">Contact Me</a>
          </div>

          <div className="hero-stats" aria-label="Portfolio highlights">
            <div className="hero-stat">
              <span className="hero-stat-icon"><Code2 size={18} strokeWidth={1.7} /></span>
              <span className="hero-stat-copy"><strong>{projectCount}</strong><small>Projects built</small></span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-icon"><Sparkles size={18} strokeWidth={1.7} /></span>
              <span className="hero-stat-copy"><strong>AI/ML</strong><small>Focus area</small></span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-icon"><span className="hero-stat-bracket">01</span></span>
              <span className="hero-stat-copy"><strong>{internshipDuration}</strong><small>Internship</small></span>
            </div>
          </div>

          <a className="hero-scroll-cue" href="#about">
            <span className="hero-scroll-icon"><ArrowDown size={14} /></span>
            <span>Scroll to explore</span>
            <span className="hero-scroll-rule" />
          </a>
        </div>

        <div className="hero-visual" aria-label="Portrait of Umang Kaklotar">
          <span className="hero-orbit hero-orbit-outer" aria-hidden="true" />
          <span className="hero-orbit hero-orbit-inner" aria-hidden="true" />
          <span className="hero-visual-cross hero-cross-top" aria-hidden="true" />
          <span className="hero-visual-cross hero-cross-bottom" aria-hidden="true" />
          <div className="hero-portrait-frame">
            <img className="hero-portrait" src={portrait} alt="Umang Kaklotar" fetchPriority="high" />
            <div className="hero-portrait-shade" />
            <div className="hero-photo-caption">
              <span className="hero-caption-mark">UK<span>.</span></span>
              <span><strong>Thoughtful by design.</strong><small>Built with intent.</small></span>
            </div>
          </div>
          <div className="hero-floating-card">
            <span className="hero-card-icon"><Code2 size={18} /></span>
            <span><small>CREATIVE DEVELOPER</small><strong>Ideas into interfaces.</strong></span>
            <span className="hero-card-light" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
