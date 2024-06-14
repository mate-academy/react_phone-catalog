import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { ProductProvider } from './store/ProductContext';
import { Footer } from './components/Footer';

export const App = () => (
  <ProductProvider>
    <Header />
    <main className="body">
      <Outlet />
    </main>
    <footer className="footer">
      <Footer />
    </footer>
  </ProductProvider>
);
