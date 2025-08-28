import { useContext } from 'react';
import scss from './ButtonFav.module.scss';
import { DataContext } from '../../../../context/ContextProvider';

interface Props {
  productId: number;
}

export const ButtonFav: React.FC<Props> = ({ productId }) => {
  const { favItems, setFavItems } = useContext(DataContext);

  const toggleFav = (id: number) => {
    setFavItems((prev: number[]) => {
      const next = prev.includes(id)
        ? prev.filter((x: number) => x !== id)
        : [...prev, id];

      return next;
    });
  };

  const isFav = (id: number) => {
    return favItems.includes(id);
  };

  return (
    <button
      type="button"
      className={scss.buttonFav}
      aria-label={
        isFav(productId) ? 'Remove from favourites' : 'Add to favourites'
      }
      aria-pressed={isFav(productId)}
      onClick={() => toggleFav(productId)}
    >
      <svg
        className={scss.buttonFav__icon}
        aria-hidden="true"
        focusable="false"
      >
        <use
          href={`/icons/icons.svg#${isFav(productId) ? 'filled-heart' : 'heart-icon'}`}
        ></use>
      </svg>
    </button>
  );
};
