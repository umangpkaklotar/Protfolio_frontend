import React, { useRef, useLayoutEffect, useState } from 'react';
import { Mail, MapPin, Send, ArrowUpRight, Clock, CheckCircle2, Terminal, User, FileText, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

// Custom GitHub and LinkedIn SVGs for clean rendering
const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 0 0-1.66 1.64 1.65 1.65 0 0 0 1.66 1.65 1.64 1.64 0 0 0 1.64-1.65c0-.9-.74-1.64-1.64-1.64z" />
  </svg>
);

const Contact = () => {
  const comp = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.contact-header-anim', {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: comp.current,
          start: 'top 75%',
        },
      });

      // Split entrance for columns
      gsap.from('.contact-info-col', {
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: comp.current,
          start: 'top 70%',
        },
      });

      gsap.from('.contact-form-console', {
        x: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: comp.current,
          start: 'top 70%',
        },
      });
    }, comp);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.62 },
        colors: ['#ff7628', '#f59e0b', '#f97316', '#ffffff', '#ef4444'],
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 8000);
    }, 400);
  };

  return (
    <section id="contact" ref={comp} className="cinematic-contact">
      <div className="contact-ambient-glow" aria-hidden="true" />

      <div className="container">
        {/* Header */}
        <div className="contact-header">
          <div className="contact-eyebrow contact-header-anim">
            <span className="contact-status-dot" />
            <span>05 // DIRECT TRANSMISSION</span>
          </div>

          <h2 className="contact-title contact-header-anim">
            Let&apos;s Build Something <span className="contact-title-accent">Great.</span>
          </h2>

          <p className="contact-lead-text contact-header-anim">
            Have a project idea, a development opportunity, or an interesting collaboration in mind? Initialize transmission below.
          </p>
        </div>

        {/* 2-Column Command Center */}
        <div className="contact-layout">
          {/* Left: Contact Channels & Meta */}
          <div className="contact-info-col">
            {/* Live Availability Status */}
            <div className="contact-status-card">
              <span className="contact-live-dot" />
              <div className="contact-status-meta">
                <strong>Available for Freelance & Roles</strong>
                <span>Open for web development, full-stack & AI/ML opportunities.</span>
              </div>
            </div>

            {/* Email Channel */}
            <a
              href={`mailto:${personalInfo.email}`}
              className="contact-channel-card"
              aria-label="Send direct email"
            >
              <div className="contact-channel-left">
                <span className="contact-channel-icon">
                  <Mail size={19} />
                </span>
                <div className="contact-channel-meta">
                  <span className="contact-channel-label">Direct Dispatch</span>
                  <span className="contact-channel-value">{personalInfo.email}</span>
                </div>
              </div>
              <ArrowUpRight size={18} className="contact-channel-arrow" />
            </a>

            {/* GitHub Channel */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="contact-channel-card"
              aria-label="View GitHub repositories"
            >
              <div className="contact-channel-left">
                <span className="contact-channel-icon">
                  <GithubIcon size={19} />
                </span>
                <div className="contact-channel-meta">
                  <span className="contact-channel-label">Source Code & Labs</span>
                  <span className="contact-channel-value">github.com/umangpkaklotar</span>
                </div>
              </div>
              <ArrowUpRight size={18} className="contact-channel-arrow" />
            </a>

            {/* LinkedIn Channel */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="contact-channel-card"
              aria-label="Connect on LinkedIn"
            >
              <div className="contact-channel-left">
                <span className="contact-channel-icon">
                  <LinkedinIcon size={19} />
                </span>
                <div className="contact-channel-meta">
                  <span className="contact-channel-label">Professional Network</span>
                  <span className="contact-channel-value">linkedin.com/in/umang</span>
                </div>
              </div>
              <ArrowUpRight size={18} className="contact-channel-arrow" />
            </a>

            {/* Location & GPS */}
            <div className="contact-channel-card" style={{ cursor: 'default' }}>
              <div className="contact-channel-left">
                <span className="contact-channel-icon">
                  <MapPin size={19} />
                </span>
                <div className="contact-channel-meta">
                  <span className="contact-channel-label">Base Coordinates</span>
                  <span className="contact-channel-value">Surat, Gujarat, India // 21.17° N</span>
                </div>
              </div>
            </div>

            {/* Response Time Guarantee */}
            <div className="contact-response-badge">
              <Clock size={15} style={{ color: '#ff8a4b' }} />
              <span>TYPICAL RESPONSE TIME: UNDER 24 HOURS</span>
            </div>
          </div>

          {/* Right: Futuristic Form Console */}
          <div className="contact-form-console contact-anim">
            <span className="about-hud-corner about-hud-corner-tl" aria-hidden="true" />
            <span className="about-hud-corner about-hud-corner-tr" aria-hidden="true" />
            <span className="about-hud-corner about-hud-corner-bl" aria-hidden="true" />
            <span className="about-hud-corner about-hud-corner-br" aria-hidden="true" />

            <div className="contact-console-header">
              <span className="contact-console-title">
                <Terminal size={14} style={{ color: '#ff7628' }} />
                ENCRYPTED_CONTACT_TERMINAL
              </span>
              <span className="contact-console-badge">256-BIT SECURE</span>
            </div>

            <form onSubmit={handleSubmit} className="contact-form-grid">
              <div className="contact-form-row">
                <div className="contact-field-group">
                  <label htmlFor="contact-name" className="contact-label">
                    <User size={13} style={{ color: '#ff8a4b' }} /> Full Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="contact-input"
                  />
                </div>

                <div className="contact-field-group">
                  <label htmlFor="contact-email" className="contact-label">
                    <Mail size={13} style={{ color: '#ff8a4b' }} /> Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
                    className="contact-input"
                  />
                </div>
              </div>

              <div className="contact-field-group">
                <label htmlFor="contact-subject" className="contact-label">
                  <FileText size={13} style={{ color: '#ff8a4b' }} /> Subject / Project Scope
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Full-Stack Web App / AI Integration"
                  className="contact-input"
                />
              </div>

              <div className="contact-field-group">
                <label htmlFor="contact-message" className="contact-label">
                  <Terminal size={13} style={{ color: '#ff8a4b' }} /> Message Transmission
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project, timeline, or inquiry..."
                  className="contact-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="contact-submit-btn"
              >
                {isSubmitting ? (
                  <span>Dispatching...</span>
                ) : (
                  <>
                    <span>Send Transmission</span>
                    <Send size={15} />
                  </>
                )}
              </button>

              {submitted && (
                <div className="contact-success-banner" role="alert">
                  <CheckCircle2 size={16} />
                  <span>TRANSMISSION RECEIVED // THANK YOU FOR REACHING OUT.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
