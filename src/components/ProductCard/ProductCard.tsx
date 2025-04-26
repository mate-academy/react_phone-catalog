import { Product } from '../../types/Product';
import fav from '../../images/icons/favourites16px.svg';
import favDark from '../../images/icons/fav_dark.svg';
import favLike from '../../images/icons/favourites_like.png';
import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { useAppDispath, useAppSelector } from '../../hooks/hooks';
import { addProduct, removeProduct } from '../../features/favourites';
import { addToCart, removeFromCart } from '../../features/cart';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import React from 'react';

type Props = {
  product: Product;
  discount?: boolean;
  slash?: boolean;
};

export const ProductCard: React.FC<Props> = React.memo(
  ({ product, discount, slash }) => {
    const { image, name, price, screen, capacity, ram, fullPrice } = product;

    const { theme } = useAppSelector(state => state.theme);

    const { t } = useTranslation();

    const dispatch = useAppDispath();
    const { favourites } = useAppSelector(state => state.favourites);
    const { productsOfCart } = useAppSelector(state => state.cart);

    const handleFavourites = (prod: Product) => {
      if (favourites.some(item => item.id === prod.id)) {
        dispatch(removeProduct(prod));
      } else {
        dispatch(addProduct(prod));
      }
    };

    const handleCart = (prod: Product) => {
      if (productsOfCart.some(item => item.id === prod.id)) {
        dispatch(removeFromCart(prod.id));
      } else {
        dispatch(addToCart(prod));
      }
    };

    const isProductFav = favourites.some(item => item.id === product.id);
    const isProductInCart = productsOfCart.some(prod => prod.id === product.id);

    return (
      <div className="productCard">
        <div className="productCard__content">
          <Link
            to={`/${product.category}/:${product.itemId}`}
            className="productCard__link"
          >
            {slash ? (
              <img src={image} alt={name} className="productCard__link_img" />
            ) : (
              <img src={image} alt={name} className="productCard__link_img" />
            )}
          </Link>

          <Link
            to={`/${product.category}/:${product.itemId}`}
            className="productCard__title"
          >
            {name}
          </Link>
          <div className="productCard__block-price">
            <p className="productCard__price">{`$${price}`}</p>
            {discount && (
              <p className="productCard__fullPrice">{`$${fullPrice}`}</p>
            )}
          </div>

          <span className="productCard__line"></span>

          <div className="productCard__info">
            <div className="productCard__info_block">
              <div className="productCard__info_block--name">
                {t('productCard.info.screen')}
              </div>
              <div className="productCard__info_block--value">{screen}</div>
            </div>

            <div className="productCard__info_block">
              <div className="productCard__info_block--name">
                {t('productCard.info.capacity')}
              </div>
              <div className="productCard__info_block--value">{capacity}</div>
            </div>

            <div className="productCard__info_block">
              <div className="productCard__info_block--name">
                {t('productCard.info.ram')}
              </div>
              <div className="productCard__info_block--value">{ram}</div>
            </div>
          </div>

          <div className="productCard__buttons">
            <button
              className={classNames('productCard__buttons_cart', {
                'productCard__buttons_cart-isActive': isProductInCart,
              })}
              onClick={() => handleCart(product)}
            >
              {isProductInCart
                ? t('productCard.button.added')
                : t('productCard.button.add')}
            </button>

            <button
              className={classNames('productCard__buttons_favourites', {
                'productCard__buttons_favourites-isActive': isProductFav,
              })}
              onClick={() => handleFavourites(product)}
            >
              <img
                src={
                  isProductFav
                    ? favLike
                    : theme === 'light-theme'
                      ? fav
                      : favDark
                }
                alt="Favourites"
                className="productCard__buttons_favourites-img"
              />
            </button>
          </div>
        </div>
      </div>
    );
  },
);

ProductCard.displayName = 'ProductCard';
