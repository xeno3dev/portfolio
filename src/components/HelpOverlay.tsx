import { useEffect } from "react";
import styles from "./HelpOverlay.module.css";

interface Props {
  onClose: () => void;
}

const shortcuts = [
  { keys: ["←", "→"], desc: "Navigate" },
  { keys: ["↑", "↓"], desc: "Navigate" },
  { keys: ["Enter"], desc: "Boot selected" },
  { keys: ["Scroll"], desc: "Navigate" },
  { keys: ["?"], desc: "Show shortcuts" },
  { keys: ["Esc"], desc: "Close" },
];

export function HelpOverlay({ onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "?") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <p className={styles.title}>Keyboard Shortcuts</p>
        <div className={styles.list}>
          {shortcuts.map(({ keys, desc }) => (
            <div className={styles.row} key={desc + keys.join("")}>
              <div className={styles.keys}>
                {keys.map((k) => (
                  <kbd className={styles.key} key={k}>{k}</kbd>
                ))}
              </div>
              <span className={styles.desc}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
