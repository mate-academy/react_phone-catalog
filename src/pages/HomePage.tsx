import { useEffect, useState } from 'react';
import { Banner } from '../components/Banner';
import { ProductsSlider } from '../components/ProductsSlider';
import { Product } from '../types/products';
import { getBrandNewModels, getHotPriceProducts } from '../api/products';

export const HomePage: React.FC = () => {
  const [brandNewModels, setBrandNewModels] = useState<Product[]>([]);
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);

  useEffect(() => {
    getBrandNewModels().then(setBrandNewModels);
  }, []);

  useEffect(() => {
    getHotPriceProducts().then(setHotPriceProducts);
  }, []);

  return (
    <main className="flex flex-col gap-16 pb-16 pt-6">
      <Banner />

      <ProductsSlider
        discount={false}
        title="Brand new models"
        slides={brandNewModels}
      />

      <ProductsSlider title="Hot prices" slides={hotPriceProducts} />
    </main>
  );
};
