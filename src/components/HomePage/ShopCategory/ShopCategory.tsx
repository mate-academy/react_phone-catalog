import React, { useContext } from 'react';
import './ShopCategory.scss';
import { ProductsContext } from '../../../context/ProductContext';

export const ShopCategory: React.FC = () => {
  const { phones, tablets, accessories } = useContext(ProductsContext);

  return (
    <section className="category-section">
      <h2 className="category-section__title">Shop by category</h2>
      <div className="category-section__blocks">
        <div>
          <div className="category-section__mobile-block">
            <img src="./images/mobile_category.png" alt="phones-banner" />
          </div>
          <h4 className="category-section__block-title">Mobile phones</h4>
          <p className="category-section__block-text">{phones.length} models</p>
        </div>
        <div>
          <div className="category-section__tablets-block">
            <img src="./images/tablets_category.png" alt="tablets-banner" />
          </div>
          <h4 className="category-section__block-title">Tablets</h4>
          <p className="category-section__block-text">
            {tablets.length} models
          </p>
        </div>
        <div>
          <div className="category-section__accessories-block">
            <img
              src="./images/accessories_category.png"
              alt="accessories-banner"
            />
          </div>
          <h4 className="category-section__block-title">Accessories</h4>
          <p className="category-section__block-text">
            {accessories.length} models
          </p>
        </div>
      </div>
    </section>
  );
};
