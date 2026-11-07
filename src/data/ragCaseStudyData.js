// Document AI — Multi-Format RAG Platform Case Study Data
// High-performance Retrieval-Augmented Generation (RAG) platform

export const RAG_APP_URL = 
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_RAG_APP_URL) 
  || 'https://rag-frontend-omega-three.vercel.app/';

export const ragCaseStudy = {
  id: 'document-ai-rag',
  title: 'Document AI — Multi-Format RAG Platform with Real-Time Streaming',
  shortTitle: 'Document AI',
  category: 'Full-Stack AI / Enterprise RAG',
  tagline: 'Production-grade Document Q&A Assistant powered by Gemini Embeddings, FAISS, Groq LLMs, and Clerk Auth.',
  oneLinePitch: 'A full-stack, enterprise-ready Retrieval-Augmented Generation (RAG) platform that allows authenticated users to upload documents (PDF, DOCX, CSV, TXT, Markdown) and receive real-time, citation-backed answers streamed by high-speed LLMs.',
  status: 'Enterprise Production Ready // Multi-Tenant',
  liveUrl: RAG_APP_URL,

  // Key system badges
  specs: [
    { label: 'Embedding Model', value: 'Google Gemini Embedding-2' },
    { label: 'LLM Inference', value: 'Groq Cloud (qwen/qwen3.8-27b)' },
    { label: 'Vector Database', value: 'In-Memory FAISS (IndexFlatIP)' },
    { label: 'Authentication', value: 'Clerk JWT & Multi-Tenant Isolation' },
    { label: 'Streaming Protocol', value: 'Server-Sent Events (SSE)' },
    { label: 'Chunk Strategy', value: '900 Chars / 150 Overlap' },
    { label: 'Supported Formats', value: 'PDF, DOCX, CSV, TXT, Markdown' },
    { label: 'Chat Persistence', value: 'MongoDB Document Storage' },
  ],

  // 4 Core AI APIs & Models details
  aiEngines: [
    {
      name: 'Google Gemini Embedding API',
      model: 'gemini-embedding-2',
      endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:batchEmbedContents',
      role: 'Generates high-dimensional semantic vector embeddings for document text chunks and user search queries.',
      whyChosen: 'State-of-the-art semantic accuracy, multimodal and multilingual understanding, fast batch processing (processed in batches of 32 chunks), and direct REST API integration without heavy client SDKs.',
      mathTechnique: 'Embeddings are L2-normalized so that inner product calculations in FAISS represent exact cosine similarities with zero computational overhead.',
      batchSize: '32 Chunks / Request'
    },
    {
      name: 'Groq Cloud AI LPU™ Inference',
      model: 'qwen/qwen3.8-27b (supports llama-3.3-70b-versatile)',
      inferenceEngine: 'Groq LPU™ (Language Processing Unit)',
      role: 'Streams natural language responses back to the user in real-time using Server-Sent Events (SSE).',
      parameters: {
        temperature: '0.2 (Strictly controls hallucinations, enforcing factual fidelity to the documents)',
        max_tokens: '500 (Generates concise, focused answers)',
        stream: 'True (Real-time live token streaming)'
      },
      guardrails: [
        'Answer strictly and only using the provided document excerpts.',
        'Say "The answer was not found in the uploaded documents." if data is missing.',
        'Cite source filename and section/page without inventing facts or revealing internal chunk IDs.'
      ]
    }
  ],

  // Full Tech Stack Layers
  techStack: [
    {
      layer: 'Frontend UI',
      technology: 'React 18, Vite',
      purpose: 'Fast, responsive modern UI with real-time token rendering and smooth interactive states.'
    },
    {
      layer: 'Styling & UX',
      technology: 'Custom Modern CSS',
      purpose: 'Clean dark/modern aesthetic, drag-and-drop upload zone, citation pills, and streaming chat bubbles.'
    },
    {
      layer: 'Authentication',
      technology: 'Clerk (@clerk/react & clerk-backend-api)',
      purpose: 'Secure user authentication, JWT session verification, and multi-tenant user isolation.'
    },
    {
      layer: 'Backend API',
      technology: 'FastAPI (Python 3.12+), Uvicorn',
      purpose: 'High-performance asynchronous REST API and SSE streaming endpoints.'
    },
    {
      layer: 'AI LLM Inference',
      technology: 'Groq Cloud API (qwen/qwen3.8-27b)',
      purpose: 'High-speed LLM generation with streaming responses via Groq LPU™.'
    },
    {
      layer: 'Vector Embeddings',
      technology: 'Google Gemini API (gemini-embedding-2)',
      purpose: 'High-dimensional semantic text embeddings with task-oriented formatting.'
    },
    {
      layer: 'Vector Database',
      technology: 'FAISS (faiss-cpu)',
      purpose: 'In-memory IndexFlatIP vector index for sub-millisecond similarity search.'
    },
    {
      layer: 'Chunking & Parsing',
      technology: 'LangChain Text Splitters, PyPDF, python-docx',
      purpose: 'Document extraction and overlap-aware semantic chunking (900 size, 150 overlap).'
    },
    {
      layer: 'Persistent Storage',
      technology: 'MongoDB (pymongo)',
      purpose: 'Persistent chat history, document metadata, and session storage isolated by User ID.'
    },
    {
      layer: 'Alternative UI',
      technology: 'Streamlit',
      purpose: 'Built-in secondary interface for rapid testing and demonstrations.'
    }
  ],

  // End-to-End Workflow Stages
  workflowStages: [
    {
      number: '01',
      title: 'Ingestion & Multi-Format Parsing',
      desc: 'Users drag and drop files (.pdf, .docx, .txt, .md, .csv). The backend extracts text along with structural coordinates (e.g. Page 1, Document, Rows 1-500 for tabular data). RecursiveCharacterTextSplitter segments text into chunks of 900 characters with a 150-character overlap to prevent context loss across boundaries.',
      icon: 'UploadCloud',
      metric: '900 Chars / 150 Overlap'
    },
    {
      number: '02',
      title: 'Embedding & Vector Indexing',
      desc: 'Chunks are formatted with provenance metadata (title: <doc> - <page> | text: <content>). Batches of 32 chunks are sent to Google Gemini Embedding API. Returned vectors are L2-normalized and added to a per-user, thread-safe FAISS vector index (IndexFlatIP).',
      icon: 'Cpu',
      metric: 'L2 Normalized FAISS Index'
    },
    {
      number: '03',
      title: 'Retrieval & Context Grounding',
      desc: 'When a question arrives, it is embedded using task-oriented formatting (task: question answering | query: ...). FAISS performs inner-product similarity search to retrieve the Top-K (default 3) most relevant excerpts in sub-millisecond time.',
      icon: 'Search',
      metric: 'Top-K Sub-Millisecond Search'
    },
    {
      number: '04',
      title: 'Streaming Response & Citations',
      desc: 'The retrieved excerpts are packed into a prompt sent to Groq. Answer tokens stream live to the browser via Server-Sent Events (SSE). When generation finishes, the complete exchange and source citations (file.pdf (Page 2)) are persisted to MongoDB under the authenticated Clerk user ID.',
      icon: 'Zap',
      metric: 'Real-Time SSE Streaming'
    }
  ],

  // Key Highlights
  highlights: [
    { title: 'Multi-Format Ingestion', desc: 'Page-aware PDF, table-aware Word DOCX, batch-aware CSV, Markdown, and TXT.' },
    { title: 'Strict Multi-Tenancy', desc: 'Clerk JWT auth isolates per-user vector spaces and MongoDB chat histories.' },
    { title: 'Sub-Second Time-to-First-Token', desc: 'Groq LPU hardware acceleration delivers instantaneous streaming answers.' },
    { title: 'Verified Citation Bubbles', desc: 'Every answer references exact source files and page/section numbers with zero hallucinated IDs.' },
    { title: 'L2 Normalized Cosine Metric', desc: 'FAISS IndexFlatIP matches cosine similarity with raw inner product speed.' },
    { title: 'Hallucination Guardrails', desc: 'Temperature 0.2 and strict negative-prompt constraints safeguard factual accuracy.' },
    { title: 'MongoDB Chat Audit', desc: 'Complete query-response exchanges with source metadata persisted per user ID.' },
    { title: 'Dual UI Interfaces', desc: 'Primary reactive React 18 client and built-in Streamlit developer demo portal.' }
  ],

  // Resume Bullet Points
  resumeBullets: [
    'Designed and built a full-stack Retrieval-Augmented Generation (RAG) platform using FastAPI, React, FAISS, and Groq, enabling instant, hallucination-resistant document Q&A.',
    'Engineered an end-to-end vector pipeline utilizing Google Gemini embeddings and FAISS in-memory indexing, achieving sub-millisecond document retrieval over multi-page PDFs, Word docs, and CSV tables.',
    'Implemented real-time token streaming via Server-Sent Events (SSE) paired with Groq inference (qwen/qwen3.8-27b), cutting response latency by >70% compared to standard REST polling.',
    'Architected secure multi-tenant user isolation by integrating Clerk JWT authentication and MongoDB, ensuring strict session-level document privacy and full chat history persistence.'
  ],

  // Sample Interactive Document QA Session
  sampleQnA: {
    documentName: 'Q3_Financial_Performance.pdf',
    page: 2,
    fileType: 'PDF',
    query: 'What was the enterprise revenue growth and what drove it?',
    streamingAnswer: 'According to Q3_Financial_Performance.pdf (Page 2), enterprise revenue grew 24.8% year-over-year. The primary drivers were increased adoption of automated optical inspection systems and expansion in AI-driven smart manufacturing contracts.',
    sources: [
      { file: 'Q3_Financial_Performance.pdf', page: 'Page 2', similarity: '0.894', excerpt: 'Enterprise revenue reached $48.2M, reflecting a 24.8% YoY expansion primarily catalyzed by smart manufacturing automation...' },
      { file: 'Q3_Financial_Performance.pdf', page: 'Page 4', similarity: '0.812', excerpt: 'Operational margins improved 340 bps driven by supply chain efficiency and automated quality assurance deployments...' }
    ]
  }
};

