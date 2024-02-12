/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import { TechSpecs } from '../TechSpecs/TechSpecs';
import { BuyButtons } from '../BuyButtons/BuyButtons';
import './ProductCard.scss';
import { Price } from '../Price';

export type Props = {
  info?: string,
  discount?: number,
};

export const ProductCard: React.FC<Props> = () => {
  return (
    <div className="product-card">
      <img
        src="/img/products/iphone.jpg"
        alt="iphone"
        className="product-card__photo"
      />

      <Link
        to="./model"
        className="product-card__title"
      >
        Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
      </Link>

      <Price
        discount={12}
        price={799}
        classNames="product-card__price"
      />
      <TechSpecs classNames="product-card__details" hasBorder />
      <BuyButtons classNames="product-card__buttons" />
    </div>
  );
};
