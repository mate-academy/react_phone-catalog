import { useEffect, useState } from 'react';
import { Slider } from '../../components/Slider';
import './HomePage.scss';
import { Product } from '../../types/Product';
import { getHotPriceProducts } from '../../utils/getHotPriceProducts';
import { HotPrices } from '../../components/HotPrices';
import { ShopByCategory } from '../../components/ShopByCategory';
import { getBrandNewProducts } from '../../utils/getBrandNewProducts';
import { BrandNewProducts } from '../../components/BrandNewProducts';

export const HomePage = () => {
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    getHotPriceProducts()
      .then(setHotPriceProducts);
  }, []);

  useEffect(() => {
    getBrandNewProducts()
      .then(setBrandNewProducts);
  }, []);

  return (
    <>
      <div className="homepage">
        <div className="container">
          <section className="homepage__banner">
            <Slider />
          </section>

          <HotPrices products={hotPriceProducts} />

          <ShopByCategory />

          <BrandNewProducts products={brandNewProducts} />
        </div>
      </div>
    </>
  );
};
