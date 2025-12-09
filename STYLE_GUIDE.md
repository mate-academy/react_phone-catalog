# React Phone Catalog - Style Guide

## 📚 Table of Contents
1. [Component Structure](#component-structure)
2. [Naming Conventions](#naming-conventions)
3. [BEM CSS Methodology](#bem-css-methodology)
4. [TypeScript Guidelines](#typescript-guidelines)
5. [Import Organization](#import-organization)
6. [File Structure](#file-structure)
7. [Code Examples](#code-examples)

---

## 🏗️ Component Structure

### Standard Component Template

```tsx
// 1. React and hooks imports
import React, { useState, useEffect, useMemo } from 'react';

// 2. Third-party library imports
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';

// 3. Internal module imports (contexts, hooks, utils)
import { useCart } from '@/modules/CartFavContext/CartContext';
import { formatPrice } from '@/utils/formatters';

// 4. Type imports
import { Product } from '@/types/Product';

// 5. Component imports
import { Button } from '../Button/Button';

// 6. Style imports
import styles from './ComponentName.module.scss';

// 7. Asset imports
import Icon from '/img/icon.svg';

// Type definitions
type ComponentNameProps = {
  title: string;
  items: Product[];
  onSelect?: (item: Product) => void;
};

// Main component (ALWAYS use named export)
export const ComponentName: React.FC<ComponentNameProps> = ({
  title,
  items,
  onSelect,
}) => {
  // 1. State declarations
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  // 2. Context and hooks
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // 3. Computed values / memoization
  const totalItems = useMemo(() => items.length, [items]);

  // 4. Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // 5. Event handlers
  const handleClick = (item: Product) => {
    setSelectedItem(item);
    onSelect?.(item);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // 6. Helper functions (internal)
  const isItemSelected = (itemId: string) => {
    return selectedItem?.itemId === itemId;
  };

  // 7. Early returns / guards
  if (items.length === 0) {
    return <div className={styles.componentName__empty}>No items</div>;
  }

  // 8. Main render
  return (
    <div className={styles.componentName}>
      <h2 className={styles.componentName__title}>{title}</h2>
      
      <div className={styles.componentName__content}>
        {items.map(item => (
          <div
            key={item.id}
            className={classNames(styles.componentName__item, {
              [styles['componentName__item--selected']]: isItemSelected(item.itemId),
            })}
            onClick={() => handleClick(item)}
          >
            {item.name}
          </div>
        ))}
      </div>

      <button
        className={styles.componentName__button}
        onClick={handleClose}
      >
        Close
      </button>
    </div>
  );
};
```

---

## 📝 Naming Conventions

### File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `ProductCard.tsx` |
| Component Styles | PascalCase + .module | `ProductCard.module.scss` |
| Utilities | camelCase | `formatPrice.ts` |
| Types | PascalCase | `Product.ts` or `types.ts` |
| Hooks | camelCase with 'use' | `useCart.ts` |
| Constants | UPPER_SNAKE_CASE | `API_ENDPOINTS.ts` |

### Variable Naming

```tsx
// State variables - descriptive nouns
const [isLoading, setIsLoading] = useState(false);      // Boolean
const [products, setProducts] = useState<Product[]>([]); // Arrays
const [selectedId, setSelectedId] = useState<string>(); // Values

// Event handlers - 'handle' prefix + action
const handleClick = () => { };
const handleSubmit = () => { };
const handleProductSelect = (id: string) => { };

// Boolean variables/functions - 'is', 'has', 'should'
const isActive = true;
const hasItems = items.length > 0;
const shouldShowModal = isOpen && hasItems;

// Computed values - descriptive nouns
const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
const filteredProducts = products.filter(p => p.available);
```

---

## 🎨 BEM CSS Methodology

### BEM Structure

**BEM = Block Element Modifier**

```
.block
.block__element
.block__element--modifier
```

### Rules

1. **Block**: Standalone component (`.productCard`)
2. **Element**: Part of block, no standalone meaning (`.productCard__title`)
3. **Modifier**: Different state or version (`.productCard__title--large`)

### Delimiters

- **Element**: Double underscore `__`
- **Modifier**: Double hyphen `--`

### SCSS Implementation

```scss
// ✅ CORRECT
.productCard {
  border: 1px solid #ccc;
  
  // Element
  &__image {
    width: 100%;
  }
  
  &__title {
    font-size: 16px;
    
    // Modifier on element
    &--large {
      font-size: 20px;
    }
    
    &--small {
      font-size: 12px;
    }
  }
  
  &__button {
    padding: 10px;
    
    &--primary {
      background: blue;
    }
    
    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  // Modifier on block
  &--featured {
    border-color: gold;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}
```

### Usage in React

```tsx
// Simple class
<div className={styles.productCard}>

// With modifier (using classnames)
<div
  className={classNames(styles.productCard, {
    [styles['productCard--featured']]: isFeatured,
  })}
>

// Element with modifier
<button
  className={classNames(styles.productCard__button, {
    [styles['productCard__button--disabled']]: isDisabled,
  })}
>
```

### Common Mistakes to Avoid

```scss
// ❌ WRONG - Single underscore for modifier
.productCard {
  &__button_active { } // Should be &__button--active
}

// ❌ WRONG - Triple nesting
.productCard {
  &__content {
    &__title { } // Becomes .productCard__content__title (too deep)
  }
}

// ✅ CORRECT - Flatten hierarchy
.productCard {
  &__content { }
  &__contentTitle { } // Or &__title (if context is clear)
}

// ❌ WRONG - Mixing delimiters
.productCard {
  &__button-primary { } // Mixed __ and -
}

// ✅ CORRECT
.productCard {
  &__button--primary { }
}
```

---

## 📘 TypeScript Guidelines

### Type Definitions

```tsx
// Component Props
type ProductCardProps = {
  product: Product;
  onSelect?: (id: string) => void;  // Optional with ?
  isSelected: boolean;
  className?: string;
};

// VS Interface (use type for props, interface for API contracts)
interface Product {
  id: string;
  name: string;
  price: number;
}

// State type
type FilterState = {
  category: string | null;
  priceRange: [number, number];
  inStock: boolean;
};

// Union types
type Status = 'idle' | 'loading' | 'success' | 'error';

// Generic types
type ApiResponse<T> = {
  data: T;
  error: string | null;
  loading: boolean;
};
```

### Type Annotations

```tsx
// Always type function parameters
const formatPrice = (price: number, currency: string = 'USD'): string => {
  return `${currency} ${price.toFixed(2)}`;
};

// Type React.FC properly
export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

// Type event handlers
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value;
};

const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
};

// Type refs
const inputRef = useRef<HTMLInputElement>(null);
```

---

## 📦 Import Organization

### Order of Imports

```tsx
// 1. React
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// 2. Third-party libraries (alphabetically)
import classNames from 'classnames';
import { Link, useNavigate, useParams } from 'react-router-dom';

// 3. Contexts and custom hooks
import { useCart } from '@/modules/CartFavContext/CartContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// 4. Utils and helpers
import { formatPrice } from '@/utils/formatters';
import { API_BASE_URL } from '@/constants/api';

// 5. Types
import { Product } from '@/types/Product';
import { CartItem } from '@/types/CartItem';

// 6. Components (local first, then shared)
import { ProductCard } from './ProductCard';
import { Button } from '@/modules/shared/components/Button/Button';

// 7. Styles
import styles from './Component.module.scss';

// 8. Assets
import Logo from '/img/logo.svg';
import CartIcon from '/img/icons/cart.svg';
```

### Import Aliases

```tsx
// ✅ Use path aliases (configured in tsconfig.json)
import { Product } from '@/types/Product';
import { Button } from '@/modules/shared/components/Button';

// ❌ Avoid relative paths for shared modules
import { Product } from '../../../types/Product';
import { Button } from '../../shared/components/Button';
```

---

## 📁 File Structure

### Component Folder Structure

```
ComponentName/
├── ComponentName.tsx          # Main component
├── ComponentName.module.scss  # Styles
├── ComponentName.test.tsx     # Tests (if applicable)
├── SubComponent.tsx           # Sub-components (if needed)
├── types.ts                   # Local types (if many)
├── utils.ts                   # Helper functions
└── index.ts                   # Re-export (optional)
```

### Module Structure

```
src/
├── modules/
│   ├── Cart/
│   │   ├── Cart.tsx
│   │   ├── Cart.module.scss
│   │   ├── CartItem.tsx
│   │   └── CartItem.module.scss
│   ├── ProductPage/
│   │   ├── ProductPage.tsx
│   │   ├── ProductPage.module.scss
│   │   ├── ProductGallery.tsx
│   │   └── ProductConfigurator.tsx
│   └── shared/
│       └── components/
│           ├── Button/
│           ├── Modal/
│           └── Layout/
├── types/
│   ├── Product.ts
│   ├── CartItem.ts
│   └── index.ts
├── styles/
│   ├── variables.scss
│   ├── global.scss
│   └── mixins.scss
└── utils/
    ├── formatters.ts
    └── validators.ts
```

---

## 💡 Code Examples

### Example 1: Product Card Component

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { useCart } from '@/modules/CartFavContext/CartContext';
import { Product } from '@/types/Product';

import styles from './ProductCard.module.scss';

type ProductCardProps = {
  product: Product;
  showDiscount?: boolean;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showDiscount = false,
}) => {
  const { addToCart, isInCart } = useCart();

  const inCart = isInCart(product.id);

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
  };

  return (
    <div className={styles.productCard}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.productCard__imageWrapper}
      >
        <img
          src={product.image}
          alt={product.name}
          className={styles.productCard__image}
        />
      </Link>

      <div className={styles.productCard__content}>
        <h3 className={styles.productCard__title}>{product.name}</h3>

        <div className={styles.productCard__prices}>
          <span className={styles.productCard__price}>${product.price}</span>
          {showDiscount && product.fullPrice && (
            <span className={styles.productCard__priceOld}>
              ${product.fullPrice}
            </span>
          )}
        </div>

        <button
          className={classNames(styles.productCard__button, {
            [styles['productCard__button--added']]: inCart,
          })}
          onClick={handleAddToCart}
          disabled={inCart}
        >
          {inCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};
```

### Example 2: Product Card Styles

```scss
@use '@/styles/variables' as *;

.productCard {
  display: flex;
  flex-direction: column;
  border: 1px solid $color-elements;
  padding: 32px;
  background: $color-bg;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
  }

  &__imageWrapper {
    display: block;
    margin-bottom: 24px;
  }

  &__image {
    width: 100%;
    height: 196px;
    object-fit: contain;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__title {
    @include type($body-size, $body-line, $body-track, $body-weight);
    min-height: 42px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__prices {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  &__price {
    @include type($h3-size, $h3-line, $h3-track, $h3-weight, $font-mont-bold);
  }

  &__priceOld {
    font-size: $h3-size;
    font-weight: 600;
    color: $color-secondary;
    text-decoration: line-through;
  }

  &__button {
    width: 100%;
    height: 40px;
    border: none;
    background: $color-primary;
    color: $color-text;
    cursor: pointer;
    transition: box-shadow 0.3s ease;
    @include type($button-size, $button-line, $button-track, $button-weight);

    &:hover:not(&--added) {
      box-shadow: 0 3px 13px rgba(23, 32, 49, 0.4);
    }

    &--added {
      background: $color-bg;
      border: 1px solid $color-elements;
      color: $color-green;
      cursor: default;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  // Modifier for featured products
  &--featured {
    border-color: $color-primary;
    box-shadow: 0 0 0 2px $color-primary;
  }
}
```

---

## ✅ Checklist for New Components

- [ ] Component file is PascalCase (`ComponentName.tsx`)
- [ ] Styles file is PascalCase with .module (`ComponentName.module.scss`)
- [ ] Component uses **named export** (not default)
- [ ] Imports are organized in correct order
- [ ] Types are defined above component
- [ ] BEM naming follows `block__element--modifier` pattern
- [ ] No inline styles (use CSS modules)
- [ ] Event handlers start with `handle`
- [ ] Boolean variables start with `is`, `has`, or `should`
- [ ] All props are typed
- [ ] Component has proper TypeScript types
- [ ] No unused imports or variables
- [ ] No console.log statements (use proper logging)
- [ ] Classnames are applied using `classNames` utility for modifiers

---

## 🔧 Tools and Configuration

### ESLint Rules to Enforce

```json
{
  "rules": {
    "no-console": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "react/jsx-pascal-case": "error",
    "import/order": ["error", {
      "groups": [
        "builtin",
        "external",
        "internal",
        "parent",
        "sibling",
        "index"
      ]
    }]
  }
}
```

### VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "css.lint.unknownAtRules": "ignore"
}
```

---

## 📚 Additional Resources

- [BEM Methodology](http://getbem.com/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Airbnb React Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [CSS Modules Documentation](https://github.com/css-modules/css-modules)

---

**Last Updated:** 2025-12-09
**Version:** 1.0.0
