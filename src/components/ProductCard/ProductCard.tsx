import { Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { Product } from '../../type/Product';
import './ProductCard.scss';
import { DispatchContext, StateContext } from '../../store/ProductsContext';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useContext(DispatchContext);
  const { favourites, cart } = useContext(StateContext);
  const screen = product.screen.replace("' ", '” ');
  const capacity = product.capacity.replace('GB', ' GB');
  const ram = product.ram.replace('GB', ' GB');

  const isFan = favourites.some(fav => fav.itemId === product.itemId);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorite', JSON.stringify(favourites));
  }, [favourites]);

  const handleFanClick = () => {
    const type = isFan ? 'deleteFavourites' : 'addFavourites';

    dispatch({ type, payload: product.itemId });
  };

  const handleCartClick = () => {
    dispatch({ type: 'addToCart', payload: product.itemId });
  };

  const addedToCart = cart.some(c => c.itemId === product.itemId);

  return (
    <div className="Card" data-cy="cardsContainer">
      <Link
        to={`/${product.category}/${product.itemId}`}
        className="Card__link"
      >
        <img src={product.image} alt={product.name} className="Card__photo" />
        <p className="Card__product-name" title={product.name}>
          {product.name}
        </p>
        <div className="Card__price">
          <div className="Card__price-current">{`$${product.price}`}</div>
          {product.fullPrice && (
            <div className="Card__price-full">{`$${product.fullPrice}`}</div>
          )}
        </div>
        <div className="Card__line" />
        <div className="Card__description">
          <div className="Card__description-item">
            <p className="Card__description-text">Screen</p>
            <p className="Card__description-value">{screen}</p>
          </div>
          <div className="Card__description-item">
            <p className="Card__description-text">Capacity</p>
            <p className="Card__description-value">{capacity}</p>
          </div>
          <div className="Card__description-item">
            <p className="Card__description-text">RAM</p>
            <p className="Card__description-value">{ram}</p>
          </div>
        </div>
      </Link>

      <div className="Card__buttons">
        {!addedToCart ? (
          <button
            type="button"
            className="Card__buttons-add"
            onClick={handleCartClick}
          >
            Add to cart
          </button>
        ) : (
          <button type="button" className="Card__buttons-added">
            Added
          </button>
        )}

        <button
          type="button"
          className="Card__buttons-favorite"
          data-cy="addToFavorite"
          onClick={handleFanClick}
        >
          <img
            src={isFan ? 'icons/Heart_Like_Red.svg' : 'icons/Heart_Like.svg'}
            alt="favorite"
            className="Card__buttons-favorite-icon"
          />
        </button>
      </div>
    </div>
  );
};
