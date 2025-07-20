# Nice Gadgets Store 📱💻⌚

A modern electronics store built with React, TypeScript, and Vite. The project offers a convenient and attractive interface for browsing and purchasing mobile phones, tablets, and accessories.

## 🔗 Demo

[**🚀 View Live Project**](https://nice-gadgets-store.vercel.app/)

## 🎨 Design

Our design system is based on modern UI/UX principles with a focus on user experience and accessibility.

### Figma Designs

- **[📱 Original Dark Theme](<https://www.figma.com/file/BUusqCIMAWALqfBahnyIiH/Phone-catalog-(V2)-Original-Dark>)** - Complete design system with dark theme mockups
- **Design System**: Modern, clean interface with consistent spacing and typography
- **Responsive Layout**: Mobile-first approach with tablet and desktop breakpoints
- **Color Palette**: Carefully selected colors optimized for both light and dark themes

## 🚀 Key Features

- **Product Catalog**: Browse products by categories (phones, tablets, accessories)
- **Detailed Product Pages**: Complete product information with image gallery
- **Shopping Cart**: Add products to cart with quantity management
- **Favorites**: Save favorite products system
- **Search & Filtering**: Sort products by various criteria
- **Pagination**: Convenient navigation through large product lists
- **Responsive Design**: Optimized for all device types
- **Dark/Light Theme**: Toggle between theme modes
- **Authentication**: User registration and login via Firebase
- **Data Synchronization**: Save cart and favorites in the cloud

## 🛠️ Technologies

### Frontend

- **React 18** - Main framework
- **TypeScript** - Type safety and better DX
- **Vite** - Fast build and development
- **SCSS/CSS Modules** - Component styling
- **TailwindCSS** - Utility-first CSS framework

### State Management & Hooks

- **Zustand** - Lightweight state management
- **React Hook Form** - Form handling
- **Custom Hooks** - Custom logic hooks

### Navigation & UI

- **React Router DOM** - Routing
- **React Slick** - Product carousel
- **Swiper** - Modern sliders
- **React Paginate** - Pagination
- **React Toastify** - Notifications
- **React Aria Components** - UI accessibility

### Backend & Data

- **Firebase** - Backend as a Service
- **JSON API** - REST API for products

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Sass** - CSS preprocessor

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Breadcrumbs/     # Navigation breadcrumbs
│   ├── Cart/            # Cart components
│   ├── LayoutParts/     # Header, footer and other layout parts
│   ├── Product/         # Product components
│   ├── Sections/        # Page sections
│   ├── Sliders/         # Slider components
│   ├── UI/              # Base UI components
│   └── ...
├── pages/               # Application pages
│   ├── HomePage/        # Home page
│   ├── ProductsPage/    # Product catalog
│   ├── ProductPage/     # Product detail page
│   ├── CartPage/        # Shopping cart page
│   └── ...
├── hooks/               # Custom React hooks
├── store/               # Zustand stores
├── types/               # TypeScript types
├── utils/               # Utility functions
├── constants/           # Constants
└── styles/              # Global styles
```

## 🏁 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/fs-apr25-group1-js-ninjas/nice-gadgets-store.git
cd nice-gadgets-store
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
# Create .env file and add Firebase configuration
cp .env.example .env
```

4. **Start in development mode**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start dev server

# Build
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format with Prettier
npm run fix-style       # Format + lint

# Deploy
npm run predeploy       # Prepare for deployment
```

## 🔧 Core Functionalities

### Product Catalog

- Display products by categories
- Sort by price, name, newest
- Pagination with configurable items per page
- Skeleton loaders during loading

### Product Detail Page

- Product image gallery
- Color and memory capacity selection
- Technical specifications
- Product description
- Recommended products

### Shopping Cart

- Add/remove products
- Change product quantities
- Calculate total amount
- Server synchronization

### Favorites

- Add products to favorites
- Save to localStorage and Firebase
- Dedicated favorites page

## 🎨 Design & UX

- **Responsive Design**: Support for mobile devices, tablets, and desktops
- **Accessibility**: Semantic markup and ARIA attributes
- **Dark Theme**: Toggle between light and dark themes
- **Animations**: Smooth transitions and hover effects
- **Loading States**: Skeleton loaders and spinners

## 🔐 Authentication

The project uses Firebase Authentication for:

- New user registration
- User login
- User data synchronization
- Cart and favorites storage

## 📱 API & Data

### Local JSON Files

- `products.json` - Main product catalog
- `phones.json` - Mobile phones
- `tablets.json` - Tablets
- `accessories.json` - Accessories

### Firebase Integration

- Cart state storage
- Favorites synchronization
- User data

## 🚀 Deployment

The project is configured for deployment on various platforms:

- **Vercel**: Automatic deployment from GitHub
- **Netlify**: Alternative hosting platform
- **GitHub Pages**: Static hosting

## 👥 Development Team

Project developed by **JS Ninjas** team:

- Frontend developers
- UI/UX designers
- QA testers

## 📄 License

This project is created for educational purposes as part of a learning program.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and add tests
4. Ensure all tests pass
5. Create a Pull Request

## 📞 Contacts

For questions and suggestions:

- GitHub: [fs-apr25-group1-js-ninjas](https://github.com/fs-apr25-group1-js-ninjas)
- LinkedIn:
  - [Andrii Zakharov](https://www.linkedin.com/in/andrii-zakharov-b10567368/)
  - [Yaroslava Lazurenko](https://www.linkedin.com/in/yaroslava-lazurenko-b719a6123/)
  - [Stanislav Snizhkovyi](https://www.linkedin.com/in/stanislav-snizhkovyi/)
  - [Danil Dzirun](https://www.linkedin.com/in/danil-dzirun-272879344/)
  - [Yurii Soroka](https://www.linkedin.com/in/yuriy-soroka-41b1342aa/)

---
