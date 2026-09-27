"use client";

import { useEffect } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import styles from "./SidePanel.module.css";

export type SidePanelProps = {
  open: boolean;
  onClose: () => void;
  /** Accessible label for the dialog, e.g. the selected item's name. */
  label: string;
  children: ReactNode;
  /** Accessible label for the × button that closes the panel. Default: "Close". */
  closeLabel?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

/**
 * A lateral drawer that slides in from the right over a dimming backdrop —
 * the GitKraken-style detail panel. Stays mounted while closed (slides
 * off-screen via a CSS transform, `aria-hidden` toggled) so the same
 * transition plays going out, not just coming in. Closed by the × button, a
 * backdrop click, or Escape.
 */
export function SidePanel({
  open,
  onClose,
  label,
  children,
  closeLabel = "Close",
  className,
  ...props
}: SidePanelProps) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const backdropClasses = [styles.backdrop, open && styles.backdropVisible].filter(Boolean).join(" ");
  const panelClasses = [styles.panel, open && styles.panelOpen, className].filter(Boolean).join(" ");

  return (
    <>
      <div className={backdropClasses} aria-hidden="true" onClick={() => open && onClose()} />
      <div
        className={panelClasses}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        aria-hidden={!open}
        inert={!open}
        {...props}
      >
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label={closeLabel}>
          ×
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
}
