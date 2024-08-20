import { useContext } from 'react';
import { Product } from '../../../types/Product';
import styles from './AddToFavoriteButton.module.scss';
import { AppContext } from '../../../utils/AppContext';
import classNames from 'classnames';
import redHeartIcon from './icons/redHeart.svg';
import whiteHeart from './icons/whiteHeart.svg';
import heartIcon from './icons/heart.svg';

type Props = {
  product: Product;
};

export const AddToFavoriteButton: React.FC<Props> = ({ product }) => {
  const { itemId } = product;
  const { favorites, setFavorites, isDarkTheme } = useContext(AppContext);

  const isInFavorites = favorites.includes(itemId);

  const handleAddFavorite = () => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter(item => item !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  return (
    <div
      className={classNames(
        styles.addFavoriteButton,
        isDarkTheme ? styles.addFavoriteButtonDark : '',
      )}
      style={
        isInFavorites
          ? { backgroundImage: `url(${redHeartIcon})` }
          : isDarkTheme
            ? { backgroundImage: `url(${whiteHeart})` }
            : { backgroundImage: `url(${heartIcon})` }
      }
      onClick={handleAddFavorite}
    ></div>
  );
};
