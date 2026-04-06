import styles from './FavouritesPage.module.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductList } from '../shared/components/ProductList/ProductList';
import { useShop } from '../../store/ShopContext';

export const FavouritesPage = () => {
  const { favourites } = useShop();

  return (
    <main className={styles.main}>
      <div className="container">
        <Breadcrumbs breadcrumb="Favourites" />
        <h1 className={styles.title}>Favourites</h1>
        <p className={styles.amount}>{`${favourites.length} items`}</p>

        <ProductList products={favourites} />
      </div>
    </main>
  );
};
