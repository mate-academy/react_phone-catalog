import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import classNames from 'classnames';
import { Product } from '../../Types/Product';

import favoriteImg from '../../img/favourites.svg';
import redFavoritImg from '../../img/isfavorite.png';
import './productCard.scss';
import { ProductsContext } from '../ProductsContext/ProductsContext';

type Props = {
  product: Product;
  newProducts?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, newProducts }) => {
  const {
    image,
    category,
    itemId,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;

  const { favoriteProducts, toggleFavorite, cartProducts, toggleCart } =
    useContext(ProductsContext);

  // eslint-disable-next-line
  const isFavorite = favoriteProducts.some(favorite => favorite.itemId === itemId);
  const isAddedToCart = cartProducts.some(cart => cart.itemId === itemId);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="product-card__img-wrapper">
        <NavLink
          to={`/${category}/${itemId}`}
          onClick={handleClick}
          state={product}
        >
          <img
            className="product-card__image"
            src={`https://mate-academy.github.io/react_phone-catalog/_new/${image}`}
            alt="product"
          />
        </NavLink>
      </div>

      <p className="product-card__name">{name}</p>

      <p className="product-card__price">
        {newProducts ? (
          <>
            <span className="product-card__full-price--isActive">
              ${fullPrice}
            </span>
          </>
        ) : (
          <>
            <span className="product-card__new-price">${price}</span>
            <span className="product-card__full-price">${fullPrice}</span>
          </>
        )}
      </p>

      <div className="product-card__descr">
        <p className="product-card__screen">Screen</p>
        <p className="product-card__info">{screen}</p>
      </div>

      <div className="product-card__descr">
        <p className="product-card__capacity">Capacity</p>
        <p className="product-card__info">{capacity}</p>
      </div>

      <div className="product-card__descr">
        <p className="product-card__ram">Ram</p>
        <p className="product-card__info">{ram}</p>
      </div>

      <div className="product-card__btns">
        <button
          type="button"
          className={classNames('product-card__btn-cart btn', {
            'product-card__btn-cart--added': isAddedToCart,
          })}
          onClick={() => toggleCart(product)}
        >
          {isAddedToCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          className="product-card__btn-favorites btn-arrows"
          onClick={() => toggleFavorite(product)}
        >
          <img
            src={isFavorite ? redFavoritImg : favoriteImg}
            alt="favoritesIcon"
          />
        </button>
      </div>
    </>
  );
};
