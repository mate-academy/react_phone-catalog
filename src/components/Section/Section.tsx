import { Item } from '../../types/Item';
import { ProductsList } from '../ProductsList/ProductsList';
import styles from './Section.module.scss';

type Props = {
  currentItems: Item[];
  isFavorites: boolean;
  favorites: Item[];
};

export const Section: React.FC<Props> = ({ isFavorites, currentItems, favorites }) => {
  return (
    <section className={styles.section}>
      <div className={styles.section__navigation}>
        <a href="/" className={styles.section__linkHome}></a>
        <a href="" className={styles.section__arrowRight}></a>
        <a href="" className={styles.section__currentLink}>
          Favorites
        </a>
      </div>

      <h1 className={styles.section__title}>Favorites</h1>
      <p className={styles.section__quantity}>{favorites.length} items</p>

      {isFavorites ? (
        favorites.length > 0 && <ProductsList currentItems={currentItems} isFavorites={true} />
      ) : (
        <ProductsList currentItems={favorites} isFavorites={false} />
      )}
    </section>
  );
};
