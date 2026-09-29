import type { HTMLAttributes, ReactNode } from "react";
import { TagList } from "../TagList";
import styles from "./ShowcaseCard.module.css";

export type ShowcaseCardProps = {
  imageUrl: string;
  /** Default: "" (the title next to it already names the project). */
  imageAlt?: string;
  /** Shown in the browser-chrome bar's address field, e.g. "example.com". Omit to leave it blank. */
  siteLabel?: string;
  title: string;
  tags?: string[];
  description: string;
  /**
   * Rendered inside the reveal panel, below the description — typically a
   * link. Left to the consumer (rather than an `href` prop here) so it can
   * be a framework router's own link component; this component stays
   * framework-agnostic. Its hover/focus state also drives the card's own
   * reveal (`:focus-within`), so a real focusable element here keeps it
   * keyboard-accessible.
   */
  footer: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "children">;

/**
 * A square media card framed like a browser window (traffic-light dots, an
 * address bar) — the image is the whole card. Title and up to a few tags
 * sit on a bottom scrim over the image at rest; the description and footer
 * link stay collapsed and slide open on hover/focus, so the card reads as
 * a compact thumbnail until it's actually interacted with. Always open on
 * touch devices (`hover: none`), since there's no hover to reveal it.
 * Motion is skipped under `prefers-reduced-motion`.
 */
export function ShowcaseCard({
  imageUrl,
  imageAlt = "",
  siteLabel,
  title,
  tags = [],
  description,
  footer,
  className,
  ...props
}: ShowcaseCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ");

  return (
    <article className={classes} {...props}>
      <div className={styles.imageWrap}>
        <img src={imageUrl} alt={imageAlt} className={styles.image} loading="lazy" />
      </div>

      <div className={styles.chrome} aria-hidden="true">
        <span className={styles.dots}>
          <span className={`${styles.dot} ${styles.dotRed}`} />
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
        </span>
        {siteLabel && <span className={styles.siteLabel}>{siteLabel}</span>}
      </div>

      <div className={styles.info}>
        <div className={styles.infoHeader}>
          <h3 className={styles.title}>{title}</h3>
          {tags.length > 0 && <TagList tags={tags} className={styles.tags} />}
        </div>

        <div className={styles.revealWrap}>
          <div className={styles.revealInner}>
            <p className={styles.description}>{description}</p>
            <div className={styles.footer}>{footer}</div>
          </div>
        </div>
      </div>
    </article>
  );
}
