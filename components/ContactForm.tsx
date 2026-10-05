'use client';

import { useState } from 'react';
import type { Lang } from '@/lib/i18n';
import type { Dictionary } from '@/dictionaries/no';
import { Send } from '@/app/icons';
import styles from './ContactForm.module.css';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const [status, setStatus] = useState<Status>('idle');
  const c = dict.contact;

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
    <form onSubmit={onSubmit} className={styles.form} aria-busy={status === 'sending'}>
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

      <p role="status" className={`${styles.msg} ${status === 'error' ? styles.err : styles.ok}`}>
        {status === 'success' && c.success}
        {status === 'error' && c.error}
      </p>
    </form>
  );
}
