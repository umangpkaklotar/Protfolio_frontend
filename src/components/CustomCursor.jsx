import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power3' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power3' });

    let isHovering = false;

    const onMouseMove = (e) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    const onMouseEnterInteractive = () => {
      if (!isHovering) {
        isHovering = true;
        gsap.to(ring, {
          scale: 2.1,
          borderColor: '#ff7628',
          backgroundColor: 'rgba(255, 118, 40, 0.1)',
          boxShadow: '0 0 20px rgba(255, 118, 40, 0.4)',
          duration: 0.25,
        });
        gsap.to(dot, { scale: 0.4, duration: 0.2 });
      }
    };

    const onMouseLeaveInteractive = () => {
      if (isHovering) {
        isHovering = false;
        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgba(255, 118, 40, 0.45)',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          duration: 0.25,
        });
        gsap.to(dot, { scale: 1, duration: 0.2 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    const attachHoverListeners = () => {
      const targets = document.querySelectorAll(
        'a, button, input, textarea, .project-card, .ref-skill-card, .contact-channel-card, .about-bento-card, .timeline-content, .hero-stat'
      );
      targets.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    attachHoverListeners();
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
