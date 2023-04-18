import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Product } from '../../Types/Product';
import './ProductCard.scss';

import { updateSeachParams } from '../../Helpers/updateSearchParams';
import { ToOrderButton } from '../Buttons/ToOrderButton/toOrderButton';
import { ToLikedButton } from '../Buttons/ToLIkedButton/ToLikedButton';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  /*
    eslint-disable jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-noninteractive-element-interactions
  */
  const {
    phoneId, image, name, fullPrice, price, screen, capacity, ram,
  } = product;

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState('');

  const productParamChange = (productId: string) => {
    setSelectedProduct(productId);
    setSearchParams(
      updateSeachParams(searchParams, { productParam: productId || null }),
    );
  };

  return (
    <div className="productCard">
      <Link
        to={{
          pathname: product.phoneId === selectedProduct ? '/phones' : `/phones/${product.phoneId}`,
        }}
        style={{ textDecoration: 'none' }}
        onClick={() => productParamChange(phoneId)}
      >
        <img src={`new/${image}`} className="productCard__img" alt="Phone" />
        <div className="productCard__info">
          <p
            className="productCard__name"
            style={{ color: '#000' }}
          >
            {name}
          </p>

          <div className="productCard__prices">
            <span className="productCard__prices--fullPrice">
              {`$${price}`}
            </span>

            <span className="productCard__prices--sale">
              {`$${fullPrice}`}
            </span>
          </div>
        </div>
      </Link>

      <div className="productCard__about">
        <ul className="productCard__list">
          <li>
            <span className="productCard__list-name">
              Screen
            </span>

            <span>{screen}</span>
          </li>

          <li>
            <span className="productCard__list-name">
              Capacity
            </span>

            <span>{capacity}</span>
          </li>

          <li>
            <span className="productCard__list-name">
              RAM
            </span>

            <span>{ram}</span>
          </li>
        </ul>

        <div className="productCard__buttons">
          <ToOrderButton product={product} />
          <ToLikedButton product={product} />
        </div>
      </div>
    </div>
  );
};
