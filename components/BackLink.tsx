import Link from 'next/link';
import { href, type Lang } from '@/lib/i18n';
import type { Dictionary } from '@/dictionaries/no';
import styles from './BackLink.module.css';

export default function BackLink({
  lang,
  dict,
  to = '/',
  label,
}: {
  lang: Lang;
  dict: Dictionary;
  /** Language-independent path to go back to. Defaults to the front page. */
  to?: string;
  label?: string;
}) {
  return (
    <Link href={href(lang, to)} className={styles.link}>
      <span aria-hidden="true">←</span> {label ?? dict.common.backHome}
    </Link>
  );
}
