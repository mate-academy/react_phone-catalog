import { Link } from 'react-router-dom';
import './Category.scss';
import React from 'react';

type Props = {
  img: string;
  title: string;
  amount: number;
};
export const Category: React.FC<Props> = ({ img, title, amount }) => {
  return (
    <Link to={`/${title}`} className="category">
      <img className="category__image" src={img} alt="" />

      <div className="category__text">
        <h3 className="category__title">{title}</h3>
        <span className="category__amount">{amount} models</span>
      </div>
    </Link>
  );
};
