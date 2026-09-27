"use client";

import { useEffect, useState } from "react";
import type { ButtonHTMLAttributes } from "react";
import styles from "./Avatar.module.css";

export type AvatarProps = {
  /** Image URL. */
  src: string;
  /** Accessible name for the photo — used for both the trigger and the expanded dialog. */
  alt: string;
  /** Diameter of the collapsed circular thumbnail, in px. Default: 96. */
  size?: number;
  /** Any valid CSS size for the expanded photo. Default: "min(70vw, 60vh, 440px)". */
  expandedSize?: string;
  /**
   * CSS `object-position` for the crop, in both states — e.g. "top" when a
   * centred crop clips the subject's head. Default: "center".
   */
  objectPosition?: string;
  /** Accessible label for the × button that closes the expanded photo. Default: "Close". */
  closeLabel?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "type" | "onClick">;

const DEFAULT_SIZE = 96;
const DEFAULT_EXPANDED_SIZE = "min(70vw, 60vh, 440px)";

/**
 * A circular photo that expands into a large, centred, blurred-backdrop
 * overlay on click — the same round crop, just bigger, with a zoom-in
 * transition. Closed by the × button, a backdrop click, or Escape.
 */
export function Avatar({
  src,
  alt,
  size = DEFAULT_SIZE,
  expandedSize = DEFAULT_EXPANDED_SIZE,
  objectPosition = "center",
  closeLabel = "Close",
  className,
  ...props
}: AvatarProps) {
  const [open, setOpen] = useState(false);
  // Drives the zoom-in transition: `open` mounts the overlay at its "start"
  // (scaled down, transparent) styles, then this flips true a frame later so
  // the browser has a style change to transition from/to.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => setVisible(true));

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      cancelAnimationFrame(frame);
      setVisible(false);
    };
  }, [open]);

  const triggerClasses = [styles.trigger, className].filter(Boolean).join(" ");
  const frameClasses = [styles.frame, visible && styles.frameVisible].filter(Boolean).join(" ");
  const backdropClasses = [styles.backdrop, visible && styles.backdropVisible].filter(Boolean).join(" ");

  return (
    <>
      <button
        type="button"
        className={triggerClasses}
        style={{ width: size, height: size }}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        {...props}
      >
        <img
          src={src}
          alt={alt}
          className={styles.image}
          style={{ objectPosition }}
          loading="lazy"
        />
      </button>

      {open && (
        <div className={backdropClasses} onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div
            className={frameClasses}
            style={{ width: expandedSize, height: expandedSize }}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
          >
            <div className={styles.circle}>
              <img
                src={src}
                alt={alt}
                className={styles.expandedImage}
                style={{ objectPosition }}
              />
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setOpen(false)}
              aria-label={closeLabel}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
