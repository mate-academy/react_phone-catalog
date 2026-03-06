# 📱 React Phone Catalog

Um catálogo de produtos completo (phones, tablets e acessórios) com carrinho de compras, favoritos e **tema claro/escuro**, construído com React 18 + TypeScript + Vite.

![Status do Projeto](https://img.shields.io/badge/Status-Conclu%C3%ADdo-green)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.3.1-646CFF?logo=vite&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS_Modules-CC6699?logo=sass&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.25-CA4245?logo=reactrouter&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-13.13-17202C?logo=cypress&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-8.57-4B32C3?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-3.3.2-F7B93E?logo=prettier&logoColor=black)
![Stylelint](https://img.shields.io/badge/Stylelint-16.7-263238?logo=stylelint&logoColor=white)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20First-blue)

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Demo](#-demo)
- [Tecnologias](#-tecnologias-e-ferramentas)
- [Funcionalidades](#-funcionalidades-implementadas)
- [Arquitetura](#-arquitetura-do-projeto)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Design System](#-design-system)
- [Componentes](#-componentes)
- [Páginas e Rotas](#-páginas-e-rotas)
- [Gerenciamento de Estado](#-gerenciamento-de-estado)
- [Testes](#-testes)
- [Instalação](#-instalação-e-execução)
- [Scripts](#-scripts-disponíveis)
- [Design de Referência](#-design-de-referência)
- [Licença](#-licença)
- [Autor](#-autor)

---

## 🎯 Visão Geral

Este projeto é um catálogo de produtos da Apple com funcionalidades completas de e-commerce: listagem com filtros e paginação, página de detalhes com galeria de imagens e seletores de cor/capacidade, carrinho de compras com controle de quantidade, e favoritos. Inclui suporte nativo a **tema claro/escuro** com persistência via `localStorage` e detecção automática de preferência do sistema.

### Principais Características:

- ✅ **100% Responsivo** (Mobile → Tablet → Desktop)
- ✅ **Tema Claro/Escuro** com toggle animado (sol/lua) e persistência
- ✅ **Carrinho de Compras** com `useReducer` e `localStorage`
- ✅ **Favoritos** com persistência local
- ✅ **Busca com Debounce** (300ms) integrada à URL
- ✅ **Paginação e Ordenação** controlados por URL params
- ✅ **Galeria de Imagens** com seletores de cor e capacidade
- ✅ **Slider Automático** no banner hero (5s)
- ✅ **Carrossel de Produtos** (Hot Prices, Brand New)
- ✅ **React Router v6** com HashRouter e rotas aninhadas
- ✅ **SCSS Modules** com CSS Custom Properties para temas
- ✅ **Código Limpo** com ESLint (Airbnb), Prettier e Stylelint

---

## 🌐 Demo

**Produção:** [https://glauccoeng-prog.github.io/react_phone-catalog/](https://glauccoeng-prog.github.io/react_phone-catalog/)

---

## 🚀 Tecnologias e Ferramentas

### Core

| Tecnologia                                    | Versão | Descrição                                |
| --------------------------------------------- | ------ | ---------------------------------------- |
| [React](https://react.dev/)                   | 18.3.1 | Biblioteca de UI com hooks e Context API |
| [TypeScript](https://www.typescriptlang.org/) | 5.2    | Tipagem estática para JavaScript         |
| [Vite](https://vitejs.dev/)                   | 5.3.1  | Build tool ultra-rápida com HMR          |
| [React Router](https://reactrouter.com/)      | 6.25.1 | Roteamento SPA com HashRouter            |
| [SCSS/Sass](https://sass-lang.com/)           | 1.77.8 | Pré-processador CSS com módulos          |

### Estilização

| Tecnologia                                                | Descrição                                      |
| --------------------------------------------------------- | ---------------------------------------------- |
| [CSS Modules](https://github.com/css-modules/css-modules) | Estilos escopados por componente               |
| CSS Custom Properties                                     | Sistema de temas claro/escuro                  |
| [Mont Font](https://www.fontshop.com/families/mont)       | Tipografia principal (Regular, SemiBold, Bold) |
| Flexbox / CSS Grid                                        | Layouts flexíveis e responsivos                |
| BEM Naming                                                | Convenção de nomenclatura CSS                  |

### Bibliotecas Adicionais

| Biblioteca                                                                   | Versão  | Descrição                |
| ---------------------------------------------------------------------------- | ------- | ------------------------ |
| [classnames](https://www.npmjs.com/package/classnames)                       | 2.5.1   | Classes CSS condicionais |
| [react-transition-group](https://reactcommunity.org/react-transition-group/) | 4.4.5   | Animações de transição   |
| [i18next](https://www.i18next.com/)                                          | 25.8.14 | Internacionalização      |
| [Font Awesome](https://fontawesome.com/)                                     | 6.5.2   | Biblioteca de ícones     |

### Qualidade de Código

| Tecnologia                         | Versão | Descrição                                 |
| ---------------------------------- | ------ | ----------------------------------------- |
| [ESLint](https://eslint.org/)      | 8.57.0 | Linter JS/TS (config Airbnb + TypeScript) |
| [Prettier](https://prettier.io/)   | 3.3.2  | Formatador de código automático           |
| [Stylelint](https://stylelint.io/) | 16.7.0 | Linter para CSS/SCSS                      |

### Testes

| Tecnologia                                               | Versão  | Descrição                         |
| -------------------------------------------------------- | ------- | --------------------------------- |
| [Cypress](https://www.cypress.io/)                       | 13.13.0 | Testes E2E e de componente        |
| [Mochawesome](https://adamgruber.github.io/mochawesome/) | 7.1.3   | Relatórios de testes em JSON/HTML |

---

## ✨ Funcionalidades Implementadas

### 1. 🌓 Tema Claro/Escuro

- **Toggle animado** com ícones SVG inline (sol/lua)
- **3 fontes de detecção**: `localStorage` → `prefers-color-scheme` → fallback `light`
- **Persistência** via `localStorage` (chave `theme`)
- **CSS Custom Properties** para transição suave entre temas
- **Inversão automática** de ícones SVG no modo escuro (`filter: invert`)
- **Atributo `data-no-invert`** para excluir ícones específicos (ex: coração vermelho)
- **Paleta dark**: botões roxos (#905BFF), superfícies #161827, cards #323542

### 2. 🛒 Carrinho de Compras

- **Adicionar/remover** produtos com feedback visual
- **Controle de quantidade** (incrementar/decrementar)
- **Cálculo automático** de total (preço × quantidade)
- **Persistência** em `localStorage` (chave `cart`)
- **Gerenciado com `useReducer`** (ações: ADD, REMOVE, INCREMENT, DECREMENT, CLEAR)
- **Checkout** com dialog de confirmação

### 3. ❤️ Favoritos

- **Toggle** de favorito com ícone de coração (outline/filled)
- **Persistência** em `localStorage` (chave `favorites`)
- **Busca** dentro dos favoritos via URL param `query`
- **Contador** no badge do header

### 4. 🔍 Busca com Debounce

- **Input com debounce de 300ms** para performance
- **Integrado à URL** via `useSearchParams`
- **Filtra em tempo real** pelo nome do produto
- **Disponível** nas páginas de listagem e favoritos

### 5. 🖼️ Página de Detalhes do Produto

- **Galeria de imagens** com thumbnails clicáveis
- **Seletor de cor** com 25+ mapeamentos de nome → hex
- **Seletor de capacidade** com links dinâmicos
- **Seção "About"** com descrições renderizadas a partir de array
- **Tabela de specs** (tela, resolução, processador, RAM, câmera, etc.)
- **"You may also like"** com produtos sugeridos aleatoriamente

### 6. 📊 Listagem com Filtros e Paginação

- **Ordenação**: Mais novos, A-Z, Preço baixo
- **Itens por página**: 4, 8, 16, Todos
- **Paginação** com janela deslizante de 4 páginas visíveis
- **Todos os parâmetros controlados via URL** (sort, perPage, page, query)
- **Breadcrumbs** de navegação

### 7. 🎠 Sliders e Carrosséis

- **Banner hero** com 4 imagens, auto-play a cada 5s
- **"Hot Prices"** — produtos com maior desconto
- **"Brand New Models"** — produtos mais recentes
- **Navegação** por setas com botões prev/next
- **Dot indicators** no banner

### 8. 📱 Design Responsivo

- **3 breakpoints**: Mobile (< 640px), Tablet (640px), Desktop (1200px)
- **Conteúdo limitado** a `max-width: 1136px`
- **Header responsivo** com menu hamburger mobile
- **Grids adaptativos** para categorias e cards

---

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura modular com separação clara de responsabilidades.

### Fluxo de Dados

```
┌──────────────┐     ┌────────────────┐     ┌──────────────────────┐
│  HashRouter  │────▶│    App.tsx     │────▶│   Layout (Header +   │
│  (index.tsx) │     │  (Providers)   │     │   Outlet + Footer)   │
└──────────────┘     └────────────────┘     └──────────────────────┘
                            │
                 ┌──────────┼──────────┐
                 ▼          ▼          ▼
          ThemeProvider CartProvider FavoritesProvider
          (useState)    (useReducer) (useState)
                 │          │          │
                 └──────────┼──────────┘
                            ▼
                     ┌──────────────┐
                     │  /public/api │  ← JSON estático
                     │  (fetch +    │
                     │  300ms delay)│
                     └──────────────┘
```

### Padrões Utilizados

| Padrão                    | Onde                               | Descrição                           |
| ------------------------- | ---------------------------------- | ----------------------------------- |
| **Context + Reducer**     | `CartContext`                      | Gerenciamento de estado complexo    |
| **Context + State**       | `FavoritesContext`, `ThemeContext` | Estado simples                      |
| **Barrel Exports**        | `index.ts` em cada componente      | Re-export para imports limpos       |
| **CSS Modules**           | Todos componentes                  | Estilos escopados                   |
| **CSS Custom Properties** | `_base.scss`                       | Temas sem re-render                 |
| **URL-driven State**      | `ProductsPage`                     | Sort, page, perPage como URL params |
| **Debounced Input**       | `Header`                           | Otimização de buscas                |
| **Lazy Initialization**   | `CartContext`                      | `localStorage` lido uma única vez   |

---

## 📂 Estrutura de Pastas

```
react_phone-catalog/
├── 📄 index.html                         # HTML principal (entry point)
├── 📄 package.json                       # Dependências e scripts npm
├── 📄 vite.config.ts                     # Configuração do Vite
├── 📄 tsconfig.json                      # Configuração TypeScript
├── 📄 cypress.config.ts                  # Configuração do Cypress
├── 📄 LICENSE                            # Licença GPL-3.0
├── 📄 README.md                          # Esta documentação
│
├── 📁 cypress/                           # Testes E2E
│   ├── 📁 integration/
│   │   └── 📄 page.spec.js              # Testes da página
│   └── 📁 support/
│       ├── 📄 commands.ts               # Comandos customizados
│       ├── 📄 component.ts              # Setup de componentes
│       ├── 📄 component-index.html      # HTML para component testing
│       └── 📄 e2e.ts                    # Configuração E2E
│
├── 📁 public/                            # Assets estáticos
│   ├── 📁 api/                           # JSON API estática
│   │   ├── 📄 products.json             # Todos os produtos (listagem)
│   │   ├── 📄 phones.json              # Detalhes de phones
│   │   ├── 📄 tablets.json             # Detalhes de tablets
│   │   └── 📄 accessories.json         # Detalhes de acessórios
│   ├── 📁 fonts/                         # Fontes Mont (otf)
│   └── 📁 img/                           # Imagens
│       ├── 📁 icons/                     # SVG icons (setas, coração, etc.)
│       ├── 📁 phones/                    # Fotos por modelo de phone
│       ├── 📁 tablets/                   # Fotos por modelo de tablet
│       └── 📁 accessories/              # Fotos por modelo de acessório
│
└── 📁 src/                               # Código fonte
    │
    ├── 📄 index.tsx                      # Entry point (HashRouter + App)
    ├── 📄 App.tsx                        # Providers + Routes + Layout
    ├── 📄 App.scss                       # Estilos globais da App
    ├── 📄 vite-env.d.ts                  # Tipos do Vite
    │
    ├── 📁 styles/                        # Estilos globais
    │   ├── 📄 _variables.scss            # Tokens, fonts, mixins, breakpoints
    │   └── 📄 _base.scss                # Reset, temas (CSS vars), utilitários
    │
    ├── 📁 types/                         # Interfaces TypeScript
    │   ├── 📄 Product.ts                # Produto (listagem)
    │   ├── 📄 ProductDetails.ts         # Detalhes do produto
    │   └── 📄 CartItem.ts              # Item do carrinho
    │
    ├── 📁 utils/
    │   └── 📄 api.ts                    # Funções de fetch (JSON estático)
    │
    ├── 📁 context/                       # React Contexts
    │   ├── 📄 ThemeContext.tsx           # Tema claro/escuro
    │   ├── 📄 CartContext.tsx            # Carrinho (useReducer)
    │   └── 📄 FavoritesContext.tsx       # Favoritos (useState)
    │
    ├── 📁 components/                    # Componentes reutilizáveis
    │   ├── 📁 Header/                    # Navegação + busca + badges
    │   ├── 📁 Footer/                    # Rodapé + back to top
    │   ├── 📁 ThemeToggle/               # Botão sol/lua
    │   ├── 📁 ProductCard/               # Card de produto
    │   ├── 📁 ProductsSlider/            # Carrossel horizontal
    │   ├── 📁 PicturesSlider/            # Banner hero auto-play
    │   ├── 📁 Pagination/                # Paginação com janela deslizante
    │   ├── 📁 Dropdown/                  # Select genérico com label
    │   ├── 📁 Breadcrumbs/               # Trilha de navegação
    │   ├── 📁 BackButton/                # Botão voltar (history)
    │   └── 📁 Loader/                    # Spinner de carregamento
    │
    └── 📁 modules/                       # Páginas (módulos por rota)
        ├── 📁 HomePage/                  # Página inicial (sliders + categorias)
        ├── 📁 PhonesPage/                # Listagem de phones
        ├── 📁 TabletsPage/               # Listagem de tablets
        ├── 📁 AccessoriesPage/           # Listagem de acessórios
        ├── 📁 ProductsPage/              # Componente de listagem reutilizável
        ├── 📁 ProductDetailsPage/        # Detalhes com galeria + specs
        ├── 📁 FavoritesPage/             # Produtos favoritados
        ├── 📁 CartPage/                  # Carrinho de compras
        └── 📁 NotFoundPage/              # Página 404
```

---

## 🎨 Design System

### Paleta de Cores — Tema Claro (Light)

| Variável               | Valor     | Uso                  |
| ---------------------- | --------- | -------------------- |
| `--color-primary`      | `#313237` | Textos principais    |
| `--color-secondary`    | `#89939A` | Textos secundários   |
| `--color-icons`        | `#B4BDC3` | Ícones               |
| `--color-elements`     | `#E2E6E9` | Bordas e separadores |
| `--color-hover-and-bg` | `#FAFBFC` | Hover e backgrounds  |
| `--color-white`        | `#FFFFFF` | Fundo principal      |
| `--color-accent`       | `#4219D0` | Cor de destaque      |
| `--color-button`       | `#313237` | Botões CTA           |
| `--color-surface`      | `#FFFFFF` | Superfície dos cards |

### Paleta de Cores — Tema Escuro (Dark)

| Variável               | Valor     | Uso                          |
| ---------------------- | --------- | ---------------------------- |
| `--color-primary`      | `#F1F2F9` | Textos principais            |
| `--color-secondary`    | `#75767F` | Textos secundários           |
| `--color-icons`        | `#4A4D58` | Ícones                       |
| `--color-elements`     | `#3B3E4A` | Bordas e separadores         |
| `--color-hover-and-bg` | `#323542` | Hover e Surface 2            |
| `--color-white`        | `#0F1121` | Fundo principal (Gray-Black) |
| `--color-accent`       | `#905BFF` | Cor de destaque (Roxo)       |
| `--color-button`       | `#905BFF` | Botões CTA (Roxo)            |
| `--color-surface`      | `#161827` | Superfície dos cards         |

### Tipografia

| Propriedade        | Valor                                     |
| ------------------ | ----------------------------------------- |
| Font Family        | `Mont, Arial, sans-serif`                 |
| Font Weights       | 400 (Regular), 600 (SemiBold), 700 (Bold) |
| Font Size (base)   | 14px                                      |
| Line Height (base) | 21px                                      |

### Breakpoints

| Variável   | Valor   | Dispositivo     |
| ---------- | ------- | --------------- |
| Base       | < 640px | Mobile (padrão) |
| `$tablet`  | 640px   | Tablets         |
| `$desktop` | 1200px  | Desktop         |

### Grid

| Propriedade     | Valor  |
| --------------- | ------ |
| Max Width       | 1136px |
| Padding Mobile  | 16px   |
| Padding Tablet  | 24px   |
| Padding Desktop | 48px   |

---

## 🧩 Componentes

### Componentes Reutilizáveis

| Componente       | Arquivo                      | Descrição                                    |
| ---------------- | ---------------------------- | -------------------------------------------- |
| `Header`         | `components/Header/`         | Nav + busca debounced + badges + menu mobile |
| `Footer`         | `components/Footer/`         | Links + "Back to top" smooth scroll          |
| `ThemeToggle`    | `components/ThemeToggle/`    | Toggle claro/escuro com SVG animado          |
| `ProductCard`    | `components/ProductCard/`    | Card com preços, specs, cart e favorito      |
| `ProductsSlider` | `components/ProductsSlider/` | Carrossel com setas (Hot Prices, Brand New)  |
| `PicturesSlider` | `components/PicturesSlider/` | Banner hero com auto-play 5s + dots          |
| `Pagination`     | `components/Pagination/`     | Paginação com janela de 4 páginas            |
| `Dropdown`       | `components/Dropdown/`       | Select nativo com label                      |
| `Breadcrumbs`    | `components/Breadcrumbs/`    | Trilha Home > Categoria > Produto            |
| `BackButton`     | `components/BackButton/`     | Navegação history.back()                     |
| `Loader`         | `components/Loader/`         | Spinner CSS animado                          |

### Mixins SCSS

| Mixin                    | Descrição                  | Uso                                |
| ------------------------ | -------------------------- | ---------------------------------- |
| `on-tablet`              | Media query ≥ 640px        | `@include on-tablet { ... }`       |
| `on-desktop`             | Media query ≥ 1200px       | `@include on-desktop { ... }`      |
| `content-padding-inline` | Padding lateral responsivo | `@include content-padding-inline;` |

---

## 🗺️ Páginas e Rotas

| Rota                  | Componente                         | Descrição                                        |
| --------------------- | ---------------------------------- | ------------------------------------------------ |
| `/`                   | `HomePage`                         | Banner, sliders Hot Prices/Brand New, categorias |
| `/phones`             | `PhonesPage` → `ProductsPage`      | Listagem de phones com filtros                   |
| `/tablets`            | `TabletsPage` → `ProductsPage`     | Listagem de tablets com filtros                  |
| `/accessories`        | `AccessoriesPage` → `ProductsPage` | Listagem de acessórios com filtros               |
| `/product/:productId` | `ProductDetailsPage`               | Galeria, specs, cor, capacidade, sugestões       |
| `/favorites`          | `FavoritesPage`                    | Produtos favoritados com busca                   |
| `/cart`               | `CartPage`                         | Carrinho com quantidades e checkout              |
| `*`                   | `NotFoundPage`                     | Página 404                                       |

> **Nota:** `PhonesPage`, `TabletsPage` e `AccessoriesPage` são wrappers finos que renderizam `ProductsPage` com a categoria correspondente.

---

## 🧠 Gerenciamento de Estado

### Contexts

| Context            | Padrão       | Persistência                | Funcionalidades                                                                                              |
| ------------------ | ------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `ThemeContext`     | `useState`   | `localStorage("theme")`     | `theme`, `toggleTheme()`                                                                                     |
| `CartContext`      | `useReducer` | `localStorage("cart")`      | `addToCart`, `removeFromCart`, `increment`, `decrement`, `clearCart`, `isInCart`, `totalItems`, `totalPrice` |
| `FavoritesContext` | `useState`   | `localStorage("favorites")` | `toggleFavorite`, `isFavorite`, `totalFavorites`, `favorites[]`                                              |

### Hierarquia de Providers

```
<HashRouter>
  <ThemeProvider>          ← Tema (data-theme no <html>)
    <CartProvider>         ← Carrinho (useReducer)
      <FavoritesProvider>  ← Favoritos (useState)
        <Routes />
      </FavoritesProvider>
    </CartProvider>
  </ThemeProvider>
</HashRouter>
```

### API Layer

| Função                   | Descrição                                            |
| ------------------------ | ---------------------------------------------------- |
| `getProducts()`          | Retorna todos os produtos (`products.json`)          |
| `getPhones()`            | Retorna detalhes dos phones (`phones.json`)          |
| `getTablets()`           | Retorna detalhes dos tablets (`tablets.json`)        |
| `getAccessories()`       | Retorna detalhes dos acessórios (`accessories.json`) |
| `getProductDetails(id)`  | Busca nas 3 categorias e retorna o produto por `id`  |
| `getSuggestedProducts()` | Retorna produtos embaralhados aleatoriamente         |

> Todas as funções possuem **simulação de delay de 300ms** para UX realista.

---

## 🧪 Testes

### Cypress E2E

O projeto utiliza **Cypress** para testes end-to-end e de componentes.

#### Configuração (`cypress.config.ts`)

```typescript
e2e: {
  baseUrl: 'http://localhost:3000',
  specPattern: 'cypress/integration/**/*.spec.{js,ts,jsx,tsx}',
},
component: {
  framework: 'react',
  bundler: 'vite',
},
video: true,
viewportHeight: 1920,
viewportWidth: 1080,
reporter: 'mochawesome',
```

#### Executar Testes

```bash
# Modo interativo (abre navegador)
npm run test

# Apenas testes (sem lint)
npm run test -- --only
```

---

## 🔧 Instalação e Execução

### Pré-requisitos

- **Node.js** v20 ou superior
- **npm** v9 ou superior

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/glauccoeng-prog/react-phone-catalog.git
cd react-phone-catalog

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm start

# 4. Acesse no navegador
# http://localhost:3000
```

### Build de Produção

```bash
# Gerar build otimizado
npm run build

# Deploy para GitHub Pages
npm run deploy
```

---

## 📜 Scripts Disponíveis

| Script                 | Comando                                      | Descrição                          |
| ---------------------- | -------------------------------------------- | ---------------------------------- |
| `npm start`            | `mate-scripts start -l`                      | Inicia servidor de desenvolvimento |
| `npm run build`        | `mate-scripts build`                         | Gera build de produção             |
| `npm run deploy`       | `mate-scripts deploy`                        | Deploy para GitHub Pages           |
| `npm run lint`         | `style-format + format + lint-js + lint-css` | Executa todos os linters           |
| `npm run lint-js`      | `mate-scripts lint -j`                       | Lint JavaScript/TypeScript         |
| `npm run lint-css`     | `mate-scripts lint -s`                       | Lint CSS/SCSS                      |
| `npm run format`       | `prettier --write`                           | Formata arquivos TS/TSX            |
| `npm run style-format` | `stylelint --fix`                            | Corrige estilos SCSS               |
| `npm run test`         | `mate-scripts test -l`                       | Lint + testes Cypress              |

---

## 🎨 Design de Referência

Este projeto foi implementado baseado nos designs do Figma:

- **Original:** [Phone-catalog (V2) Original](<https://www.figma.com/file/T5ttF21UnT6RRmCQQaZc6L/Phone-catalog-(V2)-Original>)
- **Original Dark:** [Phone-catalog (V2) Original Dark](<https://www.figma.com/file/BUusqCIMAWALqfBahnyIiH/Phone-catalog-(V2)-Original-Dark>)

### Páginas Implementadas

1. **Home** — Banner slider + Hot Prices + Shop by Category + Brand New
2. **Phones/Tablets/Accessories** — Listagem com filtros, sort e paginação
3. **Product Details** — Galeria + seletores + specs + "You may also like"
4. **Favorites** — Lista de favoritos com busca
5. **Cart** — Itens, quantidades, total e checkout
6. **404** — Página não encontrada

---

## 📄 Licença

Este projeto está sob a licença **GPL-3.0**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Glaucco Siqueira**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/glaucco-siqueira/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/glauccoeng-prog)

---

<div align="center">
  <sub>Desenvolvido com 💚 durante o curso da Mate Academy</sub>
</div>
