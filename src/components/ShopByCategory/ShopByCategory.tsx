import { Link } from 'react-router-dom';
import './ShopByCategory.scss';
import { Product } from '../../types/Product';
import React from 'react';
import { getCategoriesCards } from '../../utils';

type Props = {
  products: Product[];
};

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const categoryCards = getCategoriesCards(products);

  return (
    <>
      <h2 className="shop-by-category__title">Shop by category</h2>

      <div className="shop-by-category__container">
        {categoryCards.map(category => {
          const { name, title, image, amount } = category;

          return (
            <div className="category-card" key={name}>
              <Link to={`/${name}`} className="category-card__link">
                <div className="category-card__image-container">
                  <img className="category-card__image" src={image} />
                </div>
                <div className="category-card__title">{title}</div>
                <div className="category-card__amount-models">{`${amount} models`}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};
