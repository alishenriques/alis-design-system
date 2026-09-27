"use client";

import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import styles from "./LoadingButton.module.css";

export type LoadingButtonProps = {
  /** Shows the loading treatment instead of `children`, and disables the button while true. */
  isLoading: boolean;
  /**
   * The word shown after "$" while loading (e.g. "sending"). Not translated
   * by this component — pass an already-localised string, so every caller
   * can phrase it for its own action instead of a hardcoded label.
   */
  loadingText: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

/**
 * A button with a built-in, terminal-styled loading state: while `isLoading`,
 * it goes dark with an accent border and its label becomes "$ {loadingText}"
 * with a blinking block cursor — feedback right on the button, as an
 * alternative to a full-screen loading overlay for actions with a natural,
 * local place to show progress (a form's submit button is the first user).
 *
 * Idle appearance (colour, padding, icon) is entirely up to the consumer's
 * own `className`/`style`/`children`; this component only overlays the
 * loading look on top, and only while `isLoading` is true, so it works for
 * any button in any host app. That override is applied via inline styles,
 * not a CSS class: a consumer's own stylesheet (Tailwind, CSS Modules,
 * anything) could be bundled either side of this package's CSS, so a
 * class-based override can't reliably win the cascade — inline styles always
 * do, short of the consumer using `!important`.
 */
export function LoadingButton({
  isLoading,
  loadingText,
  children,
  className,
  style,
  disabled,
  type = "button",
  ...props
}: LoadingButtonProps) {
  const classes = [className].filter(Boolean).join(" ");
  const loadingStyle: CSSProperties | undefined = isLoading
    ? {
        background: "var(--ds-color-bg)",
        border: "1px solid var(--ds-color-accent)",
        color: "var(--ds-color-accent)",
        opacity: 1,
      }
    : undefined;

  return (
    <button
      type={type}
      className={classes}
      style={{ ...style, ...loadingStyle }}
      disabled={Boolean(disabled) || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <span className={styles.loadingLabel}>
          <span aria-hidden="true">$</span>
          {loadingText}
          <span aria-hidden="true" className={styles.cursor} />
        </span>
      ) : (
        children
      )}
    </button>
  );
}
