'use client';

import { useEffect, useState } from 'react';
import { GA_ID } from '@/lib/site';
import type { Dictionary } from '@/dictionaries/no';
import styles from './Consent.module.css';

const KEY = 'analyticsConsent';

function loadGA() {
  if (typeof window === 'undefined' || document.getElementById('ga-script')) return;
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag('js', new Date());
  w.gtag('config', GA_ID, { anonymize_ip: true });
  const s = document.createElement('script');
  s.id = 'ga-script';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

export default function Consent({ dict }: { dict: Dictionary }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {}
    if (stored === 'accepted') loadGA();
    if (!stored) {
      const id = window.setTimeout(() => setVisible(true), 1500);
      return () => window.clearTimeout(id);
    }
  }, []);

  const choose = (accepted: boolean) => {
    try {
      localStorage.setItem(KEY, accepted ? 'accepted' : 'declined');
    } catch {}
    if (accepted) loadGA();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <section className={styles.banner} aria-labelledby="consent-title">
      <h2 id="consent-title" className={styles.title}>
        {dict.consent.title}
      </h2>
      <p>{dict.consent.message}</p>
      <div className={styles.actions}>
        <button type="button" className="btn btn-primary" onClick={() => choose(true)}>
          {dict.consent.accept}
        </button>
        <button type="button" className="btn" onClick={() => choose(false)}>
          {dict.consent.decline}
        </button>
      </div>
    </section>
  );
}
