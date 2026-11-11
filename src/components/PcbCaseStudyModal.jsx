import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  ExternalLink,
  ArrowRight,
  Bot,
  Search,
  Smartphone,
  Camera,
  Box,
  Server,
  Database,
  Factory,
  Cpu,
  Globe,
  Truck,
  Radio,
  Activity,
  RefreshCw,
  Eye,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Terminal,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  Sliders,
  Monitor,
  Grid
} from 'lucide-react';
import { pcbCaseStudy, PCB_APP_URL } from '../data/pcbCaseStudyData';
import './PcbCaseStudyModal.css';

// Icon Map for highlights
const HIGHLIGHT_ICONS = {
  Bot: Bot,
  Search: Search,
  Smartphone: Smartphone,
  Camera: Camera,
  Box: Box,
  Server: Server,
  Database: Database,
  Factory: Factory,
  Cpu: Cpu,
  Globe: Globe,
  Truck: Truck,
  Radio: Radio,
  Activity: Activity,
  RefreshCw: RefreshCw,
  Eye: Eye,
  Sparkles: Sparkles,
  Monitor: Monitor,
};

const PcbCaseStudyModal = ({ isOpen, onClose, initialTab = 'overview' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedDefect, setSelectedDefect] = useState(pcbCaseStudy.defectClasses[6]); // Missing hole by default (authentic example)
  const [selectedRvizPcb, setSelectedRvizPcb] = useState(pcbCaseStudy.rvizVisualization?.pcbList[0] || {});
  const [selectedRvizState, setSelectedRvizState] = useState(pcbCaseStudy.rvizVisualization?.inspectionStates[2] || { state: 'INSPECTING', color: '#f59e0b' });
  const [selectedConveyorState, setSelectedConveyorState] = useState('STOPPED');
  const [activeCycleStep, setActiveCycleStep] = useState(3);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const modalRef = useRef(null);
  const modalBodyRef = useRef(null);

  // Lock body scroll, pause Lenis, and hide site navbar while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('has-pcb-modal-open');
      document.body.style.overflow = 'hidden';
      if (window.__lenis) {
        window.__lenis.stop();
      }
    } else {
      document.body.classList.remove('has-pcb-modal-open');
      document.body.style.overflow = '';
      if (window.__lenis) {
        window.__lenis.start();
      }
    }

    return () => {
      document.body.classList.remove('has-pcb-modal-open');
      document.body.style.overflow = '';
      if (window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [isOpen]);

  // Reset scroll to top when tab changes
  useEffect(() => {
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Copy live URL to clipboard
  const handleCopyUrl = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(PCB_APP_URL);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2200);
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="pcb-modal-backdrop"
      data-lenis-prevent="true"
      role="dialog"
      aria-modal="true"
      aria-label="PCB Defect Detection & Smart Manufacturing System Case Study"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="pcb-modal-window" 
        data-lenis-prevent="true" 
        ref={modalRef}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <div className="pcb-modal-ambient-glow" aria-hidden="true" />
        <div className="pcb-modal-ambient-glow-2" aria-hidden="true" />

        {/* HUD Top Header */}
        <div className="pcb-modal-header">
          <div className="pcb-modal-header-left">
            <span className="pcb-system-badge">
              <span className="pcb-pulse-dot green" />
              SYS_ID: AOI-YOLOv8-ROS2
            </span>
            <div className="pcb-header-title-wrap">
              <h2 className="pcb-header-title">{pcbCaseStudy.title}</h2>
              <span className="pcb-header-subtitle">
                YOLOv8 • OpenCV • ROS 2 Jazzy • Gazebo Sim 8 • FastAPI • MongoDB • React
              </span>
            </div>
          </div>

          <div className="pcb-modal-header-actions">
            <a
              href={PCB_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="pcb-btn-primary-sm"
              title="Launch actual PCB Defect Detection web application"
            >
              <span>Explore Live App</span>
              <ExternalLink size={14} />
            </a>

            <button
              type="button"
              className="pcb-modal-close-btn"
              onClick={onClose}
              aria-label="Close Case Study"
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="pcb-modal-nav">
          <button
            type="button"
            className={`pcb-nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="pcb-nav-tab-badge">01</span>
            <span>Architecture & Pipelines</span>
          </button>

          <button
            type="button"
            className={`pcb-nav-tab ${activeTab === 'defects' ? 'active' : ''}`}
            onClick={() => setActiveTab('defects')}
          >
            <span className="pcb-nav-tab-badge">02</span>
            <span>AI & 7 Defect Classes</span>
          </button>

          <button
            type="button"
            className={`pcb-nav-tab ${activeTab === 'robotics' ? 'active' : ''}`}
            onClick={() => setActiveTab('robotics')}
          >
            <span className="pcb-nav-tab-badge">03</span>
            <span>Robotics & ROS 2 / Gazebo</span>
          </button>

          <button
            type="button"
            className={`pcb-nav-tab ${activeTab === 'rviz' ? 'active' : ''}`}
            onClick={() => setActiveTab('rviz')}
          >
            <span className="pcb-nav-tab-badge">04</span>
            <span>RViz2 Real-Time Visualization</span>
          </button>

          <button
            type="button"
            className={`pcb-nav-tab ${activeTab === 'platform' ? 'active' : ''}`}
            onClick={() => setActiveTab('platform')}
          >
            <span className="pcb-nav-tab-badge">05</span>
            <span>Web & Mobile Camera</span>
          </button>

          <button
            type="button"
            className={`pcb-nav-tab ${activeTab === 'highlights' ? 'active' : ''}`}
            onClick={() => setActiveTab('highlights')}
          >
            <span className="pcb-nav-tab-badge">06</span>
            <span>Specs & Roadmap</span>
          </button>

          <button
            type="button"
            className={`pcb-nav-tab ${activeTab === 'live' ? 'active' : ''}`}
            onClick={() => setActiveTab('live')}
          >
            <span className="pcb-nav-tab-badge">07</span>
            <span>Live Web Application Portal</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div 
          className="pcb-modal-body" 
          ref={modalBodyRef}
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Executive Summary Banner */}
          <div className="pcb-summary-hero">
            <h3 className="pcb-summary-title">
              Industrial Automated Optical Inspection (AOI) & Virtual Smart Factory
            </h3>
            <p className="pcb-summary-text">
              {pcbCaseStudy.oneLineSummary}
            </p>

            <div className="pcb-specs-grid">
              {pcbCaseStudy.specs.map((spec, i) => (
                <div key={i} className="pcb-spec-item">
                  <span className="pcb-spec-label">{spec.label}</span>
                  <span className="pcb-spec-val">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ===================================================================
              TAB 01: OVERVIEW & ARCHITECTURE
              =================================================================== */}
          {activeTab === 'overview' && (
            <div className="pcb-tab-pane">
              {/* Project Goals and Problem Space */}
              <div className="pcb-two-col">
                <div className="pcb-card-box">
                  <h4 className="pcb-card-title">
                    <Factory size={18} style={{ color: '#ff7628' }} />
                    Industrial Inspection Challenge & Project Goal
                  </h4>
                  <p className="pcb-card-desc">
                    In modern electronics manufacturing, manual visual inspection of Printed Circuit Boards is slow, error-prone, and inconsistent across shifts. Microscopic solder bridges, hairline breaks, and unpunched vias frequently slip past operators into final assemblies.
                  </p>
                  <p className="pcb-card-desc">
                    This project builds an end-to-end industrial inspection platform that combines <strong>Computer Vision, Deep Learning, Real-Time Camera Inspection, Web Technology, Industrial Automation, ROS 2, and Gazebo Simulation</strong> into a unified manufacturing workflow.
                  </p>

                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {pcbCaseStudy.goals.slice(0, 5).map((goal, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: '#c4bfb9' }}>
                        <CheckCircle2 size={13} style={{ color: '#ff7628', flexShrink: 0, marginTop: '2px' }} />
                        <span>{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pcb-card-box">
                  <h4 className="pcb-card-title">
                    <Zap size={18} style={{ color: '#ff7628' }} />
                    Core Industrial Capabilities
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {pcbCaseStudy.goals.slice(5).map((goal, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: '#c4bfb9' }}>
                        <CheckCircle2 size={13} style={{ color: '#ff7628', flexShrink: 0, marginTop: '2px' }} />
                        <span>{goal}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '1.2rem', padding: '0.85rem', background: 'rgba(255, 118, 40, 0.08)', borderRadius: '8px', border: '1px solid rgba(255, 118, 40, 0.25)' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#ff8a4b', fontWeight: '700' }}>
                      INTEGRATED SMART MANUFACTURING PARADIGM
                    </span>
                    <p style={{ margin: '0.35rem 0 0', fontSize: '0.78rem', color: '#dfdbd6', lineHeight: 1.5 }}>
                      The same trained YOLOv8 model runs interchangeably across web image uploads, shop-floor smartphone cameras, and simulated Gazebo production conveyors via ROS 2.
                    </p>
                  </div>
                </div>
              </div>

              {/* Core Inspection Pipelines */}
              <div className="pcb-section-header">
                <div className="pcb-section-title-wrap">
                  <span className="pcb-section-num">01.1</span>
                  <h4 className="pcb-section-title">Dual Inspection Pipelines</h4>
                </div>
              </div>

              <div className="pcb-pipeline-wrap">
                {/* Physical / Web Pipeline */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontFamily: 'monospace', fontSize: '0.74rem', color: '#ff9d63', fontWeight: '700' }}>
                    <Smartphone size={13} />
                    <span>A. WEB & MOBILE CAMERA INSPECTION PIPELINE</span>
                  </div>
                  <div className="pcb-pipeline-row">
                    <div className="pcb-pipeline-step">
                      <span className="pcb-pipe-num">STAGE 01</span>
                      <span className="pcb-pipe-label">PCB Physical Unit</span>
                    </div>
                    <ArrowRight size={14} className="pcb-pipe-arrow" />
                    <div className="pcb-pipeline-step">
                      <span className="pcb-pipe-num">STAGE 02</span>
                      <span className="pcb-pipe-label">Camera / Mobile Capture</span>
                    </div>
                    <ArrowRight size={14} className="pcb-pipe-arrow" />
                    <div className="pcb-pipeline-step">
                      <span className="pcb-pipe-num">STAGE 03</span>
                      <span className="pcb-pipe-label">Image Preprocessing</span>
                    </div>
                    <ArrowRight size={14} className="pcb-pipe-arrow" />
                    <div className="pcb-pipeline-step">
                      <span className="pcb-pipe-num">STAGE 04</span>
                      <span className="pcb-pipe-label">YOLOv8 Inference</span>
                    </div>
                    <ArrowRight size={14} className="pcb-pipe-arrow" />
                    <div className="pcb-pipeline-step">
                      <span className="pcb-pipe-num">STAGE 05</span>
                      <span className="pcb-pipe-label">Defect Analysis & Box</span>
                    </div>
                    <ArrowRight size={14} className="pcb-pipe-arrow" />
                    <div className="pcb-pipeline-step">
                      <span className="pcb-pipe-num">STAGE 06</span>
                      <span className="pcb-pipe-label">Quality Decision</span>
                    </div>
                    <ArrowRight size={14} className="pcb-pipe-arrow" />
                    <div className="pcb-pipeline-step">
                      <span className="pcb-pipe-num">STAGE 07</span>
                      <span className="pcb-pipe-label">MongoDB History</span>
                    </div>
                    <ArrowRight size={14} className="pcb-pipe-arrow" />
                    <div className="pcb-pipeline-step">
                      <span className="pcb-pipe-num">STAGE 08</span>
                      <span className="pcb-pipe-label">Dashboard View</span>
                    </div>
                  </div>
                </div>

                {/* Gazebo & ROS 2 Pipeline */}
                <div style={{ marginTop: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontFamily: 'monospace', fontSize: '0.74rem', color: '#ff9d63', fontWeight: '700' }}>
                    <Globe size={13} />
                    <span>B. GAZEBO SIMULATION & ROS 2 CONVEYOR PIPELINE</span>
                  </div>
                  <div className="pcb-pipeline-row">
                    <div className="pcb-pipeline-step">
                      <span className="pcb-pipe-num">STEP 01</span>
                      <span className="pcb-pipe-label">PCB on Conveyor</span>
                    </div>
                    <ArrowRight size={14} className="pcb-pipe-arrow" />
                    <div className="pcb-pipeline-step">
                      <span className="pcb-pipe-num">STEP 02</span>
                      <span className="pcb-pipe-label">Proximity Sensor Trigger</span>
                    </div>
                    <ArrowRight size={14} className="pcb-pipe-arrow" />
                    <div className="pcb-pipeline-step">
                      <span className="pcb-pipe-num">STEP 03</span>
                      <span className="pcb-pipe-label">Gazebo Camera Frame</span>
                    </div>
                    <ArrowRight size={14} className="pcb-pipe-arrow" />
                    <div className="pcb-pipeline-step">
                      <span className="pcb-pipe-num">STEP 04</span>
                      <span className="pcb-pipe-label">ROS 2 Image Topic</span>
                    </div>
                    <ArrowRight size={14} className="pcb-pipe-arrow" />
                    <div className="pcb-pipeline-step">
                      <span className="pcb-pipe-num">STEP 05</span>
                      <span className="pcb-pipe-label">YOLOv8 Detection Node</span>
                    </div>
                    <ArrowRight size={14} className="pcb-pipe-arrow" />
                    <div className="pcb-pipeline-step">
                      <span className="pcb-pipe-num">STEP 06</span>
                      <span className="pcb-pipe-label">RViz2 Real-Time Monitoring</span>
                    </div>
                    <ArrowRight size={14} className="pcb-pipe-arrow" />
                    <div className="pcb-pipeline-step">
                      <span className="pcb-pipe-num">STEP 07</span>
                      <span className="pcb-pipe-label">Inspection Done Signal</span>
                    </div>
                    <ArrowRight size={14} className="pcb-pipe-arrow" />
                    <div className="pcb-pipeline-step">
                      <span className="pcb-pipe-num">STEP 08</span>
                      <span className="pcb-pipe-label">Conveyor Advances Next</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Architecture ASCII Diagram */}
              <div className="pcb-section-header">
                <div className="pcb-section-title-wrap">
                  <span className="pcb-section-num">01.2</span>
                  <h4 className="pcb-section-title">System Architecture Topology</h4>
                </div>
              </div>

              <pre className="pcb-ascii-block">{`                    ┌─────────────────────────────────────────┐
                    │       React Frontend (Desktop & Mobile) │
                    │     Live Camera Feed, UI & Inspection   │
                    └────────────────────┬────────────────────┘
                                         │
                                   REST / WebSocket
                                         │
                    ┌────────────────────▼────────────────────┐
                    │             FastAPI Backend             │
                    │        Inference & Machine Routing      │
                    └────────────┬───────────────────┬────────┘
                                 │                   │
                        AI Inference Request   Inspection Records
                                 │                   │
                    ┌────────────▼──────┐   ┌────────▼────────┐
                    │  Ultralytics YOLO │   │ MongoDB Cluster │
                    │  Weights: best.pt │   │ History & Audits│
                    └───────────────────┘   └────────┬────────┘
                                                     │
                                            Inspection Telemetry
                                                     │
                    ┌────────────────────────────────▼────────┐
                    │          Industrial Monitoring          │
                    │   Yield Rates, Machine Health & Batches │
                    └─────────────────────────────────────────┘

                    GAZEBO SIMULATION + ROS 2 JAZZY ENVIRONMENT
                                         │
                    ┌────────────────────┼────────────────────┐
                    │                    │                    │
              Virtual Conveyor     Proximity Sensor    Virtual Camera Sensor
              (Speed & Physics)    (Trigger / Gate)    (640x480 @ 10 FPS)
                    │                    │                    │
                    └────────────────────┴──────────┬─────────┘
                                                    │
                                           ROS 2 Communication
                                                    │
                                         ┌──────────▼─────────┐
                                         │ ROS 2 Python Node  │
                                         │ CvBridge + YOLOv8  │
                                         └──────────┬─────────┘
                                                    │
                                          Detection & Signals
                                         /pcb/inspection_done`}</pre>

            </div>
          )}

          {/* ===================================================================
              TAB 02: AI & 7 DEFECT CLASSES
              =================================================================== */}
          {activeTab === 'defects' && (
            <div className="pcb-tab-pane">
              {/* YOLO Architecture overview */}
              <div className="pcb-two-col">
                <div className="pcb-card-box">
                  <h4 className="pcb-card-title">
                    <Bot size={18} style={{ color: '#ff7628' }} />
                    Ultralytics YOLOv8 Object Detection Engine
                  </h4>
                  <p className="pcb-card-desc">
                    The core inference engine leverages the <strong>Ultralytics YOLOv8</strong> neural network architecture, fine-tuned specifically on labeled industrial PCB defect datasets. The production model is exported as <code>best.pt</code>.
                  </p>
                  <p className="pcb-card-desc">
                    Rather than performing simple global image classification (which only outputs defect/no-defect), YOLOv8 predicts <strong>exact spatial bounding box coordinates <code>[x1, y1, x2, y2]</code></strong>, defect class labels, and confidence percentages for every individual defect on the board.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem', marginTop: '1rem' }}>
                    <div className="pcb-spec-item">
                      <span className="pcb-spec-label">Model Weights</span>
                      <span className="pcb-spec-val">best.pt (YOLOv8)</span>
                    </div>
                    <div className="pcb-spec-item">
                      <span className="pcb-spec-label">Defect Classes</span>
                      <span className="pcb-spec-val">7 Industrial Categories</span>
                    </div>
                    <div className="pcb-spec-item">
                      <span className="pcb-spec-label">Thresholding</span>
                      <span className="pcb-spec-val">Configurable Confidence</span>
                    </div>
                    <div className="pcb-spec-item">
                      <span className="pcb-spec-label">Inference Runtime</span>
                      <span className="pcb-spec-val">CPU / GPU Acceleration</span>
                    </div>
                  </div>
                </div>

                <div className="pcb-card-box">
                  <h4 className="pcb-card-title">
                    <Sliders size={18} style={{ color: '#ff7628' }} />
                    Detection Configuration Parameters
                  </h4>
                  <p className="pcb-card-desc">
                    The Python inspection pipeline provides fine-grained runtime control to suit varying shop-floor tolerances and lighting conditions:
                  </p>
                  <ul style={{ paddingLeft: '1.2rem', color: '#c4bfb9', fontSize: '0.82rem', lineHeight: 1.8 }}>
                    <li><strong>Confidence Threshold:</strong> Filters out false positives; configurable per station.</li>
                    <li><strong>Image Input Resolution:</strong> Scaled dynamically for inference throughput vs micro-defect resolution.</li>
                    <li><strong>CPU / GPU Inference:</strong> Seamless fallback allowing edge IPC or high-throughput GPU server deployments.</li>
                    <li><strong>Multi-Defect Support:</strong> Returns multiple defect detections of heterogeneous classes on a single PCB.</li>
                    <li><strong>Coordinate Extraction:</strong> Normalized bounding boxes translated to physical board millimeter coordinates.</li>
                  </ul>
                </div>
              </div>

              {/* 7 Defect Categories Interactive Showcase */}
              <div className="pcb-section-header">
                <div className="pcb-section-title-wrap">
                  <span className="pcb-section-num">02.1</span>
                  <h4 className="pcb-section-title">The 7 Supported PCB Defect Categories (Click to Inspect)</h4>
                </div>
              </div>

              <div className="pcb-defects-container">
                {/* Defect Buttons List */}
                <div className="pcb-defects-list">
                  {pcbCaseStudy.defectClasses.map((defect) => (
                    <button
                      key={defect.id}
                      type="button"
                      className={`pcb-defect-btn ${selectedDefect.id === defect.id ? 'active' : ''}`}
                      onClick={() => setSelectedDefect(defect)}
                    >
                      <div className="pcb-defect-btn-info">
                        <span className="pcb-defect-badge">{defect.badge}</span>
                        <span className="pcb-defect-name">{defect.name}</span>
                      </div>
                      <span className={`pcb-defect-severity ${defect.severity.toLowerCase()}`}>
                        {defect.severity}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Selected Defect Inspector HUD View */}
                <div className="pcb-inspector-view">
                  <div className="pcb-inspector-hud">
                    <span>INSPECTOR // ACTIVE SELECTION</span>
                    <span style={{ color: '#ff7628' }}>{selectedDefect.badge}</span>
                  </div>

                  <div className="pcb-live-canvas-mock">
                    <svg className="pcb-circuit-svg" viewBox="0 0 320 180" fill="none">
                      <path d="M 20 40 H 80 V 100 H 140 V 60 H 220 V 130 H 300" stroke="#ff7628" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 4" />
                      <path d="M 40 160 V 110 H 110 V 150 H 200 V 80 H 290" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.25" />
                      <path d="M 10 90 H 60 V 45 H 160 V 120 H 240 V 35 H 310" stroke="#10b981" strokeWidth="1.2" strokeOpacity="0.2" />
                      <circle cx="80" cy="100" r="4" fill="#ff7628" />
                      <circle cx="140" cy="60" r="4" fill="#ff7628" />
                      <circle cx="220" cy="130" r="4" fill="#ff7628" />
                      <circle cx="110" cy="110" r="3.5" fill="#3b82f6" />
                      <circle cx="200" cy="80" r="3.5" fill="#3b82f6" />
                      <rect x="120" y="60" width="80" height="50" rx="6" fill="rgba(255, 118, 40, 0.06)" stroke="rgba(255, 118, 40, 0.35)" strokeWidth="1" />
                    </svg>
                    <div className="pcb-scan-laser" />

                    <div className="pcb-inspector-bbox">
                      <span className="bbox-label">
                        <AlertTriangle size={10} />
                        {selectedDefect.name.toUpperCase()}
                      </span>
                      <span className="bbox-metric">
                        {selectedDefect.id === 'missing-hole' ? '77.24% CONF' : '94.6% CONF'}
                      </span>
                    </div>
                  </div>

                  <div className="pcb-inspector-details">
                    <div className="pcb-detail-row">
                      <span className="pcb-detail-k">Defect Description</span>
                      <span className="pcb-detail-v">{selectedDefect.description}</span>
                    </div>
                    <div className="pcb-detail-row">
                      <span className="pcb-detail-k">Electrical / Physical Impact</span>
                      <span className="pcb-detail-v" style={{ color: '#fca5a5' }}>{selectedDefect.impact}</span>
                    </div>
                    <div className="pcb-detail-row">
                      <span className="pcb-detail-k">Industrial Action</span>
                      <span className="pcb-detail-v" style={{ color: '#ff9d63', fontWeight: '650' }}>{selectedDefect.action}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Authentic Sample Inspection Record */}
              <div className="pcb-section-header">
                <div className="pcb-section-title-wrap">
                  <span className="pcb-section-num">02.2</span>
                  <h4 className="pcb-section-title">Production Inspection Record Case (Authentic Telemetry)</h4>
                </div>
              </div>

              <div className="pcb-card-box" style={{ background: 'rgba(16, 14, 12, 0.9)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.6rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <ShieldCheck size={18} style={{ color: '#ef4444' }} />
                    <span style={{ fontFamily: 'monospace', fontWeight: '700', fontSize: '0.88rem', color: '#fff' }}>
                      AUDIT TELEMETRY LOG // UNIT: {pcbCaseStudy.sampleRecord.pcbId}
                    </span>
                  </div>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.74rem', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                    STATUS: {pcbCaseStudy.sampleRecord.status}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.8rem', marginBottom: '1.2rem' }}>
                  <div className="pcb-spec-item">
                    <span className="pcb-spec-label">Inspection ID</span>
                    <span className="pcb-spec-val">{pcbCaseStudy.sampleRecord.inspectionId}</span>
                  </div>
                  <div className="pcb-spec-item">
                    <span className="pcb-spec-label">PCB Serial</span>
                    <span className="pcb-spec-val">{pcbCaseStudy.sampleRecord.pcbId}</span>
                  </div>
                  <div className="pcb-spec-item">
                    <span className="pcb-spec-label">Detected Defect</span>
                    <span className="pcb-spec-val" style={{ color: '#f87171' }}>{pcbCaseStudy.sampleRecord.defectType}</span>
                  </div>
                  <div className="pcb-spec-item">
                    <span className="pcb-spec-label">AI Confidence</span>
                    <span className="pcb-spec-val">{pcbCaseStudy.sampleRecord.confidence}</span>
                  </div>
                  <div className="pcb-spec-item">
                    <span className="pcb-spec-label">Total Defects</span>
                    <span className="pcb-spec-val">{pcbCaseStudy.sampleRecord.totalDefects}</span>
                  </div>
                  <div className="pcb-spec-item">
                    <span className="pcb-spec-label">Quality Decision</span>
                    <span className="pcb-spec-val" style={{ color: '#ff8a4b' }}>{pcbCaseStudy.sampleRecord.qualityDecision}</span>
                  </div>
                </div>

                <div style={{ padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.5)', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.75rem', color: '#8c867e' }}>
                  <code>
                    {`{"inspection_id": 79, "pcb_id": "PCB_079", "defect": "Missing Hole", "confidence": 0.7724, "bbox": [142, 88, 218, 156], "status": "REWORK", "action": "CNC_RE_DRILL"}`}
                  </code>
                </div>
              </div>

              {/* Quality Decision Engine */}
              <div className="pcb-section-header" style={{ marginTop: '2rem' }}>
                <div className="pcb-section-title-wrap">
                  <span className="pcb-section-num">02.3</span>
                  <h4 className="pcb-section-title">Automated Quality Decision Engine</h4>
                </div>
              </div>

              <div className="pcb-decision-cards">
                {pcbCaseStudy.qualityDecisions.map((qd, i) => (
                  <div key={i} className="pcb-decision-card">
                    <div>
                      <span className={`pcb-decision-badge ${qd.decision.toLowerCase().replace(/[^a-z]/g, '')}`}>
                        {qd.decision}
                      </span>
                      <p className="pcb-decision-crit">{qd.criteria}</p>
                    </div>
                    <div className="pcb-decision-workflow">
                      <span><strong>Next Action:</strong> {qd.workflow}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================
              TAB 03: ROBOTICS, ROS 2 & GAZEBO SIMULATION
              =================================================================== */}
          {activeTab === 'robotics' && (
            <div className="pcb-tab-pane">
              {/* Gazebo environment description */}
              <div className="pcb-two-col">
                <div className="pcb-card-box">
                  <h4 className="pcb-card-title">
                    <Globe size={18} style={{ color: '#ff7628' }} />
                    Gazebo Sim 8 Virtual Industrial Environment
                  </h4>
                  <p className="pcb-card-desc">
                    To test and validate the automated optical inspection workflow without requiring physical industrial conveyors and optical rigs, a comprehensive simulation environment was built using <strong>Gazebo Sim 8</strong> and <strong>ROS 2 Jazzy</strong>.
                  </p>
                  <p className="pcb-card-desc">
                    The virtual plant simulates:
                  </p>
                  <ul style={{ paddingLeft: '1.2rem', color: '#c4bfb9', fontSize: '0.82rem', lineHeight: 1.8 }}>
                    <li><strong>Motorized Conveyor:</strong> Models friction, belt speed, and physical dynamics.</li>
                    <li><strong>Virtual Optical Sensor:</strong> Detects approaching PCB boards as an inspection trigger.</li>
                    <li><strong>Overhead Industrial Camera:</strong> Simulates high-definition optics and lighting.</li>
                    <li><strong>Physics & Lighting:</strong> Controlled ambient illumination preventing specular glare.</li>
                  </ul>
                </div>

                <div className="pcb-card-box">
                  <h4 className="pcb-card-title">
                    <Layers size={18} style={{ color: '#ff7628' }} />
                    Realistic PCB Texture Integration (SDF Materials)
                  </h4>
                  <p className="pcb-card-desc">
                    A major engineering innovation in this project is the <strong>Real PCB Texture Approach</strong>. Instead of using generic blank green 3D rectangles in Gazebo, high-resolution original images from the PCB defect dataset are mapped onto 3D PCB models as SDF surface textures:
                  </p>
                  <div style={{ padding: '0.85rem', background: 'rgba(255, 118, 40, 0.08)', borderRadius: '8px', border: '1px solid rgba(255, 118, 40, 0.25)', marginTop: '0.8rem' }}>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#ff8a4b', marginBottom: '0.4rem' }}>
                      TEXTURE INGESTION PIPELINE:
                    </div>
                    <code style={{ fontSize: '0.75rem', color: '#dfdbd6', display: 'block', lineHeight: 1.6 }}>
                      Original Dataset Photo → Texture Map → Gazebo SDF Model (pcb_001..pcb_005) → Virtual Camera Sensor → ROS 2 Image Topic → YOLOv8 Model
                    </code>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#a49f99', marginTop: '0.6rem' }}>
                    This practical bridge allows the virtual camera to visually observe real circuit defects in simulation!
                  </p>
                </div>
              </div>

              {/* Gazebo Camera Sensor Specs */}
              <div className="pcb-section-header">
                <div className="pcb-section-title-wrap">
                  <span className="pcb-section-num">03.1</span>
                  <h4 className="pcb-section-title">Gazebo Virtual Camera Sensor Configuration</h4>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                <div className="pcb-spec-item">
                  <span className="pcb-spec-label">Image Resolution</span>
                  <span className="pcb-spec-val">640 × 480 pixels</span>
                </div>
                <div className="pcb-spec-item">
                  <span className="pcb-spec-label">Color Format</span>
                  <span className="pcb-spec-val">R8G8B8 True Color</span>
                </div>
                <div className="pcb-spec-item">
                  <span className="pcb-spec-label">Horizontal FOV</span>
                  <span className="pcb-spec-val">~45° Telecentric Optical Simulation</span>
                </div>
                <div className="pcb-spec-item">
                  <span className="pcb-spec-label">Streaming Rate</span>
                  <span className="pcb-spec-val">10 FPS Controlled Update</span>
                </div>
                <div className="pcb-spec-item">
                  <span className="pcb-spec-label">ROS 2 Output Topic</span>
                  <span className="pcb-spec-val">/pcb/camera/image</span>
                </div>
                <div className="pcb-spec-item">
                  <span className="pcb-spec-label">Triggering Node</span>
                  <span className="pcb-spec-val">Virtual Proximity Sensor</span>
                </div>
              </div>

              {/* Sequential One-by-One Conveyor Logic */}
              <div className="pcb-section-header">
                <div className="pcb-section-title-wrap">
                  <span className="pcb-section-num">03.2</span>
                  <h4 className="pcb-section-title">One-by-One Sequential Inspection Logic</h4>
                </div>
              </div>

              <div className="pcb-card-box" style={{ marginBottom: '2rem' }}>
                <p className="pcb-card-desc">
                  To prevent multi-PCB collision and race conditions at the inspection station, the ROS 2 inspection controller implements strict sequential synchronization:
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', overflowX: 'auto', padding: '0.5rem 0' }}>
                  <div className="pcb-spec-item" style={{ minWidth: '130px', textAlign: 'center' }}>
                    <span className="pcb-spec-label">QUEUE 01</span>
                    <span className="pcb-spec-val">PCB Approaches</span>
                  </div>
                  <ArrowRight size={14} className="pcb-pipe-arrow" />
                  <div className="pcb-spec-item" style={{ minWidth: '130px', textAlign: 'center' }}>
                    <span className="pcb-spec-label">TRIGGER 02</span>
                    <span className="pcb-spec-val">Sensor Detected</span>
                  </div>
                  <ArrowRight size={14} className="pcb-pipe-arrow" />
                  <div className="pcb-spec-item" style={{ minWidth: '130px', textAlign: 'center' }}>
                    <span className="pcb-spec-label">HOLD 03</span>
                    <span className="pcb-spec-val">Conveyor Pauses</span>
                  </div>
                  <ArrowRight size={14} className="pcb-pipe-arrow" />
                  <div className="pcb-spec-item" style={{ minWidth: '130px', textAlign: 'center' }}>
                    <span className="pcb-spec-label">AI INFER 04</span>
                    <span className="pcb-spec-val">YOLOv8 Detection</span>
                  </div>
                  <ArrowRight size={14} className="pcb-pipe-arrow" />
                  <div className="pcb-spec-item" style={{ minWidth: '130px', textAlign: 'center' }}>
                    <span className="pcb-spec-label">DECISION 05</span>
                    <span className="pcb-spec-val">Quality Status</span>
                  </div>
                  <ArrowRight size={14} className="pcb-pipe-arrow" />
                  <div className="pcb-spec-item" style={{ minWidth: '130px', textAlign: 'center' }}>
                    <span className="pcb-spec-label">DONE 06</span>
                    <span className="pcb-spec-val">Conveyor Advances</span>
                  </div>
                </div>
              </div>


              {/* OpenCV & CvBridge Pipeline */}
              <div className="pcb-card-box">
                <h4 className="pcb-card-title">
                  <Terminal size={18} style={{ color: '#ff7628' }} />
                  CvBridge & OpenCV In-Memory Pipeline
                </h4>
                <p className="pcb-card-desc">
                  ROS 2 transmits sensor frames as <code>sensor_msgs/msg/Image</code>, while YOLOv8 and PyTorch require standard NumPy BGR matrices. A dedicated ROS 2 Python node connects them with zero disk I/O:
                </p>
                <div style={{ padding: '0.85rem', background: 'rgba(0,0,0,0.6)', borderRadius: '8px', border: '1px solid rgba(255, 118, 40, 0.2)' }}>
                  <code style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#ffb084', lineHeight: 1.6, display: 'block' }}>
                    {`# In yolo_node.py (ROS 2 Python Node)
ros_image = self.bridge.imgmsg_to_cv2(msg, desired_encoding='bgr8')
results = self.model(ros_image, conf=self.conf_threshold)
annotated_frame = results[0].plot()  # Draws bounding boxes & confidence scores
out_msg = self.bridge.cv2_to_imgmsg(annotated_frame, encoding='bgr8')
self.detected_image_pub.publish(out_msg)`}
                  </code>
                </div>
              </div>

              {/* Callout to Real-Time RViz2 Visualization */}
              <div className="pcb-card-box pcb-rviz-cta-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, rgba(255, 118, 40, 0.1) 0%, rgba(16, 14, 13, 0.95) 100%)', borderColor: 'rgba(255, 118, 40, 0.4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <Monitor size={18} style={{ color: '#ff7628' }} />
                      <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#fff' }}>Real-Time RViz2 Inspection Visualization Layer</h4>
                      <span style={{ background: 'rgba(255, 118, 40, 0.2)', color: '#ff9d63', fontSize: '0.68rem', fontFamily: 'monospace', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: '700' }}>TAB 04</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#c4bfb9', maxWidth: '680px', lineHeight: 1.5 }}>
                      Integrated RViz2 with ROS 2 and Gazebo to visualize the PCB inspection pipeline in real time, including live camera streams, YOLO detection results, inspection states, and the 3D inspection environment.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="pcb-btn-primary-sm"
                    onClick={() => setActiveTab('rviz')}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <span>Launch RViz2 Console</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              TAB 04: REAL-TIME RVIZ2 INSPECTION VISUALIZATION
              =================================================================== */}
          {activeTab === 'rviz' && (
            <div className="pcb-tab-pane">
              {/* 1. Header Box with Title, Short Description, and Badges */}
              <div className="pcb-rviz-header-banner">
                <div className="pcb-rviz-header-top">
                  <div className="pcb-rviz-title-badge">
                    <Monitor size={15} style={{ color: '#ff7628' }} />
                    <span>ROS 2 + GAZEBO REAL-TIME VISUALIZATION LAYER</span>
                  </div>
                  <div className="pcb-rviz-live-pulse">
                    <span className="pcb-pulse-dot green" />
                    <span>RVIZ2 ACTIVE // FIXED FRAME: world</span>
                  </div>
                </div>

                <h3 className="pcb-rviz-main-title">
                  Real-Time RViz2 Inspection Visualization
                </h3>

                <p className="pcb-rviz-short-desc">
                  Integrated RViz2 with ROS 2 and Gazebo to visualize the PCB inspection pipeline in real time, including live camera streams, YOLO detection results, inspection states, and the 3D inspection environment.
                </p>

                {/* Technology Badges / Tags */}
                <div className="pcb-rviz-tags-row">
                  {pcbCaseStudy.rvizVisualization.techBadges.map((badge, idx) => (
                    <span key={idx} className="pcb-rviz-tag-pill">
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Architecture & Flow Dual Row */}
                <div className="pcb-rviz-flows-grid">
                  {/* Architecture Visualization: Gazebo → ROS 2 → YOLO → RViz2 */}
                  <div className="pcb-rviz-flow-card">
                    <span className="pcb-rviz-flow-label">TECHNICAL ARCHITECTURE</span>
                    <div className="pcb-rviz-flow-pills">
                      {pcbCaseStudy.rvizVisualization.architecture.map((node, i) => (
                        <React.Fragment key={i}>
                          <div className={`pcb-rviz-flow-node ${node === 'RViz2' ? 'active-target' : ''}`}>
                            <span>{node}</span>
                          </div>
                          {i < pcbCaseStudy.rvizVisualization.architecture.length - 1 && (
                            <ArrowRight size={13} className="pcb-rviz-flow-arrow" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Technical Flow: Camera → ROS 2 → YOLO → Detection Result → RViz2 */}
                  <div className="pcb-rviz-flow-card">
                    <span className="pcb-rviz-flow-label">TECHNICAL DATA FLOW</span>
                    <div className="pcb-rviz-flow-pills">
                      {pcbCaseStudy.rvizVisualization.technicalFlow.map((node, i) => (
                        <React.Fragment key={i}>
                          <div className={`pcb-rviz-flow-node ${node === 'RViz2' ? 'active-target' : ''}`}>
                            <span>{node}</span>
                          </div>
                          {i < pcbCaseStudy.rvizVisualization.technicalFlow.length - 1 && (
                            <ArrowRight size={13} className="pcb-rviz-flow-arrow" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. RViz2 Highlights Grid */}
              <div className="pcb-section-header" style={{ marginTop: '1.8rem' }}>
                <div className="pcb-section-title-wrap">
                  <span className="pcb-section-num">04.1</span>
                  <h4 className="pcb-section-title">RViz2 Highlights</h4>
                </div>
                <span className="pcb-section-badge">CORE CAPABILITIES</span>
              </div>

              <div className="pcb-rviz-highlights-grid">
                {pcbCaseStudy.rvizVisualization.highlights.map((item, idx) => (
                  <div key={idx} className="pcb-rviz-highlight-item">
                    <div className="pcb-rviz-hl-dot" />
                    <span className="pcb-rviz-hl-text">{item}</span>
                  </div>
                ))}
              </div>

              {/* 3. Interactive RViz2 Industrial Workspace Console */}
              <div className="pcb-section-header" style={{ marginTop: '2rem' }}>
                <div className="pcb-section-title-wrap">
                  <span className="pcb-section-num">04.2</span>
                  <h4 className="pcb-section-title">Simulated RViz2 Industrial Inspection Console</h4>
                </div>
                <span className="pcb-section-badge">INTERACTIVE HUD</span>
              </div>

              <div className="pcb-rviz-window-mockup">
                {/* RViz2 Window Title Bar */}
                <div className="pcb-rviz-window-bar">
                  <div className="pcb-rviz-bar-left">
                    <span className="pcb-rviz-window-btn red" />
                    <span className="pcb-rviz-window-btn yellow" />
                    <span className="pcb-rviz-window-btn green" />
                    <span className="pcb-rviz-window-title">
                      rviz2 — pcb_inspection.rviz [ROS 2 Jazzy // Displays: Grid, RobotModel, TF, Image(x2)]
                    </span>
                  </div>
                  <div className="pcb-rviz-bar-right">
                    <span className="pcb-rviz-fps-tag">60.0 FPS</span>
                    <span className="pcb-rviz-frame-tag">Target Frame: <strong>world</strong></span>
                  </div>
                </div>

                {/* Top Console Controls: PCB Selector + Inspection State + Conveyor State */}
                <div className="pcb-rviz-console-controls">
                  {/* Capability 5: PCB Identification & Sequential Tracking */}
                  <div className="pcb-rviz-control-group">
                    <span className="pcb-rviz-ctrl-label">ACTIVE PCB IDENTIFIER:</span>
                    <div className="pcb-rviz-pcb-buttons">
                      {pcbCaseStudy.rvizVisualization.pcbList.map((pcb) => (
                        <button
                          key={pcb.id}
                          type="button"
                          className={`pcb-rviz-pcb-btn ${selectedRvizPcb.id === pcb.id ? 'active' : ''}`}
                          onClick={() => setSelectedRvizPcb(pcb)}
                        >
                          <span>{pcb.id}</span>
                          <span className={`pcb-pcb-mini-status ${pcb.status.toLowerCase()}`}>
                            {pcb.status === 'PASS' ? '✓' : '!'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Capability 4: Real-Time Inspection Status & Conveyor State */}
                  <div className="pcb-rviz-control-group">
                    <span className="pcb-rviz-ctrl-label">INSPECTION STATE:</span>
                    <div className="pcb-rviz-state-chips">
                      {pcbCaseStudy.rvizVisualization.inspectionStates.map((st) => (
                        <button
                          key={st.state}
                          type="button"
                          className={`pcb-rviz-state-chip ${selectedRvizState.state === st.state ? 'active' : ''}`}
                          style={{
                            '--state-color': st.color,
                            borderColor: selectedRvizState.state === st.state ? st.color : 'rgba(255,255,255,0.08)'
                          }}
                          onClick={() => {
                            setSelectedRvizState(st);
                            if (st.state === 'INSPECTING' || st.state === 'DETECTED') {
                              setSelectedConveyorState('STOPPED');
                            } else if (st.state === 'DONE' || st.state === 'WAITING') {
                              setSelectedConveyorState('RUNNING');
                            }
                          }}
                        >
                          <span className="pcb-state-dot" style={{ background: st.color }} />
                          <span>{st.state}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pcb-rviz-control-group">
                    <span className="pcb-rviz-ctrl-label">CONVEYOR STATE:</span>
                    <div className="pcb-rviz-conveyor-toggle">
                      <span
                        className={`pcb-conveyor-pill ${selectedConveyorState === 'RUNNING' ? 'running' : 'stopped'}`}
                        onClick={() => setSelectedConveyorState(prev => prev === 'RUNNING' ? 'STOPPED' : 'RUNNING')}
                      >
                        <span className={`pcb-pulse-dot ${selectedConveyorState === 'RUNNING' ? 'green' : ''}`} />
                        <span>{selectedConveyorState}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dual RViz2 Main Workspaces: 3D Viewport + Dual Image Feeds */}
                <div className="pcb-rviz-dual-workspace">
                  {/* Capability 3: 3D Inspection Environment Viewport */}
                  <div className="pcb-rviz-panel-3d">
                    <div className="pcb-rviz-panel-header">
                      <div className="pcb-rviz-panel-name">
                        <Grid size={13} style={{ color: '#ff7628' }} />
                        <span>3D INSPECTION VIEWPORT // [rviz_default_plugins/Grid & TF]</span>
                      </div>
                      <div className="pcb-rviz-coords">
                        <span>FOV: 45°</span>
                        <span>GRID: 0.1m</span>
                      </div>
                    </div>

                    <div className="pcb-rviz-3d-scene">
                      {/* SVG Interactive 3D Mockup of Industrial Cell */}
                      <svg className="pcb-rviz-3d-svg" viewBox="0 0 540 320" fill="none">
                        <defs>
                          <pattern id="rvizGridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 118, 40, 0.08)" strokeWidth="0.8" />
                          </pattern>
                          <linearGradient id="conveyorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#1f1c19" />
                            <stop offset="50%" stopColor="#2c2723" />
                            <stop offset="100%" stopColor="#1f1c19" />
                          </linearGradient>
                          <linearGradient id="beamFrustum" x1="50%" y1="0%" x2="50%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255, 118, 40, 0.45)" />
                            <stop offset="100%" stopColor="rgba(255, 118, 40, 0.04)" />
                          </linearGradient>
                        </defs>

                        {/* RViz Ground Grid Floor */}
                        <rect x="20" y="20" width="500" height="280" fill="url(#rvizGridPattern)" rx="8" />

                        {/* Reference Grid Origin / TF Axes (world) */}
                        <g transform="translate(60, 270)">
                          <line x1="0" y1="0" x2="35" y2="0" stroke="#ef4444" strokeWidth="2.5" />
                          <line x1="0" y1="0" x2="0" y2="-35" stroke="#10b981" strokeWidth="2.5" />
                          <line x1="0" y1="0" x2="-20" y2="15" stroke="#3b82f6" strokeWidth="2.5" />
                          <text x="40" y="4" fill="#ef4444" fontSize="8" fontFamily="monospace">X (world)</text>
                          <text x="4" y="-38" fill="#10b981" fontSize="8" fontFamily="monospace">Z</text>
                          <text x="-32" y="24" fill="#3b82f6" fontSize="8" fontFamily="monospace">Y</text>
                        </g>

                        {/* Conveyor Bed */}
                        <g id="conveyorGroup">
                          {/* Belt Structure */}
                          <rect x="70" y="145" width="400" height="70" rx="6" fill="url(#conveyorGrad)" stroke="rgba(255, 118, 40, 0.35)" strokeWidth="1.5" />
                          
                          {/* Conveyor Motion Rollers / Stripes */}
                          <line x1="120" y1="145" x2="120" y2="215" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1="180" y1="145" x2="180" y2="215" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1="240" y1="145" x2="240" y2="215" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1="300" y1="145" x2="300" y2="215" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1="360" y1="145" x2="360" y2="215" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1="420" y1="145" x2="420" y2="215" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />

                          {/* Conveyor Motion Arrow Indicator */}
                          <g opacity="0.6">
                            <path d="M 85 180 L 100 180 M 96 175 L 101 180 L 96 185" stroke="#ff7628" strokeWidth="1.8" fill="none" />
                            <path d="M 440 180 L 455 180 M 451 175 L 456 180 L 451 185" stroke="#ff7628" strokeWidth="1.8" fill="none" />
                            <text x="85" y="198" fill="#ff9d63" fontSize="7" fontFamily="monospace">FEED ➔</text>
                          </g>
                        </g>

                        {/* Optical Inspection Zone on Conveyor */}
                        <g id="inspectionZone">
                          <rect x="210" y="152" width="120" height="56" rx="4" fill="rgba(255, 118, 40, 0.08)" stroke="#ff7628" strokeWidth="1.5" strokeDasharray="4 2" />
                          {/* Zone Corner Brackets */}
                          <path d="M 210 162 V 152 H 220" stroke="#ff8a4b" strokeWidth="2" fill="none" />
                          <path d="M 330 162 V 152 H 320" stroke="#ff8a4b" strokeWidth="2" fill="none" />
                          <path d="M 210 198 V 208 H 220" stroke="#ff8a4b" strokeWidth="2" fill="none" />
                          <path d="M 330 198 V 208 H 320" stroke="#ff8a4b" strokeWidth="2" fill="none" />
                          <text x="270" y="140" textAnchor="middle" fill="#ff8a4b" fontSize="7.5" fontFamily="monospace" fontWeight="700">
                            INSPECTION ZONE [X: 0.0m, Y: 0.0m]
                          </text>
                        </g>

                        {/* Current PCB Positioned in Zone */}
                        <g id="currentPcbModel" transform="translate(225, 158)">
                          <rect x="0" y="0" width="90" height="44" rx="3" fill="#143320" stroke="#22c55e" strokeWidth="1.2" />
                          {/* PCB Silk Traces */}
                          <path d="M 10 10 H 30 V 25 H 55" stroke="#86efac" strokeWidth="1" strokeOpacity="0.4" fill="none" />
                          <path d="M 20 34 H 45 V 18 H 80" stroke="#86efac" strokeWidth="1" strokeOpacity="0.4" fill="none" />
                          <circle cx="10" cy="10" r="2" fill="#86efac" />
                          <circle cx="80" cy="18" r="2" fill="#86efac" />
                          {/* PCB Chip Model */}
                          <rect x="36" y="13" width="18" height="18" rx="2" fill="#090909" stroke="#ff7628" strokeWidth="0.8" />
                          <text x="45" y="24" textAnchor="middle" fill="#ff7628" fontSize="5.5" fontFamily="monospace">MCU</text>
                          {/* Board Serial Label */}
                          <text x="45" y="38" textAnchor="middle" fill="#ffffff" fontSize="7" fontFamily="monospace" fontWeight="700">
                            {selectedRvizPcb.id}
                          </text>

                          {/* Localized Defect Indicator on Active PCB */}
                          {selectedRvizPcb.status !== 'PASS' && (
                            <g>
                              <circle cx="22" cy="18" r="6" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 1" fill="rgba(239, 68, 68, 0.25)" />
                              <line x1="22" y1="10" x2="22" y2="26" stroke="#ef4444" strokeWidth="0.8" />
                              <line x1="14" y1="18" x2="30" y2="18" stroke="#ef4444" strokeWidth="0.8" />
                            </g>
                          )}
                        </g>

                        {/* Overhead Inspection Camera Mount & Telecentric Lens Frustum */}
                        <g id="cameraMountGroup">
                          {/* Mounting Stanchion */}
                          <line x1="270" y1="40" x2="270" y2="70" stroke="#71717a" strokeWidth="4" />
                          <rect x="250" y="65" width="40" height="22" rx="4" fill="#27272a" stroke="#ff7628" strokeWidth="1.2" />
                          <circle cx="270" cy="87" r="7" fill="#090909" stroke="#ff7628" strokeWidth="1.5" />
                          <circle cx="270" cy="87" r="3" fill="#38bdf8" />

                          {/* Telecentric Light/Vision Frustum Cone */}
                          <polygon points="263,94 277,94 330,152 210,152" fill="url(#beamFrustum)" />
                          <line x1="263" y1="94" x2="210" y2="152" stroke="#ff7628" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.6" />
                          <line x1="277" y1="94" x2="330" y2="152" stroke="#ff7628" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.6" />

                          {/* Camera TF Label */}
                          <text x="270" y="58" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontFamily="monospace">
                            frame: camera_link [Z: +0.65m]
                          </text>
                        </g>

                        {/* Proximity Sensor */}
                        <g id="proximitySensorGroup">
                          <rect x="175" y="215" width="16" height="20" rx="3" fill="#3f3f46" stroke="#f59e0b" strokeWidth="1" />
                          <circle cx="183" cy="225" r="3" fill="#ef4444" />
                          {/* Infrared Trigger Beam */}
                          <line x1="183" y1="215" x2="183" y2="175" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 1.5" />
                          <circle cx="183" cy="175" r="2.5" fill="#ef4444" />
                          <text x="183" y="247" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="monospace">
                            sensor_link
                          </text>
                        </g>

                        {/* Live Status Overlay in 3D Viewport */}
                        <g transform="translate(30, 35)">
                          <rect x="0" y="0" width="140" height="52" rx="5" fill="rgba(10, 8, 7, 0.85)" stroke="rgba(255, 118, 40, 0.25)" strokeWidth="1" />
                          <text x="8" y="14" fill="#ff8a4b" fontSize="7.5" fontFamily="monospace" fontWeight="700">RViz2 3D ENVIRONMENT</text>
                          <text x="8" y="26" fill="#c4bfb9" fontSize="6.8" fontFamily="monospace">PCB Conveyor: {selectedConveyorState}</text>
                          <text x="8" y="37" fill="#c4bfb9" fontSize="6.8" fontFamily="monospace">Inspection: {selectedRvizState.state}</text>
                          <text x="8" y="47" fill="#c4bfb9" fontSize="6.8" fontFamily="monospace">Current ID: {selectedRvizPcb.id}</text>
                        </g>
                      </svg>
                    </div>
                  </div>

                  {/* Dual Live Image Views: Capability 1 & Capability 2 */}
                  <div className="pcb-rviz-panel-images">
                    {/* Capability 1: Live Camera Visualization (/pcb/camera/image) */}
                    <div className="pcb-rviz-stream-box">
                      <div className="pcb-rviz-stream-header">
                        <div className="pcb-rviz-stream-title">
                          <Camera size={13} style={{ color: '#ff7628' }} />
                          <span>1. Live Camera Visualization</span>
                        </div>
                        <span className="pcb-rviz-topic-chip">/pcb/camera/image</span>
                      </div>
                      
                      <div className="pcb-rviz-camera-feed">
                        <div className="pcb-rviz-stream-hud">
                          <span className="pcb-rviz-rec-dot" />
                          <span>LIVE FEED // 10 FPS // 640x480</span>
                          <span className="pcb-rviz-feed-format">sensor_msgs/Image</span>
                        </div>

                        {/* Raw Frame Simulation */}
                        <div className="pcb-rviz-raw-canvas">
                          <svg viewBox="0 0 280 140" className="pcb-rviz-feed-svg">
                            <rect width="280" height="140" fill="#0d2818" />
                            <path d="M 20 30 H 90 V 80 H 160 V 50 H 260" stroke="#4ade80" strokeWidth="2" strokeOpacity="0.5" fill="none" />
                            <path d="M 40 120 V 90 H 120 V 110 H 220 V 60 H 270" stroke="#4ade80" strokeWidth="2" strokeOpacity="0.4" fill="none" />
                            <circle cx="90" cy="80" r="5" fill="#4ade80" />
                            <circle cx="160" cy="50" r="5" fill="#4ade80" />
                            <circle cx="220" cy="110" r="5" fill="#4ade80" />
                            <rect x="110" y="45" width="60" height="40" rx="4" fill="#05150a" stroke="#22c55e" strokeWidth="1" />
                            <text x="140" y="68" textAnchor="middle" fill="#86efac" fontSize="8" fontFamily="monospace">IC-TEST</text>
                            <text x="140" y="130" textAnchor="middle" fill="#86efac" fontSize="7.5" fontFamily="monospace">
                              Raw Gazebo Frame [Target: {selectedRvizPcb.id}]
                            </text>
                          </svg>
                          <div className="pcb-feed-scanline" />
                        </div>
                      </div>
                    </div>

                    {/* Capability 2: YOLO Detection Visualization (/pcb/detected_image) */}
                    <div className="pcb-rviz-stream-box">
                      <div className="pcb-rviz-stream-header">
                        <div className="pcb-rviz-stream-title">
                          <Eye size={13} style={{ color: '#ff7628' }} />
                          <span>2. YOLO Detection Visualization</span>
                        </div>
                        <span className="pcb-rviz-topic-chip">/pcb/detected_image</span>
                      </div>

                      <div className="pcb-rviz-camera-feed">
                        <div className="pcb-rviz-stream-hud">
                          <span className={`pcb-rviz-verdict-tag ${selectedRvizPcb.status ? selectedRvizPcb.status.toLowerCase() : 'pass'}`}>
                            DECISION: {selectedRvizPcb.verdict}
                          </span>
                          <span className="pcb-rviz-feed-format">YOLOv8 Output</span>
                        </div>

                        {/* Annotated Frame Simulation with Bounding Box */}
                        <div className="pcb-rviz-raw-canvas">
                          <svg viewBox="0 0 280 140" className="pcb-rviz-feed-svg">
                            <rect width="280" height="140" fill="#0d2818" />
                            <path d="M 20 30 H 90 V 80 H 160 V 50 H 260" stroke="#4ade80" strokeWidth="2" strokeOpacity="0.5" fill="none" />
                            <path d="M 40 120 V 90 H 120 V 110 H 220 V 60 H 270" stroke="#4ade80" strokeWidth="2" strokeOpacity="0.4" fill="none" />
                            <circle cx="90" cy="80" r="5" fill="#4ade80" />
                            <circle cx="160" cy="50" r="5" fill="#4ade80" />
                            <circle cx="220" cy="110" r="5" fill="#4ade80" />
                            <rect x="110" y="45" width="60" height="40" rx="4" fill="#05150a" stroke="#22c55e" strokeWidth="1" />
                            <text x="140" y="68" textAnchor="middle" fill="#86efac" fontSize="8" fontFamily="monospace">IC-TEST</text>

                            {/* YOLO Predicted Bounding Box */}
                            {selectedRvizPcb.status !== 'PASS' ? (
                              <g>
                                <rect
                                  x={selectedRvizPcb.x - 40}
                                  y={selectedRvizPcb.y - 25}
                                  width="76"
                                  height="44"
                                  fill="rgba(239, 68, 68, 0.15)"
                                  stroke="#ef4444"
                                  strokeWidth="1.8"
                                  strokeDasharray="4 2"
                                />
                                {/* Bounding Box Corner Reticles */}
                                <path d={`M ${selectedRvizPcb.x - 40} ${selectedRvizPcb.y - 15} V ${selectedRvizPcb.y - 25} H ${selectedRvizPcb.x - 30}`} stroke="#ff7628" strokeWidth="2" fill="none" />
                                <path d={`M ${selectedRvizPcb.x + 36} ${selectedRvizPcb.y - 15} V ${selectedRvizPcb.y - 25} H ${selectedRvizPcb.x + 26}`} stroke="#ff7628" strokeWidth="2" fill="none" />
                                <path d={`M ${selectedRvizPcb.x - 40} ${selectedRvizPcb.y + 9} V ${selectedRvizPcb.y + 19} H ${selectedRvizPcb.x - 30}`} stroke="#ff7628" strokeWidth="2" fill="none" />
                                <path d={`M ${selectedRvizPcb.x + 36} ${selectedRvizPcb.y + 9} V ${selectedRvizPcb.y + 19} H ${selectedRvizPcb.x + 26}`} stroke="#ff7628" strokeWidth="2" fill="none" />

                                {/* Tag Above Bounding Box */}
                                <rect
                                  x={selectedRvizPcb.x - 40}
                                  y={selectedRvizPcb.y - 39}
                                  width="115"
                                  height="13"
                                  fill="#ef4444"
                                  rx="2"
                                />
                                <text
                                  x={selectedRvizPcb.x - 36}
                                  y={selectedRvizPcb.y - 29}
                                  fill="#ffffff"
                                  fontSize="6.8"
                                  fontFamily="monospace"
                                  fontWeight="700"
                                >
                                  {selectedRvizPcb.defect ? selectedRvizPcb.defect.toUpperCase() : 'DEFECT'} // {selectedRvizPcb.confidence}
                                </text>
                              </g>
                            ) : (
                              <g>
                                <rect x="50" y="25" width="180" height="85" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3 3" rx="4" />
                                <rect x="50" y="10" width="135" height="14" fill="#22c55e" rx="2" />
                                <text x="56" y="20" fill="#05150a" fontSize="7.5" fontFamily="monospace" fontWeight="700">
                                  VERIFIED: ZERO DEFECTS (96.5%)
                                </text>
                              </g>
                            )}
                          </svg>
                          <div className="pcb-feed-scanline" />
                        </div>

                        {/* Defect Metadata Box */}
                        <div className="pcb-rviz-det-meta">
                          <div className="pcb-rviz-meta-item">
                            <span>Defect Class:</span>
                            <strong>{selectedRvizPcb.defect}</strong>
                          </div>
                          <div className="pcb-rviz-meta-item">
                            <span>Confidence:</span>
                            <strong style={{ color: selectedRvizPcb.status === 'PASS' ? '#10b981' : '#f59e0b' }}>
                              {selectedRvizPcb.confidence}
                            </strong>
                          </div>
                          <div className="pcb-rviz-meta-item">
                            <span>Coordinates:</span>
                            <code>{selectedRvizPcb.bbox}</code>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Capability 6: One-Shot Inspection Visualization */}
              <div className="pcb-section-header" style={{ marginTop: '2.4rem' }}>
                <div className="pcb-section-title-wrap">
                  <span className="pcb-section-num">04.3</span>
                  <h4 className="pcb-section-title">One-Shot Inspection Visualization Cycle</h4>
                </div>
                <span className="pcb-section-badge">STATIONARY CAPTURE</span>
              </div>

              <div className="pcb-card-box" style={{ marginBottom: '1.8rem' }}>
                <p className="pcb-card-desc">
                  Each PCB is inspected <strong>exactly once</strong> upon reaching the designated optical inspection zone. The automated cell synchronizes hardware stops and software inferences in real time:
                </p>

                {/* 6-Step Cycle Interactive Pipeline */}
                <div className="pcb-rviz-cycle-row">
                  {pcbCaseStudy.rvizVisualization.oneShotCycle.map((st, i) => (
                    <div
                      key={i}
                      className={`pcb-rviz-cycle-step ${activeCycleStep === i ? 'active' : ''}`}
                      onClick={() => setActiveCycleStep(i)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="pcb-cycle-num">{st.step}</div>
                      <div className="pcb-cycle-title">{st.title}</div>
                      <div className="pcb-cycle-desc">{st.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="pcb-rviz-cycle-summary">
                  <span className="pcb-cycle-summary-pill">ONE-SHOT INSPECTION PIPELINE:</span>
                  <code>PCB detected ➔ conveyor stopped ➔ camera frame captured ➔ YOLO inspection ➔ result displayed ➔ conveyor resumes</code>
                </div>
              </div>

              {/* Capabilities 7 & 8: ROS 2 Integration & Industrial Monitoring Concept */}
              <div className="pcb-two-col" style={{ marginBottom: '1.5rem' }}>
                {/* Capability 7: ROS 2 Integration */}
                <div className="pcb-card-box">
                  <h4 className="pcb-card-title">
                    <Cpu size={18} style={{ color: '#ff7628' }} />
                    7. ROS 2 Real-Time Integration Architecture
                  </h4>
                  <p className="pcb-card-desc">
                    RViz2 acts as the central visualization subscriber, establishing direct real-time communication across the industrial stack without intermediate file writing:
                  </p>

                  <ul className="pcb-rviz-integration-list">
                    <li>
                      <strong>Gazebo Simulation:</strong> Computes physics dynamics and transmits raw virtual camera sensor frames.
                    </li>
                    <li>
                      <strong>ROS 2 Camera Topics:</strong> <code>/pcb/camera/image</code> streams raw true-color frames at 10 FPS directly to nodes and RViz2.
                    </li>
                    <li>
                      <strong>YOLO Inference Node:</strong> Converts ROS image messages with CvBridge, runs localized inference, and publishes annotated overlays to <code>/pcb/detected_image</code>.
                    </li>
                    <li>
                      <strong>Inspection Controller:</strong> Orchestrates start/stop trigger events via <code>/pcb/inspection_trigger</code> and <code>/pcb/inspection_done</code>.
                    </li>
                    <li>
                      <strong>RViz2 Visualization:</strong> Aggregates live feeds, 3D conveyor transforms, sensor states, and bounding box overlays into a unified operator cockpit.
                    </li>
                  </ul>
                </div>

                {/* Capability 8: Industrial Monitoring Concept */}
                <div className="pcb-card-box">
                  <h4 className="pcb-card-title">
                    <Activity size={18} style={{ color: '#ff7628' }} />
                    8. Industrial Monitoring Concept
                  </h4>
                  <p className="pcb-card-desc">
                    In high-volume automated manufacturing, operators and test engineers require immediate optical and telemetry visibility into cell operations. RViz2 serves as the primary monitoring terminal observing:
                  </p>

                  <div className="pcb-rviz-aspects-grid">
                    {pcbCaseStudy.rvizVisualization.monitoringAspects.map((aspect, i) => (
                      <div key={i} className="pcb-rviz-aspect-card">
                        <span className="pcb-aspect-num">0{i + 1}</span>
                        <div>
                          <strong className="pcb-aspect-label">{aspect.label}</strong>
                          <span className="pcb-aspect-val">{aspect.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              TAB 05: WEB & MOBILE PLATFORM
              =================================================================== */}
          {activeTab === 'platform' && (
            <div className="pcb-tab-pane">
              <div className="pcb-two-col">
                <div className="pcb-card-box">
                  <h4 className="pcb-card-title">
                    <Smartphone size={18} style={{ color: '#ff7628' }} />
                    Shop-Floor Mobile PCB Inspection Interface
                  </h4>
                  <p className="pcb-card-desc">
                    Traditional AOI systems require bulky, costly industrial PCs next to every assembly station. This project features a <strong>fully responsive mobile web inspection interface</strong> accessible on standard smartphones and tablets:
                  </p>
                  <p className="pcb-card-desc">
                    An operator on the manufacturing line can open the web app, select their machine and camera ID, point the device camera at the PCB, capture a frame, and receive localized AI bounding boxes and quality decisions within seconds.
                  </p>

                  <div style={{ marginTop: '1rem', padding: '0.8rem', background: 'rgba(255, 118, 40, 0.08)', borderRadius: '8px', border: '1px solid rgba(255, 118, 40, 0.25)' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#ff8a4b', fontWeight: '700' }}>
                      MOBILE WORKFLOW SEQUENCE:
                    </span>
                    <div style={{ marginTop: '0.4rem', fontSize: '0.78rem', color: '#dfdbd6', lineHeight: 1.6 }}>
                      Open Web App → Select Station / Machine ID → Stream Live Camera Feed → Tap Capture PCB → Instant AI Inference → Review Bounding Box & Status
                    </div>
                  </div>
                </div>

                <div className="pcb-card-box">
                  <h4 className="pcb-card-title">
                    <Server size={18} style={{ color: '#ff7628' }} />
                    Python FastAPI Inspection Engine
                  </h4>
                  <p className="pcb-card-desc">
                    The backend is built with <strong>Python FastAPI</strong>, providing high-speed asynchronous REST endpoints and real-time WebSocket communication:
                  </p>
                  <ul style={{ paddingLeft: '1.2rem', color: '#c4bfb9', fontSize: '0.82rem', lineHeight: 1.8 }}>
                    <li><strong>Image Upload & Camera Intake:</strong> Receives multi-format image blobs (JPEG/PNG) from mobile and desktop.</li>
                    <li><strong>AI Inference Orchestrator:</strong> Feeds preprocessed frames directly into YOLOv8 <code>best.pt</code>.</li>
                    <li><strong>Result Serialization:</strong> Returns bounding box coordinates, defect counts, class labels, and quality status.</li>
                    <li><strong>Machine & Camera State:</strong> Monitors online/offline status across multi-bay inspection lines.</li>
                  </ul>
                </div>
              </div>

              {/* MongoDB Inspection Schema */}
              <div className="pcb-section-header">
                <div className="pcb-section-title-wrap">
                  <span className="pcb-section-num">04.1</span>
                  <h4 className="pcb-section-title">MongoDB Industrial Inspection Traceability</h4>
                </div>
              </div>

              <div className="pcb-card-box" style={{ marginBottom: '2rem' }}>
                <p className="pcb-card-desc">
                  Every inspection is permanently logged in MongoDB, establishing a tamper-proof audit trail for quality control and compliance:
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                  <div style={{ background: 'rgba(10, 9, 8, 0.7)', padding: '0.9rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#ff8a4b', fontWeight: '700', marginBottom: '0.4rem' }}>
                      INSPECTION DOCUMENT SCHEMA
                    </div>
                    <ul style={{ paddingLeft: '1rem', color: '#c4bfb9', fontSize: '0.75rem', lineHeight: 1.65 }}>
                      <li><code>inspection_id</code>: Unique numeric transaction ID</li>
                      <li><code>pcb_id</code>: Barcode / RFID tracking identifier</li>
                      <li><code>machine_id</code>: Origin inspection station ID</li>
                      <li><code>camera_id</code>: Optical sensor hardware ID</li>
                      <li><code>quality_status</code>: PASS / FAIL / REWORK / REVIEW</li>
                      <li><code>total_defects</code>: Integer defect count</li>
                    </ul>
                  </div>

                  <div style={{ background: 'rgba(10, 9, 8, 0.7)', padding: '0.9rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#ff8a4b', fontWeight: '700', marginBottom: '0.4rem' }}>
                      DEFECT ARRAYS & TELEMETRY
                    </div>
                    <ul style={{ paddingLeft: '1rem', color: '#c4bfb9', fontSize: '0.75rem', lineHeight: 1.65 }}>
                      <li><code>defects[].class</code>: Copper, Open, Short, etc.</li>
                      <li><code>defects[].confidence</code>: Float percentage (e.g. 77.24%)</li>
                      <li><code>defects[].bbox</code>: Spatial coordinates [x1, y1, x2, y2]</li>
                      <li><code>operator_id</code>: Active shift operator</li>
                      <li><code>batch_id</code>: Production lot identifier</li>
                      <li><code>timestamp</code>: ISO 8601 UTC timestamp</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Industrial Monitoring Dashboard */}
              <div className="pcb-section-header">
                <div className="pcb-section-title-wrap">
                  <span className="pcb-section-num">04.2</span>
                  <h4 className="pcb-section-title">Industrial Monitoring Dashboard</h4>
                </div>
              </div>

              <div className="pcb-two-col">
                <div className="pcb-card-box">
                  <h4 className="pcb-card-title">
                    <Activity size={18} style={{ color: '#ff7628' }} />
                    Manufacturing Intelligence & Telemetry
                  </h4>
                  <p className="pcb-card-desc">
                    Rather than stopping at simple image inference, the dashboard aggregates individual predictions into actionable manufacturing intelligence:
                  </p>
                  <ul style={{ paddingLeft: '1.2rem', color: '#c4bfb9', fontSize: '0.82rem', lineHeight: 1.8 }}>
                    <li><strong>Total Production Inspections:</strong> Real-time count of scanned boards.</li>
                    <li><strong>First-Pass Yield (FPY):</strong> Ratio of passed boards without rework.</li>
                    <li><strong>Defect Pareto Distribution:</strong> Pinpointing which defect category dominates.</li>
                    <li><strong>Machine & Camera Uptime:</strong> Real-time heartbeat of all line sensors.</li>
                  </ul>
                </div>

                <div className="pcb-card-box">
                  <h4 className="pcb-card-title">
                    <Factory size={18} style={{ color: '#ff7628' }} />
                    Multi-Machine & Multi-Camera Scalability
                  </h4>
                  <p className="pcb-card-desc">
                    The architecture decouples the AI inference service from the capture client. A single FastAPI cluster can ingest streams from multiple inspection machines, allowing factory-wide scaling across line A, B, and C with centralized MongoDB historical analytics.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              TAB 05: SPECS, ROADMAP & HIGHLIGHTS
              =================================================================== */}
          {activeTab === 'highlights' && (
            <div className="pcb-tab-pane">
              {/* 16 Key Highlights Grid */}
              <div className="pcb-section-header">
                <div className="pcb-section-title-wrap">
                  <span className="pcb-section-num">05.1</span>
                  <h4 className="pcb-section-title">Key Architectural Highlights</h4>
                </div>
              </div>

              <div className="pcb-highlights-grid">
                {pcbCaseStudy.keyHighlights.map((hl, i) => {
                  const IconComp = HIGHLIGHT_ICONS[hl.icon] || Sparkles;
                  return (
                    <div key={i} className="pcb-highlight-card">
                      <span className="pcb-highlight-icon">
                        <IconComp size={18} />
                      </span>
                      <span className="pcb-highlight-text">{hl.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Why This Project Is Different */}
              <div className="pcb-section-header">
                <div className="pcb-section-title-wrap">
                  <span className="pcb-section-num">05.2</span>
                  <h4 className="pcb-section-title">Why This Project Is Different</h4>
                </div>
              </div>

              <div className="pcb-card-box" style={{ marginBottom: '2rem' }}>
                <p className="pcb-card-desc" style={{ fontSize: '0.95rem', color: '#dfdbd6' }}>
                  This project goes far beyond a basic image classification or static YOLO demo. It establishes a complete, working Industry 4.0 inspection workflow bridging <strong>AI + Computer Vision + Web Application + Database + Mobile Inspection + ROS 2 + Gazebo Simulation</strong>.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.8rem', marginTop: '1rem' }}>
                  {pcbCaseStudy.advantages.map((adv, i) => (
                    <div key={i} className="pcb-spec-item">
                      <span className="pcb-spec-label">{adv.title}</span>
                      <span style={{ fontSize: '0.78rem', color: '#c4bfb9', lineHeight: 1.45 }}>{adv.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Challenges Solved */}
              <div className="pcb-section-header">
                <div className="pcb-section-title-wrap">
                  <span className="pcb-section-num">05.3</span>
                  <h4 className="pcb-section-title">Practical Engineering Challenges Solved</h4>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                {pcbCaseStudy.challengesSolved.map((cs, i) => (
                  <div key={i} className="pcb-card-box" style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.74rem', color: '#ff7628', fontWeight: '700', marginBottom: '0.35rem' }}>
                      CHALLENGE: {cs.challenge.toUpperCase()}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#cfc9c2', lineHeight: 1.55 }}>
                      <strong>Solution:</strong> {cs.solution}
                    </div>
                  </div>
                ))}
              </div>

              {/* Complete Categorized Tech Stack */}
              <div className="pcb-section-header">
                <div className="pcb-section-title-wrap">
                  <span className="pcb-section-num">05.4</span>
                  <h4 className="pcb-section-title">Complete Technology Matrix</h4>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {pcbCaseStudy.techStack.map((cat, i) => (
                  <div key={i} className="pcb-card-box">
                    <span style={{ fontFamily: 'monospace', fontSize: '0.74rem', color: '#ff8a4b', fontWeight: '700', display: 'block', marginBottom: '0.8rem' }}>
                      {cat.category}
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {cat.items.map((item, j) => (
                        <div key={j} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: '650', color: '#fff', display: 'block' }}>{item.name}</span>
                          <span style={{ fontSize: '0.72rem', color: '#8c867e' }}>{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Future Improvements Roadmap */}
              <div className="pcb-section-header">
                <div className="pcb-section-title-wrap">
                  <span className="pcb-section-num">05.5</span>
                  <h4 className="pcb-section-title">Future Smart Manufacturing Roadmap</h4>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                {pcbCaseStudy.futureImprovements.map((fi, i) => (
                  <div key={i} className="pcb-spec-item">
                    <span className="pcb-spec-label">{fi.area}</span>
                    <span style={{ fontSize: '0.78rem', color: '#dfdbd6', lineHeight: 1.4 }}>{fi.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================
              TAB 06: LIVE APPLICATION PORTAL
              =================================================================== */}
          {activeTab === 'live' && (
            <div className="pcb-tab-pane">
              <div className="pcb-live-portal-container">
                <div className="pcb-live-portal-hud">
                  <div className="pcb-portal-meta">
                    <span className="pcb-pulse-dot green" />
                    <span>PRODUCTION HOST:</span>
                    <a
                      href={PCB_APP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pcb-portal-url"
                    >
                      {PCB_APP_URL}
                    </a>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <button
                      type="button"
                      className="pcb-btn-secondary-sm"
                      onClick={handleCopyUrl}
                      title="Copy URL"
                    >
                      {copiedUrl ? <Check size={14} style={{ color: '#10b981' }} /> : <Copy size={14} />}
                      <span>{copiedUrl ? 'Copied!' : 'Copy URL'}</span>
                    </button>

                    <a
                      href={PCB_APP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pcb-btn-primary-sm"
                      title="Open application in new dedicated window"
                    >
                      <span>Open Standalone Tab</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                <div className="pcb-iframe-wrapper">
                  <iframe
                    src={PCB_APP_URL}
                    title="Live PCB Defect Detection Web Application"
                    className="pcb-live-iframe"
                    onError={() => setIframeError(true)}
                    allow="camera; microphone; display-capture"
                  />

                  {iframeError && (
                    <div className="pcb-iframe-fallback">
                      <Activity size={36} style={{ color: '#ff7628' }} />
                      <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Direct Production Access</h4>
                      <p style={{ maxWidth: '480px', color: '#a49f99', fontSize: '0.88rem' }}>
                        The remote production server at <code>{PCB_APP_URL}</code> restricts direct cross-origin iframe embedding via security policies. Launch the live application directly:
                      </p>
                      <a
                        href={PCB_APP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pcb-btn-primary-sm"
                        style={{ padding: '0.75rem 1.6rem', fontSize: '0.9rem' }}
                      >
                        <span>Launch PCB Detection Web App</span>
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  )}
                </div>

                <div className="pcb-card-box" style={{ marginTop: '0.8rem' }}>
                  <h4 className="pcb-card-title">
                    <Smartphone size={16} style={{ color: '#ff7628' }} />
                    Mobile Camera Test Instructions
                  </h4>
                  <p className="pcb-card-desc">
                    To test camera-based PCB defect detection in real time:
                  </p>
                  <ol style={{ paddingLeft: '1.2rem', color: '#c4bfb9', fontSize: '0.82rem', lineHeight: 1.8 }}>
                    <li>Open <code>{PCB_APP_URL}</code> on your smartphone or desktop browser.</li>
                    <li>Select the inspection camera station or permit browser camera access.</li>
                    <li>Point your camera at a printed circuit board or upload a circuit image sample.</li>
                    <li>Observe YOLOv8 real-time inference, bounding box overlay, and automated quality classification.</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="pcb-modal-footer">
          <div className="pcb-footer-stats">
            <span>MODEL: YOLOv8 (best.pt)</span>
            <span>•</span>
            <span>ROBOTICS: ROS 2 + GAZEBO</span>
            <span>•</span>
            <span>STATUS: ACTIVE PROTOTYPE</span>
          </div>

          <div className="pcb-footer-actions">
            <a
              href={PCB_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="pcb-btn-primary-sm"
            >
              <span>Explore Project</span>
              <ExternalLink size={14} />
            </a>

            <button
              type="button"
              className="pcb-btn-secondary-sm"
              onClick={onClose}
            >
              <span>Return to Portfolio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
};

export default PcbCaseStudyModal;
