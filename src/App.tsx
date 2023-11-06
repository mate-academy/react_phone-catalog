import './App.scss';
import './scss/blocks/page.scss';
import './scss/blocks/container.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { CartProvider } from './components/CartContext/CartContext';
import { FavProvider } from './components/FavContext/FavContext';

const App = () => {
  return (
    <FavProvider>
      <CartProvider>
        <div className="App">
          <Header />

          <main className="page">
            <div className="container">
              <Outlet />
            </div>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </FavProvider>
  );
};

export default App;
