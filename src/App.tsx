import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';
import { ProductsProvider } from './Components/context/ProductsContext';

export const App = () => (
  <div className="App">
    <ProductsProvider>
      <Header />

      <main className="main-content container">
        <Outlet />
      </main>

      <Footer />
    </ProductsProvider>
  </div>
);
