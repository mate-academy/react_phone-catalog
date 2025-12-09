# Quick Reference Guide

> **Quick access to common patterns and standards for the React Phone Catalog project**

---

## 🚀 Quick Start

### Creating a New Component

```tsx
// ComponentName.tsx
import React, { useState } from 'react';
import styles from './ComponentName.module.scss';

type ComponentNameProps = {
  title: string;
  items: Item[];
};

export const ComponentName: React.FC<ComponentNameProps> = ({ 
  title, 
  items 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.componentName}>
      <h2 className={styles.componentName__title}>{title}</h2>
      {/* ... */}
    </div>
  );
};
```

```scss
// ComponentName.module.scss
@use '@/styles/variables' as *;

.componentName {
  // Block styles
  
  &__title {
    // Element styles
  }
  
  &__button {
    // Element styles
    
    &--active {
      // Modifier styles
    }
  }
}
```

---

## 📋 Naming Cheat Sheet

### Files
| Type | Pattern | Example |
|------|---------|---------|
| Component | PascalCase.tsx | `ProductCard.tsx` |
| Styles | PascalCase.module.scss | `ProductCard.module.scss` |
| Utils | camelCase.ts | `formatPrice.ts` |
| Types | PascalCase.ts | `Product.ts` |

### BEM CSS
```scss
.block                    // Component
.block__element          // Part of component (__)
.block__element--modifier // Variation of element (--)
```

### Variables
```tsx
// State - descriptive nouns
const [isLoading, setIsLoading] = useState(false);

// Handlers - handle + Action
const handleClick = () => { };
const handleSubmit = () => { };

// Booleans - is/has/should
const isActive = true;
const hasItems = items.length > 0;
```

---

## 🎨 BEM Quick Examples

### ✅ Correct
```scss
.productCard {
  &__image { }                  // Element
  &__title { }                  // Element
  &__button { }                 // Element
  &__button--primary { }        // Modifier
  &__button--disabled { }       // Modifier
}
```

### ❌ Wrong
```scss
.productCard {
  &__button_primary { }         // Single underscore - WRONG
  &__button__icon { }           // Triple depth - WRONG
  &-button { }                  // Single hyphen - WRONG
}
```

---

## 🔧 Common Patterns

### Conditional Classes with Modifiers

```tsx
import classNames from 'classnames';

// Using classnames library (RECOMMENDED)
<button
  className={classNames(styles.button, {
    [styles['button--active']]: isActive,
    [styles['button--disabled']]: isDisabled,
  })}
>

// Manual (if no modifiers)
<div className={styles.card}>

// With single modifier
<div className={`${styles.card} ${isActive ? styles['card--active'] : ''}`}>
```

### Event Handlers

```tsx
// Simple handler
const handleClick = () => {
  setIsOpen(true);
};

// Handler with parameter
const handleSelect = (id: string) => {
  setSelectedId(id);
};

// Event handler with event object
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value);
};

// Prevent default
const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  // ...
};
```

---

## 📦 Import Order Template

```tsx
// 1. React
import React, { useState, useEffect } from 'react';

// 2. Third-party
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// 3. Internal modules
import { useCart } from '@/modules/CartFavContext/CartContext';

// 4. Types
import { Product } from '@/types/Product';

// 5. Components
import { Button } from '../Button/Button';

// 6. Styles
import styles from './Component.module.scss';

// 7. Assets
import Icon from '/img/icon.svg';
```

---

## 🎯 TypeScript Quick Reference

### Props Types
```tsx
// Simple props
type ButtonProps = {
  label: string;
  onClick: () => void;
};

// Optional props
type CardProps = {
  title: string;
  subtitle?: string;        // Optional
  onSelect?: (id: string) => void;
};

// With children
type ContainerProps = {
  children: React.ReactNode;
};

// Full component example
export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};
```

### Event Types
```tsx
// Click events
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { };

// Change events
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { };

// Form events
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { };

// Keyboard events
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { };
```

---

## 🎨 SCSS Variables (Available Globally)

### Typography
```scss
$h1-size: 48px;
$h2-size: 32px;
$h3-size: 22px;
$h4-size: 20px;
$body-size: 14px;
$small-size: 12px;
```

### Colors
```scss
$color-primary: #313237;    // Dark gray
$color-secondary: #89939a;  // Medium gray
$color-elements: #e2e6e9;   // Light gray
$color-icons: #b4bdc3;      // Icon gray
$color-text: #fff;          // White text
$color-bg: #fff;            // White background
$color-green: #27AE60;      // Success green
$color-red: #EB5757;        // Error red
```

### Using Mixins
```scss
// Import variables
@use '@/styles/variables' as *;

.component {
  // Use the type mixin
  @include type($body-size, $body-line, $body-track, $body-weight);
  
  // Or use variables directly
  color: $color-primary;
  font-size: $h3-size;
}
```

---

## 🔍 Common Issues & Solutions

### Issue: Import error for named export
```tsx
// ❌ Wrong
import Component from './Component';

// ✅ Correct
import { Component } from './Component';
```

### Issue: BEM modifier not applying
```tsx
// ❌ Wrong
className={styles.button__active}

// ✅ Correct - Use bracket notation for modifiers
className={styles['button--active']}

// ✅ Also correct - With classnames
className={classNames(styles.button, {
  [styles['button--active']]: isActive
})}
```

### Issue: Styles not working
```scss
// ❌ Wrong - No parent block
.title { }
.button { }

// ✅ Correct - Wrap in component name
.myComponent {
  &__title { }
  &__button { }
}
```

---

## ⚡ VS Code Snippets

### Create Component Snippet
```json
{
  "React Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "import styles from './${TM_FILENAME_BASE}.module.scss';",
      "",
      "type ${TM_FILENAME_BASE}Props = {",
      "  $1",
      "};",
      "",
      "export const ${TM_FILENAME_BASE}: React.FC<${TM_FILENAME_BASE}Props> = ({ $2 }) => {",
      "  return (",
      "    <div className={styles.${TM_FILENAME_BASE/(.*)/${1:/camelcase}/}}>",
      "      $0",
      "    </div>",
      "  );",
      "};",
      ""
    ]
  }
}
```

---

## 📚 Documentation Links

- **Full Component Review**: See `CODE_REVIEW.md`
- **Complete Style Guide**: See `STYLE_GUIDE.md`
- **Summary of Changes**: See `REVIEW_SUMMARY.md`
- **This Document**: `QUICK_REFERENCE.md`

---

## 🆘 Quick Help

### BEM Questions?
```scss
// Format: .block__element--modifier

// ✅ Good examples
.card { }
.card__title { }
.card__button { }
.card__button--primary { }
.card__button--disabled { }

// ❌ Bad examples
.card_title { }              // Single underscore
.card__button__icon { }      // Too deep
.card-button { }             // Wrong separator
.card__button_primary { }    // Single underscore for modifier
```

### Component Export?
```tsx
// ✅ Always use named export
export const Component: React.FC = () => { ... };

// ❌ Avoid default export
const Component: React.FC = () => { ... };
export default Component;
```

### Import Order?
```
React → Third-party → Internal → Types → Components → Styles → Assets
```

---

**Last Updated**: 2025-12-09
**Version**: 1.0
