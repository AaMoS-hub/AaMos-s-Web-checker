/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Code2, 
  Terminal, 
  Layout, 
  Palette, 
  Globe, 
  ChevronRight, 
  Copy, 
  ExternalLink,
  Loader2,
  AlertCircle,
  FileJson,
  Blocks,
  Download,
  FileText,
  FileCode,
  Code,
  Check,
  Eye,
  Moon,
  Sun,
  Coffee,
  Sparkles,
  Keyboard,
  Info,
  Bug
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import Editor from '@monaco-editor/react';
import { cn } from './lib/utils';

const FloatingSymbols = () => {
  const symbols = ['{ }', '[ ]', '101', '010', '< />', '=>', '::', '&&', '||'];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0,
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%'
          }}
          animate={{ 
            opacity: [0, 0.15, 0],
            y: [null, '-=100px'],
            scale: [0.8, 1, 0.8],
          }}
          transition={{ 
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear"
          }}
          className="absolute font-mono text-[10px] text-text-base/40 whitespace-nowrap"
        >
          {symbols[i % symbols.length]}
        </motion.div>
      ))}
    </div>
  );
};

const DataStream = ({ active = false }: { active?: boolean }) => {
  return (
    <div className="fixed top-0 bottom-0 right-10 w-20 pointer-events-none overflow-hidden opacity-10 flex flex-col items-center">
      <AnimatePresence>
        {active && Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 2000, opacity: [0, 1, 1, 0] }}
            transition={{ 
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear"
            }}
            className="font-mono text-[8px] text-text-base whitespace-nowrap rotate-90 my-10"
          >
            {Math.random().toString(16).substring(2, 15).toUpperCase()}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const ScannerLine = () => {
  return (
    <motion.div
      initial={{ top: '-10%' }}
      animate={{ top: '110%' }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        ease: "linear",
        delay: 2
      }}
      className="fixed left-0 right-0 h-[1px] bg-text-base/5 z-[60] pointer-events-none"
    />
  );
};

