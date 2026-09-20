# @alis/design-system

Biblioteca de componentes React isolada, usada no [portfólio](https://github.com/alishenriques/alis-portfolio) e reaproveitável em projetos futuros. Publicada no npm público.

Arquitetura completa e convenções: [`docs/ai`](https://github.com/alishenriques/alis-portfolio/tree/main/docs/ai) no repositório principal.

## Uso

```bash
yarn add @alis/design-system
```

```tsx
import { Button } from "@alis/design-system";
import "@alis/design-system/styles.css";
```

Requer `react` e `react-dom` 19 como peer dependencies.

## Desenvolvimento

```bash
yarn install
yarn dev          # build em watch
```

`yarn lint` · `yarn typecheck` · `yarn test` · `yarn build`

## Componentes

- `Button` (`primary`, `ghost`)

Estilos via CSS Modules e tokens `--ds-*` (`src/tokens.css`).
