import type { HTMLAttributes, ReactNode } from "react";
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
 * A media card: the image sits up top, framed like a browser window
 * (traffic-light dots, an address bar) — the title and tags live below it
 * on the card's own solid background, always legible regardless of what's
 * in the screenshot. The description and footer link start collapsed and
 * slide open on hover/focus (CSS `grid-template-rows: 0fr → 1fr`, sized to
 * fit whatever content it's given), so the card stays compact at rest and
 * grows to reveal more — always open on touch (`hover: none`), since
 * there's no hover there to trigger it. Motion is skipped under
 * `prefers-reduced-motion`.
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
      <div className={styles.mediaWrap}>
        <img src={imageUrl} alt={imageAlt} className={styles.image} loading="lazy" />
        <div className={styles.chrome} aria-hidden="true">
          <span className={styles.dots}>
            <span className={`${styles.dot} ${styles.dotRed}`} />
            <span className={`${styles.dot} ${styles.dotYellow}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`} />
          </span>
          {siteLabel && <span className={styles.siteLabel}>{siteLabel}</span>}
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        {tags.length > 0 && (
          // Not the DS TagList: this card needs a visibly smaller, boxier chip
          // to keep tags on one line at this card's narrow width — TagList's
          // own look is shared by every other consumer and stays as-is.
          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}

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
