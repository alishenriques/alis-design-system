import type { HTMLAttributes } from "react";
import styles from "./TerminalPrompt.module.css";

export type TerminalPromptProps = {
  /** e.g. "alisson" */
  user: string;
  /** e.g. "portfolio" */
  host: string;
  /** The command shown after the prompt, e.g. "whoami" */
  command: string;
} & Omit<HTMLAttributes<HTMLParagraphElement>, "children">;

/** A single terminal-style prompt line with a blinking cursor, e.g. `user@host ~$ command`. */
export function TerminalPrompt({ user, host, command, className, ...props }: TerminalPromptProps) {
  const classes = [styles.prompt, className].filter(Boolean).join(" ");

  return (
    <p className={classes} {...props}>
      <span className={styles.path}>
        {user}@{host}
      </span>
      &nbsp;~$ {command}
      <span className={styles.cursor} aria-hidden="true" />
    </p>
  );
}
