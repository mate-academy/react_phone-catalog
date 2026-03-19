import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/shared/components/Header/Header';
import { Product } from './types/Product';
import { Footer } from './modules/shared/components/Footer';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then((dataProducts: Product[]) => setProducts(dataProducts));
  }, []);

  return (
    <div className="page-backgraund">
      <Header openMenu={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Routes>
        <Route path="/" element={<HomePage products={products} />} />
        <Route path="/phones" element={<PhonesPage products={products} />} />
      </Routes>
      <Footer />
    </div>
  );
};
