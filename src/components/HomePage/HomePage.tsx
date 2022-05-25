import React, { useMemo, useCallback } from 'react';
import { Banner } from '../Banner';
import { ProductSlider } from '../ProductSlider';
import { ShopByCategory } from '../ShopByCategory';
import products from '../../api/products.json';
import './HomePage.scss';

export const HomePage: React.FC = React.memo(
  () => {
    const getHotPriceProducts = useCallback(() => {
      const filteredByDiscount = products.filter((product) => (
        product.discount > 0
      ));

      return filteredByDiscount.sort((product1, product2) => {
        const firsDiscountValue
          = product1.price - product1.price / product1.discount;
        const secondDiscountValue
          = product2.price - product2.price / product2.discount;

        return secondDiscountValue - firsDiscountValue;
      });
    }, []);

    const getBrandNewProducts = useCallback(() => {
      const productsWithoutDiscount = products.filter((product) => (
        product.discount === 0
      ));

      return productsWithoutDiscount.sort((product1, product2) => {
        return product2.price - product1.price;
      });
    }, []);

    const hotPriceProducts = useMemo(getHotPriceProducts, [products]);
    const brandNewProducts = useMemo(getBrandNewProducts, [products]);

    return (
      <div className="home-page">
        <Banner />

        <section className="hot-prices home-page__hot-prices">
          <ProductSlider
            title="Hot prices"
            products={hotPriceProducts}
          />
        </section>

        <ShopByCategory />

        <section className="brand-new home-page__brand-new">
          <ProductSlider
            title="Brand new models"
            products={brandNewProducts}
          />
        </section>

      </div>
    );
  },
);
