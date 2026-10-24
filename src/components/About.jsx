import React, { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshTransmissionMaterial, Float, Environment, Octahedron } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const SysGeometry = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <group ref={meshRef}>
        <Icosahedron args={[1.5, 0]}>
          <meshStandardMaterial color="#5e72e4" wireframe opacity={0.5} transparent />
        </Icosahedron>
        <Octahedron args={[0.8, 0]}>
          <MeshTransmissionMaterial
            color="#ffffff"
            resolution={256}
            thickness={0.5}
            roughness={0.2}
            transmission={0.8}
            ior={1.2}
          />
        </Octahedron>
      </group>
    </Float>
  );
};

const About = () => {
  const comp = useRef();

  useLayoutEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    let ctx = gsap.context(() => {
      gsap.from('.about-heading', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: comp.current, start: 'top 75%' }
      });

      gsap.from('.about-text-anim', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: comp.current, start: 'top 60%' }
      });
      
      gsap.from('.about-graphic', {
        scale: 0.95,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: comp.current, start: 'top 60%' }
      });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={comp} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', padding: '10vh 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '5rem', alignItems: 'center' }}>
        
        {/* Left: Graphic/Annotations */}
        <div className="about-graphic" style={{ position: 'relative', height: '100%', minHeight: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            border: '1px solid var(--card-border)',
            borderRadius: '24px',
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2rem',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', zIndex: 2 }}>
              <span className="label">SYS.01</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>CREATIVE DEVELOPMENT</span>
            </div>
            
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
              <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} color="#5e72e4" />
                <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#8e54e9" />
                <SysGeometry />
                <Environment preset="city" />
              </Canvas>
            </div>
            
            <div style={{ zIndex: 2, pointerEvents: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1rem' }}>Architecture & Design</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.4' }}>
                Bridging the gap between aesthetic design and robust technical implementation using modern frameworks.
              </p>
            </div>
          </div>
        </div>
        
        {/* Right: Text */}
        <div>
          <h2 className="about-heading" style={{ marginBottom: '2rem' }}>
            {personalInfo.aboutHeading.split(' ').map((word, i) => (
              word.toLowerCase() === 'creative' ? 
                <span key={i} className="gradient-text" style={{ paddingRight: '0.2em' }}>{word} </span> : 
                word + ' '
            ))}
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p className="about-text-anim" style={{ fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: '300' }}>
              {personalInfo.aboutText}
            </p>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default About;
