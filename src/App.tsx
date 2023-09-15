import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer, Header } from './components';
import { ProductsProvider } from './context/productsContext';
import { CartProvider } from './context/cartContext';

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
