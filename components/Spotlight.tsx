'use client';

import { useEffect, useRef } from 'react';

/**
 * Cursor-follow glow. Writes --mx/--my on the nearest `[data-spot]` card under the
 * pointer (event delegation, one listener) and on the wrapper itself for ambient glows.
 */
export default function Spotlight({
  children,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'ul';
}) {
  const ref = useRef<HTMLDivElement & HTMLUListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: hover)').matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const target = el.contains(e.target as Node) ? ((e.target as HTMLElement).closest('[data-spot]') as HTMLElement | null) : null;
        const box = target ?? el;
        const r = box.getBoundingClientRect();
        box.style.setProperty('--mx', `${e.clientX - r.left}px`);
        box.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    };
    el.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
