import './App.scss';
import './scss/blocks/page.scss';
import './scss/blocks/container.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { CartProvider } from './components/CartContext/CartContext';

const App = () => {
  return (
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
  );
};

export default App;
