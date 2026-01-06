import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.scss';

type Props = {
  title: string;
  count: number;
  image: string;
  bg: string;
  mod: 'phones' | 'tablets' | 'accessories';
};

export const CategoryCard: React.FC<Props> = ({
  title,
  count,
  image,
  bg,
  mod,
}) => {
  return (
    <Link to={`/${mod}`} className="category-card">
      <div className={`category-card category-card--${mod}`}>
        <div className="category-card__image" style={{ backgroundColor: bg }}>
          <img src={`${image}`} alt={title} />
        </div>
        <div className="category-card__info">
          <h3 className="category-card__title">{title}</h3>
          <p className="category-card__count">{count} models</p>
        </div>
      </div>
    </Link>
  );
};
