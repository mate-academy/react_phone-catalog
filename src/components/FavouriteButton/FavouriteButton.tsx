import { useFavourites } from '../../context/FavouritesContext';
import { useTheme } from '../../context/ThemeContext';
import { Product } from '../../types/Product';
import { ProductDetailed } from '../../types/ProductDetailed';
import { getProductId } from '../../utils/getProductId';
import styles from './FavouriteButton.module.scss';

type Props = {
  product: Product | ProductDetailed;
};

export const FavouriteButton: React.FC<Props> = ({ product }) => {
  const { toggleFavourite, isFavourite } = useFavourites();
  const { theme } = useTheme();

  const itemId = getProductId(product);
  const isItemFavourite = isFavourite(itemId);

  const handleClick = () => {
    toggleFavourite(itemId);
  };

  return (
    <button className={styles.icon} onClick={handleClick}>
      <img
        src={
          isItemFavourite
            ? '/img/icons/favorites-filled-icon.svg'
            : `/img/icons/favorites-icon-${theme}.svg`
        }
        alt="Toggle favorite"
      />
    </button>
  );
};
