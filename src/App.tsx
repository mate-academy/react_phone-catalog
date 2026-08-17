import './App.scss';
import { Navbar } from './modules/shared/components/Navbar';
import { Footer } from './modules/shared/components/Footer';
import { Outlet } from 'react-router-dom';
import { FavoriteProvider } from './modules/shared/context/FavoriteContext';
import { CartProvider } from './modules/shared/context/CartContext';

export const App = () => {
  return (
    <FavoriteProvider>
      <CartProvider>
        <div className="AppContainer">
          <Navbar />
          <main className="App">
            <Outlet />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </FavoriteProvider>
  );
};
