import styles from './LogoMark.module.css';

/**
 * "ob" monogram with a blinking caret, echoing the code card in the hero.
 * Same shapes as app/icon.svg.
 */
export default function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect x="1.5" y="1.5" width="61" height="61" rx="15" fill="#141417" stroke="#ff6a4d" strokeOpacity="0.55" strokeWidth="3" />
      <g fill="none" stroke="#ff6a4d" strokeWidth="5" strokeLinecap="round">
        <circle cx="17" cy="36" r="6.5" />
        <path d="M30 19v23.5" />
        <circle cx="36.5" cy="36" r="6.5" />
      </g>
      <rect className={styles.caret} x="46" y="43.5" width="11" height="5" rx="1.5" fill="#ffb199" />
    </svg>
  );
}
