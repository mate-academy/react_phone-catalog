import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import Header from './components/Header/Header';
import CartProvider from './Contexts/CartContext/CartContext';
import { FavoriteProvider } from './Contexts/FavoriteContext';
// import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

export const App = () => (
  <div className="App">
    <CartProvider>
      <FavoriteProvider>
        <Header />
        <main className="main">
          <Outlet />
        </main>
        <Footer />
      </FavoriteProvider>
    </CartProvider>
  </div>
);
