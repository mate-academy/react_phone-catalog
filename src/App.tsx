import { Outlet } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import { Container } from './components/Container';
import { ProductsProvider } from './context/ProductsContext';
import { Footer } from './components/Footer';

export const App = () => (
  <div className="App">
    <Header />
    {/* <h1>Product Catalog</h1> */}
    <ProductsProvider>
      <Container>
        <Outlet />
      </Container>
    </ProductsProvider>
  </div>
);
