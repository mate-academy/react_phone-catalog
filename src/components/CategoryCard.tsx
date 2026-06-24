import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  title: string;
  image: string;
  count: number;
  mobTitle?: string;
};

export const CategoryCard: React.FC<Props> = ({
  title,
  image,
  count,
  mobTitle = title,
}) => {
  return (
    <div className="home__category__section">
      <NavLink to={`/${title}`} className="home__category__section--img">
        <img className="home__section--img" src={image} alt={title} />
      </NavLink>
      <NavLink to={`/${title}`}>
        <div className="home__category__section--title text-h4">{mobTitle}</div>
      </NavLink>
      <div className="home__category__section--models">{count} models</div>
    </div>
  );
};
