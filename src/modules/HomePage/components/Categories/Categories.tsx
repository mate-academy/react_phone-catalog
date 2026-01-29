import React from 'react';
import { Link } from 'react-router-dom';
import {
  UltimateProducts,
  useProducts,
} from '../../../../modules/shared/components/Context/ProductsContext';
import { banners } from '../../../../mocks/Data/banners';

export const Categories: React.FC = () => {
  const { products } = useProducts();

  return (
    <div className="categories">
      <h2 className="categories__title">Shop by category</h2>
      {banners.map(elem => (
        <Link to={elem.link} key={elem.id} className={`category`}>
          <img
            key={elem.id}
            src={elem.banner}
            alt={elem.title}
            className="category__photo"
          />
          <div className="category__text">
            <h4 className="category__title">{elem.title}</h4>
            <span className="category__amount">
              {products[elem.name as keyof UltimateProducts].length} models
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};
