import React, { useEffect, useState } from 'react';
import { PicturesSlider } from '../PicturesSlider';
import { ShopByCategory } from '../ShopByCategory';
import { ProductsSlider } from '../ProductsSlider';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/fetchClient';
import { useOutletContext } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const darkTheme = useOutletContext<boolean>();

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="page">
      <PicturesSlider darkTheme={darkTheme} />
      <ProductsSlider
        title="Brand new models"
        products={products}
        discount={false}
        darkTheme={darkTheme}
      />
      <ShopByCategory />
      <ProductsSlider
        title="Hot prises"
        products={products}
        discount={true}
        darkTheme={darkTheme}
      />
    </div>
  );
};
