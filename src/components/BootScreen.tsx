import { useEffect } from "react";
import styles from "./BootScreen.module.css";

interface Props {
  exiting: boolean;
  onComplete: () => void;
}

export function BootScreen({ exiting, onComplete }: Props) {
  // Progress bar animation is 2 s (starts at 0.5 s delay).
  // Fire onComplete just as it finishes.
  useEffect(() => {
    const t = setTimeout(onComplete, 2600);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className={`${styles.screen} ${exiting ? styles.exit : ""}`}>
      <img
        src="/images/xeno-logo.png"
        alt="Xeno logo"
        className={styles.logo}
        draggable={false}
      />
      <div className={styles.track}>
        <div className={styles.fill} />
      </div>
    </div>
  );
}
