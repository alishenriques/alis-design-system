import type { HTMLAttributes } from "react";
import styles from "./StatGrid.module.css";

export type Stat = {
  /** e.g. "17+" */
  value: string;
  /** e.g. "anos de experiência" */
  label: string;
};

export type StatGridProps = {
  stats: Stat[];
} & Omit<HTMLAttributes<HTMLDListElement>, "children">;

/** A responsive grid of big-number stat tiles, e.g. years of experience, tests passing. */
export function StatGrid({ stats, className, ...props }: StatGridProps) {
  const classes = [styles.grid, className].filter(Boolean).join(" ");

  return (
    <dl className={classes} {...props}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.cell}>
          <dd className={styles.value}>{stat.value}</dd>
          <dt className={styles.label}>{stat.label}</dt>
        </div>
      ))}
    </dl>
  );
}
