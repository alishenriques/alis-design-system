import type { BlockquoteHTMLAttributes, ReactNode } from "react";
import styles from "./Quote.module.css";

export type QuoteFloat = "none" | "left" | "right";

export type QuoteProps = {
  children: ReactNode;
  /** Small comment-style marker before the text. Default: "#". */
  marker?: string;
  /** Shows a blinking block cursor after the text. Default: true. */
  cursor?: boolean;
  /**
   * Pulls the quote to a side, magazine-style, with surrounding text
   * wrapping around it — only from the sm breakpoint up (640px); below that
   * it always stacks in normal flow, since a floated quote has no room to
   * breathe on a narrow screen. Default: "none" (stays inline, full width).
   */
  float?: QuoteFloat;
} & Omit<BlockquoteHTMLAttributes<HTMLQuoteElement>, "children">;

const FLOAT_CLASSES: Record<QuoteFloat, string | undefined> = {
  none: undefined,
  left: styles.floatLeft,
  right: styles.floatRight,
};

/**
 * A terminal-styled pull-quote: an accent left border, a comment-style marker
 * ("#" by default) and, optionally, a blinking cursor after the text — the
 * same cursor treatment used elsewhere for this "console" aesthetic. For
 * calling out a key sentence from a longer piece of copy (a bio, an article)
 * as its own visual beat, semantically a `<blockquote>`.
 */
export function Quote({
  children,
  marker = "#",
  cursor = true,
  float = "none",
  className,
  ...props
}: QuoteProps) {
  const classes = [styles.quote, FLOAT_CLASSES[float], className].filter(Boolean).join(" ");

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
