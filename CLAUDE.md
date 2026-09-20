# alis-design-system

Before changing anything, read the ecosystem docs in the main repo: `../alis-portfolio/docs/ai/README.md` (architecture, conventions, non-negotiables).

Quick rules: each component gets `Name.tsx` + `Name.module.css` + `Name.test.tsx` + `index.ts` and is exported from `src/index.ts`; use `--ds-*` tokens only; bump the version on public API changes. Verify with `yarn lint && yarn typecheck && yarn test && yarn build`.