const TechnicalHUD = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsHovering(target.tagName === 'BUTTON' || target.tagName === 'A' || target.tagName === 'INPUT' || !!target.closest('button'));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smoother follow
  useEffect(() => {
    let animationFrame: number;
    const smoothFollow = () => {
      setMousePos(prev => ({
        x: prev.x + (targetPos.x - prev.x) * 0.15,
        y: prev.y + (targetPos.y - prev.y) * 0.15
      }));
      animationFrame = requestAnimationFrame(smoothFollow);
    };
    animationFrame = requestAnimationFrame(smoothFollow);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetPos]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      <motion.div 
        style={{ x: mousePos.x, y: mousePos.y }}
        className="relative"
      >
        <motion.div 
          animate={{ 
            scale: isHovering ? 2.5 : 1,
            backgroundColor: isHovering ? "var(--color-accent-base)" : "var(--color-text-base)"
          }}
          className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-[0_0_10px_rgba(var(--text-base),0.5)]"
        >
          {/* Subtle pulse ring on idle */}
          {!isHovering && (
             <motion.div 
                animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 border border-text-base rounded-full"
             />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

const ArachneSpider = ({ active = false }: { active?: boolean }) => {
  return (
    <motion.div 
      animate={{ 
        y: active ? [0, 5, 0] : 0,
        rotate: active ? [0, 2, -2, 0] : 0
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="relative z-50 pointer-events-none"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-text-base/10" />
      <motion.div 
        animate={{ scale: active ? 1.1 : 1 }}
        className="w-10 h-10 bg-text-base rounded-full flex items-center justify-center shadow-2xl relative mt-20"
      >
        <Bug className="text-bg-base w-5 h-5" />
        {/* Animated Legs */}
        {[0, 1, 2, 3].map((i) => (
          <React.Fragment key={i}>
            <motion.div 
              animate={{ rotate: active ? [20, 40, 20] : 20 }}
              transition={{ delay: i * 0.1, duration: 0.5, repeat: Infinity }}
              style={{ left: '-4px', top: `${12 + i * 5}px` }}
              className="absolute w-3 h-[1px] bg-text-base origin-right" 
            />
            <motion.div 
              animate={{ rotate: active ? [-20, -40, -20] : -20 }}
              transition={{ delay: i * 0.1, duration: 0.5, repeat: Infinity }}
              style={{ right: '-4px', top: `${12 + i * 5}px` }}
              className="absolute w-3 h-[1px] bg-text-base origin-left" 
            />
          </React.Fragment>
        ))}
        {/* Glow */}
        <motion.div 
          animate={{ opacity: active ? [0.2, 0.4, 0.2] : 0.1 }}
          className="absolute inset-0 bg-accent-base rounded-full blur-lg -z-10"
        />
      </motion.div>
    </motion.div>
  );
};

const ShikiCodeBlock = ({ code, lang }: { code: string; lang: string }) => {
  const [html, setHtml] = React.useState<string>('');

  React.useEffect(() => {
    let isMounted = true;
    const highlight = async () => {
      try {
        const { codeToHtml } = await import('shiki');
        const out = await codeToHtml(code, {
          lang: lang || 'typescript',
          theme: 'vitesse-dark'
        });
        if (isMounted) setHtml(out);
      } catch (err) {
        console.error('Highlight error:', err);
      }
    };
    highlight();
    return () => { isMounted = false; };
  }, [code, lang]);

  if (!html) return <pre className="p-4 font-mono text-sm opacity-50">{code}</pre>;
  return <div dangerouslySetInnerHTML={{ __html: html }} className="shiki-output" />;
};

// Model name removed as it's handled server-side

interface ExtractionResult {
  sourceCode: string;
  logicExplanation: string;
  designPatterns: string;
  technologies: string[];
}

type Theme = 'light' | 'dark' | 'editorial';

export default function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('');
  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [editableCode, setEditableCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<{ id: string; type: 'copy' | 'download' } | null>(null);
  const [viewMode, setViewMode] = useState<'editor' | 'preview'>('editor');
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('web-inspector-theme') as Theme;
      return (saved && ['light', 'dark', 'editorial'].includes(saved)) ? saved : 'editorial';
    }
    return 'editorial';
  });
  const [showShortcuts, setShowShortcuts] = useState(false);

  const themes: { id: Theme; icon: any; label: string }[] = [
    { id: 'light', icon: Sun, label: 'Light' },
    { id: 'dark', icon: Moon, label: 'Dark' },
    { id: 'editorial', icon: Coffee, label: 'Editorial' },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      
      // Ctrl/Cmd + B : Toggle View Mode
      if (isMod && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setViewMode(prev => prev === 'editor' ? 'preview' : 'editor');
      }
      
      // Ctrl/Cmd + S : Download Markdown
      if (isMod && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (result) handleDownload('markdown');
      }

      // Ctrl/Cmd + Shift + C : Copy Markdown
      if (isMod && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        if (result) handleCopy('markdown');
      }

      // Ctrl/Cmd + K : Toggle Shortcut Help
      if (isMod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
      }

      // Esc : Close Help
      if (e.key === 'Escape') {
        setShowShortcuts(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [result]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('web-inspector-theme', theme);
  }, [theme]);

  const stages = [
    { threshold: 20, text: 'Initializing secure connection...' },
    { threshold: 40, text: 'Fetching URL manifest and metadata...' },
    { threshold: 65, text: 'Deconstructing DOM architecture...' },
    { threshold: 85, text: 'Inferring logic and state patterns...' },
    { threshold: 95, text: 'Synthesizing technical report...' }
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (loading) {
      setLoadingProgress(0);
      setLoadingStage(stages[0].text);
      
      interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 98) return prev;
          const increment = Math.random() * 5;
          const next = Math.min(prev + increment, 98);
          
          const stage = stages.find(s => next <= s.threshold) || stages[stages.length - 1];
          setLoadingStage(stage.text);
          
          return next;
        });
      }, 400);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const stripMarkdown = (md: string) => {
    const match = md.match(/```(?:[a-z]*)\n([\s\S]*?)```/);
    return match ? match[1] : md;
  };

  const isValidUrl = (string: string) => {
    try {
      const parsed = new URL(string);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch (_) {
      return false;
    }
  };

  const extractCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      setUrlError('Please enter a URL');
      return;
    }

    if (!isValidUrl(url)) {
      setUrlError('Please enter a valid URL (including https://)');
      return;
    }

    setUrlError(null);
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || 'Failed to analyze website');
      }

      const data = await response.json();
      
      setLoadingProgress(100);
      setLoadingStage('Finalizing...');
      
      setTimeout(() => {
        setResult(data as ExtractionResult);
        setEditableCode(stripMarkdown(data.sourceCode));
        setLoading(false);
      }, 500);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while extracting code.');
      setLoading(false);
    }
  };

  const getFormattedOutput = (format: 'json' | 'markdown' | 'text' | 'xml' | 'component') => {
    if (!result) return '';

    switch (format) {
      case 'json':
        return JSON.stringify({ url, ...result, extractedAt: new Date().toISOString() }, null, 2);
      case 'markdown':
        return `# Web Extraction: ${url}\n\n## Technologies\n- ${result.technologies.join('\n- ')}\n\n## Logic Explanation\n${result.logicExplanation}\n\n## Design Patterns\n${result.designPatterns}\n\n## Reconstructed Source\n${result.sourceCode}`;
      case 'text':
        return `URL: ${url}\n\nTECHNOLOGIES: ${result.technologies.join(', ')}\n\nLOGIC:\n${result.logicExplanation.replace(/#/g, '').trim()}\n\nDESIGN PATTERNS:\n${result.designPatterns.replace(/#/g, '').trim()}\n\nRECONSTRUCTED CODE:\n${result.sourceCode.replace(/```[a-z]*\n|```/g, '').trim()}`;
      case 'xml':
        return `<?xml version="1.0" encoding="UTF-8"?>
<WebExtraction>
  <URL>${url}</URL>
  <ExtractedAt>${new Date().toISOString()}</ExtractedAt>
  <Technologies>
    ${result.technologies.map(t => `<Technology>${t}</Technology>`).join('\n    ')}
  </Technologies>
  <LogicExplanation>
    <![CDATA[${result.logicExplanation}]]>
  </LogicExplanation>
  <DesignPatterns>
    <![CDATA[${result.designPatterns}]]>
  </DesignPatterns>
  <SourceCode>
    <![CDATA[${result.sourceCode}]]>
  </SourceCode>
</WebExtraction>`;
      case 'component':
        return stripMarkdown(result.sourceCode);
      default:
        return '';
    }
  };

  const handleCopy = async (format: 'json' | 'markdown' | 'text' | 'xml' | 'component') => {
    const text = getFormattedOutput(format);
    await navigator.clipboard.writeText(text);
    setActiveAction({ id: format, type: 'copy' });
    setTimeout(() => setActiveAction(null), 2000);
  };

  const handleDownload = (format: 'json' | 'markdown' | 'text' | 'xml' | 'component') => {
    const text = getFormattedOutput(format);
    const extensions = { json: 'json', markdown: 'md', text: 'txt', xml: 'xml', component: 'tsx' };
    const mimeTypes = {
      json: 'application/json',
      markdown: 'text/markdown',
      text: 'text/plain',
      xml: 'application/xml',
      component: 'text/typescript'
    };
    const blob = new Blob([text], { type: mimeTypes[format] });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `extraction-${new Date().getTime()}.${extensions[format]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setActiveAction({ id: format, type: 'download' });
    setTimeout(() => setActiveAction(null), 2000);
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-base font-sans selection:bg-text-base selection:text-bg-base overflow-x-hidden">
      <TechnicalHUD />
      <ScannerLine />
      <FloatingSymbols />
      <DataStream active={loading} />

      {/* Grid Pattern Background */}
      <motion.div 
        animate={{ 
          backgroundPosition: ['0px 0px', '32px 32px'],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="fixed inset-0 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
      />

      {/* Header */}
      <div className="fixed top-24 left-10 hidden xl:block">
        <ArachneSpider active={loading} />
      </div>
      <header className="border-b border-border-base py-3 px-4 md:px-6 relative bg-bg-base/80 backdrop-blur-md z-50 sticky top-0 shadow-[0_1px_10px_rgba(0,0,0,0.02)]">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-7xl mx-auto flex items-center justify-between gap-2 md:gap-4"
        >
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <motion.div 
              whileHover={{ rotate: 90 }}
              className="w-8 h-8 md:w-10 md:h-10 bg-text-base flex items-center justify-center rounded-sm shadow-sm"
            >
              <Code2 className="text-bg-base w-5 h-5 md:w-6 md:h-6" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="font-serif italic text-lg md:text-xl leading-none font-bold">Web Inspector</h1>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest opacity-40 font-mono">AI Recon</span>
            </div>
          </div>
          
          <form onSubmit={extractCode} className="flex-1 max-w-sm md:max-w-xl mx-2 md:mx-4 relative">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 opacity-30 group-focus-within:opacity-100 transition-opacity" />
              <input 
                type="text" 
                placeholder="Paste URL..."
                className={cn(
                  "w-full bg-surface-base border py-2 px-8 md:px-10 rounded-full focus:outline-none transition-all font-mono text-xs md:text-sm shadow-sm",
                  urlError ? "border-red-500 ring-2 ring-red-500/20" : "border-border-base focus:ring-2 focus:ring-text-base/10"
                )}
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (urlError) setUrlError(null);
                }}
              />
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-text-base text-bg-base px-3 md:px-5 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin" /> : 'Inspect'}
              </motion.button>
            </div>
            <AnimatePresence>
              {urlError && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -bottom-5 left-4 text-[9px] text-red-500 font-mono flex items-center gap-1 leading-none uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded"
                >
                  <AlertCircle className="w-2 h-2" />
                  {urlError}
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <div className="flex items-center gap-1 md:gap-3">
            <button 
              onClick={() => setShowShortcuts(true)}
              className="p-2 md:p-2.5 bg-surface-base border border-border-base rounded-full shadow-sm text-text-base/40 hover:text-text-base hover:bg-text-base/5 transition-all group relative"
              title="Keyboard Shortcuts"
            >
              <Keyboard className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>

            <div className="flex items-center gap-1 bg-surface-base p-0.5 md:p-1 rounded-full border border-border-base shadow-sm">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={cn(
                    "p-1.5 md:p-2 rounded-full transition-all",
                    theme === t.id ? "bg-text-base text-bg-base scale-110 shadow-md" : "text-text-base/40 hover:text-text-base hover:bg-text-base/5"
                  )}
                >
                  <t.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-8 relative z-10">
        <AnimatePresence mode="wait">
          {!result && !loading && !error && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="mt-12 md:mt-24 text-center space-y-12"
            >
              <div className="inline-flex items-center gap-2 bg-accent-base/5 border border-accent-base/10 px-4 py-1.5 rounded-full text-xs font-mono tracking-wide mb-4">
                <Sparkles className="w-3 h-3 text-accent-base" />
                <span>Modern Web Deconstruction Engine</span>
              </div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-8xl font-serif italic tracking-tighter leading-[0.85] font-bold"
              >
                Decode the <br /> 
                <span className="text-text-base/20 hover:text-text-base transition-colors duration-700 cursor-default">Digital Canvas.</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.3 }}
                className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
              >
                Connect any URL to instantly extract components, understand design systems, and explore technical site logic through AI-powered reconstruction.
              </motion.p>

              <motion.form 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onSubmit={extractCode} 
                className="max-w-xl mx-auto w-full relative group mt-8 px-4"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30 group-focus-within:opacity-100 transition-opacity" />
                  <input 
                    type="text" 
                    autoFocus
                    placeholder="Enter website URL (e.g. https://google.com)"
                    className={cn(
                      "w-full bg-surface-base border-2 py-4 px-12 rounded-2xl focus:outline-none transition-all font-mono text-sm shadow-xl",
                      urlError ? "border-red-500 ring-4 ring-red-500/10" : "border-border-base focus:border-text-base/20 focus:ring-4 focus:ring-text-base/5"
                    )}
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      if (urlError) setUrlError(null);
                    }}
                  />
                  <button 
                    type="submit"
                    disabled={loading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-text-base text-bg-base px-8 py-2.5 rounded-xl text-sm font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-text-base/20"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Analyze'}
                  </button>
                </div>
                {urlError && (
                  <div className="absolute -bottom-8 left-4 text-[10px] text-red-500 font-mono flex items-center gap-1 leading-none uppercase tracking-wider bg-white/80 px-2 py-1 rounded shadow-sm">
                    <AlertCircle className="w-2.5 h-2.5" />
                    {urlError}
                  </div>
                )}
              </motion.form>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto pt-16">
                {[
                  { icon: Terminal, title: 'Logic Reconstruction', desc: 'Identify state management and interaction flows.' },
                  { icon: Palette, title: 'Design Intelligence', desc: 'Auto-detect typography, spacing, and styling rules.' },
                  { icon: Blocks, title: 'Stack Visibility', desc: 'Expose every library, tool, and framework used.' }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ y: -5 }}
                    className="p-8 border border-border-base rounded-2xl bg-surface-base shadow-sm text-left hover:shadow-xl transition-shadow"
                  >
                    <div className="w-12 h-12 bg-text-base/5 rounded-xl flex items-center justify-center mb-6">
                      <item.icon className="w-6 h-6 opacity-80" />
                    </div>
                    <h3 className="font-serif italic text-xl mb-3 font-bold">{item.title}</h3>
                    <p className="text-sm opacity-50 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-32 max-w-xl mx-auto flex flex-col items-center gap-12"
            >
              <div className="w-full space-y-8 bg-surface-base p-10 rounded-2xl border border-border-base shadow-2xl relative overflow-hidden">
                {/* Decorative background pulse */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-base/5 rounded-full -mr-16 -mt-16 animate-pulse" />
                
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] opacity-40">
                  <span className="flex items-center gap-2">
                    <Globe className="w-3 h-3 animate-spin duration-[3s]" />
                    Analyzing Node
                  </span>
                  <span>{Math.round(loadingProgress)}%</span>
                </div>
                
                <div className="h-1.5 w-full bg-text-base/5 rounded-full overflow-hidden relative shadow-inner">
                  <motion.div 
                    className="absolute inset-y-0 left-0 bg-text-base shadow-[0_0_10px_rgba(var(--text-base),0.5)]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>

                <div className="flex items-center gap-4 relative">
                  <Loader2 className="w-5 h-5 animate-spin opacity-40" />
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={loadingStage}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="text-lg font-serif italic text-text-base/80"
                    >
                      {loadingStage}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="pt-4 border-t border-border-base/50">
                  <div className="space-y-2">
                    {[1, 2, 3].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ opacity: [0.1, 0.4, 0.1] }}
                        transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                        className="h-1 bg-text-base/20 rounded-full w-full" 
                        style={{ width: `${100 - i * 20}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-4 font-mono text-[8px] opacity-20 uppercase tracking-[0.3em] overflow-hidden whitespace-nowrap">
                    SYSTEM_PROTOCOL::{loadingStage.toUpperCase().replace(/\s/g, '_')}...
                  </div>
                </div>
              </div>

              <div className="flex gap-4 w-full opacity-20 saturate-0 select-none">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex-1 p-4 border border-border-base rounded-lg bg-surface-base h-24">
                    <div className="h-2 w-1/2 bg-text-base/20 rounded mb-2" />
                    <div className="h-2 w-full bg-text-base/10 rounded" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-20 max-w-lg mx-auto bg-red-50/50 border border-red-200 p-10 rounded-2xl shadow-xl text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-serif italic text-2xl mb-2 font-bold text-red-900">Extraction Failed</h3>
              <p className="text-sm text-red-800 opacity-60 mb-8 max-w-xs mx-auto">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="w-full py-3 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/20"
              >
                Try Another URL
              </button>
            </motion.div>
          )}

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Sidebar Info */}
              <aside className="lg:col-span-4 space-y-6 sticky top-24">
                <section className="bg-surface-base p-6 border border-border-base rounded-2xl shadow-sm">
                  <header className="flex items-center justify-between mb-6 pb-4 border-b border-border-base">
                    <h3 className="font-serif italic text-xl font-bold">Site DNA</h3>
                    <div className="bg-text-base text-bg-base px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-tighter font-bold uppercase">Success</div>
                  </header>
                  
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] uppercase font-mono opacity-40 block mb-3 tracking-[0.1em] font-bold">Foundations</span>
                      <div className="flex flex-wrap gap-2">
                        {result.technologies.slice(0, 8).map((tech, i) => (
                      <motion.span 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-bg-base border border-border-base px-3 py-1 rounded-full text-[11px] font-mono shadow-sm hover:border-text-base/30 transition-all cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-[10px] uppercase font-mono opacity-40 block mb-3 tracking-[0.1em] font-bold">Visual Grammar</span>
                      <div className="text-sm prose prose-sm max-w-none opacity-80 leading-relaxed text-text-base">
                        <ReactMarkdown>{result.designPatterns}</ReactMarkdown>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border-base">
                      <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[11px] font-mono opacity-40 hover:opacity-100 transition-opacity">
                        View Original Habitat <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </section>

                <section className="bg-surface-base p-6 border border-border-base rounded-2xl shadow-sm">
                  <header className="flex items-center justify-between mb-4">
                    <h3 className="font-serif italic text-lg font-bold">Export Recon</h3>
                  </header>
                  
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'json', label: 'Raw JSON', icon: FileJson },
                      { id: 'xml', label: 'XML Struct', icon: Code },
                      { id: 'markdown', label: 'Markdown', icon: FileText },
                      { id: 'text', label: 'Full Text', icon: Terminal },
                      { id: 'component', label: 'React Component', icon: FileCode }
                    ].map((fmt) => (
                      <div key={fmt.id} className="flex items-center justify-between p-3 rounded-xl bg-bg-base border border-border-base hover:border-text-base/20 transition-all group">
                        <div className="flex items-center gap-3">
                          <fmt.icon className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                          <span className="text-xs font-mono font-medium">{fmt.label}</span>
                        </div>
                        <div className="flex items-center gap-1 group-hover:opacity-100 transition-opacity relative">
                          <AnimatePresence>
                            {activeAction?.id === fmt.id && (
                              <motion.span 
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="absolute right-full mr-2 text-[10px] font-mono text-text-base/60 uppercase whitespace-nowrap bg-surface-base px-2 py-1 rounded shadow-sm border border-border-base z-10"
                              >
                                {activeAction.type === 'copy' ? 'Copied!' : 'Downloaded!'}
                              </motion.span>
                            )}
                          </AnimatePresence>
                          <button 
                            onClick={() => handleCopy(fmt.id as any)}
                            className="p-1.5 hover:bg-text-base hover:text-bg-base rounded-lg transition-all relative"
                            title="Copy"
                          >
                            {activeAction?.id === fmt.id && activeAction.type === 'copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <button 
                            onClick={() => handleDownload(fmt.id as any)}
                            className="p-1.5 hover:bg-text-base hover:text-bg-base rounded-lg transition-all relative"
                            title="Download"
                          >
                            {activeAction?.id === fmt.id && activeAction.type === 'download' ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-text-base text-bg-base p-8 rounded-2xl shadow-xl shadow-text-base/10">
                  <h4 className="font-serif italic text-xl mb-4 font-bold opacity-90">Architectural Logic</h4>
                  <div className="text-[13px] opacity-70 leading-relaxed font-sans prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown>{result.logicExplanation}</ReactMarkdown>
                  </div>
                </section>
              </aside>

              {/* Main Area: Workbench */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                <section className="bg-surface-base border border-border-base rounded-3xl shadow-2xl flex flex-col h-[800px] overflow-hidden group relative">
                  <header className="bg-surface-base px-6 py-4 flex items-center justify-between border-b border-border-base relative">
                    <div className="flex items-center gap-4">
                       <div className="w-3 h-3 rounded-full bg-red-400" />
                       <div className="w-3 h-3 rounded-full bg-yellow-400" />
                       <div className="w-3 h-3 rounded-full bg-green-400" />
                       <div className="w-[1px] h-4 bg-border-base ml-2" />
                       <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold opacity-30">Interactive Recon Workbench</span>
                       <div className="hidden xl:flex items-center gap-2 opacity-20 group-hover:opacity-100 transition-opacity">
                         <Info className="w-3 h-3" />
                         <span className="text-[9px] font-mono uppercase tracking-widest">⌘B to toggle live site</span>
                       </div>
                    </div>
                    
                    <div className="flex items-center bg-bg-base p-1 rounded-full border border-border-base shadow-inner">
                      <button 
                        onClick={() => setViewMode('editor')}
                        className={cn(
                          "px-6 py-1.5 text-[10px] uppercase font-mono font-bold rounded-full transition-all flex items-center gap-2",
                          viewMode === 'editor' ? "bg-text-base text-bg-base shadow-sm" : "text-text-base/30 hover:text-text-base/60"
                        )}
                      >
                        <Code2 className="w-3 h-3" />
                        Editor
                      </button>
                      <button 
                        onClick={() => setViewMode('preview')}
                        className={cn(
                          "px-6 py-1.5 text-[10px] uppercase font-mono font-bold rounded-full transition-all flex items-center gap-2",
                          viewMode === 'preview' ? "bg-text-base text-bg-base shadow-sm" : "text-text-base/30 hover:text-text-base/60"
                        )}
                      >
                        <Eye className="w-3 h-3" />
                        Live Site
                      </button>
                    </div>
                  </header>

                  <div className="flex-1 relative bg-white overflow-hidden">
                    {/* Scanning Laser Effect */}
                    <AnimatePresence>
                      {loading && (
                        <motion.div 
                          initial={{ top: '0%' }}
                          animate={{ top: ['0%', '100%', '0%'] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          className="absolute left-0 right-0 h-1 bg-text-base/10 shadow-[0_0_15px_rgba(var(--text-base),0.2)] z-10"
                        />
                      )}
                    </AnimatePresence>
                    
                    <AnimatePresence mode="wait">
                      {viewMode === 'editor' ? (
                        <motion.div 
                          key="editor"
                          initial={{ opacity: 0, scale: 1 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1 }}
                          className="h-full"
                        >
                          <Editor
                            height="100%"
                            defaultLanguage="html"
                            theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
                            value={editableCode}
                            onChange={(value) => setEditableCode(value || '')}
                            options={{
                              minimap: { enabled: false },
                              fontSize: 14,
                              fontFamily: 'JetBrains Mono',
                              scrollBeyondLastLine: false,
                              lineNumbers: 'on',
                              roundedSelection: true,
                              readOnly: false,
                              cursorStyle: 'line',
                              automaticLayout: true,
                              padding: { top: 24, bottom: 24 },
                              lineHeight: 24,
                              renderLineHighlight: 'all',
                              scrollbar: {
                                vertical: 'hidden',
                                horizontal: 'hidden'
                              }
                            }}
                          />
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="preview"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="h-full overflow-hidden"
                        >
                           <iframe
                            title="Extraction Preview"
                            className="w-full h-full border-none"
                            srcDoc={`
                              <!DOCTYPE html>
                              <html>
                                <head>
                                  <meta charset="utf-8">
                                  <meta name="viewport" content="width=device-width, initial-scale=1">
                                  <script src="https://cdn.tailwindcss.com"></script>
                                  <style>
                                    body { margin: 0; font-family: sans-serif; overflow-x: hidden; background: white; color: black; }
                                    * { transition: all 0.2s ease; }
                                  </style>
                                </head>
                                <body>
                                  ${editableCode}
                                </body>
                              </html>
                            `}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </section>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Keyboard Shortcuts Overlay */}
      <AnimatePresence>
        {showShortcuts && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 pb-24 sm:pb-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShortcuts(false)}
              className="absolute inset-0 bg-text-base/20 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-surface-base rounded-3xl shadow-2xl border border-border-base overflow-hidden relative z-10"
            >
              <header className="px-8 py-6 border-b border-border-base bg-bg-base/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-text-base rounded-lg flex items-center justify-center shadow-md">
                    <Keyboard className="text-bg-base w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif italic text-xl font-bold">Shortcuts</h3>
                    <p className="text-[10px] uppercase tracking-widest opacity-40 font-mono">Control Terminal Commands</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowShortcuts(false)}
                  className="p-2 hover:bg-text-base/10 rounded-full transition-colors font-mono text-xs opacity-40 hover:opacity-100"
                >
                  ESC
                </button>
              </header>
              <div className="p-8 grid grid-cols-1 gap-6">
                {[
                  { keys: ['⌘', 'B'], label: 'Toggle Workbench / Live View' },
                  { keys: ['⌘', 'S'], label: 'Export / Download Recon Data' },
                  { keys: ['⌘', 'Shift', 'C'], label: 'Copy Markdown To Clipboard' },
                  { keys: ['⌘', 'K'], label: 'Toggle Shortcut Manual' },
                  { keys: ['ESC'], label: 'Close Active Modals' }
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <span className="text-sm opacity-60 font-medium group-hover:opacity-100 transition-opacity">{s.label}</span>
                    <div className="flex gap-1.5">
                      {s.keys.map((k, j) => (
                        <kbd key={j} className="px-2 py-1 bg-text-base shadow-sm border-b-2 border-text-base/60 text-bg-base rounded font-mono text-[11px] font-bold min-w-[24px] text-center">
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <footer className="px-8 py-4 bg-bg-base/50 border-t border-border-base">
                <p className="text-[9px] font-mono opacity-30 text-center uppercase tracking-widest leading-relaxed">
                  // use CTRL on Windows/Linux environments
                </p>
              </footer>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="mt-32 border-t border-border-base py-20 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-text-base/5 -z-10 skew-y-1 origin-bottom-right" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
               <div className="w-8 h-8 bg-text-base rounded flex items-center justify-center">
                 <Code2 className="text-bg-base w-4 h-4" />
               </div>
               <span className="font-serif italic text-lg font-bold">Web Inspector</span>
            </div>
            <p className="text-[10px] font-mono opacity-40 uppercase tracking-[0.3em]">
              &copy; 2026 AI Architecture Recon // Protocol Active
            </p>
          </div>
          <div className="flex gap-12">
            {['Architecture', 'Systems', 'Safety', 'Legal'].map((link) => (
              <a key={link} href="#" className="text-[10px] font-mono opacity-30 uppercase tracking-[0.2em] hover:opacity-100 transition-opacity font-bold">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
