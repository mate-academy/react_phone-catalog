import { useDispatch } from 'react-redux';
import style from './HeartButton.module.scss';
import { addFav, removeFav } from '../../features/favourites';
import heart from '../../assets/img/icons/favourites.svg';
import heartActive from '../../assets/img/icons/favourites-active.svg';
import { useAppSelector } from '../../app/hook';
import classNames from 'classnames';
type Props = {
  productId: string;
};
export const HeartButton: React.FC<Props> = ({ productId }) => {
  const dispatch = useDispatch();
  const favProductIds = useAppSelector(state => state.favourites.products);
  const isAdded = favProductIds.includes(productId);

  const toggleFavourite = () => {
    if (isAdded) {
      dispatch(removeFav(productId));
    } else {
      dispatch(addFav(productId));
    }
  };

  return (
    <button
      type="button"
      className={classNames(style.heartButton, {
        [style.heartButtonActive]: isAdded,
      })}
      onClick={toggleFavourite}
    >
      <img
        src={isAdded ? heartActive : heart}
        alt="favourites-heart"
        className={classNames(style.heart, {
          [style.active]: isAdded,
        })}
      />
    </button>
  );
};
