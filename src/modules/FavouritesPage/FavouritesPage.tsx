import { useContext } from 'react';
import { ProductsContext } from '../../store/ProductsProvider';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { ProductsList } from '../shared/ProductsList';
import styles from './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  const { likedProducts, products } = useContext(ProductsContext);

  const countItems = likedProducts.length;

  const productsToShow = products.filter(product =>
    likedProducts.includes(product.itemId),
  );

  return (
    <div className={styles.FavouritesPage}>
      <div className={styles.FavouritesPage__content}>
        <Breadcrumbs />

        <h1 className={styles.FavouritesPage__title}>Favourites</h1>

        <p className={styles.FavouritesPage__countItems}>{countItems} items</p>

        <ProductsList products={productsToShow} />
      </div>
    </div>
  );
};
