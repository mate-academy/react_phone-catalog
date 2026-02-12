# Nice Gadgets - Phone Catalog

A modern React-based e-commerce application for browsing and purchasing mobile phones, tablets, and accessories.

## 🚀 Technologies Used

- **React 18** - Modern UI library for building user interfaces
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **SCSS/CSS Modules** - Styled components with scoped CSS
- **React Router** - Client-side routing for single-page application
- **Context API** - State management for cart and favorites
- **Swiper.js** - Touch slider for product carousels
- **Git** - Version control system

## 📱 Features

- **Product Catalog** - Browse phones, tablets, and accessories
- **Product Details** - Detailed product information with image gallery
- **Shopping Cart** - Add/remove items, quantity management
- **Favorites** - Save products to favorites list
- **Responsive Design** - Mobile-first approach with adaptive layout
- **Search & Filter** - Find products by category and specifications
- **Image Gallery** - Multiple product images with zoom functionality

## 🛠️ Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/react_phone-catalog.git
cd react_phone-catalog
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build production version
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Banner/         # Hero banner component
│   ├── Card/           # Product card component
│   ├── CartPageItem/   # Cart item component
│   ├── Header/         # Navigation header
│   ├── Footer/         # Site footer
│   └── ...
├── pages/              # Page components
│   ├── HomePage/       # Landing page
│   ├── PhonesPage/     # Phones catalog
│   ├── CartPage/       # Shopping cart
│   └── ...
├── store/              # State management
│   ├── CartStore.tsx   # Cart context
│   └── FavouriteContext.tsx
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # Global styles and mixins
```

## 🎨 Design Features

- **Modern UI** - Clean and intuitive interface
- **Dark Theme** - Professional dark color scheme
- **Smooth Animations** - CSS transitions and hover effects
- **Mobile Responsive** - Optimized for all screen sizes
- **Accessibility** - Keyboard navigation and screen reader support

## 🚀 Deployment

The project is configured for automatic deployment to GitHub Pages:

1. Push changes to the `master` branch
2. Run `npm run deploy`
3. Your site will be available at `https://your-username.github.io/react_phone-catalog/`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created by [Your Name] as part of the React development course.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, please open an issue in the repository.
