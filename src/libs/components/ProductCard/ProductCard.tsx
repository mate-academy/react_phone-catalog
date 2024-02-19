/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';

import { TechSpecs } from '../TechSpecs/TechSpecs';
import { BuyButtons } from '../BuyButtons/BuyButtons';
import { Price } from '../Price';
import { Product } from '../../types';

import './ProductCard.scss';

export type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({
  product: {
    imageUrl,
    name,
    price,
    discount,
    ram,
    capacity,
    screen,
  },
}) => {
  return (
    <div className="product-card">
      <Link
        to="./model"
        className="product-card__photo-link"
      >
        <img
          src={`${imageUrl}`}
          alt={name}
          className="product-card__photo"
        />
      </Link>

      <Link
        to="./model"
        className="product-card__title"
      >
        {name}
      </Link>

      <Price
        discount={discount}
        price={price}
        classNames="product-card__price"
      />
      <TechSpecs
        classNames="product-card__details"
        hasBorder
        specs={
          {
            screen,
            capacity,
            ram,
          }
        }
      />
      <BuyButtons classNames="product-card__buttons" />
    </div>
  );
};
