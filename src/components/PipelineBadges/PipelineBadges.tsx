import type { HTMLAttributes } from "react";
import styles from "./PipelineBadges.module.css";

export type PipelineStep = {
  /** e.g. "lint" */
  label: string;
  /** e.g. "✓" or "29 ✓". Pass real values — never invent numbers. */
  value: string;
};

export type PipelineBadgesProps = {
  steps: PipelineStep[];
} & Omit<HTMLAttributes<HTMLUListElement>, "children">;

/** A row of small chips reporting real pipeline facts, e.g. `lint ✓`, `test 29 ✓`. */
export function PipelineBadges({ steps, className, ...props }: PipelineBadgesProps) {
  const classes = [styles.list, className].filter(Boolean).join(" ");

  return (
    <ul className={classes} {...props}>
      {steps.map((step) => (
        <li key={step.label} className={styles.step}>
          {step.label} <b>{step.value}</b>
        </li>
      ))}
    </ul>
  );
}
