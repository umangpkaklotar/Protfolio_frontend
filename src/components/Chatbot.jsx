import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  RotateCcw,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import './Chatbot.css';

// Quick suggested questions
const SUGGESTED_QUESTIONS = [
  "What are Umang's core skills?",
  "Tell me about the PCB Defect AI project",
  "How does the Document AI RAG platform work?",
  "What work experience does Umang have?",
  "What is Umang's education background?",
  "How can I contact Umang for a project?",
];

const INITIAL_MESSAGE = {
  id: 'msg-welcome',
  role: 'assistant',
  text: "Hello! I am **Umang AI**, Umang P. Kaklotar's AI Portfolio Assistant. I have direct access to his verified project documentation, technical skills, and experience records.\n\nAsk me anything about his work in **Computer Vision (YOLOv8, AOI)**, **Industrial Robotics (ROS 2, Gazebo)**, **Enterprise RAG**, or frontend engineering!",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

// Formats basic markdown elements: bold, code, bullets, links
const formatMessageText = (text) => {
  if (!text) return null;

  // Split into lines
  const lines = text.split('\n');

  return lines.map((line, lIdx) => {
    // Bullet lines starting with '- ' or '* '
    const isBullet = /^[\s]*[-*]\s+/.test(line);
    const cleanLine = isBullet ? line.replace(/^[\s]*[-*]\s+/, '') : line;

    // Process inline markdown: **bold**, `code`, [link](url)
    const tokens = [];
    let remaining = cleanLine;
    let keyCounter = 0;

    // Regex for bold **...**, inline code `...`, and markdown links [text](url)
    const inlineRegex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/;

    while (remaining) {
      const match = remaining.match(inlineRegex);
      if (!match) {
        tokens.push(remaining);
        break;
      }

      const matchIndex = match.index;
      if (matchIndex > 0) {
        tokens.push(remaining.substring(0, matchIndex));
      }

      const matchedStr = match[0];
      if (matchedStr.startsWith('**') && matchedStr.endsWith('**')) {
        tokens.push(
          <strong key={`b-${lIdx}-${keyCounter++}`}>
            {matchedStr.slice(2, -2)}
          </strong>
        );
      } else if (matchedStr.startsWith('`') && matchedStr.endsWith('`')) {
        tokens.push(
          <code key={`c-${lIdx}-${keyCounter++}`} className="chat-inline-code">
            {matchedStr.slice(1, -1)}
          </code>
        );
      } else if (matchedStr.startsWith('[') && matchedStr.includes('](')) {
        const titleMatch = matchedStr.match(/\[([^\]]+)\]/);
        const urlMatch = matchedStr.match(/\(([^)]+)\)/);
        if (titleMatch && urlMatch) {
          tokens.push(
            <a
              key={`a-${lIdx}-${keyCounter++}`}
              href={urlMatch[1]}
              target="_blank"
              rel="noopener noreferrer"
              className="chat-link"
            >
              {titleMatch[1]} <ExternalLink size={10} style={{ display: 'inline' }} />
            </a>
          );
        } else {
          tokens.push(matchedStr);
        }
      }

      remaining = remaining.substring(matchIndex + matchedStr.length);
    }

    if (isBullet) {
      return (
        <div key={`line-${lIdx}`} className="chat-bullet-line">
          <span className="chat-bullet-dot" />
          <div className="chat-bullet-content">{tokens}</div>
        </div>
      );
    }

    return (
      <p key={`line-${lIdx}`} className="chat-text-line">
        {tokens.length > 0 ? tokens : '\u00A0'}
      </p>
    );
  });
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unreadBadge, setUnreadBadge] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpen = () => {
    setIsOpen(true);
    setUnreadBadge(false);
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Auto focus input on desktop
      if (!window.matchMedia('(pointer: coarse)').matches) {
        setTimeout(() => inputRef.current?.focus(), 150);
      }
    }
  }, [isOpen, messages]);

  // Send message to backend RAG endpoint
  const sendMessage = async (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMsg = {
      id: userMessageId,
      role: 'user',
      text: query,
      timestamp: userTimestamp,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsLoading(true);

    // Determine API endpoint: use VITE_API_URL or fallback to relative /api/chat
    const apiBase = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) || 'http://localhost:8000';
    const endpoint = `${apiBase.replace(/\/+$/, '')}/api/chat`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ message: query }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      const botMessageId = `bot-${Date.now()}`;
      const botTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setMessages((prev) => [
        ...prev,
        {
          id: botMessageId,
          role: 'assistant',
          text: data.answer || "I received an empty response from the portfolio server.",
          timestamp: botTimestamp,
        },
      ]);
    } catch (err) {
      console.error('Chatbot error:', err);
      const errorMessageId = `err-${Date.now()}`;
      const botTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setMessages((prev) => [
        ...prev,
        {
          id: errorMessageId,
          role: 'assistant',
          isError: true,
          text: `⚠️ **Connection Notice**\n\nCould not reach the backend AI server at \`${endpoint}\`.\n\n*Troubleshooting:*\n- Ensure the FastAPI server is running with: \`python -m uvicorn app.main:app --reload --port 8000\` in the \`backend/\` directory.\n- Verify CORS settings in \`backend/.env\`.\n- Technical details: *${err.message}*`,
          timestamp: botTimestamp,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInputValue('');
  };

  const handleSuggestionClick = (question) => {
    sendMessage(question);
  };

  return (
    <div className="portfolio-chatbot-wrapper">
      {/* Floating Trigger Button (Bottom-Right HUD) */}
      {!isOpen && (
        <button
          type="button"
          className="chatbot-launcher-btn"
          onClick={handleOpen}
          aria-label="Open Umang's AI Portfolio Chatbot"
          title="Ask Umang's AI Assistant"
        >
          <span className="chatbot-launcher-glow" />
          <span className="chatbot-launcher-orbit" />
          <div className="chatbot-launcher-icon">
            <Bot size={22} className="chatbot-bot-icon" />
          </div>
          <div className="chatbot-launcher-pill">
            <span className="chatbot-pill-dot" />
            <span className="chatbot-pill-text">Ask Umang&apos;s AI</span>
          </div>
          {unreadBadge && <span className="chatbot-unread-dot" />}
        </button>
      )}

      {/* Floating Interactive Chat HUD Window */}
      {isOpen && (
        <div
          className="chatbot-window"
          role="dialog"
          aria-label="Umang's Portfolio AI Chatbot"
        >
          {/* HUD Framing Accents */}
          <span className="about-hud-corner about-hud-corner-tl" aria-hidden="true" />
          <span className="about-hud-corner about-hud-corner-tr" aria-hidden="true" />
          <span className="about-hud-corner about-hud-corner-bl" aria-hidden="true" />
          <span className="about-hud-corner about-hud-corner-br" aria-hidden="true" />

          {/* Top Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-left">
              <div className="chatbot-avatar">
                <Bot size={18} />
                <span className="chatbot-status-live" />
              </div>
              <div className="chatbot-header-meta">
                <div className="chatbot-header-title">
                  <strong>UMANG AI</strong>
                  <span className="chatbot-badge">RAG ACTIVE</span>
                </div>
                <div className="chatbot-header-sub">
                  Portfolio Knowledge Grounded
                </div>
              </div>
            </div>

            <div className="chatbot-header-actions">
              <button
                type="button"
                className="chatbot-header-btn"
                onClick={handleResetChat}
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw size={14} />
              </button>
              <button
                type="button"
                className="chatbot-header-btn chatbot-close-btn"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Body with Lenis Scroll Prevention */}
          <div
            className="chatbot-messages-container"
            data-lenis-prevent="true"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message-row chat-message-${msg.role} ${msg.isError ? 'is-error' : ''}`}
              >
                {msg.role === 'assistant' && (
                  <div className="chat-avatar-mini" aria-hidden="true">
                    {msg.isError ? <AlertCircle size={14} /> : <Bot size={14} />}
                  </div>
                )}

                <div className="chat-bubble">
                  <div className="chat-bubble-content">
                    {formatMessageText(msg.text)}
                  </div>

                  <span className="chat-bubble-time">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {/* Typing / Searching Indicator */}
            {isLoading && (
              <div className="chat-message-row chat-message-assistant is-typing">
                <div className="chat-avatar-mini" aria-hidden="true">
                  <Bot size={14} />
                </div>
                <div className="chat-bubble chat-typing-bubble">
                  <span className="typing-text">Searching portfolio records...</span>
                  <div className="typing-dots">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips (shown when few messages) */}
          {messages.length <= 2 && !isLoading && (
            <div className="chatbot-suggestions-tray" data-lenis-prevent="true">
              <span className="suggestions-label">Suggested queries:</span>
              <div className="suggestions-scroll">
                {SUGGESTED_QUESTIONS.map((question, i) => (
                  <button
                    key={i}
                    type="button"
                    className="suggestion-chip"
                    onClick={() => handleSuggestionClick(question)}
                  >
                    <Sparkles size={11} className="suggestion-sparkle" />
                    <span>{question}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Input Area */}
          <form onSubmit={handleSubmit} className="chatbot-input-bar">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about Umang's work..."
              className="chatbot-input"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="chatbot-send-btn"
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
