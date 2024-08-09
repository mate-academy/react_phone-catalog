import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { addToBay, removeFromBay } from '../../../redux/slices/baySlice';
import { toggleFavorite } from '../../../redux/slices/favoritesSlice';
import styles from './productActions.module.scss';

export const ProductActions = ({ productId }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);
  const bayList = useSelector(state => state.bay.bayList);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(productId));
  };

  const handleToggleBay = () => {
    if (isInBay) {
      dispatch(removeFromBay(productId));
    } else {
      dispatch(addToBay(productId));
    }
  };

  const isFavorite = favorites.includes(productId);
  const isInBay = bayList.some(item => item.id === productId);

  return (
    <div className={styles.actions}>
      <button
        onClick={e => {
          e.preventDefault();
          handleToggleBay();
        }}
        className={styles.addToCart}
        style={{ backgroundColor: isInBay ? '#323542' : '' }}
      >
        {isInBay ? 'In Cart' : 'Add to cart'}
      </button>
      <div className={styles.icons}>
        <i>
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              handleToggleFavorite();
            }}
          >
            {isFavorite ? (
              <IoMdHeart color="#EB5757" size={18} />
            ) : (
              <IoMdHeartEmpty size={17} />
            )}
          </a>
        </i>
      </div>
    </div>
  );
};
