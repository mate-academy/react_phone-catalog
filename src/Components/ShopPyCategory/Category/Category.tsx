import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../Types/Product';
import './Category.scss';

type Props = {
  name: string,
  imgUrl: string,
  color: string,
  to: string,
  products: Product[] | [],
};

export const Category: React.FC<Props> = ({
  name, imgUrl, color, to, products,
}) => {
  return (
    <Link to={to} style={{ textDecoration: 'none', margin: '0 auto' }}>
      <div className="category">
        <div className="category__shell" style={{ backgroundColor: color }}>
          <img src={`${imgUrl}`} alt="phones" className="category__img" />
        </div>

        <h4 className="category__title">{name}</h4>

        <span className="category__models">{`${products.length} models`}</span>
      </div>
    </Link>
  );
};
