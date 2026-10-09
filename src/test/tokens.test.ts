import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

// Read from disk: vitest stubs CSS imports, so `?raw` would come back empty.
const tokens = readFileSync(resolve(__dirname, "../tokens.css"), "utf8");

describe("tokens.css", () => {
  it.each([
    ["--ds-color-accent", "#c8ff00"],
    ["--ds-color-secondary", "#38bdf8"],
    ["--ds-color-secondary-soft", "rgba(56, 189, 248, 0.1)"],
  ])("declares %s", (name, value) => {
    expect(tokens).toContain(`${name}: ${value};`);
  });
});
