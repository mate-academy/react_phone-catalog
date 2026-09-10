import React from 'react';
import { Product } from '../../../../types/Product';

type CartItem = {
  item: Product;
  quantity: number;
};

export const PriceAndBuy = ({
  selectedProduct,
  setCart,
  cart,
  favorite,
  setFavoriteState,
}) => {
  const handleAddToCart = () => {
    const storedCart: CartItem[] = JSON.parse(
      localStorage.getItem('CartStore') || '[]',
    );

    const isAlreadyInCart = storedCart.some(
      cartItem => cartItem?.item?.id === selectedProduct?.id,
    );

    let updatedCart;

    if (isAlreadyInCart) {
      updatedCart = storedCart.filter(
        item => item?.item?.id !== selectedProduct?.id,
      );
    } else {
      updatedCart = [...storedCart, { item: selectedProduct, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem('CartStore', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleAddToFavorite = () => {
    const storedFavorite: Product[] = JSON.parse(
      localStorage.getItem('FavoriteStore') || '[]',
    );

    const isAlreadyInFavorite = storedFavorite.some(
      item => item?.id === selectedProduct?.id,
    );

    let updatedFavorite: Product[];

    if (isAlreadyInFavorite) {
      updatedFavorite = storedFavorite.filter(
        item => item?.id !== selectedProduct?.id,
      );
    } else {
      updatedFavorite = [...storedFavorite, selectedProduct];
    }

    setFavoriteState(updatedFavorite);
    localStorage.setItem('FavoriteStore', JSON.stringify(updatedFavorite));
    window.dispatchEvent(new Event('favUpdated'));
  };

  const isInCart =
    cart?.some(cartItem => cartItem?.item?.id === selectedProduct?.id) || false;

  const isInFavorite =
    favorite?.some(favoriteItem => favoriteItem?.id === selectedProduct?.id) ||
    false;

  return (
    <>
      <div className="block-buy__price">
        <p className="text-h2">${selectedProduct?.price}</p>
        <p
          className="text-h4 secondary"
          style={{ textDecoration: 'line-through' }}
        >
          ${selectedProduct?.fullPrice}
        </p>
      </div>
      <div className="block-buy__buttons">
        {!isInCart ? (
          <div
            className="block-buy__button-add-to-cart"
            onClick={() => handleAddToCart()}
          >
            <p className="text-button">Add to cart</p>
          </div>
        ) : (
          <div
            className="block-buy__button-add-to-cart--active"
            onClick={() => handleAddToCart()}
          >
            <p className="text-button">Added</p>
          </div>
        )}

        <div className="icon icon-48" onClick={() => handleAddToFavorite()}>
          {!isInFavorite ? (
            <div className="icon--heart-empty"></div>
          ) : (
            <div className="icon--heart-fill"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default PriceAndBuy;
