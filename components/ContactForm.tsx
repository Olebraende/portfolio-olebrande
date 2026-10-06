'use client';

import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/lib/i18n';
import type { Dictionary } from '@/dictionaries/no';
import { Send } from '@/app/icons';
import styles from './ContactForm.module.css';

type Status = 'idle' | 'sending' | 'success' | 'error';

function SuccessCheck() {
  return (
    <div className={styles.checkWrap} aria-hidden="true">
      <span className={styles.burst} />
      <svg className={styles.check} viewBox="0 0 80 80" focusable="false">
        <circle className={styles.ring} cx="40" cy="40" r="36" />
        <path className={styles.tick} d="M24 41.5 35 52.5 57 29" />
      </svg>
    </div>
  );
}

function SuccessOverlay({
  dict,
  onReset,
}: {
  dict: Dictionary['contact'];
  onReset: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the confirmation so keyboard and screen-reader users land on it.
  useEffect(() => headingRef.current?.focus(), []);

  return (
    <div className={styles.overlay} role="status">
      <SuccessCheck />
      <h3 ref={headingRef} tabIndex={-1} className={styles.successTitle}>
        {dict.successTitle}
      </h3>
      <p className={styles.successText}>{dict.success}</p>
      <button type="button" className="btn" onClick={onReset}>
        {dict.sendAnother}
      </button>
    </div>
  );
}

export default function ContactForm({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const [status, setStatus] = useState<Status>('idle');
  const c = dict.contact;
  const sent = status === 'success';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className={styles.form}
        aria-busy={status === 'sending'}
        // The form is hidden behind the confirmation, so keep it out of the tab order too.
        inert={sent}
      >
        {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
        <div className={styles.trap} aria-hidden="true">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="name">{c.name}</label>
            <input id="name" name="name" type="text" autoComplete="name" required maxLength={120} />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">{c.email}</label>
            <input id="email" name="email" type="email" autoComplete="email" required maxLength={200} />
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="subject">{c.subject}</label>
          <input id="subject" name="subject" type="text" required maxLength={200} />
        </div>
        <div className={styles.field}>
          <label htmlFor="message">{c.message}</label>
          <textarea id="message" name="message" rows={6} required maxLength={5000} />
        </div>

        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? c.sending : c.send}
          {status !== 'sending' && <Send />}
        </button>

        <p role="status" className={`${styles.msg} ${styles.err}`}>
          {status === 'error' && c.error}
        </p>
      </form>

      {sent && <SuccessOverlay dict={c} onReset={() => setStatus('idle')} />}
    </>
  );
}
