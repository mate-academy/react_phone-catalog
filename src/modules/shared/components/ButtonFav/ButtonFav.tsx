import { useContext } from 'react';
import scss from './ButtonFav.module.scss';
import { DataContext } from '../../../../context/ContextProvider';
import classNames from 'classnames';
import { Fav } from '../../../../api/types';

interface Props {
  productId: number;
  hasDiscount: boolean;
  className?: string;
}

export const ButtonFav: React.FC<Props> = ({
  productId,
  className,
  hasDiscount,
}) => {
  const { favItems, setFavItems } = useContext(DataContext);

  const fav = favItems.find(item => item.productId === productId);
  const isFav = !!favItems.find(item => item.productId === productId);

  const toggleFav = (id: number) => {
    setFavItems((prev: Fav[]) => {
      const next = prev.find(item => item.productId === id)
        ? prev.filter((item: Fav) => item.productId !== id)
        : [...prev, { productId: id, hasDiscount: hasDiscount }];

      return next;
    });
  };

  return (
    <button
      type="button"
      className={classNames(scss.buttonFav, className)}
      aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}
      aria-pressed={isFav}
      onClick={() => toggleFav(productId)}
    >
      <svg
        className={scss.buttonFav__icon}
        aria-hidden="true"
        focusable="false"
      >
        <use
          href={`/icons/icons.svg#${isFav ? 'filled-heart' : 'heart-icon'}`}
        ></use>
      </svg>
    </button>
  );
};
