import { useContext } from 'react';
import cn from 'classnames';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import '../../style/item.scss';
import { CatalogContext } from '../CatalogContext';
import { addedToCart, handleAddToCartClick } from '../../helper/Cart';
import {
  addedToFavorites,
  handleAddToFavoritesClick,
} from '../../helper/Favorites';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { cartItems, setCartItems, favoriteProducts, setFavoriteProducts } =
    useContext(CatalogContext);
  const DISCOUNT = product.fullPrice - product.price;

  return (
    <div className="product-card">
      <div className="product-card__imgContainer">
        <img
          src={`https://svitlanaramanauskas.github.io/react_phone-catalog/${product.image}`}
          alt="phone-img"
          className="product-card__img"
        />
      </div>

      <div className="product-card__content">
        <div className="product-card__name-wrapper">
          <p className="product-card__name">{product.name}</p>
        </div>
        {DISCOUNT > 0 ? (
          <div className="product-card__price-wrapper item__price-wrapper">
            <p
              className="
                item__price
                item__price--current
                product-card__price
                product-card__price--current
              "
            >{`$${product.price}`}</p>
            <p
              className="
                item__price
                item__price--original
                product-card__price
                product-card__price--original
               "
            >{`$${product.fullPrice}`}</p>
          </div>
        ) : (
          <div
            className="
              item__price-wrapper
              product-card__price-wrapper
            "
          >
            <p
              className="
                item__price
                item__price--current
                product-card__price
                product-card__price--current
              "
            >{`$${product.fullPrice}`}</p>
          </div>
        )}
        <div className="item__description product-card__description">
          <div className="item__description-row">
            <p className="item__description-title">Screen</p>
            <p className="item__description-value">{product.screen}</p>
          </div>
          <div className="item__description-row">
            <p className="item__description-title">Capacity</p>
            <p className="item__description-value">{product.capacity}</p>
          </div>
          <div className="item__description-row">
            <p className="item__description-title">RAM</p>
            <p className="item__description-value">{product.ram}</p>
          </div>
        </div>

        <div className="item__bottom product-card__bottom">
          <button
            type="button"
            onClick={event => {
              event.preventDefault();
              handleAddToCartClick(cartItems, setCartItems, product);
            }}
            className={cn('item__button', 'product-card__button', {
              'item__button--active': addedToCart(cartItems, product.id),
            })}
          >
            {`${addedToCart(cartItems, product.id) ? 'Added to cart' : 'Add to cart'}`}
          </button>

          <button
            type="button"
            data-cy="addToFavorite"
            onClick={event => {
              event.preventDefault();
              handleAddToFavoritesClick(
                favoriteProducts,
                setFavoriteProducts,
                product,
              );
            }}
            className={cn('item__icon', 'product-card__icon', {
              'item__icon--active': addedToFavorites(
                favoriteProducts,
                product.id,
              ),
            })}
          >
            <div
              aria-label="add-to-favorites"
              className={cn('item__icon-image', 'product-card__icon-image', {
                'item__icon-image--active': addedToFavorites(
                  favoriteProducts,
                  product.id,
                ),
              })}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
