import { useFavourites } from '../../context/FavouritesContext';
import { useProducts } from '../../context/ProductsContext';
import { Product } from '../../types/Product';
import { ProductDetailed } from '../../types/ProductDetailed';
import { getProductId } from '../../utils/getProductId';
import styles from './FavouriteButton.module.scss';

type Props = {
  product: Product | ProductDetailed;
};

export const FavouriteButton: React.FC<Props> = ({ product }) => {
  const { toggleFavourite, isFavourite } = useFavourites();

  const itemId = getProductId(product);
  const isItemFavourite = isFavourite(itemId);

  const handleClick = () => {
    toggleFavourite(itemId);
  };

  return (
    <button
      className={`${styles.favouriteButton} ${isItemFavourite ? styles['favouriteButton--filled'] : ''}`}
      onClick={handleClick}
    ></button>
  );
};
