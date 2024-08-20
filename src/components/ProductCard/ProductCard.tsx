/* eslint-disable @typescript-eslint/ban-ts-comment */
import './ProductCard.scss';
import React, { useContext } from 'react';
import { Product, TechSpecs } from '../../types/types';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ScrollToTop } from '../../utils/scrollWindowTop';
import { CatalogContext } from '../../context/CatalogContext';
import { images } from '../../images';
import classNames from 'classnames';

type Props = {
  product: Product;
  translate: number | null;
  brandNew?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  translate,
  brandNew,
}) => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const pathPage = pathname.split('/').slice(1)[0];
  const {
    addFavourites,
    deleteFavourites,
    addToCart,
    deleteFromCart,
    favouriteProducts,
    cartProducts,
  } = useContext(CatalogContext);

  const {
    id,
    itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
    category,
  } = product;

  const handleFavouriteChange = () => {
    if (favouriteProducts.some(favourite => favourite.id === product.id)) {
      if (pathPage !== 'favourites') {
        deleteFavourites(product.id);
      } else {
        const productElement = document.querySelector(
          `.productCard__item[data-item-id="${id}"]`,
        );

        if (productElement) {
          productElement.classList.toggle('hidden');
        }

        setTimeout(() => {
          deleteFavourites(product.id);
        }, 300);
      }
    } else {
      addFavourites(product);
    }
  };

  const handleCartChange = () => {
    if (cartProducts.some(cart => cart.id === product.id)) {
      deleteFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <div
      className={classNames('productCard__item selection-off', {
        'productCard__item-fix': translate !== null,
      })}
      style={{ transform: `translateX(${translate}px)` }}
      data-item-id={id}
    >
      <Link
        className="productCard__link"
        onClick={ScrollToTop}
        state={{ search: searchParams.toString() }}
        to={`/${category}/${itemId}`}
      >
        <div className="productCard__imgBlock">
          <img
            src={image}
            alt="phoneImage"
            className="productCard__img selection-off"
          />
        </div>
        <div className="productCard__item-top">
          <span className="bodyText productCard__text">{name}</span>
          <div className="productCard__priceBlock">
            {!brandNew && <h3>{`$${price}`}</h3>}
            <h3
              className={classNames('productCard__priceBlock--fullPrice', {
                'productCard__priceBlock--fullPrice-brandNew': brandNew,
              })}
            >
              {`$${fullPrice}`}
            </h3>
          </div>
        </div>
        <div className="productCard__item-center">
          <div className="productCard__item-center-param">
            <span className="smallText productCard__item-center-param--left">
              {TechSpecs.Screen}
            </span>
            <span className="productCard__item-center-param--right">
              {screen}
            </span>
          </div>
          <div className="productCard__item-center-param">
            <span className="smallText productCard__item-center-param--left">
              {TechSpecs.Capacity}
            </span>
            <span className="productCard__item-center-param--right">
              {capacity}
            </span>
          </div>
          <div className="productCard__item-center-param">
            <span className="smallText productCard__item-center-param--left">
              {TechSpecs.RAM}
            </span>
            <span className="productCard__item-center-param--right">{ram}</span>
          </div>
        </div>
      </Link>

      <div className="productCard__item-bottom">
        {cartProducts.some(cart => cart.id === product.id) ? (
          <button
            onClick={handleCartChange}
            className="
              productCard__item-bottom--buttonCart
              productCard__item-bottom--buttonCart-active
            "
          >
            Added
          </button>
        ) : (
          <button
            onClick={handleCartChange}
            className="productCard__item-bottom--buttonCart"
          >
            Add to cart
          </button>
        )}
        <button
          className="productCard__item-bottom--buttonHeart button"
          onClick={handleFavouriteChange}
        >
          {favouriteProducts.some(favourite => favourite.id === product.id) ? (
            <img src={images.heartActive} alt="favourite" />
          ) : (
            <img src={images.heart} alt="favourite" />
          )}
        </button>
      </div>
    </div>
  );
};
