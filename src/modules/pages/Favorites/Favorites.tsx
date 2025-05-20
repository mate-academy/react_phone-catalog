import { useContext } from 'react';
import { StateContext } from '../../../context/context';
import ProductsList from '../../shared/components/ProductsList';
import Breadcrumbs from '../../shared/components/Breadcrumbs';
import styles from './Favorites.module.scss';

export const Favorites = () => {
  const { favorites } = useContext(StateContext);

  return (
    <>
      <div className="container">
        <Breadcrumbs />
        <h1 style={{ marginBottom: '8px' }}>Favorites</h1>
        <p className={styles.title}>{`${favorites.length} items`}</p>
        {favorites.length > 0 ? (
          <ProductsList products={favorites} />
        ) : (
          <div className={styles.wrapper}>
            <img
              className={styles.wrapper__cat}
              src="public/img/product-not-found.png"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;
