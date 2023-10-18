import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CategoryType } from '../../types/Category';
import { Context } from '../context';

type Props = {
  category: CategoryType
};

export const Category: React.FC<Props> = ({ category }) => {
  const {
    imageUrl,
    title,
    link,
  } = category;

  const { products } = useContext(Context);

  return (
    <div className="category__item">
      <Link to={link}>
        <img src={imageUrl} alt="123" className="category__img" />
      </Link>
      <h3>{title}</h3>
      <h4 className="category__text">
        {products.filter(product => product.type === link.slice(0, -1)).length}
        {' '}
        models
      </h4>
    </div>
  );
};
