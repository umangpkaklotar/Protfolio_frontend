import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  ExternalLink,
  Bot,
  Database,
  Cpu,
  Zap,
  CheckCircle2,
  FileText,
  Lock,
  Layers,
  Terminal,
  Check,
  ShieldCheck,
  FileCheck,
  Sparkles
} from 'lucide-react';
import { ragCaseStudy, RAG_APP_URL } from '../data/ragCaseStudyData';
import './RagCaseStudyModal.css';

const RagCaseStudyModal = ({ isOpen, onClose, initialTab = 'architecture' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simText, setSimText] = useState(ragCaseStudy.sampleQnA.streamingAnswer);
  const simQuestion = ragCaseStudy.sampleQnA.query;

  const modalRef = useRef(null);
  const modalBodyRef = useRef(null);

  // Lock body scroll and pause Lenis if modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('has-rag-modal-open');
      document.body.style.overflow = 'hidden';
      if (window.__lenis) {
        window.__lenis.stop();
      }
    } else {
      document.body.classList.remove('has-rag-modal-open');
      document.body.style.overflow = '';
      if (window.__lenis) {
        window.__lenis.start();
      }
    }

    return () => {
      document.body.classList.remove('has-rag-modal-open');
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

  // Simulated live token streaming demonstration
  const runLiveSimulation = () => {
    setIsSimulating(true);
    setSimText('');
    const fullText = ragCaseStudy.sampleQnA.streamingAnswer;
    let idx = 0;
    const timer = setInterval(() => {
      if (idx < fullText.length) {
        const nextChars = fullText.slice(0, idx + 4);
        setSimText(nextChars);
        idx += 4;
      } else {
        setSimText(fullText);
        setIsSimulating(false);
        clearInterval(timer);
      }
    }, 28);
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="rag-modal-backdrop"
      data-lenis-prevent="true"
      role="dialog"
      aria-modal="true"
      aria-label="Document AI Enterprise RAG Platform Case Study"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="rag-modal-window" 
        data-lenis-prevent="true" 
        ref={modalRef}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <div className="rag-modal-ambient-glow" aria-hidden="true" />
        <div className="rag-modal-ambient-glow-2" aria-hidden="true" />

        {/* HUD Top Header */}
        <div className="rag-modal-header">
          <div className="rag-modal-header-left">
            <span className="rag-system-badge">
              <span className="rag-pulse-dot green" />
              SYS_ID: RAG-GEMINI-GROQ-FAISS
            </span>
            <div className="rag-header-title-wrap">
              <h2 className="rag-header-title">{ragCaseStudy.title}</h2>
              <span className="rag-header-subtitle">
                Gemini Embedding-2 • Groq LPU™ (qwen3.8-27b) • FAISS IndexFlatIP • FastAPI • Clerk JWT • MongoDB
              </span>
            </div>
          </div>

          <div className="rag-modal-header-actions">
            {RAG_APP_URL && RAG_APP_URL !== '#' && (
              <a
                href={RAG_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rag-btn-primary-sm"
                title="Launch live Document AI application"
              >
                <span>Live App</span>
                <ExternalLink size={14} />
              </a>
            )}

            <button
              type="button"
              className="rag-modal-close-btn"
              onClick={onClose}
              aria-label="Close Case Study"
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="rag-modal-nav">
          <button
            type="button"
            className={`rag-nav-tab ${activeTab === 'architecture' ? 'active' : ''}`}
            onClick={() => setActiveTab('architecture')}
          >
            <span className="rag-nav-tab-badge">01</span>
            <span>Architecture & Pipelines</span>
          </button>

          <button
            type="button"
            className={`rag-nav-tab ${activeTab === 'ai-models' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai-models')}
          >
            <span className="rag-nav-tab-badge">02</span>
            <span>AI APIs & Guardrails</span>
          </button>

          <button
            type="button"
            className={`rag-nav-tab ${activeTab === 'ingestion' ? 'active' : ''}`}
            onClick={() => setActiveTab('ingestion')}
          >
            <span className="rag-nav-tab-badge">03</span>
            <span>Ingestion & FAISS Vector Index</span>
          </button>

          <button
            type="button"
            className={`rag-nav-tab ${activeTab === 'auth' ? 'active' : ''}`}
            onClick={() => setActiveTab('auth')}
          >
            <span className="rag-nav-tab-badge">04</span>
            <span>Clerk Auth & Multi-Tenancy</span>
          </button>

          <button
            type="button"
            className={`rag-nav-tab ${activeTab === 'tech-resume' ? 'active' : ''}`}
            onClick={() => setActiveTab('tech-resume')}
          >
            <span className="rag-nav-tab-badge">05</span>
            <span>Tech Matrix & Resume</span>
          </button>

          <button
            type="button"
            className={`rag-nav-tab ${activeTab === 'simulator' ? 'active' : ''}`}
            onClick={() => setActiveTab('simulator')}
          >
            <span className="rag-nav-tab-badge">06</span>
            <span>Live Interactive Simulator</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div 
          className="rag-modal-body" 
          ref={modalBodyRef}
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Executive Summary Hero */}
          <div className="rag-summary-hero">
            <h3 className="rag-summary-title">
              Full-Stack Enterprise Document RAG Platform
            </h3>
            <p className="rag-summary-text">
              {ragCaseStudy.oneLinePitch}
            </p>

            <div className="rag-specs-grid">
              {ragCaseStudy.specs.map((spec, i) => (
                <div key={i} className="rag-spec-item">
                  <span className="rag-spec-label">{spec.label}</span>
                  <span className="rag-spec-val">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ===================================================================
              TAB 01: ARCHITECTURE & PIPELINES
              =================================================================== */}
          {activeTab === 'architecture' && (
            <div className="rag-tab-pane">
              <div className="rag-section-header">
                <div className="rag-section-title-wrap">
                  <span className="rag-section-num">01.1</span>
                  <h4 className="rag-section-title">End-to-End System Architecture Topology</h4>
                </div>
              </div>

              {/* Architecture Diagram matching uploaded flowchart */}
              <pre className="rag-ascii-block">{`┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLIENT (React 18 + Vite)                          │
│   ┌───────────────────────────┐             ┌───────────────────────────┐   │
│   │   User Uploads Documents  │             │     User Asks Question    │   │
│   └─────────────┬─────────────┘             └─────────────┬─────────────┘   │
│                 │                                         │                 │
│   ┌─────────────▼─────────────┐             ┌─────────────▼─────────────┐   │
│   │   Clerk JWT Authentication│             │  Live Stream UI Receiver  │   │
│   └─────────────┬─────────────┘             │       (SSE Client)        │   │
└─────────────────┼─────────────────────────────────────────▲─────────────────┘
                  │                                         │ Tokens via SSE
                  │ Multi-Tenant User ID                    │
┌─────────────────▼─────────────────────────────────────────┴─────────────────┐
│                              FASTAPI BACKEND                                │
│                                                                             │
│  [DOCUMENT INGESTION PIPELINE]              [RETRIEVAL & GENERATION PIPELINE]│
│  ┌──────────────────────────┐               ┌──────────────────────────┐    │
│  │ File Parsing & Clean     │               │  FastAPI /api/ask Query  │    │
│  │ (pypdf, docx, csv, txt)  │               └─────────────┬────────────┘    │
│  └──────────────┬───────────┘                             │                 │
│                 │                               ┌─────────▼────────────┐    │
│  ┌──────────────▼───────────┐                   │ Query Vector Embed   │    │
│  │ LangChain Text Splitter  │                   │ (Google Gemini-2)    │    │
│  │ (Chunk: 900, Overlap:150)│                   └─────────┬────────────┘    │
│  └──────────────┬───────────┘                             │                 │
│                 │                               ┌─────────▼────────────┐    │
│  ┌──────────────▼───────────┐                   │ FAISS Cosine Search  │    │
│  │ Gemini Embedding API-2   │                   │ (Top-K = 3 Excerpts) │    │
│  │ (Batches of 32 Chunks)   │                   └─────────┬────────────┘    │
│  └──────────────┬───────────┘                             │                 │
│                 │ L2 Normalized                           │ Grounded Prompt │
│  ┌──────────────▼───────────┐                   ┌─────────▼────────────┐    │
│  │ User-Isolated FAISS Index│◄──────────────────┤ Prompt Assembly with │    │
│  │ (IndexFlatIP in Memory)  │   Top-K Match     │ Excerpts & Citations │    │
│  └──────────────────────────┘                   └─────────┬────────────┘    │
│                                                           │                 │
│                                                 ┌─────────▼────────────┐    │
│                                                 │ Groq Cloud LPU™      │    │
│                                                 │ qwen/qwen3.8-27b     │    │
│                                                 └─────────┬────────────┘    │
│                                                           │                 │
│                                                 ┌─────────▼────────────┐    │
│                                                 │ Persist Conversation │    │
│                                                 │ & Citations to Mongo │    │
│                                                 └─────────┬────────────┘    │
└───────────────────────────────────────────────────────────┼─────────────────┘
                                                            │
┌───────────────────────────────────────────────────────────▼─────────────────┐
│                        PERSISTENT DATABASE (MongoDB)                        │
│            Conversations, Messages, Provenance Sources & User Audits        │
└─────────────────────────────────────────────────────────────────────────────┘`}</pre>

              {/* 4 End-to-End Workflow Stages */}
              <div className="rag-section-header">
                <div className="rag-section-title-wrap">
                  <span className="rag-section-num">01.2</span>
                  <h4 className="rag-section-title">The 4 Sequential Execution Phases</h4>
                </div>
              </div>

              <div className="rag-two-col">
                {ragCaseStudy.workflowStages.map((stg, i) => (
                  <div key={i} className="rag-card-box">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                      <span className="rag-section-num">PHASE {stg.number}</span>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                        {stg.metric}
                      </span>
                    </div>
                    <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: '#fff', marginBottom: '0.6rem' }}>
                      {stg.title}
                    </h5>
                    <p className="rag-card-desc" style={{ marginBottom: 0 }}>
                      {stg.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================
              TAB 02: AI APIS & GUARDRAILS
              =================================================================== */}
          {activeTab === 'ai-models' && (
            <div className="rag-tab-pane">
              <div className="rag-two-col">
                {/* 1. Google Gemini Embedding API */}
                <div className="rag-card-box">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
                    <Cpu size={20} style={{ color: '#ff7628' }} />
                    <h4 className="rag-card-title" style={{ margin: 0 }}>
                      Google Gemini Embedding API-2
                    </h4>
                  </div>
                  <div style={{ padding: '0.6rem 0.8rem', background: 'rgba(0,0,0,0.5)', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.72rem', color: '#93c5fd', marginBottom: '1rem', wordBreak: 'break-all' }}>
                    Endpoint: {ragCaseStudy.aiEngines[0].endpoint}
                  </div>

                  <p className="rag-card-desc">
                    <strong>Role:</strong> {ragCaseStudy.aiEngines[0].role}
                  </p>
                  <p className="rag-card-desc">
                    <strong>Why Chosen:</strong> {ragCaseStudy.aiEngines[0].whyChosen}
                  </p>

                  <div style={{ padding: '0.8rem', background: 'rgba(255, 118, 40, 0.08)', borderRadius: '8px', border: '1px solid rgba(255, 118, 40, 0.25)', marginTop: '1rem' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#ff8a4b', fontWeight: '700' }}>
                      MATHEMATICAL VECTOR TECHNIQUE:
                    </span>
                    <p style={{ margin: '0.3rem 0 0', fontSize: '0.78rem', color: '#dfdbd6', lineHeight: 1.55 }}>
                      {ragCaseStudy.aiEngines[0].mathTechnique}
                    </p>
                  </div>
                </div>

                {/* 2. Groq Cloud AI LPU */}
                <div className="rag-card-box">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
                    <Zap size={20} style={{ color: '#ff7628' }} />
                    <h4 className="rag-card-title" style={{ margin: 0 }}>
                      Groq Cloud AI LPU™ Inference
                    </h4>
                  </div>
                  <div style={{ padding: '0.6rem 0.8rem', background: 'rgba(0,0,0,0.5)', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.74rem', color: '#34d399', marginBottom: '1rem' }}>
                    Model: qwen/qwen3.8-27b (supports llama-3.3-70b-versatile)
                  </div>

                  <p className="rag-card-desc">
                    <strong>Engine:</strong> Groq Language Processing Unit (LPU™) engineered specifically for deterministic, ultra-low latency token generation.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                    <div className="rag-spec-item">
                      <span className="rag-spec-label">Temperature: 0.2</span>
                      <span style={{ fontSize: '0.75rem', color: '#cfc9c2' }}>Strictly controls hallucinations, enforcing absolute factual fidelity to excerpts.</span>
                    </div>
                    <div className="rag-spec-item">
                      <span className="rag-spec-label">Max Tokens: 500</span>
                      <span style={{ fontSize: '0.75rem', color: '#cfc9c2' }}>Guarantees concise, focused, production-grade summaries.</span>
                    </div>
                    <div className="rag-spec-item">
                      <span className="rag-spec-label">Streaming: True (SSE)</span>
                      <span style={{ fontSize: '0.75rem', color: '#cfc9c2' }}>Tokens stream live into React components via Server-Sent Events.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prompt Engineering Guardrails */}
              <div className="rag-section-header">
                <div className="rag-section-title-wrap">
                  <span className="rag-section-num">02.1</span>
                  <h4 className="rag-section-title">Prompt Engineering Guardrails & Anti-Hallucination Matrix</h4>
                </div>
              </div>

              <div className="rag-card-box">
                <p className="rag-card-desc">
                  To prevent fabricated citations or confident AI hallucinations, the assembly layer enforces strict negative-prompt constraints:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
                  {ragCaseStudy.aiEngines[1].guardrails.map((rule, idx) => (
                    <div key={idx} style={{ padding: '0.85rem', background: 'rgba(10, 9, 10, 0.7)', borderRadius: '8px', border: '1px solid rgba(255, 118, 40, 0.25)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                        <ShieldCheck size={14} style={{ color: '#10b981' }} />
                        <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#ff9d63', fontWeight: '700' }}>
                          GUARDRAIL 0{idx + 1}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: '#dfdbd6', lineHeight: 1.5 }}>
                        {rule}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              TAB 03: INGESTION & VECTOR INDEX
              =================================================================== */}
          {activeTab === 'ingestion' && (
            <div className="rag-tab-pane">
              <div className="rag-two-col">
                <div className="rag-card-box">
                  <h4 className="rag-card-title">
                    <FileText size={18} style={{ color: '#ff7628' }} />
                    Multi-Format Parsing Architecture
                  </h4>
                  <p className="rag-card-desc">
                    The ingestion service handles complex industrial documents with structural layout awareness:
                  </p>
                  <ul style={{ paddingLeft: '1.2rem', color: '#c4bfb9', fontSize: '0.82rem', lineHeight: 1.8 }}>
                    <li><strong>PDF Documents (PyPDF):</strong> Page-by-page coordinate extraction preserving page provenance.</li>
                    <li><strong>Word Documents (python-docx):</strong> Paragraph, header, and structured table cell parsing.</li>
                    <li><strong>Tabular CSV Files:</strong> Batch-aware serialization preserving header-row semantic context.</li>
                    <li><strong>Markdown & Plain Text:</strong> Structural heading hierarchy and code block integrity.</li>
                  </ul>
                </div>

                <div className="rag-card-box">
                  <h4 className="rag-card-title">
                    <Layers size={18} style={{ color: '#ff7628' }} />
                    Overlap-Aware Chunking Strategy
                  </h4>
                  <p className="rag-card-desc">
                    Utilizing LangChain's <code>RecursiveCharacterTextSplitter</code>, documents are split into:
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', marginBottom: '1rem' }}>
                    <div className="rag-spec-item">
                      <span className="rag-spec-label">Chunk Size</span>
                      <span className="rag-spec-val">900 Characters</span>
                    </div>
                    <div className="rag-spec-item">
                      <span className="rag-spec-label">Chunk Overlap</span>
                      <span className="rag-spec-val">150 Characters</span>
                    </div>
                  </div>
                  <p className="rag-card-desc">
                    The 150-character sliding overlap guarantees that contextual continuity, multi-sentence references, and numerical facts are never severed between chunk boundaries.
                  </p>
                </div>
              </div>

              {/* FAISS Vector Indexing */}
              <div className="rag-section-header">
                <div className="rag-section-title-wrap">
                  <span className="rag-section-num">03.1</span>
                  <h4 className="rag-section-title">In-Memory FAISS (IndexFlatIP) Vector Store</h4>
                </div>
              </div>

              <div className="rag-card-box">
                <p className="rag-card-desc">
                  Because embeddings from Google Gemini-2 are L2-normalized upon ingestion, the inner product equation represents exact Cosine Similarity:
                </p>
                <div style={{ padding: '0.85rem 1.1rem', background: 'rgba(0,0,0,0.6)', borderRadius: '8px', border: '1px solid rgba(255, 118, 40, 0.25)', fontFamily: 'monospace', fontSize: '0.78rem', color: '#ffb084', lineHeight: 1.6, marginBottom: '1rem' }}>
                  CosineSimilarity(A, B) = A • B / (||A|| * ||B||) = A • B  (when ||A|| = ||B|| = 1.0)
                </div>
                <p className="rag-card-desc" style={{ marginBottom: 0 }}>
                  This mathematical trick allows FAISS <code>IndexFlatIP</code> to run pure dot products with hardware SIMD acceleration, returning Top-3 context chunks in sub-millisecond latency.
                </p>
              </div>
            </div>
          )}

          {/* ===================================================================
              TAB 04: CLERK AUTH & MULTI-TENANCY
              =================================================================== */}
          {activeTab === 'auth' && (
            <div className="rag-tab-pane">
              <div className="rag-two-col">
                <div className="rag-card-box">
                  <h4 className="rag-card-title">
                    <Lock size={18} style={{ color: '#ff7628' }} />
                    Clerk JWT Multi-Tenant Isolation
                  </h4>
                  <p className="rag-card-desc">
                    Enterprise document security is paramount. The platform leverages <strong>Clerk Authentication</strong> with asymmetric JWT verification:
                  </p>
                  <ul style={{ paddingLeft: '1.2rem', color: '#c4bfb9', fontSize: '0.82rem', lineHeight: 1.8 }}>
                    <li><strong>Per-Request JWT Verification:</strong> FastAPI middleware extracts and verifies session tokens via <code>clerk-backend-api</code>.</li>
                    <li><strong>Isolated Vector Namespaces:</strong> FAISS index instances and document chunk tables are segregated per authenticated User ID.</li>
                    <li><strong>Zero Cross-Tenant Leakage:</strong> User A can never retrieve, search, or view embeddings belonging to User B.</li>
                  </ul>
                </div>

                <div className="rag-card-box">
                  <h4 className="rag-card-title">
                    <Database size={18} style={{ color: '#ff7628' }} />
                    MongoDB Session & Audit Persistence
                  </h4>
                  <p className="rag-card-desc">
                    All document interactions are permanently audited and tracked in MongoDB:
                  </p>
                  <ul style={{ paddingLeft: '1.2rem', color: '#c4bfb9', fontSize: '0.82rem', lineHeight: 1.8 }}>
                    <li><strong>User-Isolated Chat Threads:</strong> Historical conversations partitioned by <code>user_id</code> and <code>session_id</code>.</li>
                    <li><strong>Citation Grounding Logs:</strong> Storing exact document names, page indices, and similarity distances with every assistant response.</li>
                    <li><strong>Latency Telemetry:</strong> Recording time-to-first-token and total generation duration.</li>
                  </ul>
                </div>
              </div>

              <div className="rag-card-box">
                <h4 className="rag-card-title">
                  <Terminal size={18} style={{ color: '#ff7628' }} />
                  FastAPI Asynchronous Streaming Endpoint
                </h4>
                <div style={{ padding: '0.85rem', background: 'rgba(0,0,0,0.6)', borderRadius: '8px', border: '1px solid rgba(255, 118, 40, 0.2)' }}>
                  <code style={{ fontFamily: 'monospace', fontSize: '0.74rem', color: '#ffb084', lineHeight: 1.6, display: 'block' }}>
                    {`@router.post("/api/ask")
async def ask_question(request: QueryRequest, user = Depends(get_current_clerk_user)):
    # 1. Embed user query via Google Gemini-2
    query_vector = await embed_query(request.query)
    # 2. Retrieve Top-3 relevant excerpts from user's isolated FAISS index
    excerpts = faiss_store[user.id].search(query_vector, top_k=3)
    # 3. Stream Groq LPU LLM response via Server-Sent Events (SSE)
    return StreamingResponse(stream_groq_answer(request.query, excerpts, user.id), media_type="text/event-stream")`}
                  </code>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              TAB 05: TECH MATRIX & RESUME
              =================================================================== */}
          {activeTab === 'tech-resume' && (
            <div className="rag-tab-pane">
              {/* Resume Bullet Points */}
              <div className="rag-section-header">
                <div className="rag-section-title-wrap">
                  <span className="rag-section-num">05.1</span>
                  <h4 className="rag-section-title">Resume / CV Technical Highlights</h4>
                </div>
              </div>

              <div className="rag-card-box" style={{ marginBottom: '2rem' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.74rem', color: '#ff8a4b', fontWeight: '700', display: 'block', marginBottom: '0.8rem' }}>
                  ROLE: FULL-STACK AI ENGINEER / SOFTWARE ENGINEER
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  {ragCaseStudy.resumeBullets.map((bullet, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                      <CheckCircle2 size={15} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.84rem', color: '#dfdbd6', lineHeight: 1.55 }}>
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete Tech Stack Table */}
              <div className="rag-section-header">
                <div className="rag-section-title-wrap">
                  <span className="rag-section-num">05.2</span>
                  <h4 className="rag-section-title">Complete Technology Matrix</h4>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {ragCaseStudy.techStack.map((item, idx) => (
                  <div key={idx} className="rag-card-box" style={{ padding: '1rem' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#ff8a4b', fontWeight: '700', display: 'block', marginBottom: '0.25rem' }}>
                      {item.layer}
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#fff', display: 'block', marginBottom: '0.35rem' }}>
                      {item.technology}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#8c867e', lineHeight: 1.45 }}>
                      {item.purpose}
                    </span>
                  </div>
                ))}
              </div>

              {/* Key Platform Highlights */}
              <div className="rag-section-header">
                <div className="rag-section-title-wrap">
                  <span className="rag-section-num">05.3</span>
                  <h4 className="rag-section-title">Key Architectural Highlights</h4>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.8rem' }}>
                {ragCaseStudy.highlights.map((hl, idx) => (
                  <div key={idx} className="rag-spec-item">
                    <span className="rag-spec-label">{hl.title}</span>
                    <span style={{ fontSize: '0.78rem', color: '#c4bfb9', lineHeight: 1.45 }}>{hl.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================
              TAB 06: LIVE INTERACTIVE SIMULATOR
              =================================================================== */}
          {activeTab === 'simulator' && (
            <div className="rag-tab-pane">
              {/* Production Live Host Banner */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(255, 118, 40, 0.08)', border: '1px solid rgba(255, 118, 40, 0.25)', borderRadius: '10px', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'monospace', fontSize: '0.75rem', color: '#c4bfb9' }}>
                  <span className="rag-pulse-dot green" />
                  <span>PRODUCTION HOST:</span>
                  <a href={RAG_APP_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#ff8a4b', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                    {RAG_APP_URL}
                  </a>
                </div>
                <a href={RAG_APP_URL} target="_blank" rel="noopener noreferrer" className="rag-btn-primary-sm" style={{ padding: '0.4rem 0.85rem', fontSize: '0.74rem' }}>
                  <span>Launch Live Vercel App</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <div className="rag-chat-sim-card">
                <div className="rag-sim-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span className="rag-pulse-dot green" />
                    <span>RAG RUNTIME // GROQ LPU + GEMINI-2 + FAISS</span>
                  </div>
                  <span className="rag-doc-badge-pill">
                    <FileCheck size={12} />
                    {ragCaseStudy.sampleQnA.documentName}
                  </span>
                </div>

                {/* User Query Bubble */}
                <div className="rag-bubble-user">
                  <div className="rag-user-msg">
                    <span style={{ fontSize: '0.7rem', color: '#ffb084', fontFamily: 'monospace', display: 'block', marginBottom: '0.2rem' }}>
                      AUTHENTICATED USER QUERY:
                    </span>
                    {simQuestion}
                  </div>
                </div>

                {/* AI Assistant Streaming Response */}
                <div className="rag-bubble-ai">
                  <div className="rag-ai-msg">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem', color: '#ff8a4b', fontFamily: 'monospace', fontSize: '0.72rem' }}>
                      <Bot size={13} />
                      <span>DOCUMENT AI (qwen/qwen3.8-27b on Groq LPU™):</span>
                    </div>
                    <span>{simText}</span>
                    {isSimulating && <span className="rag-typing-cursor" />}

                    {/* Source Citations */}
                    <div className="rag-citation-box">
                      <span style={{ fontFamily: 'monospace', fontSize: '0.68rem', color: '#8c867e' }}>
                        VERIFIED SOURCES:
                      </span>
                      {ragCaseStudy.sampleQnA.sources.map((src, idx) => (
                        <span key={idx} className="rag-citation-pill">
                          <Check size={11} />
                          {src.file} ({src.page}) • Cosine: {src.similarity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Interactive Controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', flexWrap: 'wrap', gap: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'monospace', fontSize: '0.72rem', color: '#8c867e' }}>
                    <span>LATENCY: &lt;450ms TTFT</span>
                    <span>•</span>
                    <span>TEMPERATURE: 0.2</span>
                    <span>•</span>
                    <span>TOP-K: 3</span>
                  </div>

                  <button
                    type="button"
                    className="rag-btn-primary-sm"
                    onClick={runLiveSimulation}
                    disabled={isSimulating}
                  >
                    <Sparkles size={13} />
                    <span>{isSimulating ? 'Streaming Tokens...' : 'Replay Live Token Streaming'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="rag-modal-footer">
          <div className="rag-footer-stats">
            <span>LLM: GROQ qwen3.8-27b</span>
            <span>•</span>
            <span>EMBEDDING: GEMINI-2</span>
            <span>•</span>
            <span>VECTOR DB: FAISS</span>
            <span>•</span>
            <span>AUTH: CLERK JWT</span>
          </div>

          <div className="rag-footer-actions">
            {RAG_APP_URL && RAG_APP_URL !== '#' ? (
              <a
                href={RAG_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rag-btn-primary-sm"
              >
                <span>Explore Project</span>
                <ExternalLink size={14} />
              </a>
            ) : (
              <button
                type="button"
                className="rag-btn-primary-sm"
                onClick={() => setActiveTab('simulator')}
              >
                <span>Interactive Demo</span>
                <Sparkles size={14} />
              </button>
            )}

            <button
              type="button"
              className="rag-btn-secondary-sm"
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

export default RagCaseStudyModal;
