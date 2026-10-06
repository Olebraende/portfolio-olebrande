import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #ff8f78, #ff5a3a)',
        }}
      >
        <svg width="180" height="180" viewBox="0 0 64 64">
          <g fill="none" stroke="#1a0802" strokeWidth="6" strokeLinecap="round">
            <circle cx="20" cy="40" r="8" />
            <path d="M36 18v30" />
            <circle cx="44" cy="40" r="8" />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
