"use client";

import type { CSSProperties, HTMLAttributes } from "react";
import styles from "./Timeline.module.css";

export type TimelineItem = {
  id: string;
  label: string;
  /** Small square logo shown inside the node. Falls back to the label's first letter. */
  iconUrl?: string | null;
};

export type TimelineProps = {
  items: TimelineItem[];
  /** The currently selected item's id, if any. */
  selectedId?: string | null;
  onSelect?: (id: string) => void;
} & Omit<HTMLAttributes<HTMLOListElement>, "children">;

// Golden-angle hue rotation: whatever the list length, each node's color
// stays visually distinct from its neighbours without a fixed-size palette
// running out — the same trick behind evenly-spread categorical color scales.
const GOLDEN_ANGLE_DEG = 137.508;

function colorForIndex(index: number): string {
  const hue = Math.round((index * GOLDEN_ANGLE_DEG) % 360);
  return `hsl(${hue}deg 70% 60%)`;
}

/**
 * A vertical, GitKraken-style commit graph: stacked, clickable nodes
 * connected by colored lines, in the order given. Pair with `SidePanel` for
 * the GitKraken-style sliding detail view.
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
              <span className={styles.label}>{item.label}</span>
            </button>
            {index < items.length - 1 && <span className={styles.line} aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}
