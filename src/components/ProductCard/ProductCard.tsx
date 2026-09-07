import './ProductCard.scss';
import { Product } from '../../types/Product';
import { useAppDispatch, useAppSelector } from '../../customHooks/customHooks';
import {
  addProductToFavorites,
  removeProductFromFavorites,
} from '../../expansions/favorites';
import { addToCart, removeFromCart } from '../../expansions/cart';
import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import favoritesImg from '../../images/logo/favorites.svg';
import addedToFavorites from '../../images/logo/addedInFavorites.svg';

type Props = {
  product: Product;
  discount?: number;
};

export const ProductCard: React.FC<Props> = React.memo(
  ({ product, discount }) => {
    const { image, name, price, screen, capacity, ram, fullPrice } = product;

    const dispatch = useAppDispatch();
    const { favorites } = useAppSelector(state => state.favorites);
    const { productsInCart } = useAppSelector(state => state.cart);

    const handleProductInCart = (currentProduct: Product) => {
      if (productsInCart.some(item => item.id === currentProduct.id)) {
        dispatch(removeFromCart(currentProduct.id));
      } else {
        dispatch(addToCart(currentProduct));
      }
    };

    const handleProductInFavorites = (currentProduct: Product) => {
      if (favorites.some(item => item && item.id === currentProduct.id)) {
        dispatch(removeProductFromFavorites(currentProduct));
      } else {
        dispatch(addProductToFavorites(currentProduct));
      }
    };

    const isProductInFavorites = favorites.some(
      item => item && item.id === product.id,
    );
    const isProductInCart = productsInCart.some(item => item.id === product.id);

    return (
      <div className="productCard">
        <div className="productCard__content">
          <Link
            to={`/${product.category}/:${product.itemId}`}
            className="productCard__link"
          >
            <img src={image} alt={name} className="productCard__link_img" />
          </Link>

          <Link
            to={`/${product.category}/:${product.itemId}`}
            className="productCard__title"
          >
            {name}
          </Link>
          <div className="productCard__block_prices">
            <p className="productCard__price">{`$${price}`}</p>
            {discount && (
              <p className="productCard__fullPrice">{`$${fullPrice}`}</p>
            )}
          </div>

          <span className="productCard__line"></span>

          <div className="productCard__info">
            <div className="productCard__info_block">
              <div className="productCard__info_block--name">Screen:</div>
              <div className="productCard__info_block--value">{screen}</div>
            </div>

            <div className="productCard__info_block">
              <div className="productCard__info_block--name">Capacity:</div>
              <div className="productCard__info_block--value">{capacity}</div>
            </div>

            <div className="productCard__info_block">
              <div className="productCard__info_block--name">Ram:</div>
              <div className="productCard__info_block--value">{ram}</div>
            </div>
          </div>

          <div className="productCard__buttons">
            <button
              className={classNames('productCard__buttons_cart', {
                'productCard__buttons_cart-isActive': isProductInCart,
              })}
              onClick={() => handleProductInCart(product)}
            >
              {isProductInCart ? 'Added' : 'Add'}
            </button>

            <button
              className={classNames('productCard__buttons_favorites', {
                'productCard__buttons_favorites-isActive': isProductInFavorites,
              })}
              onClick={() => handleProductInFavorites(product)}
            >
              <img
                src={isProductInFavorites ? addedToFavorites : favoritesImg}
                alt="Favorites"
                className="productCard__buttons_favorites_img"
              />
            </button>
          </div>
        </div>
      </div>
    );
  },
);

ProductCard.displayName = 'ProductCard';
