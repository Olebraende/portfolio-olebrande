'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { href, type Lang } from '@/lib/i18n';
import type { Dictionary } from '@/dictionaries/no';
import { Close, Menu } from '@/app/icons';
import LogoMark from './LogoMark';
import styles from './Header.module.css';

export default function Header({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const basePath = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  const otherLang: Lang = lang === 'no' ? 'en' : 'no';

  const links = [
    { path: '/', label: dict.common.home },
    { path: '/prosjekter', label: dict.nav.projects },
    { path: '/kontakt', label: dict.nav.contact },
  ];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href={href(lang)} className={styles.logo}>
          <span className={styles.mark}>
            <LogoMark />
          </span>
          <span className={styles.name}>Ole Mathias Brænde</span>
        </Link>

        <nav
          id="primary-nav"
          aria-label={dict.common.primaryNav}
          className={`${styles.nav} ${open ? styles.open : ''}`}
        >
          <ul>
            {links.map((l) => {
              const active = basePath === l.path;
              return (
                <li key={l.path}>
                  <Link href={href(lang, l.path)} onClick={() => setOpen(false)} aria-current={active ? 'page' : undefined} data-active={active}>
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link
            href={href(otherLang, basePath)}
            hrefLang={otherLang === 'no' ? 'nb' : 'en'}
            lang={otherLang === 'no' ? 'nb' : 'en'}
            className={styles.lang}
            aria-label={dict.common.switchLang}
            prefetch={false}
            scroll={false}
          >
            {dict.common.langShort}
          </Link>
          <Link href={href(lang, '/kontakt')} className={`btn btn-primary ${styles.cta}`}>
            {dict.nav.cta}
          </Link>
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? dict.common.closeMenu : dict.common.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
