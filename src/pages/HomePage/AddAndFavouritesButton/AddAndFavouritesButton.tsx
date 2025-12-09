/* eslint max-len: "off" */
import { useContext } from 'react';
import './AddAndFavouritesButton.scss';
import { CartAndFavouritesContext } from '../../../components/context/CartAndFavouritesContext';

type Props = {
  productId: number;
};

export const AddAndFavouritesButton = ({ productId }: Props) => {
  const context = useContext(CartAndFavouritesContext);
  const { toggleFavourite, isFavourite, toggleCart, isInCart } = context;

  return (
    <div className="addAndFavourites__container">
      {!isInCart(productId) ? (
        <button className="addButton" onClick={() => toggleCart(productId)}>
          <p className="addButton__text">Add to cart</p>
        </button>
      ) : (
        <button
          className="addButton__added"
          onClick={() => toggleCart(productId)}
        >
          <p className="addButton__added--text-added">Added</p>
        </button>
      )}

      <button
        className="favouritesButton"
        onClick={() => toggleFavourite(productId)}
      >
        {!isFavourite(productId) ? (
          <img
            src="/img/icons/Favourites_icon.svg"
            alt="Favourites heart"
            className="icon"
          />
        ) : (
          <img
            src="/img/icons/Favourites-added_icon.svg"
            alt="Favourites yellow heart"
            className="icon"
          />
        )}
      </button>
    </div>
  );
};
