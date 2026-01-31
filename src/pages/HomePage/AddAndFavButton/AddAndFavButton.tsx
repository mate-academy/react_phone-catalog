/* eslint max-len: "off" */
import './AddAndFavButton.scss';
import { useContext } from 'react';
import { CardAndFavouritesContext } from '../../../components/context/CardAndFavouritesContext';
import { useTheme } from '../../../components/context/ThemeContext';

type Props = {
  productId: number;
};

export const AddAndFavButton = ({ productId }: Props) => {
  const context = useContext(CardAndFavouritesContext);
  const { toggleFavourite, isFavourite, toggleCard, isInCard } = context;
  const { theme } = useTheme();

  return (
    <div className="addAndFavourites__container">
      {!isInCard(productId) ? (
        <button className="addButton" onClick={() => toggleCard(productId)}>
          <p className="addButton__text">Add to card</p>
        </button>
      ) : (
        <button
          className="addButton__added"
          onClick={() => toggleCard(productId)}
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
            src={
              theme === 'light'
                ? import.meta.env.BASE_URL + 'img/icons/Favourites_icon.svg'
                : import.meta.env.BASE_URL + 'img/icons/Favourites_icon.svg' //PPLS!!! Add dark icon
            }
            alt="Favourites"
            className="icon"
          />
        ) : (
          <img
            src={
              theme === 'light'
                ? import.meta.env.BASE_URL +
                  'img/icons/Favourites-added_icon.svg'
                : import.meta.env.BASE_URL +
                  'img/icons/Favourites-added_icon.svg' // PLS!! Add dark icon
            }
            alt="Favourites fill"
            className="icon"
          />
        )}
      </button>
    </div>
  );
};
