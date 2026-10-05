import Link from 'next/link';
import styles from './not-found.module.css';

// Rendered without params, so it stays bilingual and links home.
export default function NotFound() {
  return (
    <section className={`container ${styles.wrap}`}>
      <p className={styles.code} aria-hidden="true">
        404
      </p>
      <h1>Siden finnes ikke · Page not found</h1>
      <p>Siden du leter etter finnes ikke, eller den har flyttet. / The page you are looking for does not exist.</p>
      <Link href="/" className="btn btn-primary">
        Hjem / Home
      </Link>
    </section>
  );
}
