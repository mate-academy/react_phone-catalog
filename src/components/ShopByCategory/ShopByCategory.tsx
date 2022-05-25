import React, { useMemo } from 'react';
import { CategoryColumn } from '../CategoryColumn';
import products from '../../api/products.json';
import './ShopByCategory.scss';

export const ShopByCategory:React.FC = () => {
  const phones = useMemo(() => {
    return products.filter(p => p.type === 'phone').length;
  }, [products]);

  const tablets = useMemo(() => {
    return products.filter(p => p.type === 'tablet').length;
  }, [products]);

  const accessories = useMemo(() => {
    return products.filter(p => p.type === 'accessorie').length;
  }, [products]);

  return (
    <section className="shop-by-category home-page__shop-by-category">
      <div className="block-header shop-by-category__block-header">
        <h2 className="title shop-by-category__title">
          Shop by category
        </h2>
      </div>
      <div className="shop-by-category__columns">
        <CategoryColumn
          title="phones"
          quantity={phones}
        />
        <CategoryColumn
          title="tablets"
          quantity={tablets}
        />
        <CategoryColumn
          title="accessories"
          quantity={accessories}
        />
      </div>
    </section>
  );
};
