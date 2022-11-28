import React from 'react';
import { Link } from 'react-router-dom';
import { CategoryType } from '../../types/Category';

type Props = {
  category: CategoryType
};

export const Category: React.FC<Props> = ({ category }) => {
  const {
    imageUrl,
    title,
    text,
    link,
  } = category;

  return (
    <div className="category__item">
      <Link to={link}>
        <img src={imageUrl} alt="123" className="category__img" />
      </Link>
      <h3>{title}</h3>
      <h4 className="category__text">{text}</h4>
    </div>
  );
};
