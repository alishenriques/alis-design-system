import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Eyebrow.module.css";

export type EyebrowProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLParagraphElement>;

/** Small, muted, uppercase label used above a headline or to tag a block of content. */
export function Eyebrow({ children, className, ...props }: EyebrowProps) {
  const classes = [styles.eyebrow, className].filter(Boolean).join(" ");

  return (
    <p className={classes} {...props}>
      {children}
    </p>
  );
}
