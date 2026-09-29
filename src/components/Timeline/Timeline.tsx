"use client";

import type { CSSProperties, HTMLAttributes } from "react";
import styles from "./Timeline.module.css";

export type TimelineItem = {
  id: string;
  label: string;
  /** Small square logo shown inside the node. Falls back to the label's first letter. */
  iconUrl?: string | null;
  /** Shown next to a small tag icon, e.g. "E-Commerce" — free text, not an enum. */
  typeLabel?: string | null;
  /** A short one-line description shown after the type, e.g. a project summary. */
  description?: string | null;
};

export type TimelineProps = {
  items: TimelineItem[];
  /** The currently selected item's id, if any. */
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  // "children" and "onSelect" are both re-declared above with different
  // shapes than HTMLAttributes' own (HTMLOListElement has a native
  // `onSelect` text-selection event) — Omit them so ours win instead of
  // colliding.
} & Omit<HTMLAttributes<HTMLOListElement>, "children" | "onSelect">;

// Golden-angle hue rotation: whatever the list length, each node's color
// stays visually distinct from its neighbours without a fixed-size palette
// running out — the same trick behind evenly-spread categorical color scales.
const GOLDEN_ANGLE_DEG = 137.508;

function colorForIndex(index: number): string {
  const hue = Math.round((index * GOLDEN_ANGLE_DEG) % 360);
  return `hsl(${hue}deg 70% 60%)`;
}

/** A small generic "type" tag glyph — not tied to any specific typeLabel value, since that's free text. */
function TagIcon() {
  return (
    <svg
      className={styles.typeIcon}
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 2h6l6 6-6 6-6-6V2Z" />
      <circle cx="5" cy="5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * A vertical, GitKraken-style commit graph: stacked, clickable nodes
 * connected by colored lines, in the order given — each row reading like a
 * commit line (project name, then its type and a short description on the
 * same wrapping line, like a subject and its metadata). Pair with
 * `SidePanel` for the GitKraken-style sliding detail view.
 */
export function Timeline({ items, selectedId, onSelect, className, ...props }: TimelineProps) {
  const classes = [styles.list, className].filter(Boolean).join(" ");

  return (
    <ol className={classes} {...props}>
      {items.map((item, index) => {
        const color = colorForIndex(index);
        const selected = item.id === selectedId;
        const nodeClasses = [styles.node, selected && styles.nodeSelected].filter(Boolean).join(" ");

        return (
          <li
            key={item.id}
            className={styles.row}
            style={{ "--timeline-color": color } as CSSProperties}
          >
            <button
              type="button"
              className={styles.button}
              onClick={() => onSelect?.(item.id)}
              aria-pressed={selected}
            >
              <span className={nodeClasses}>
                {item.iconUrl ? (
                  <img src={item.iconUrl} alt="" className={styles.icon} loading="lazy" />
                ) : (
                  <span className={styles.fallback} aria-hidden="true">
                    {item.label.charAt(0).toUpperCase()}
                  </span>
                )}
              </span>
              <span className={styles.content}>
                <span className={styles.label}>{item.label}</span>
                {item.typeLabel && (
                  <>
                    <span className={styles.separator} aria-hidden="true">
                      |
                    </span>
                    <span className={styles.type}>
                      <TagIcon />
                      {item.typeLabel}
                    </span>
                  </>
                )}
                {item.description && (
                  <span className={styles.description}>
                    <span aria-hidden="true">– </span>
                    {item.description}
                  </span>
                )}
              </span>
            </button>
            {index < items.length - 1 && <span className={styles.line} aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}
