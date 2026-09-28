import type { HTMLAttributes, ReactNode } from "react";
import { TagList } from "../TagList";
import styles from "./ShowcaseCard.module.css";

export type ShowcaseCardProps = {
  imageUrl: string;
  /** Default: "" (the title next to it already names the project). */
  imageAlt?: string;
  title: string;
  tags?: string[];
  description: string;
  /**
   * Rendered at the bottom of the card — typically a link. Left to the
   * consumer (rather than an `href` prop here) so it can be a framework
   * router's own link component; this component stays framework-agnostic.
   * Its hover/focus state also drives the card's own hover animation
   * (`:focus-within`), so a real focusable element here keeps the whole
   * card's motion keyboard-accessible.
   */
  footer: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "children">;

/**
 * A project/media showcase card: image, title, tags, a short description
 * and a footer slot — with a "viewfinder" hover animation (corner brackets
 * snap into place, the image comes into color, the card lifts on an
 * accent-glowing border). Motion is skipped under `prefers-reduced-motion`.
 */
export function ShowcaseCard({
  imageUrl,
  imageAlt = "",
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
        <span className={`${styles.corner} ${styles.cornerTopLeft}`} aria-hidden="true" />
        <span className={`${styles.corner} ${styles.cornerTopRight}`} aria-hidden="true" />
        <span className={`${styles.corner} ${styles.cornerBottomLeft}`} aria-hidden="true" />
        <span className={`${styles.corner} ${styles.cornerBottomRight}`} aria-hidden="true" />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        {tags.length > 0 && <TagList tags={tags} className={styles.tags} />}
        <p className={styles.description}>{description}</p>
        <div className={styles.footer}>{footer}</div>
      </div>
    </article>
  );
}
