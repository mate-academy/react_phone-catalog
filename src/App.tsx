import { useEffect, useState } from 'react';
import './App.scss';
import { NavBar } from './components/NavBar';
import { PicturesSlider } from './components/PicturesSlider';
import { Products } from './types/Products';
import { ProductsSlider } from './components/ProductsSlider';

export const App = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then(setProducts)
      .catch(() => {})
      .finally(() => {});
  }, []);

  return (
    <div className="App">
      <NavBar />

      <main>
        <PicturesSlider />
        <ProductsSlider product={products} />
      </main>
    </div>
  );
};
