import React, { memo, useMemo } from 'react';
import productCardStyles from './ProductCard.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { Spec } from '../../types/Spec';
import { ProductSpecs } from '../ProductSpecs/ProductSpecs';
import { Product } from '../../types/Product';
import classNames from 'classnames';
import { AddToCartButton } from '../AddToCartButton';
import { AddToFavoritesButton } from '../AddToFavoritesButton';
import { Divider } from '../Divider/Divider';

type Props = {
  product: Product;
  className?: string;
};

export const ProductCard: React.FC<Props> = memo(({ product, className }) => {
  const [searchParams] = useSearchParams();
  const {
    itemId,
    name,
    category,
    image,
    fullPrice,
    price: discountPrice,
    screen,
    capacity,
    ram,
  } = product;
  const specs: Spec[] = useMemo(
    () => [
      { label: 'Screen', value: screen },
      { label: 'Capacity', value: capacity },
      { label: 'RAM', value: ram },
    ],
    [screen, capacity, ram],
  );

  return (
    <article className={classNames(className, productCardStyles.productCard)}>
      <Link
        to={`/${category}/${itemId}`}
        state={{ search: searchParams.toString() }}
        className={productCardStyles.productCard__link}
      >
        <div className={productCardStyles.productCard__imageContainer}>
          <img
            src={image}
            alt={`Image of ${name}`}
            className={productCardStyles.productCard__image}
          />
        </div>
        <h3 className={productCardStyles.productCard__title}>{name}</h3>
        <div className={productCardStyles.productCard__prices}>
          <p className={productCardStyles.productCard__discountPrice}>
            ${discountPrice}
          </p>
          <p className={productCardStyles.productCard__fullPrice}>
            ${fullPrice}
          </p>
        </div>
        <Divider />
        <ProductSpecs specs={specs} short />
      </Link>
      <div className={productCardStyles.productCard__buttons}>
        <AddToCartButton itemId={itemId} />
        <AddToFavoritesButton itemId={itemId} />
      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';
