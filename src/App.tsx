import { Outlet } from 'react-router-dom';
import { ProductsProvider } from 'context/productsContext';
import { CartProvider } from 'context/cartContext';
import { Footer, Header } from './components';
import './App.scss';

const App = () => (
  <ProductsProvider>
    <CartProvider>
      <div className='app'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </CartProvider>
  </ProductsProvider>
);

export default App;
