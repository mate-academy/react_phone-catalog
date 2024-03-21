import React, { memo, useMemo } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { Product } from '../../types/Product';

import { ActionButtons } from '../ActionButtons';
import { Specification } from '../Specification';

import './ProductCard.scss';
import { API_URL } from '../../utils/api';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = memo(({ product }) => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  // prettier-ignore
  const {
    name,
    image,
    price,
    fullPrice = null,
    screen,
    capacity,
    ram,
    category,
    itemId,
  } = product;

  const specifications = useMemo(
    () => [
      ['Screen', screen],
      ['Capacity', capacity],
      ['RAM', ram],
    ],
    [screen, capacity, ram],
  );

  return (
    <article className="ProductCard" data-cy="cardsContainer">
      <Link
        to={`/${category}/:${itemId}`}
        state={{ search: searchParams.toString(), prevPathname: pathname }}
        className="ProductCard__linkBlock"
      >
        <div className="ProductCard__imgMask">
          <img
            className="ProductCard__image"
            src={`${API_URL}/${image}`}
            alt={name}
          />
        </div>

        <p className="ProductCard__name">{`${name} (iMT9G2FS/A)`}</p>
      </Link>

      <div className="ProductCard__pricesBlock">
        <h2 className="ProductCard__price">${price}</h2>
        {!!fullPrice && <p className="ProductCard__fullPrice">${fullPrice}</p>}
      </div>

      <hr className="ProductCard__divider" />

      <div className="ProductCard__endBlock">
        <div className="ProductCard__description">
          {specifications.map(([key, value]) => (
            <Specification key={key} specification={[key, value]} />
          ))}
        </div>

        <ActionButtons size="40px" productId={itemId} />
      </div>
    </article>
  );
});
