import './styles/fonts.scss';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';
import { FavoritesProvider } from './modules/shared/context/FavoriteContext';
import { CartProvider } from './modules/shared/context/CartContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <CartProvider>
    <FavoritesProvider>
      <BrowserRouter basename="/react_phone-catalog/">
        <div className="mainContent">
          <Header />
          <App />
          <Footer />
        </div>
      </BrowserRouter>
    </FavoritesProvider>
  </CartProvider>,
);
