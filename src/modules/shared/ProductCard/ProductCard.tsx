import React from 'react';
import { Link } from 'react-router-dom';
import { AddBlock } from '../AddBlock';
import { Product } from '../../../types/Product';

type Props = {
  product: Product;
  widthCard: number;
  hotPrice: boolean;
};

export const ProductCard: React.FC<Props> = React.memo(
  ({ product, widthCard, hotPrice }) => {
    const { name, image, fullPrice, price, screen, capacity, ram } = product;
    const modifyScreen = screen
      .split(' ')
      .slice(0, 2)
      .join(' ')
      .replace(`'`, `”`);

    return (
      <div className="product-card" style={{ width: `${widthCard}px` }}>
        <Link to="/" className="product-card__img-link">
          <img src={image} alt={`${name}`} className="product-card__img" />
        </Link>

        <p className="product-card__title">{name}</p>

        {hotPrice ? (
          <p className="product-card__price">
            {`$${fullPrice}`} <span className="crossed">{`$${price}`}</span>
          </p>
        ) : (
          <p className="product-card__price">{`$${fullPrice}`}</p>
        )}

        <div className="product-card__descr">
          <p className="product-card__descr-item">
            Screen <span className="bold">{modifyScreen}</span>
          </p>
          <p className="product-card__descr-item">
            Capacity <span className="bold">{capacity}</span>
          </p>
          <p className="product-card__descr-item">
            RAM <span className="bold">{ram}</span>
          </p>
        </div>

        <AddBlock />
      </div>
    );
  },
);
