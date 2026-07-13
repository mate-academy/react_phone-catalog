import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/Header';
import { Footer } from './modules/Footer';
import { CartProvider } from './context/CartContext';
import { FavouritesProvider } from './context/FavouriteContext';

export const App = () => {
  return (
    <CartProvider>
      <FavouritesProvider>
        <div className="App">
          {false && <h1 className="is-sr-only">Product Catalog</h1>}
          <Header />
          <main>
            <div className="section">
              <div className="container">
                <Outlet />
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </FavouritesProvider>
    </CartProvider>
  );
};
