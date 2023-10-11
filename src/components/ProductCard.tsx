import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../types/Product';
import { CartContext } from '../helpers/cartHelper';
import { FavoritesContext } from '../helpers/favoritesHelper';
import { getUrlProduct } from '../helpers/getUrlProduct';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { cartItems, addCartItems } = useContext(CartContext);
  const { favorites, addRemoveToFavorites } = useContext(FavoritesContext);
  const priceWithDiscount = product.price
    - (product.price * product.discount) / 100;
  const inCart = cartItems.find(item => item.id === product.id);
  const inFavorites = favorites.find(item => item.id === product.id);

  const addToCart = () => {
    if (!inCart) {
      addCartItems(product);
    }
  };

  const onClickFavoritesHandler = (currentProduct: Product) => () => {
    addRemoveToFavorites(currentProduct);
  };

  return (
    <div className="product-card" data-cy="cardsContainer">
      <Link
        to={getUrlProduct(product.type, product.id)}
        className="product-card__top"
      >
        <img
          src={`./${product.imageUrl}`}
          alt={product.name}
          className="product-card__image"
        />
        <p className="product-card__name">{product.name}</p>
      </Link>
      <div className="product-card__bottom">
        <div className="product-card__price-container">
          <h2>{`$${product.discount ? priceWithDiscount : product.price}`}</h2>
          {!!product.discount && (
            <p className="product-card__discount">
              {`$${product.price}`}
            </p>
          )}
        </div>
        <div className="product-card__characteristics">
          <div>
            <p>Screen</p>
            <p>{product.screen}</p>
          </div>
          <div>
            <p>Capacity</p>
            <p>{product.capacity}</p>
          </div>
          <div>
            <p>RAM</p>
            <p>{product.ram}</p>
          </div>
        </div>
        <div className="product-card__buttons">
          <button
            type="button"
            className={classNames(
              'button',
              'button--add',
              { 'button--add-selected': inCart },
            )}
            onClick={addToCart}
          >
            { inCart ? 'Added to cart' : 'Add to cart' }
          </button>

          <button
            type="button"
            className="button button--favorites"
            data-cy="addToFavorite"
            onClick={onClickFavoritesHandler(product)}
          >
            <span
              className={
                `icon ${inFavorites ? 'icon--favorites-selected' : 'icon--favorites'}`
              }
            />
          </button>
        </div>
      </div>
    </div>
  );
};
