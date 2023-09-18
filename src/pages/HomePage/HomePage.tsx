import React, { useEffect, useState } from 'react';

import { BannerSlider } from '../../components/BannerSlider';

import { ProductsSlider } from '../../components/ProductsSlider';
import {
  getBrandNewProducts,
  getHotPriceProducts,
} from '../../helpers/getProducts';
import { Product } from '../../types/Product';
import { Categories } from '../../components/Categories';
import { Loader } from '../../components/Loader';

export const HomePage: React.FC = () => {
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleHotPriceProducts = async () => {
      try {
        const res = await getHotPriceProducts();

        setHotPriceProducts(res);
      } catch {
        throw new Error();
      } finally {
        setTimeout(() => (
          setIsLoading(false)
        ), 500);
      }
    };

    const handleBrandNewProducts = async () => {
      try {
        const res = await getBrandNewProducts();

        setBrandNewProducts(res);
      } catch {
        throw new Error();
      } finally {
        setTimeout(() => (
          setIsLoading(false)
        ), 500);
      }
    };

    handleHotPriceProducts();
    handleBrandNewProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <section className="page__section">
            <BannerSlider />
          </section>

          <section className="page__section">
            <ProductsSlider
              products={hotPriceProducts}
              title="Hot prices"
              btnMod="hot"
            />
          </section>

          <section className="page__section">
            <Categories phonesLength={hotPriceProducts.length} />
          </section>

          <section className="page__section">
            <ProductsSlider
              products={brandNewProducts}
              title="Brand new models"
              btnMod="brand"
            />
          </section>
        </>
      )}
    </>
  );
};
