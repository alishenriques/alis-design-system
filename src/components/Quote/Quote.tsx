import type { BlockquoteHTMLAttributes, ReactNode } from "react";
import styles from "./Quote.module.css";

export type QuoteProps = {
  children: ReactNode;
  /** Small comment-style marker before the text. Default: "#". */
  marker?: string;
  /** Shows a blinking block cursor after the text. Default: true. */
  cursor?: boolean;
} & Omit<BlockquoteHTMLAttributes<HTMLQuoteElement>, "children">;

/**
 * A terminal-styled pull-quote: an accent left border, a comment-style marker
 * ("#" by default) and, optionally, a blinking cursor after the text — the
 * same cursor treatment used elsewhere for this "console" aesthetic. For
 * calling out a key sentence from a longer piece of copy (a bio, an article)
 * as its own visual beat, semantically a `<blockquote>`.
 */
export function Quote({ children, marker = "#", cursor = true, className, ...props }: QuoteProps) {
  const classes = [styles.quote, className].filter(Boolean).join(" ");

  return (
    <blockquote className={classes} {...props}>
      <span className={styles.marker} aria-hidden="true">
        {marker}
      </span>
      <p className={styles.text}>
        {children}
        {cursor && <span className={styles.cursor} aria-hidden="true" />}
      </p>
    </blockquote>
  );
}
