import './HomePage.scss';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import PicturesSlider from './components/PicturesSlider/PicturesSlider';
import { ProductSlider } from './components/ProductSlider/ProductSlider';
import { Category } from './components/Category/Category';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}api/products.json`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const newProducts: Product[] = [...products].sort(
    (product1, product2) => product2.year - product1.year,
  );

  const hotestProducts = [...products].sort(
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );

  return (
    <div className="content">
      <h1 className="disabled">Product Catalog</h1>

      <p className="content__title text-h1">Welcome to Nice Gadgets store!</p>

      <PicturesSlider />

      <ProductSlider
        anyProducts={newProducts}
        discount={false}
        title={'Brand new models'}
      />

      <Category />

      <ProductSlider
        anyProducts={hotestProducts}
        discount={true}
        title={'Hot prices'}
      />
    </div>
  );
};

export default HomePage;
