import React, { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';

import './ProductCard.scss';
import GraySelectButton from '../../UI/GraySelectButton';
import { AddToCartHandler, AddToCartHandlerRenderProps } from '../../hocs/AddToCartHandler';
import { AddToFavoritesHandler, AddToFavoritesHandlerRenderProps } from '../../hocs/AddToFavoritesHandler';
import SquareSelectButton from '../../UI/SquareSelectButton';
import { BASE_URL } from '../../utils/axiosHelper';

interface Props {
  product: Product,
}

export const ProductCard: React.FC<Props> = memo(({ product }) => {
  const {
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
    category,
    itemId,
  } = product;
  const BASE_CLASS = 'product-card';

  const renderAddToCartButton = useCallback(
    (props: AddToCartHandlerRenderProps) => <GraySelectButton {...props} />,
    [],
  );

  const renderAddToFavoritesButton = useCallback(
    (props: AddToFavoritesHandlerRenderProps) => (
      <SquareSelectButton
        icon="./img/icons/hearth-empty-icon.svg"
        iconSelected="./img/icons/hearth-fill-icon.svg"
        {...props}
      />
    ),
    [],
  );

  return (
    <article className={`${BASE_CLASS}`}>
      <Link to={`/${category}/${itemId}`} className={`${BASE_CLASS}__top`}>
        <img
          className={`${BASE_CLASS}__img`}
          src={`${BASE_URL}/${image}`}
          alt={name}
          loading="lazy"
        />

        <div className={`${BASE_CLASS}__main-info`}>
          <h3 className={`${BASE_CLASS}__name`}>{name}</h3>

          <p className={`${BASE_CLASS}__price`}>
            <span className={`${BASE_CLASS}__current-price`}>
              $
              {price}
            </span>

            {fullPrice && (
              <span className={`${BASE_CLASS}__old-price`}>
                $
                {fullPrice}
              </span>
            )}
          </p>
        </div>
      </Link>

      <hr />

      <div className={`${BASE_CLASS}__bottom`}>
        <table className={`${BASE_CLASS}__features`}>
          <tbody>
            <tr>
              <td>Screen</td>
              <td>{screen}</td>
            </tr>
            <tr>
              <td>Capacity</td>
              <td>{capacity}</td>
            </tr>
            <tr>
              <td>RAM</td>
              <td>{ram}</td>
            </tr>
          </tbody>
        </table>

        <div className={`${BASE_CLASS}__buttons`}>
          <AddToCartHandler
            product={product}
            render={renderAddToCartButton}
          />

          <AddToFavoritesHandler
            product={product}
            render={renderAddToFavoritesButton}
          />
        </div>
      </div>
    </article>
  );
});
