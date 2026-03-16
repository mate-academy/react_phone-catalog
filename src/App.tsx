import { useEffect, useState } from 'react';
import './App.scss';
import { Main } from './modules/HomePage/components/Main/Main';
import { Header } from './modules/shared/components/Header/Header';
import { Product } from './types/Product';

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
      <Main products={products} />
    </div>
  );
};
