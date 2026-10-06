import { ImageResponse } from 'next/og';
import { isLang } from '@/lib/i18n';

export const alt = 'Ole Mathias Brænde, frontend-utvikler';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const copy = {
  no: { role: 'Frontend-utvikler', line: 'Next.js · React · TypeScript · Ytelse · Universell utforming' },
  en: { role: 'Frontend developer', line: 'Next.js · React · TypeScript · Performance · Accessibility' },
};

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const text = copy[isLang(lang) ? lang : 'no'];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          color: '#f4f4f5',
          background:
            'radial-gradient(circle at 85% 0%, rgba(255,106,77,0.45), rgba(10,10,11,0) 55%), #0a0a0b',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="16" fill="#ff6a4d" />
            <g fill="none" stroke="#1a0802" strokeWidth="6" strokeLinecap="round">
              <circle cx="20" cy="40" r="8" />
              <path d="M36 18v30" />
              <circle cx="44" cy="40" r="8" />
            </g>
          </svg>
          <div style={{ fontSize: 30, color: '#c4c4ce' }}>olebrande.no</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
            Ole Mathias Brænde
          </div>
          <div style={{ fontSize: 48, color: '#ff6a4d', marginTop: 12 }}>{text.role}</div>
          <div style={{ fontSize: 30, color: '#c4c4ce', marginTop: 28 }}>
            {text.line}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
