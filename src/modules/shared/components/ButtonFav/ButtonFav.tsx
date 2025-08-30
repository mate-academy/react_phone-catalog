import { useContext } from 'react';
import scss from './ButtonFav.module.scss';
import { DataContext } from '../../../../context/ContextProvider';

interface Props {
  productId: number;
}

export const ButtonFav: React.FC<Props> = ({ productId }) => {
  const { favItems, setFavItems } = useContext(DataContext);

  const fav = favItems.includes(productId);
  const count = favItems.length;

  const showBadge = !fav && count > 0;

  const toggleFav = (id: number) => {
    setFavItems((prev: number[]) => {
      const next = prev.includes(id)
        ? prev.filter((x: number) => x !== id)
        : [...prev, id];

      return next;
    });
  };

  return (
    <button
      type="button"
      className={scss.buttonFav}
      aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}
      aria-pressed={fav}
      onClick={() => toggleFav(productId)}
    >
      <svg
        className={scss.buttonFav__icon}
        aria-hidden="true"
        focusable="false"
      >
        <use
          href={`/icons/icons.svg#${fav ? 'filled-heart' : 'heart-icon'}`}
        ></use>
      </svg>

      {showBadge && (
        <span className={scss.buttonFav__counter} aria-hidden="true">
          {count}
        </span>
      )}
    </button>
  );
};
