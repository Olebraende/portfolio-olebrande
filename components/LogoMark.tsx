/** Geometric "ob" monogram. Shared shape with app/icon.svg. */
export default function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff8f78" />
          <stop offset="1" stopColor="#ff5a3a" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#logo-gradient)" />
      <g fill="none" stroke="#1a0802" strokeWidth="6" strokeLinecap="round">
        <circle cx="20" cy="40" r="8" />
        <path d="M36 18v30" />
        <circle cx="44" cy="40" r="8" />
      </g>
    </svg>
  );
}
