import { useContext } from 'react';
import { AddAndFavouritesContext } from '../contexts/AddAndFavouriteContext';
import './favouritesAddButton.scss';

type Props = {
  productId: number;
};

export const FavouritesAddButton = ({ productId }: Props) => {
  const context = useContext(AddAndFavouritesContext);
  // const toggleFavourite = () => {
  //   console.log('Toggle favourite for product:', productId);
  // };

  if (!context) {
    throw new Error(
      'FavouritesAddButton must be used within AddAndFavouritesProvider',
    );
  }

  const { toggleFavourite, isFavourite, toggleCart, isInCart } = context;

  return (
    <div className="add-favourites-container">
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
        className="favourites-button has-shadow-cursor"
        onClick={() => toggleFavourite(productId)}
      >
        {!isFavourite(productId) ? (
          <img
            className="icon"
            src="/img/icons/Heart.svg"
            alt="favourites img"
          />
        ) : (
          <img
            className="icon"
            src="/img/icons/PinkHeartLike.svg"
            alt="favourites img"
          />
        )}
      </button>
    </div>
  );
};
