import { Link } from 'react-router-dom';
import './ProductCard.scss';
import React from 'react';
import { useCartFavorites } from '../../providers/CartFavoritesProvider';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

export const ProductCard = ({ product }: any) => {
  const {
    name, price, fullPrice, screen, capacity, ram, image, id, itemId,
  } = product;

  const {
    addToCart, addToFavorites, removeFromCart, removeFromFavorites,
    state: cartFavoritesState,
  } = useCartFavorites();

  const isInCart = cartFavoritesState.cart.some((item) => item.id === id);
  const isInFavorites = cartFavoritesState.favorites
    .some((item) => item.id === id);

  const path = `/phones/${product.itemId || product.id}`;

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addToCart(product);
  };

  const handleAddToFavorites = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addToFavorites(product);
    // eslint-disable-next-line no-console
    console.log(cartFavoritesState.favorites);
  };

  const handleRemoveFromCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFromCart(id);
  };

  const handleRemoveFromFavorites = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    removeFromFavorites(id);
  };

  return (
    <main className="container" key={id}>
      <Link to={`${path}`} className="card-link" data-qa="card" key={itemId}>
        <div className="card" data-qa="card" key={id}>
          <img
            src={BASE_URL + (image || product.images[0])}
            alt={name}
            className="card_image"
          />
          <h2 className="card_name">{name || product.name}</h2>
          <div className="card_prices">
            <h2 className="card_prices_actualprice">
              $
              {price || product.priceDiscount}
            </h2>

            <p className="card_prices_fullprice">
              $
              {fullPrice || product.priceRegular}
            </p>
          </div>

          <div className="card_line" />

          <div className="card_screen">
            <p className="card_screen_name">
              Screen:
            </p>
            <p className="card_screen_number">{screen || product.screen}</p>
          </div>

          <div className="card_capacity">
            <p className="card_capacity_name">
              Capacity:
            </p>
            <p className="card_capacity_number">
              {capacity || product.capacity}
            </p>
          </div>

          <div className="card_ram">
            <p className="card_ram_name">
              RAM:
            </p>
            <p className="card_ram_number">{ram || product.ram}</p>
          </div>

          <div className="card_buttons">
            {isInCart ? (
              <button
                onClick={handleRemoveFromCart}
                type="button"
                className="card_buttons_cart-added"
              >
                Added to Cart
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                type="button"
                className="card_buttons_cart"
              >
                Add to Cart
              </button>
            )}

            {isInFavorites ? (
              <button
                onClick={handleRemoveFromFavorites}
                type="button"
                className="card_buttons_fav"
                aria-label="Remove from Favorites"
              >
                <div className="card_buttons_fav_image-added" />
              </button>
            ) : (
              <button
                onClick={handleAddToFavorites}
                type="button"
                className="card_buttons_fav"
                aria-label="Add to Favorites"
              >
                <div className="card_buttons_fav_image" />
              </button>
            )}
          </div>
        </div>
      </Link>
    </main>
  );
};
