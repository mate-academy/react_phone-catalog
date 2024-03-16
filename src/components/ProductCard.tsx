/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import cn from 'classnames';
import React from 'react';
import { Product } from '../types/Product';
import {
  getIsAdded,
  getIsFavourite,
  getProductPriceWithDiscount,
  handleFavourites,
} from '../helpers/ProductMethods';
import { CartItem } from '../types/CartItem';

type Props = {
  product: Product;
  setCartItems: (item: CartItem[]) => void;
  cartItems: CartItem[];
  favourites: Product[];
  setFavourites: (products: Product[]) => void;
};
export const ProductCart: React.FC<Props> = ({
  product,
  setCartItems,
  cartItems,
  favourites,
  setFavourites,
}) => {
  const isFavourite = getIsFavourite(favourites, product);
  const isAdded = getIsAdded(cartItems, product);

  const addToCart = (e: React.MouseEvent, selectedProduct: Product) => {
    e.preventDefault();
    const existingItem = cartItems.find(
      (item) => item.product?.id === selectedProduct.id,
    );

    if (existingItem) {
      const updatedItems = cartItems.filter(
        (item) => item.id !== existingItem.id,
      );

      setCartItems(updatedItems);
    } else {
      const newItem: CartItem = { id: product.id, quantity: 1, product };

      setCartItems([newItem, ...cartItems]);
    }
  };

  return (
    <div className="productCard" data-cy="cardsContainer">
      <div className="productCard__photo-block">
        <img
          src={`${product.imageUrl}`}
          className="productCard__photo"
          alt="productPhoto"
        />
      </div>
      <div className="productCard__title">{product.name}</div>
      <div className="productCard__price-block">
        {!!product.discount && (
          <div className="price">
            {`$${getProductPriceWithDiscount(product)}`}
          </div>
        )}
        <div
          className={cn('price', {
            'price--nodiscount ': product.discount,
          })}
        >
          {`$${product.price}`}
        </div>
      </div>

      <div className="card-description productCard__description">
        <div className="card-description__description-dir">
          <div className="card-description__description">
            <div className="card-description__text">Screen</div>
            <div className="card-description__element">{product.screen}</div>
          </div>

          <div className="card-description__description">
            <div className="card-description__text">Capacity</div>
            <div className="card-description__element">{product.capacity}</div>
          </div>

          <div className="card-description__description">
            <div className="card-description__text">RAM</div>
            <div className="card-description__element">{product.ram}</div>
          </div>
        </div>
      </div>

      <div className="productCard__control">
        <button
          className={cn('control-button', { 'in-cart': isAdded })}
          type="button"
          onClick={(e) => {
            addToCart(e, product);
          }}
        >
          {isAdded ? 'Added to cart' : 'Add to cart'}
        </button>
        <div
          className="icon-block"
          onClick={(e) => handleFavourites(e,
            isFavourite,
            product,
            favourites,
            setFavourites)}
        >
          <button
            className={cn('icon-button-favorities', {
              'icon-button-favorities--is-favourite': isFavourite,
            })}
            aria-label="icon-favorite"
            type="button"
            data-cy="addToFavorite"
          />
        </div>
      </div>
    </div>
  );
};
