import Link from 'next/link';
import { href, type Lang } from '@/lib/i18n';
import type { Dictionary } from '@/dictionaries/no';
import styles from './BackLink.module.css';

export default function BackLink({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  return (
    <Link href={href(lang)} className={styles.link}>
      <span aria-hidden="true">←</span> {dict.common.backHome}
    </Link>
  );
}
