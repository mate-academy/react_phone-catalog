import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import './ProductCard.scss';
import { Product } from '../../types/product';
import { AddToCart } from '../AddToCart';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    id,
    itemId,
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;

  const preparedCapacity = useMemo(() => {
    return `${capacity.slice(0, -2)} ${capacity.slice(-2)}`;
  }, [capacity]);

  const preparedRam = useMemo(() => {
    return `${ram.slice(0, -2)} ${ram.slice(-2)}`;
  }, [ram]);

  return (
    <article
      className="product-card"
      data-cy="cardsContainer"
    >
      <Link
        to={`/phones/${itemId || id}`}
        className="product-card__link"
      >
        <div className="product-card__imgbox">
          <img
            src={`_new/${image}`}
            alt={name}
            className="product-card__img"
          />
        </div>

        <p className="product-card__title">{name}</p>

        <div className="product-card__pricebox">
          <h2>{`$${price}`}</h2>

          <h2 className="product-card__price">{`$${fullPrice}`}</h2>
        </div>

        <ul className="product-card__options">
          <li className="product-card__option-item">
            <p className="product-card__option-name">Screen</p>
            <p className="product-card__option-value">{screen}</p>
          </li>
          <li className="product-card__option-item">
            <p className="product-card__option-name">Capacity</p>
            <p className="product-card__option-value">{preparedCapacity}</p>
          </li>
          <li className="product-card__option-item">
            <p className="product-card__option-name">RAM</p>
            <p className="product-card__option-value">{preparedRam}</p>
          </li>
        </ul>
      </Link>

      <AddToCart id={itemId} />
    </article>
  );
};
