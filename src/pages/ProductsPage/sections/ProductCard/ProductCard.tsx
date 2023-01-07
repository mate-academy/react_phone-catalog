import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'src/types/Product';
import classNames from 'classnames';
import { getRenderedRam } from 'src/utils/helpers/getRenderedRam';
import { getRenderedCapacity } from 'src/utils/helpers/getRenderedCapacity';
import { AddButton } from 'src/components/AddButtons';
import './ProductCard.scss';

type Props = {
  isSlide: boolean,
  product: Product,
  favourites: Product[],
  setFavourites: React.Dispatch<React.SetStateAction<Product[]>>,
  cartProducts: Product[],
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>,
};

export const ProductCard: FC<Props> = ({
  product,
  isSlide,
  favourites,
  setFavourites,
  cartProducts,
  setCartProducts,
}) => {
  const {
    name,
    image,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    category,
    itemId,
  } = product;
  const renderedCapacity = getRenderedCapacity(capacity) || '-';
  const renderedRam = getRenderedRam(ram) || '-';

  return (
    <div className={classNames(
      'card',
      { 'keen-slider__slide': isSlide },
    )}
    >
      <Link
        className="card__img-wrapper"
        to={`/${category}/${itemId}`}
      >
        <img
          className="card__img"
          src={`../${image}`}
          alt="phone"
        />
      </Link>
      <div className="card__top-block">
        <Link
          className="card__desc"
          to={`/${category}/${itemId}`}
        >
          {name}
        </Link>

        <div className="card__price">
          <div className="card__price-actual">{`$${price}`}</div>

          {fullPrice && (
            <span className="card__price-previous">{`$${fullPrice}`}</span>
          )}
        </div>
      </div>

      <div className="card__features">
        <div className="card__feature">
          <div className="card__feature-key">Screen</div>
          <div className="card__feature-value">{screen}</div>
        </div>
        <div className="card__feature">
          <div className="card__feature-key">Capacity</div>
          <div className="card__feature-value">{renderedCapacity}</div>
        </div>
        <div className="card__feature">
          <div className="card__feature-key">RAM</div>
          <div className="card__feature-value">{renderedRam}</div>
        </div>
      </div>

      <AddButton
        favourites={favourites}
        setFavourites={setFavourites}
        cartProducts={cartProducts}
        setCartProducts={setCartProducts}
        product={product}
      />
    </div>
  );
};
