import { useContext } from 'react';
import { AddAndFavoritesContext } from '../contexts/AddAndFavoritesContext';
import './favoritesAddButton.scss';

type Props = {
  productId: number;
};

export const FavoritesAddButton = ({ productId }: Props) => {
  const context = useContext(AddAndFavoritesContext);
  // const toggleFavorite = () => {
  //   console.log('Toggle favorite for product:', productId);
  // };

  // if (!context) {
  //   throw new Error(
  //     'FavoritesAddButton must be used within AddAndFavoritesProvider',
  //   );
  // }

  const { toggleFavorite, isFavorite, toggleCart, isInCart } = context;

  return (
    <div className="add-favorites-container">
      {!isInCart(productId) ? (
        <button
          className="add-button has-shadow-cursor"
          onClick={() => toggleCart(productId)}
        >
          <p className="button-text">Add to cart</p>
        </button>
      ) : (
        <button
          className="add-button has-shadow-cursor added"
          onClick={() => toggleCart(productId)}
        >
          <p className="button-text">Added</p>
        </button>
      )}

      <button
        className="favorites-button has-shadow-cursor"
        onClick={() => toggleFavorite(productId)}
      >
        {!isFavorite(productId) ? (
          <img
            className="icon"
            src="/img/icons/Heart.svg"
            alt="favorites img"
          />
        ) : (
          <img
            className="icon"
            src="/img/icons/PinkHeartLike.svg"
            alt="favorites img"
          />
        )}
      </button>
    </div>
  );
};
