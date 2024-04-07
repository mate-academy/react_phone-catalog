import { useEffect, useState } from 'react';
import { Categories } from '../../components/Categories';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import './HomePage.scss';
import { getHotPrices, brandNew } from '../../api/api';
import { Product } from '../../types/Product';

export const HomePage = () => {
  const [hotPiceProducts, setHotPiceProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    getHotPrices.then(items => {
      setHotPiceProducts(items);
    });

    brandNew.then(items => {
      setBrandNewProducts(items);
    });
  }, []);

  return (
    <div className="container">
      <div className="page">
        <h1 className="page__title">Welcome to Nice Gadgets store!</h1>
        <PicturesSlider />
        <ProductsSlider products={hotPiceProducts} />
        <Categories />
        <ProductsSlider products={brandNewProducts} />
      </div>
    </div>
  );
};
