# @alishenriques/design-system

Biblioteca de componentes React isolada, usada no [portfólio](https://github.com/alishenriques/alis-portfolio) e reaproveitável em projetos futuros. Publicada no npm público.

Arquitetura completa e convenções: [`docs/ai`](https://github.com/alishenriques/alis-portfolio/tree/main/docs/ai) no repositório principal.

## Uso

```bash
yarn add @alishenriques/design-system
```

```tsx
import { Button } from "@alishenriques/design-system";
import "@alishenriques/design-system/styles.css";
```

Requer `react` e `react-dom` 19 como peer dependencies.

## Desenvolvimento

```bash
yarn install
yarn dev          # build em watch
```

`yarn lint` · `yarn typecheck` · `yarn test` · `yarn build`

## Componentes

- `Avatar` — foto circular que expande em overlay (zoom, blur no fundo, fecha no ×/Escape/clique fora)
- `Button` (`primary`, `ghost`)
- `CommandPalette` — busca/atalhos em overlay (⌘K)
- `Eyebrow` — rótulo pequeno em maiúsculas
- `LoadingButton` — botão com estado de carregamento embutido (`isLoading`, `loadingText`)
- `Panel` — superfície elevada com borda, com fundo em grade de pontos opcional
- `PipelineBadges` — chips estilo pipeline de CI
- `Quote` — citação em destaque estilo terminal (`#`/marcador customizável, cursor piscando opcional, `float` para puxar para a lateral)
- `ShowcaseCard` — card de mídia (imagem, título, tags, descrição, rodapé livre para o link) com animação de hover estilo "viewfinder" (cantos que se encaixam, imagem que ganha cor)
- `SidePanel` — painel lateral deslizante estilo GitKraken (`open`/`onClose` controlados, fecha no ×/Escape/clique fora)
- `StatGrid` — grade de estatísticas
- `TagList` — lista de tags
- `TerminalPrompt` — linha de prompt de terminal com cursor piscando
- `Timeline` — grafo vertical estilo GitKraken (nós empilhados e clicáveis, ligados por linhas coloridas em rotação automática)

Estilos via CSS Modules e tokens `--ds-*` (`src/tokens.css`).

## Convenção: quando um componente entra aqui

Qualquer componente **reaproveitável em mais de um contexto** — não amarrado a uma marca, texto ou dado específico de um produto — nasce **aqui**, não direto no app consumidor: props dinâmicas (nunca texto/comportamento fixo), componente desacoplado (sem depender de dado externo específico de um app) e sempre com testes unitários. `alis-portfolio` só importa e consome; ele não duplica esses componentes localmente. Exemplo: `LoadingButton` e `Avatar` nasceram de necessidades do portfólio, mas como nada neles é específico do portfólio (o texto de carregamento e o rótulo do botão de fechar são props), vivem aqui. Já `Logo` (a marca do Alisson) e `LoadingOverlay` (que usa esse `Logo` internamente) ficam no `alis-portfolio`, por serem específicos daquele produto.
