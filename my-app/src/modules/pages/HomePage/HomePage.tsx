import { useEffect, useState } from 'react';
import { fetchAllProducts } from '../../../api/fetchProducts';
import { HotPrices } from '../../components/HotPrices';
import { NewModels } from '../../components/NewModels';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import type { Product } from '../../../types';
import './HomePage.scss';

const slides = [
  { image: '/img/banner-accessories.png', alt: 'Accessories' },
  { image: '/img/banner-phones.png', alt: 'Phones' },
  { image: '/img/banner-tablets.png', alt: 'Tablets' },
];

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchAllProducts().then(setProducts).catch(() => {});
  }, []);

  const counts = {
    phones: products.filter((p) => p.category === 'phones').length,
    tablets: products.filter((p) => p.category === 'tablets').length,
    accessories: products.filter((p) => p.category === 'accessories').length,
  };

  return (
    <div className="home-page">
      <h1 className="home-page__title">Welcome to Nice Gadgets!</h1>
      <PicturesSlider slides={slides} />
      <NewModels products={products} />
      <ShopByCategory counts={counts} />
      <HotPrices products={products} />
    </div>
  );
};
