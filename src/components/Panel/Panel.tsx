import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Panel.module.css";

export type PanelProps = {
  children: ReactNode;
  /** Applies the subtle dot-grid background used behind hero content. */
  dots?: boolean;
} & HTMLAttributes<HTMLDivElement>;

/** A raised, bordered surface — the base container for hero and card content. */
export function Panel({ children, dots = false, className, ...props }: PanelProps) {
  const classes = [styles.panel, dots && "ds-dot-grid", className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
