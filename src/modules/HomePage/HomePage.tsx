import { useEffect, useState } from 'react';
import './HomePage.scss';
import { BrandNew } from './components/BrandNew';
import { Categories } from './components/Categories';
import { HotPrices } from './components/HotPrices';

import { PicturesSlider } from './components/PicturesSlider';
import { Product } from '../../types/Product';
import { getAllProducts } from '../../services/products';

export const HomePage = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts().then(setAllProducts);
  }, []);

  return (
    <div className="home-page">
      <h1 className="h1 home-page__title container">
        Welcome to Nice Gadgets store!
      </h1>
      <div className="home-page__content">
        <PicturesSlider />
        <BrandNew products={allProducts} />
        <Categories />
        <HotPrices products={allProducts} />
      </div>
    </div>
  );
};
