import { useEffect, useState } from 'react';

import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { ProductSlider } from '../../base/ProductSlider/ProductSlider';
import { ShopByCategory } from '../../components/Shop/Shop';
import { Welcome } from '../../components/Welcome/Welcome';
import { BrandNewModels } from '../../components/BrandNewModels/BrandNewModels';

export const HomePage = () => {
  const [sortedByYear, setSortByYear] = useState<Product[]>([]);
  const [sortedByPrice, setSortByPrice] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(products => {
      setSortByYear(products);
    });
  }, []);

  useEffect(() => {
    getProducts().then(products => {
      const sorted = [...products].sort((a, b) => a.price - b.price);

      setSortByPrice(sorted);
    });
  }, []);

  return (
    <div className="home-page">
      <Welcome />
      <BrandNewModels products={sortedByYear} />
      <ShopByCategory />
      <ProductSlider
        title={'Hot prices'}
        products={sortedByPrice}
        showDiscount={true}
      />
    </div>
  );
};
