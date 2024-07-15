import './ButtonHeart.scss';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { addFav, removeFav } from '../../features/favorites';
import { useAppSelector } from '../../app/hooks';

type Props = {
  productId: number;
};

export const ButtonHeart: React.FC<Props> = ({ productId }) => {
  const dispatch = useDispatch();
  const favProductIds = useAppSelector(state => state.favorites.products);
  const isAdded = favProductIds.includes(productId);

  const addToFav = () => {
    if (isAdded) {
      dispatch(removeFav(productId));
    } else {
      dispatch(addFav(productId));
    }
  };

  return (
    <button
      type="button"
      className={classNames('add-to-fav', {
        'added-to-fav': isAdded,
      })}
      onClick={addToFav}
    >
      <svg
        className={classNames('icon icon-heart', {
          'icon-heart-red': isAdded,
        })}
      >
        <use href="img/icons.svg#icon-favourites-filled"></use>
      </svg>
    </button>
  );
};
