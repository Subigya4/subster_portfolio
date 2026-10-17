'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './first.module.css';

type Props = { prompt: string; placeholder: string };
type CopyState = 'idle' | 'copied' | 'manual';

/** Copy text without the async Clipboard API (older or in-app browsers). */
function legacyCopy(text: string): boolean {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.top = '0';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  ta.setSelectionRange(0, text.length);
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  document.body.removeChild(ta);
  return ok;
}

export default function PromptBox({ prompt, placeholder }: Props) {
  const [state, setState] = useState<CopyState>('idle');
  const codeRef = useRef<HTMLElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    let ok = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(prompt);
        ok = true;
      } catch {
        ok = false;
      }
    }
    if (!ok) ok = legacyCopy(prompt);

    window.clearTimeout(timer.current);
    if (ok) {
      setState('copied');
      timer.current = window.setTimeout(() => setState('idle'), 2000);
      return;
    }

    // Copying is blocked: select the prompt so it can be copied by hand.
    const code = codeRef.current;
    const selection = window.getSelection();
    if (code && selection) {
      const range = document.createRange();
      range.selectNodeContents(code);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    setState('manual');
  }

  const [before, after] = prompt.split(placeholder);
  const copied = state === 'copied';

  return (
    <div className={styles.codeBox}>
      <div className={styles.codeBar}>
        <span className={styles.fileName}>prompt.txt</span>
        <button
          type="button"
          className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
          onClick={copy}
        >
          {copied ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect width="14" height="14" x="8" y="8" rx="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          )}
          {copied ? 'Copied!' : 'Copy Prompt'}
        </button>
      </div>
      <pre className={styles.pre}>
        <code ref={codeRef}>
          {before}
          {after !== undefined && <span className={styles.placeholder}>{placeholder}</span>}
          {after}
        </code>
      </pre>
      <p className={styles.status} role="status" aria-live="polite">
        {state === 'copied' && <span className={styles.srOnly}>Prompt copied to clipboard.</span>}
        {state === 'manual' && 'Copying is blocked here. The prompt is selected, so copy it from your menu.'}
      </p>
    </div>
  );
}
