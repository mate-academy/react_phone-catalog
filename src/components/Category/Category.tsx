import React from 'react';
// import cn from 'classnames';
import './Category.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  title: string;
  image: string;
  amount: number;
};

export const Category: React.FC<Props> = ({ title, image, amount }) => {
  return (
    <article className="category">
      {title === 'Mobile phones' && (
        <NavLink to="/phones" className="category__image">
          <img src={image} alt="Image" />
        </NavLink>
      )}

      {title === 'Tablets' && (
        <NavLink to="/tablets" className="category__image">
          <img src={image} alt="Image" />
        </NavLink>
      )}

      {title === 'Accessories' && (
        <NavLink to="/accessories" className="category__image">
          <img src={image} alt="Image" />
        </NavLink>
      )}
      <h4 className="category__title title--small">{title}</h4>
      <p className="category__info">{`${amount} models`}</p>
    </article>
  );
};
