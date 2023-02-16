import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { Context } from '../../helpers/context/context';
import './category.scss';

export const Category: React.FC = () => {
  const {
    goods,
  } = useContext(Context);

  return (
    <div className="category" data-cy="categoryLinksContainer">
      <div className="category__container">
        <h1>Shop by category</h1>

        <div className="category__section">
          <NavLink
            to="phone"
            className="category__mobile"
          >
            <div className="category__img-1 img" />
            <h3>Mobile phones</h3>
            <p className="category__models">
              {(goods.filter((
                i: { type: string; },
              ) => i.type === 'phone')).length}
              {' '}
              models
            </p>
          </NavLink>

          <NavLink
            to="tablet"
            className="category__mobile"
          >
            <div className="category__img-2 img" />
            <h3>Tablets</h3>
            <p className="category__models">
              {(goods.filter((
                i: { type: string; },
              ) => i.type === 'tablet')).length}
              {' '}
              models
            </p>
          </NavLink>

          <NavLink
            to="accessories"
            className="category__mobile"
          >
            <div className="category__img-3 img" />
            <h3>Accessories</h3>
            <p className="category__models">
              {(goods.filter((
                i: { type: string; },
              ) => i.type === 'accessory')).length}
              {' '}
              models
            </p>
          </NavLink>
        </div>

      </div>
    </div>
  );
};
