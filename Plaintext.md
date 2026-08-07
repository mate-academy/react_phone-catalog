src/
├── components/ # Тільки глобальні компоненти, які використовуються ВСЮДИ
│ ├── Header/
│ │ ├── index.ts # Експортує Header
│ │ ├── Header.tsx # Компонент шапки (з лого, навігацією, кошиком)
│ │ └── Header.module.scss # Стилі шапки (sticky, smooth hovers)
│ └── Footer/
│ ├── index.ts
│ ├── Footer.tsx # Компонент футера (з GitHub посиланням та Back to Top)
│ └── Footer.module.scss # Стилі футера (лімітована ширина)
│
├── modules/ # Модулі (сторінки та їхній унікальний контент)
│ ├── shared/ # Спільні компоненти суто для модулів сторінок (напр., ProductCard)
│ │ └── components/
│ │ └── ProductCard/
│ │ ├── index.ts
│ │ ├── ProductCard.tsx
│ │ └── ProductCard.module.scss
│ │
│ ├── HomePage/ # Модуль Головної сторінки
│ │ ├── components/ # Компоненти, які потрібні ТІЛЬКИ на HomePage
│ │ │ └── PromoSlider/
│ │ │ ├── index.ts
│ │ │ ├── PromoSlider.tsx
│ │ │ └── PromoSlider.module.scss
│ │ ├── HomePage.tsx # Головний компонент цієї сторінки
│ │ └── index.ts
│ │
│ ├── CartPage/ # Модуль Кошика
│ │ ├── components/ # Компоненти тільки для кошика (напр., CartItem)
│ │ │ └── CartItem/
│ │ │ ├── index.ts
│ │ │ ├── CartItem.tsx
│ │ │ └── CartItem.module.scss
│ │ ├── CartPage.tsx
│ │ └── index.ts
│ │
│ └── NotFoundPage/ # Модуль сторінки 404
│ ├── NotFoundPage.tsx # Текст "Page not found" для невідомих URL
│ └── index.ts
│
├── styles/ # Наша папка зі стилями, яку ми створили раніше
│ ├── App.scss # Головний файл (підключає reset та змінні)
│ ├── reset.scss
│ └── variables.scss
│
├── App.tsx # Головний каркас додатка (Header, <Routes>, Footer)
├── index.tsx # Точка входу
└── types/ # Глобальні TS типи (якщо потрібні)
