import {
  siCss,
  siExpress,
  siFigma,
  siGit,
  siHtml5,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siTypescript,
  siVercel,
} from 'simple-icons';
import { Universal } from '@/app/icons';
import styles from './Marquee.module.css';

type Tech = {
  name: string;
  /** Brand colour shown on hover. Near-black brands fall back to white. */
  hover: string;
  icon: React.ReactNode;
};

const brand = (icon: { path: string; hex: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d={icon.path} />
  </svg>
);

/** Brand colour on hover, but near-black brands (Next.js, Vercel, Express) turn white to stay visible. */
const hoverColor = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 60 ? '#ffffff' : `#${hex}`;
};

const stack: Tech[] = [
  { name: 'Next.js', hover: hoverColor(siNextdotjs.hex), icon: brand(siNextdotjs) },
  { name: 'React', hover: hoverColor(siReact.hex), icon: brand(siReact) },
  { name: 'TypeScript', hover: hoverColor(siTypescript.hex), icon: brand(siTypescript) },
  { name: 'JavaScript', hover: hoverColor(siJavascript.hex), icon: brand(siJavascript) },
  { name: 'HTML', hover: hoverColor(siHtml5.hex), icon: brand(siHtml5) },
  { name: 'CSS', hover: hoverColor(siCss.hex), icon: brand(siCss) },
  { name: 'Node.js', hover: hoverColor(siNodedotjs.hex), icon: brand(siNodedotjs) },
  { name: 'Express', hover: hoverColor(siExpress.hex), icon: brand(siExpress) },
  { name: 'PostgreSQL', hover: hoverColor(siPostgresql.hex), icon: brand(siPostgresql) },
  { name: 'Git', hover: hoverColor(siGit.hex), icon: brand(siGit) },
  { name: 'Figma', hover: hoverColor(siFigma.hex), icon: brand(siFigma) },
  { name: 'Vercel', hover: hoverColor(siVercel.hex), icon: brand(siVercel) },
  { name: 'Accessibility', hover: '#ffb199', icon: <Universal /> },
];

export default function Marquee({ label }: { label: string }) {
  return (
    <section id="stack" className={styles.wrap} aria-label={label}>
      <div className={styles.track}>
        {[0, 1].map((copy) => (
          <ul key={copy} className={styles.list} aria-hidden={copy === 1 ? 'true' : undefined}>
            {stack.map((tech) => (
              <li key={tech.name} style={{ ['--hover' as string]: tech.hover }}>
                {tech.icon}
                <span>{tech.name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
