import { useContext } from 'react';
import { Breadcrumbs } from '../../shared/components/Breadcrumbs';
import styles from './FavouritesPage.module.scss';
import { StateContext } from '../../Provider/GadgetsContext';
import { ProductCard } from '../../features/ProductCard';

import epmty from '../../../public/img/product-not-found.png';

export const FavouritesPage = () => {
  const { products, favourites } = useContext(StateContext);

  const visibleItems = products.filter(item =>
    favourites.includes(item.itemId),
  );

  return (
    <main className={styles.category}>
      <div className="page-container">
        <div className={styles.category__top}>
          <Breadcrumbs classStyles={styles.category__breads} />
          <h1 className={styles.category__title}>Favourites</h1>
          <p>{visibleItems.length} models</p>
        </div>
        {favourites.length > 0 ? (
          <div className={styles.itemsList}>
            {visibleItems.map(item => (
              <ProductCard key={item.itemId} product={item} />
            ))}
          </div>
        ) : (
          <img src={epmty} alt="Favourites is empty" className={styles.empty} />
        )}
      </div>
    </main>
  );
};
