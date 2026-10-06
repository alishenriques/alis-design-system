# alis-design-system

Before changing anything, read the ecosystem docs in the main repo: `../alis-portfolio/docs/ai/README.md` (architecture, conventions, non-negotiables).

Quick rules: each component gets `Name.tsx` + `Name.module.css` + `Name.test.tsx` + `index.ts` and is exported from `src/index.ts`; use `--ds-*` tokens only; bump the version on public API changes. Verify with `yarn lint && yarn typecheck && yarn test && yarn build`.

## Scope and PR workflow (decided by Alisson, 2026-10-06)

- This design system serves two front-ends: `alis-portfolio` (corporate career portfolio only) and a future, separate services sales site. Components stay content-agnostic, with everything passed in via props.
- Big changes: new branch, then a detailed PR (what changed, what problem it solves, new or changed components with what they are for and a usage snippet, the version bump, architecture decisions, how it was verified). **Never merge without Alisson's explicit approval on the PR**; he reviews by commenting, so reply and fix on the same branch. Full rule: "Pull requests" in `../alis-portfolio/docs/ai/conventions.md`.
