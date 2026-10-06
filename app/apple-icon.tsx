import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#141417' }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
          <g fill="none" stroke="#ff6a4d" strokeWidth="5" strokeLinecap="round">
            <circle cx="17" cy="36" r="6.5" />
            <path d="M30 19v23.5" />
            <circle cx="36.5" cy="36" r="6.5" />
          </g>
          <rect x="46" y="43.5" width="11" height="5" rx="1.5" fill="#ffb199" />
        </svg>
      </div>
    ),
    size,
  );
}
