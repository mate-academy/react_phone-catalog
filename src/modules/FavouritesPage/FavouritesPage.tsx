import { useFav } from '../../context/FavouritesContext';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductsList } from '../shared/components/ProductsList';
import styles from './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  const { favItems } = useFav();

  return (
    <div className={styles.favourites}>
      <Breadcrumbs
        items={[
          {
            label: 'Favourites',
          },
        ]}
      />

      <h1 className={styles.favourites__title}>Favourites</h1>

      {favItems.length > 0 && (
        <span
          className={styles.favourites__counter}
        >{`${favItems.length} items`}</span>
      )}

      {!favItems.length && (
        <h4 className={styles.favourites__empty}>
          You dont have favourite products
        </h4>
      )}

      <ProductsList products={favItems} />
    </div>
  );
};
