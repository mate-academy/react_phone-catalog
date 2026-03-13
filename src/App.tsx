import { Route, Routes } from 'react-router-dom';
import './assets/styles/main.scss';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Catalog } from './modules/Catalog';
import { HomePage } from './modules/HomePage';
import { ProductsProvider } from './store/ProductsProvider';

export const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="wrapper">
        <ProductsProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phones" element={<Catalog />} />
          </Routes>
        </ProductsProvider>
      </main>
      <Footer />
    </div>
  );
};
