import React from 'react';
import './ShopByCategory.scss';
import { Category } from '../Category';

export const ShopByCategory: React.FC = () => {
  return (
    <section className="shop-by-category">
      <div className="shop-by-category__container">
        <h3 className="shop-by-category__title title">Shop by category</h3>
        <div className="shop-by-category__box">
          <Category
            title="Mobile phones"
            image={'./images/categories/phones.png'}
            amount={95}
          />
          <Category
            title="Tablets"
            image={'./images/categories/tablets.png'}
            amount={24}
          />
          <Category
            title="Accessories"
            image={'./images/categories/accessories.png'}
            amount={100}
          />
        </div>
      </div>
    </section>
  );
};
