import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'src/types/Product';
import classNames from 'classnames';
import { getRenderedRam } from 'src/utils/helpers/getRenderedRam';
import { getRenderedCapacity } from 'src/utils/helpers/getRenderedCapacity';
import { AddButton } from 'src/components/AddButtons';

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
    imageUrl,
    price,
    discount,
    screen,
    capacity,
    ram,
    type,
    id,
  } = product;
  const priceAfterDiscount = price - (price / 100) * discount;
  const phoneEndPoint = imageUrl.split('/').at(-1);
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
        to={`/${type}s/${id}`}
      >
        <img
          className="card__img"
          src={`/assets/phones/${phoneEndPoint}`}
          alt="phone"
        />
      </Link>
      <div className="card__top-block">
        <Link
          className="card__desc"
          to={`/${type}s/${id}`}
        >
          {name}
        </Link>

        <div className="card__price">
          <div className="card__price-actual">{`$${priceAfterDiscount}`}</div>

          {!(priceAfterDiscount === price) && (
            <span className="card__price-previous">{`$${price}`}</span>
          )}
        </div>
      </div>

      <div className="card__features">
        <div className="card__feature">
          <div className="card__feature-key">Screen</div>
          <div className="card__feature-vaue">{screen}</div>
        </div>
        <div className="card__feature">
          <div className="card__feature-key">Capacity</div>
          <div className="card__feature-vaue">{renderedCapacity}</div>
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
