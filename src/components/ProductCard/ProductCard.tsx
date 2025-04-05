import React, { useMemo } from 'react';
import productCardStyles from './ProductCard.module.scss';
import { IconSvg } from '../IconSvg/IconSvg';
import { ICON_DATA_PATHS } from '../../constants/iconDataPaths';
import { Link, useSearchParams } from 'react-router-dom';
import { Spec } from '../../types/Spec';
import { ProductSpecs } from '../ProductSpecs/ProductSpecs';
import { Product } from '../../types/Product';
import classNames from 'classnames';

type Props = {
  product: Product;
  className?: string;
};

export const ProductCard: React.FC<Props> = ({ product, className }) => {
  const [searchParams] = useSearchParams();
  const {
    itemId,
    name,
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
        to={`${itemId}`}
        state={{ search: searchParams.toString() }}
        className={productCardStyles.productCard__link}
      >
        <div className={productCardStyles.productCard__imageContainer}>
          <img
            src={image}
            alt={name}
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
        <hr className="horizontal-line" />
        <ProductSpecs specs={specs} />
      </Link>
      <div className={productCardStyles.productCard__buttons}>
        <button className={productCardStyles.productCard__addToCart}>
          Add to cart
        </button>
        <button className={productCardStyles.productCard__addToFavorite}>
          <IconSvg dataPath={ICON_DATA_PATHS.FAVOURITES} />
        </button>
      </div>
    </article>
  );
};
