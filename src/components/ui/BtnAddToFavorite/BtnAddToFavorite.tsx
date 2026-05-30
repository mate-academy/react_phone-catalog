import favoriteIcon from '../../../assets/icons/header_icons/Favourites.svg';
import Icofavorite from '../../../assets/icons/catalogIcons/IcoFavourites.svg';
import { handleFavoriteToggle } from '../../../shared/utils/favariteToggle';
import { useProducts } from '../../../shared/context/ProductsContext';

import styles from './BtnAddToFavorite.module.scss';
import { Card } from '../../../shared/types/Card';

type Props = {
  card: Card | undefined;
  isFavorite: boolean;
};

export const BtnAddToFavorite: React.FC<Props> = ({ card, isFavorite }) => {
  const { favorites, setFavorites } = useProducts();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (card) {
      handleFavoriteToggle(card, favorites, setFavorites);
    }
  };

  return (
    <button className={styles.buttons__favorite} onClick={handleFavoriteClick}>
      <img src={isFavorite ? Icofavorite : favoriteIcon} alt="Favorites" />
    </button>
  );
};
