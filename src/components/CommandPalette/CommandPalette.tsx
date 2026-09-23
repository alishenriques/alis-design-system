"use client";

import { useEffect, useRef, useState } from "react";
import type { ButtonHTMLAttributes } from "react";
import styles from "./CommandPalette.module.css";

export type CommandPaletteItem = {
  label: string;
  href: string;
  /** Short trailing hint, e.g. "7 empresas" or "↗ github.com/…" */
  hint?: string;
};

export type CommandPaletteProps = {
  items: CommandPaletteItem[];
  /** Text on the trigger button. Default: "Search" */
  triggerLabel?: string;
  /** Input placeholder. Default: "Type a command or search…" */
  placeholder?: string;
  /** Accessible label for the dialog. Default: "Command palette" */
  label?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "type" | "onClick">;

/**
 * A trigger button plus overlay: filterable list of links, opened by clicking
 * the trigger or pressing Cmd/Ctrl+K anywhere on the page, closed by Escape,
 * a backdrop click, or picking an item.
 */
export function CommandPalette({
  items,
  triggerLabel = "Search",
  placeholder = "Type a command or search…",
  label = "Command palette",
  className,
  ...props
}: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const isCombo = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (isCombo) {
        event.preventDefault();
        setOpen((current) => !current);
        return;
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const filtered = items.filter((item) => {
    const haystack = `${item.label} ${item.hint ?? ""}`.toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  });

  const classes = [styles.trigger, className].filter(Boolean).join(" ");

  return (
    <>
      <button type="button" className={classes} onClick={() => setOpen(true)} {...props}>
        <span>{triggerLabel}</span>
        <kbd className={styles.kbd}>⌘K</kbd>
      </button>

      {open && (
        <div className={styles.backdrop} onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className={styles.dialog} role="dialog" aria-modal="true" aria-label={label}>
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            <ul className={styles.list}>
              {filtered.map((item) => (
                // Keyed by href, not label: two items can share a label (e.g.
                // a nav link and a more specific shortcut to the same topic).
                <li key={item.href}>
                  <a href={item.href} onClick={() => setOpen(false)}>
                    <span>{item.label}</span>
                    {item.hint && <small>{item.hint}</small>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
