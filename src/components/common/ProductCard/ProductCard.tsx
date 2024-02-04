import React, { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../definitions/types/Product';

import './ProductCard.scss';
import GraySelectButton from '../../UI/GraySelectButton';
import { AddToCartHandler, AddToCartHandlerRenderProps } from '../../../enhancers/hocs/AddToCartHandler';
import { AddToFavoritesHandler, AddToFavoritesHandlerRenderProps } from '../../../enhancers/hocs/AddToFavoritesHandler';
import { BASE_URL } from '../../../utils/fetchHelper';
import SquareSelectLikeButton from '../../UI/SquareSelectButton/descendants/SquareSelectLikeButton';
import Placeholder from '../../UI/Placeholder';
import { getRootCssVariable } from '../../../utils/cssHelper';

interface Props {
  product: Product | null,
}

export const ProductCard: React.FC<Props> = memo(({ product }) => {
  if (product == null) {
    const cardWidth = getRootCssVariable(' --product-card-width');

    return <Placeholder height='504px' width={cardWidth} />
  }

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
      <SquareSelectLikeButton {...props} />
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
            <ins className={`${BASE_CLASS}__current-price`}>
              $
              {price}
            </ins>

            {fullPrice && (
              <del className={`${BASE_CLASS}__old-price`}>
                $
                {fullPrice}
              </del>
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
            productId={product.itemId}
            render={renderAddToCartButton}
          />

          <AddToFavoritesHandler
            productId={product.itemId}
            render={renderAddToFavoritesButton}
          />
        </div>
      </div>
    </article>
  );
});
