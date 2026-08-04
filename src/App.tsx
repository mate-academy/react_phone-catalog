import { Outlet } from 'react-router-dom';
import './modules/shared/styles/global.scss';
import './modules/shared/styles/icons.scss';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';
// eslint-disable-next-line max-len
import { FavouritesProvider } from './modules/shared/contexts/FavouritesContext';
import { CartProvider } from './modules/shared/contexts/CartContext';

export const App = () => {
  return (
    <FavouritesProvider>
      <CartProvider>
        <div className="app" id="app">
          <Header />
          <div className="app__outlet">
            <Outlet />
          </div>
          <Footer />
        </div>
      </CartProvider>
    </FavouritesProvider>
  );
};
