import CardItem from 'components/CardItem/CardItem';
import { useAppContext } from 'components/Contexts/AppDataContext';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import styles from './Favourite.module.scss';

const Favourite = () => {
  const { favourites } = useAppContext();

  return (
    <div className={styles.container}>
      <Breadcrumbs text="Favourites" />
      {favourites.length === 0 ? (
        <div className={styles.content}>
          <h1 className={styles.title}>Favourites</h1>
          <p className={styles.count}> 0 items</p>
          <div className={styles.info}>
            <p className={styles.detail}>
              You do not have any favourite products yet
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.content}>
          <h1 className={styles.title}>Favourites</h1>
          <p className={styles.count}>
            {favourites.length} {favourites.length > 1 ? 'items' : 'item'}
          </p>
          <div className={styles.productsGrid}>
            {favourites.map(product => (
              <CardItem key={product.id} product={product} option="new" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourite;
