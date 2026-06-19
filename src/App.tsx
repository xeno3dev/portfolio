import { useCallback, useEffect, useState } from "react";
import { projects } from "./projects";
import { DiskItem } from "./components/DiskItem";
import { BootScreen } from "./components/BootScreen";
import { AboutModal } from "./components/AboutModal";
import { HelpOverlay } from "./components/HelpOverlay";
import styles from "./App.module.css";

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="16" height="16">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="16" height="16">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="16" height="16">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

type Phase = "boot" | "exit" | "ready";

export default function App() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [selected, setSelected] = useState(-1);
  const [showAbout, setShowAbout] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const openSite = useCallback((i: number) => {
    const p = projects[i];
    if (!p) return;
    if (p.modal === "about") { setShowAbout(true); return; }
    if (p.url) window.open(p.url, "_blank");
  }, []);

  // Keyboard nav (only when no overlay is open and boot is done)
  useEffect(() => {
    if (phase !== "ready") return;
    const handler = (e: KeyboardEvent) => {
      if (showAbout || showHelp) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s < 0 ? 0 : s + 1, projects.length - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s < 0 ? 0 : s - 1, 0));
      } else if (e.key === "Enter" && selected >= 0) {
        openSite(selected);
      } else if (e.key === "?") {
        setShowHelp(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, selected, showAbout, showHelp, openSite]);

  // Scroll wheel navigation
  useEffect(() => {
    if (phase !== "ready") return;
    let cooldown = false;
    const handler = (e: WheelEvent) => {
      if (showAbout || showHelp || cooldown) return;
      const dir = e.deltaY > 0 || e.deltaX > 0 ? 1 : -1;
      setSelected((s) => {
        const next = Math.max(0, Math.min((s < 0 ? (dir > 0 ? 0 : 0) : s + dir), projects.length - 1));
        return next;
      });
      cooldown = true;
      setTimeout(() => { cooldown = false; }, 120);
    };
    window.addEventListener("wheel", handler, { passive: true });
    return () => window.removeEventListener("wheel", handler);
  }, [phase, showAbout, showHelp]);

  const handleBootComplete = useCallback(() => setPhase("exit"), []);
  const handleExitDone = useCallback(() => setPhase("ready"), []);

  useEffect(() => {
    if (phase !== "exit") return;
    const t = setTimeout(handleExitDone, 500);
    return () => clearTimeout(t);
  }, [phase, handleExitDone]);

  return (
    <>
      {phase !== "ready" && (
        <BootScreen exiting={phase === "exit"} onComplete={handleBootComplete} />
      )}

      <div className={styles.root}>
        <div className={styles.stage} role="listbox" aria-label="Portfolio projects">
          {projects.map((project, i) => (
            <DiskItem
              key={project.name}
              project={project}
              index={i}
              selected={selected === i}
              ejects={!project.modal}
              onFocus={() => setSelected(i)}
              onOpen={() => openSite(i)}
            />
          ))}
        </div>

        <div className={styles.bottomBar}>
          <a
            href="https://github.com/xeno3dev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.circleLink}
            data-tooltip="xeno3dev"
            aria-label="GitHub: xeno3dev"
          >
            <GithubIcon />
          </a>
          <a
            href="https://stardance.hackclub.com/@xeno3ra"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.circleLink}
            data-tooltip="@xeno3ra"
            aria-label="Stardance: @xeno3ra"
          >
            <StarIcon />
          </a>
          <a
            href="mailto:aylon@xenosolutions.dev"
            className={styles.circleLink}
            data-tooltip="aylon@xenosolutions.dev"
            aria-label="Email: aylon@xenosolutions.dev"
          >
            <MailIcon />
          </a>
        </div>
      </div>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      {showHelp && <HelpOverlay onClose={() => setShowHelp(false)} />}
    </>
  );
}
