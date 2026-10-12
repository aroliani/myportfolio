import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, FileText, Download, X } from 'lucide-react';
import cvFile from '../../assets/Aroliani Munte-CV.pdf';

/* Only files that actually ship with the project are listed here. */
const CV_FILES = [
  {
    id: 'cv-pdf',
    name: 'Aroliani Munte-CV.pdf',
    format: 'PDF',
    detail: 'Portable Document Format',
    href: cvFile,
  },
];

const triggerDownload = (file) => {
  const link = document.createElement('a');
  link.href = file.href;
  link.download = file.name;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
};

const CvActions = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [position, setPosition] = useState(null);

  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const closeTimer = useRef(null);
  const lastFocused = useRef(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openMenu = useCallback(() => {
    clearCloseTimer();
    setMenuOpen(true);
  }, [clearCloseTimer]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setMenuOpen(false), 160);
  }, [clearCloseTimer]);

  const closeMenu = useCallback((restoreFocus = false) => {
    clearCloseTimer();
    setMenuOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, [clearCloseTimer]);

  /* Position the popover directly above the trigger (portal, never clipped). */
  useLayoutEffect(() => {
    if (!menuOpen) return undefined;
    const compute = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const width = Math.min(320, window.innerWidth - 12);
      let left = rect.left + rect.width / 2 - width / 2;
      left = Math.max(6, Math.min(left, window.innerWidth - width - 6));
      setPosition({
        left,
        width,
        bottom: window.innerHeight - rect.top + 12,
        caretLeft: Math.round(rect.left + rect.width / 2 - left),
      });
    };
    compute();
    window.addEventListener('resize', compute);
    window.addEventListener('scroll', compute, true);
    return () => {
      window.removeEventListener('resize', compute);
      window.removeEventListener('scroll', compute, true);
    };
  }, [menuOpen]);

  /* Close on outside interaction / Escape while the menu is open. */
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onPointerDown = (event) => {
      if (triggerRef.current?.contains(event.target)) return;
      if (popoverRef.current?.contains(event.target)) return;
      closeMenu(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu(true);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  /* Body scroll lock for the in-page CV viewer. */
  useEffect(() => {
    if (!viewerOpen) return undefined;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setViewerOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [viewerOpen]);

  const handleTriggerClick = () => {
    if (menuOpen) closeMenu(false);
    else openMenu();
  };

  const handleTriggerKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      openMenu();
      window.setTimeout(() => {
        popoverRef.current?.querySelector('[role="menuitem"]')?.focus();
      }, 0);
    }
  };

  const handlePopoverKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu(true);
    }
  };

  const handleDownload = (file) => {
    triggerDownload(file);
    closeMenu(false);
  };

  const openViewer = () => {
    lastFocused.current = document.activeElement;
    setViewerOpen(true);
  };

  const closeViewer = () => {
    setViewerOpen(false);
    window.requestAnimationFrame(() => {
      if (lastFocused.current instanceof HTMLElement) lastFocused.current.focus();
    });
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
        <button type="button" onClick={openViewer} className="btn-lochnet">
          <Eye size={17} /> View CV
        </button>

        <div className="relative">
          <button
            ref={triggerRef}
            type="button"
            onClick={handleTriggerClick}
            onPointerEnter={(event) => event.pointerType === 'mouse' && openMenu()}
            onPointerLeave={(event) => event.pointerType === 'mouse' && scheduleClose()}
            onKeyDown={handleTriggerKeyDown}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="btn-ember"
          >
            <Download size={17} /> Download CV
            <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true" className={`transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`}>
              <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {menuOpen && position && (
              <motion.div
                ref={popoverRef}
                role="menu"
                aria-label="Download CV options"
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="cv-popover"
                style={{ left: position.left, width: position.width, bottom: position.bottom, '--caret-left': `${position.caretLeft}px` }}
                onPointerEnter={(event) => event.pointerType === 'mouse' && clearCloseTimer()}
                onPointerLeave={(event) => event.pointerType === 'mouse' && scheduleClose()}
                onKeyDown={handlePopoverKeyDown}
              >
                <div className="flex items-center gap-2 border-b border-loch-300/15 px-4 py-3">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-ember-500/15 text-ember-300"><FileText size={15} /></span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ember-300">Choose a file</p>
                    <p className="font-mono text-[10px] text-mist/60">Pick a format to download</p>
                  </div>
                </div>
                <div className="p-2">
                  {CV_FILES.map((file) => (
                    <button
                      key={file.id}
                      type="button"
                      role="menuitem"
                      onClick={() => handleDownload(file)}
                      className="cv-download-item group"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-loch-300/30 bg-night-900 font-mono text-[10px] font-semibold text-loch-300">
                        {file.format}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-mist">{file.name}</span>
                        <span className="block font-mono text-[10px] text-mist/55">{file.detail}</span>
                      </span>
                      <Download size={16} className="shrink-0 text-mist/50 transition-colors group-hover:text-ember-300" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {viewerOpen && (
              <motion.div
                className="cv-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={closeViewer}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label="Aroliani Munte CV preview"
                  className="cv-sheet"
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.98 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="flex items-center justify-between gap-4 border-b border-loch-300/20 bg-night-900/80 px-5 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ember-500/15 text-ember-300"><FileText size={16} /></span>
                      <div className="min-w-0">
                        <h2 className="truncate font-display text-base text-mist">Aroliani Munte — Curriculum Vitae</h2>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mist/55">In-page preview</p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button type="button" onClick={() => triggerDownload(CV_FILES[0])} className="hidden items-center gap-2 rounded-full border border-loch-300/30 px-3 py-2 font-mono text-xs text-loch-200 transition hover:border-loch-300/70 hover:text-white sm:inline-flex">
                        <Download size={14} /> Download
                      </button>
                      <button type="button" onClick={closeViewer} aria-label="Close CV preview" title="Close" className="grid h-9 w-9 place-items-center rounded-full border border-loch-300/25 text-mist/80 transition hover:border-loch-300/70 hover:text-white">
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                  <object data={cvFile} type="application/pdf" aria-label="CV document">
                    <div className="grid h-full place-content-center gap-3 p-8 text-center">
                      <p className="text-sm text-mist/80">Your browser cannot display the PDF inline.</p>
                      <button type="button" onClick={() => triggerDownload(CV_FILES[0])} className="btn-ember mx-auto">
                        <Download size={16} /> Download the CV
                      </button>
                    </div>
                  </object>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};

export default CvActions;
