import { FaAngleRight } from 'react-icons/fa6';
import { GoHome } from 'react-icons/go';
import { useSelector } from 'react-redux';
import { Cart } from '../../components/Cart';
import styles from './favorites.module.scss';

export default function Favorites() {
  const favorites = useSelector(state => state.favorites.favorites);
  const products = useSelector(state => state.products.products);

  const favoriteProducts = products.filter(product =>
    favorites.includes(product.id),
  );

  return (
    <div className={styles.root}>
      {favoriteProducts.length > 0 ? (
        <div className={styles.main}>
          <div className={styles.crumbs}>
            <GoHome size={22} />
            <FaAngleRight className={styles.crumbs__arrow} size={18} />
            <p className={styles.pageName}>Favorites</p>
          </div>
          <h2>Favorites</h2>
          <p>{favoriteProducts.length} models</p>
          <div className={styles.phonesList}>
            {favoriteProducts.map(product => (
              <Cart products={product} key={product.id} />
            ))}
          </div>
        </div>
      ) : (
        <h2 className={styles.error}>
          You do not have any selected products yet 🥲
        </h2>
      )}
    </div>
  );
}
