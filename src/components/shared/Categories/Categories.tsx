import React, { useCallback, useContext } from 'react';
import './Categories.scss';
import { GlobalContext } from '../../context/GlobalContext';
import { Product } from '../../../types/Product';
import { Link } from 'react-router-dom';

export const Categories: React.FC = () => {
  const { allProducts } = useContext(GlobalContext);

  const productLength = useCallback(
    (category: string) => {
      return allProducts.filter((product: Product) => {
        if (product.category === category) {
          return product;
        }
      }).length;
    },
    [allProducts],
  );

  return (
    <section className="categories">
      <h2 className="categories__title">Shop by category</h2>
      <div className="categories__container">
        {['phones', 'tablets', 'accessories'].map(category => (
          <Link to={`/${category}`} className="category" key={category}>
            <img
              className="category__image"
              src={`img/categories/category-${category}.png`}
              alt={category}
            />
            <h4 className="category__title">
              {category === 'phones'
                ? 'Mobile phones'
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </h4>
            <p className="category__text">
              {productLength(category) + ' models'}{' '}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};
