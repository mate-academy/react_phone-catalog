import { useAppSelector } from '../../app/hooks';
import { ProductsList } from '../ProductsPage/components/ProductsList';
import styles from './FavouritesList.module.scss';

export const FavouritesList = () => {
  const { items } = useAppSelector(state => state.favourites);

  return (
    <div className={styles.favourites_list}>
      <h2 className={styles.title}>Favourites</h2>

      <p className={styles.amount}>
        {items.length + (items.length === 1 ? ' item' : ' items')}
      </p>

      <ProductsList products={items} productsType={'favourites'} />
    </div>
  );
};
