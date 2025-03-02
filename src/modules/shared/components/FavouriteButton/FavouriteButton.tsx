import { useContext } from 'react';
import styles from './FavouriteButton.module.scss';
import { Product, ProductDetailed } from '../../../../types/types';
import { FavouritesContext } from '../../../../context/FavouritesContext';
import { ProductsContext } from '../../../../context/ProductsContext';

type Props = {
  product: Product | ProductDetailed;
};

export const FavouriteButton: React.FC<Props> = ({ product }) => {
  const { goods } = useContext(ProductsContext);
  const { favouriteItems, updateFavouriteItems } = useContext(FavouritesContext);

  const selectedItem =
    'itemId' in product ? product : goods?.find(good => good.itemId === product.id);

  const handleAddToFavourites = () => {
    if (selectedItem) {
      updateFavouriteItems(favouriteItems ? [...favouriteItems, selectedItem] : [selectedItem]);
    }
  };

  const handleRemoveToFavourites = () => {
    if (favouriteItems && selectedItem) {
      updateFavouriteItems(favouriteItems.filter(item => item.itemId !== selectedItem.itemId));
    }
  };

  return favouriteItems?.some(item => item.itemId === selectedItem?.itemId) ? (
    <button
      className={`${styles.favouriteButton} ${styles['favouriteButton--filled']}`}
      onClick={handleRemoveToFavourites}
    ></button>
  ) : (
    <button className={styles.favouriteButton} onClick={handleAddToFavourites}></button>
  );
};
