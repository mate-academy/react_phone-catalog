/* eslint-disable max-len */

import React, { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../definitions/types/Product';

import './ProductCard.scss';
import GraySelectButton from '../../UI/buttons/GraySelectButton';
import {
  AddToCartHandler, AddToCartHandlerRenderProps,
} from '../../../enhancers/hocs/AddToCartHandler';
import {
  AddToFavoritesHandler, AddToFavoritesHandlerRenderProps,
} from '../../../enhancers/hocs/AddToFavoritesHandler';
import { BASE_URL } from '../../../utils/fetchHelper';
import SquareSelectLikeButton from '../../UI/buttons/SquareSelectButton/descendants/SquareSelectLikeButton';

import Placeholder from '../../UI/Placeholder';
import { useDirection } from '../../../enhancers/hooks/direction';

interface Props {
  product: Product | null,
  className?: string,
}

export const ProductCard: React.FC<Props> = memo(({
  product,
  className,
}) => {
  const direction = useDirection();

  const renderAddToCartButton = useCallback(
    (props: AddToCartHandlerRenderProps) => <GraySelectButton {...props} />, [],
  );

  const renderAddToFavoritesButton = useCallback(
    (props: AddToFavoritesHandlerRenderProps) => <SquareSelectLikeButton {...props} />, [],
  );

  if (product === null) {
    return <Placeholder height="504px" className={className} />;
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

  return (
    <article className={`${BASE_CLASS} ${className || ''}`}>
      <div className={`${BASE_CLASS}__content`}>
        <Link to={direction(`/${category}/${itemId}`)} className={`${BASE_CLASS}__top`}>
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
      </div>
    </article>
  );
});
