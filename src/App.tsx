import './App.module.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import { MenuProvider } from './context/MenuContext';
import { CartProvider } from './context/CartContext';

export const App: React.FC = () => {
  return (
    <CartProvider>
      <MenuProvider>
        <div data-cy="app">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </MenuProvider>
    </CartProvider>
  );
};
