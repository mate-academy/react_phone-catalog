import { Outlet } from 'react-router-dom';
import { ProductsProvider } from 'context/productsContext';
import { CartProvider } from 'context/cartContext';
import { Footer, Header } from './components';
import './App.scss';

const App = () => (
  <ProductsProvider>
    <CartProvider>
      <Header />
      <Outlet />
      <Footer />
    </CartProvider>
  </ProductsProvider>
);

export default App;
