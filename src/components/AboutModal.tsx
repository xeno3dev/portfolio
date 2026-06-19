import { useEffect } from "react";
import styles from "./AboutModal.module.css";

interface Props {
  onClose: () => void;
}

/* ── Language icons ───────────────────────────────────────── */
function ReactIcon() {
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" aria-label="React">
      <rect width="28" height="28" rx="5" fill="#20232A"/>
      <ellipse cx="14" cy="14" rx="9.5" ry="3.6" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
      <ellipse cx="14" cy="14" rx="9.5" ry="3.6" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 14 14)"/>
      <ellipse cx="14" cy="14" rx="9.5" ry="3.6" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 14 14)"/>
      <circle cx="14" cy="14" r="2.1" fill="#61DAFB"/>
    </svg>
  );
}

function ImgIcon({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} width="28" height="28" className="langImg" draggable={false} />;
}

const langs = [
  { name: "Python",     node: <ImgIcon src="/images/lang-py.png"  alt="Python" /> },
  { name: "TypeScript", node: <ImgIcon src="/images/lang-ts.png"  alt="TypeScript" /> },
  { name: "JavaScript", node: <ImgIcon src="/images/lang-js.png"  alt="JavaScript" /> },
  { name: "CSS",        node: <ImgIcon src="/images/lang-css.svg" alt="CSS" /> },
  { name: "React",      node: <ReactIcon /> },
  { name: "Rust",       node: <ImgIcon src="/images/lang-rust.png" alt="Rust" /> },
];

const makes = ["Websites", "Apps", "Desktop Apps", "CLI Tools", "Games"];

/* ── Component ────────────────────────────────────────────── */
export function AboutModal({ onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 14 14" fill="none" width="8" height="8" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Avatar */}
        <img src="/images/avatar.webp" alt="Aylon" className={styles.avatar} draggable={false} />
        <h1 className={styles.name}>Aylon</h1>
        <p className={styles.title}>CEO of Xeno Solutions</p>
        <p className={styles.arch}>I use Arch BTW</p>

        <div className={styles.divider} />

        {/* Makes */}
        <p className={styles.sectionLabel}>Makes</p>
        <div className={styles.chips}>
          {makes.map((m) => (
            <span className={styles.chip} key={m}>{m}</span>
          ))}
        </div>

        <div className={styles.divider} />

        {/* Languages */}
        <p className={styles.sectionLabel}>Languages &amp; Tools</p>
        <div className={styles.langs}>
          {langs.map(({ name, node }) => (
            <div className={styles.lang} key={name}>
              {node}
              <span className={styles.langName}>{name}</span>
            </div>
          ))}
        </div>

        <div className={styles.divider} />

        {/* Links */}
        <div className={styles.infoTable}>
          <div className={styles.row}>
            <span className={styles.label}>GitHub</span>
            <a href="https://github.com/xeno3dev" target="_blank" rel="noopener noreferrer" className={styles.value}>
              xeno3dev
            </a>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Stardance</span>
            <a href="https://stardance.hackclub.com/@xeno3ra" target="_blank" rel="noopener noreferrer" className={styles.value}>
              @xeno3ra
            </a>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Email</span>
            <a href="mailto:aylon@xenosolutions.dev" className={styles.value}>
              aylon@xenosolutions.dev
            </a>
          </div>
        </div>

        <div className={styles.divider} />

        <p className={styles.built}>Built with React + TypeScript + Vite</p>
      </div>
    </div>
  );
}
