import Link from 'next/link';
import { href, type Lang } from '@/lib/i18n';
import { ArrowRight } from '@/app/icons';
import styles from './CtaBand.module.css';

export default function CtaBand({
  lang,
  title,
  text,
  button,
}: {
  lang: Lang;
  title: string;
  text: string;
  button: string;
}) {
  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="container">
        <div className={`${styles.band} reveal`}>
          <h2 id="cta-title">{title}</h2>
          <p>{text}</p>
          <Link href={href(lang, '/kontakt')} className="btn btn-primary">
            {button} <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
