'use client';

import { useEffect, useRef, useState } from 'react';
import { getEmail } from '@/lib/site';
import type { Dictionary } from '@/dictionaries/no';
import { Check, Copy } from '@/app/icons';
import styles from './EmailCopy.module.css';

/** Renders the address into a canvas so scrapers can't read it from the DOM. */
export default function EmailCopy({ dict }: { dict: Dictionary }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const c = dict.contact;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const font = '500 18px ui-sans-serif, system-ui, -apple-system, sans-serif';
    const addr = getEmail();
    ctx.font = font;
    const w = Math.ceil(ctx.measureText(addr).width) + 2;
    canvas.width = w * dpr;
    canvas.height = 28 * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = '28px';
    ctx.scale(dpr, dpr);
    ctx.font = font;
    ctx.fillStyle = '#f4f4f5';
    ctx.textBaseline = 'middle';
    ctx.fillText(addr, 0, 14);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(getEmail());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {}
  }

  return (
    <div>
      <p className={styles.label}>{c.emailLabel}</p>
      <canvas ref={canvasRef} role="img" aria-label={c.emailImageAlt} className={styles.canvas} />
      <button type="button" onClick={copy} className={`btn ${styles.btn}`}>
        {copied ? <Check /> : <Copy />}
        {c.copyEmail}
      </button>
      <p role="status" className="visually-hidden">
        {copied ? c.emailCopied : ''}
      </p>
    </div>
  );
}
