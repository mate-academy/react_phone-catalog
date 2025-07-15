import React from 'react';
import './ShopCategory.scss';

type Props = {
  countPhones: number;
  countTablets: number;
  countAccessories: number;
};

export const ShopCategory: React.FC<Props> = ({
  countPhones,
  countTablets,
  countAccessories,
}) => {
  return (
    <section className="category-section">
      <h2 className="category-section__title">Shop by category</h2>
      <div className="category-section__blocks">
        <div>
          <div className="category-section__mobile-block">
            <img src="./images/mobile_category.png" alt="phones-banner" />
          </div>
          <h4 className="category-section__block-title">Mobile phones</h4>
          <p className="category-section__block-text">{countPhones} models</p>
        </div>
        <div>
          <div className="category-section__tablets-block">
            <img src="./images/tablets_category.png" alt="tablets-banner" />
          </div>
          <h4 className="category-section__block-title">Tablets</h4>
          <p className="category-section__block-text">{countTablets} models</p>
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
            {countAccessories} models
          </p>
        </div>
      </div>
    </section>
  );
};
