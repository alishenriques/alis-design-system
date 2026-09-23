import type { HTMLAttributes } from "react";
import styles from "./TagList.module.css";

export type TagListProps = {
  tags: string[];
} & Omit<HTMLAttributes<HTMLUListElement>, "children">;

/** A row of small outline pills, e.g. a list of technologies or skills. */
export function TagList({ tags, className, ...props }: TagListProps) {
  const classes = [styles.list, className].filter(Boolean).join(" ");

  return (
    <ul className={classes} {...props}>
      {tags.map((tag) => (
        <li key={tag} className={styles.tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
}
