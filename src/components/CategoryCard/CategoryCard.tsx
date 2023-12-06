import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './CategoryCard.scss';
import { Category } from '../../types/Category';
import { getProducts } from '../../api/getProducts';
import { getProductsByType }
  from '../../helpers/getFunctions/getProductsByType';

type Props = {
  category: Category,
};

export const CategoryCard: React.FC<Props> = ({ category }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    getProducts().then((productsFromServer) => {
      if (isMounted) {
        setCount(getProductsByType(productsFromServer, category.type).length);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <NavLink
      className="category-card"
      to={category.link}
    >
      <div
        className="category-card__wrapper-img"
        style={{
          backgroundColor: category.backgroundColor,
        }}
      >
        <img
          src={category.imageUrl}
          alt={category.name}
          className={classNames('category-card__img', {
            'category-card__img--transform-scale':
              category.name === 'Accessories',
          })}
        />
      </div>

      <div className="category-card__bottom">
        <h3 className="category-card__name">
          {category.name}
        </h3>

        <p className="category-card__available">
          {`${count} models`}
        </p>
      </div>
    </NavLink>
  );
};
