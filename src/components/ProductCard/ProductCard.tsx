import { Link } from 'react-router-dom';
import { useMemo } from 'react';

import { Product } from '../../types/Product';
import { BASE_URL } from '../../utils/httpClient';
import './product-card.scss';
import { AddToCartButton } from '../UI/AddToCartButton';
import { AddToFavButton } from '../UI/AddToFavButton';
import { getSpecs } from '../../services/getSpecs';
import { Specs } from '../Specs';
import { SpecsMode } from '../../types/SpecsMode';

type Props = {
  hasDiscount: boolean;
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ hasDiscount, product }) => {
  const {
    category,
    itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = product;

  const productCardSpecs = useMemo(() => getSpecs({
    screen,
    capacity,
    ram,
  }), [product]);

  return (
    <div className="product-card">
      <Link
        to={`/${category}/${itemId}`}
        className="product-card__link"
      >
        <img
          src={BASE_URL + image}
          alt={name}
          className="product-card__image"
        />

        <p className="product-card__title">
          {name}
        </p>
      </Link>

      <div className="product-card__price">
        {hasDiscount ? (
          <>
            <span className="product-card__actual-price">
              {`$${price}`}
            </span>

            <span className="product-card__initial-price">
              {`$${fullPrice}`}
            </span>
          </>
        ) : (
          <span className="product-card__actual-price">
            {`$${fullPrice}`}
          </span>
        )}
      </div>

      <div className="product-card__specs">
        <Specs
          specs={productCardSpecs}
          mode={SpecsMode.Medium}
        />
      </div>

      <div className="product-card__buttons">
        <AddToCartButton id={itemId} />

        <div className="product-card__buttons-fav-container">
          <AddToFavButton id={itemId} />
        </div>
      </div>
    </div>
  );
};
