import React, { useEffect, useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const progressBarRef = useRef(null);

  useEffect(() => {
    // 1. Honor user motion preference
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) {
      ScrollTrigger.refresh();
      return undefined;
    }

    // 2. Initialize Lenis Smooth Scrolling with natural momentum physics
    const lenis = new Lenis({
      lerp: 0.09, // Silky physics-based damping for natural momentum and zero input delay
      smoothWheel: true,
      wheelMultiplier: 1.0, // Natural 1:1 wheel distance response
      touchMultiplier: 1.0, // Natural 1:1 touch ratio
      syncTouch: false, // Ensures mobile uses hardware-accelerated native momentum without lag
      autoResize: true,
      prevent: (node) => node.hasAttribute?.('data-lenis-prevent') || Boolean(node.closest?.('[data-lenis-prevent]')),
    });

    window.__lenis = lenis;

    // 3. Synchronize Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 4. Drive Lenis updates via GSAP ticker for a single unified animation clock
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 5. Global Scroll Progress Bar Animation
    let progressTween;
    if (progressBarRef.current) {
      progressTween = gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    }

    // 6. Smooth Anchor Link Handler with Navbar Offset & Lenis Easing
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      // Do not hijack anchors inside modals or tab interfaces
      if (anchor.closest('[data-lenis-prevent]')) return;

      if (href === '#top' || href === '#home') {
        e.preventDefault();
        lenis.scrollTo(0, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        return;
      }

      try {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, {
            offset: -76, // Accounts for sticky navbar header height
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      } catch {
        // Fallback for non-selector hrefs
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // 7. Refresh triggers once layout and web fonts are settled
    const refreshScroll = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    requestAnimationFrame(refreshScroll);

    if (document.fonts) {
      document.fonts.ready.then(refreshScroll).catch(() => {});
    }

    window.addEventListener('load', refreshScroll);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      window.__lenis = null;
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('load', refreshScroll);
      if (progressTween) progressTween.kill();
    };
  }, []);

  useLayoutEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      {/* Top Global Scroll Progress HUD Bar */}
      <div ref={progressBarRef} className="global-scroll-progress" aria-hidden="true" />

      {/* Interactive Custom Follower Cursor */}
      <CustomCursor />

      {/* Background Atmosphere Layers */}
      <div className="app-background" />
      <div className="bg-glow-1" />
      <div className="bg-glow-2" />
      <div className="noise-overlay" />
      <div className="grid-overlay" />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;
