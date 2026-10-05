'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const stripLang = (path: string) => path.replace(/^\/en(?=\/|$)/, '') || '/';

/**
 * Scrolls to the very top when navigating to another page. Switching language keeps the
 * current position, so only a change of the language-independent path counts.
 */
export default function ScrollReset() {
  const pathname = usePathname();
  const previous = useRef(stripLang(pathname));

  useEffect(() => {
    const current = stripLang(pathname);
    if (current === previous.current) return;
    previous.current = current;
    // Wait a frame so this wins over Next's own scroll-into-view.
    const id = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
