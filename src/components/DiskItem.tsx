import { useEffect, useState } from "react";
import type { Project } from "../projects";
import styles from "./DiskItem.module.css";

interface Props {
  project: Project;
  index: number;
  selected: boolean;
  ejects?: boolean;
  onFocus: () => void;
  onOpen: () => void;
}

function BootArrow() {
  return (
    <svg className={styles.arrowSvg} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10.25" strokeWidth="1.5" stroke="currentColor" />
      <polyline
        points="8 13 12 8 16 13"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        stroke="currentColor"
      />
      <line x1="12" y1="8" x2="12" y2="17" strokeWidth="1.6" strokeLinecap="round" stroke="currentColor" />
    </svg>
  );
}

export function DiskItem({ project, index, selected, ejects = true, onFocus, onOpen }: Props) {
  const [visible, setVisible] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [ejecting, setEjecting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200 + index * 200);
    return () => clearTimeout(t);
  }, [index]);

  const handleActivate = () => {
    if (ejecting) return;
    if (!ejects) { onOpen(); return; }
    setEjecting(true);
    setTimeout(() => {
      onOpen();
      setTimeout(() => setEjecting(false), 600);
    }, 380);
  };

  const showImage = project.image && !imgFailed;

  return (
    <div
      role="option"
      aria-selected={selected}
      aria-label={project.name}
      tabIndex={0}
      className={[
        styles.disk,
        visible ? styles.in : "",
        selected ? styles.selected : "",
        ejecting ? styles.ejecting : "",
      ].join(" ")}
      onClick={handleActivate}
      onFocus={onFocus}
      onKeyDown={(e) => e.key === "Enter" && handleActivate()}
    >
      <div
        className={styles.iconWrap}
        style={{ background: project.iconBg ?? "#4a4a4a" }}
      >
        {showImage ? (
          <img
            src={project.image}
            alt={project.name}
            className={styles.icon}
            onError={() => setImgFailed(true)}
            draggable={false}
          />
        ) : (
          <div className={styles.iconFallback} />
        )}
      </div>

      <span className={styles.name}>{project.name}</span>

      <div className={styles.bootArrow} aria-hidden="true">
        <BootArrow />
      </div>
    </div>
  );
}
