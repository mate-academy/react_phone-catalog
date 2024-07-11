import { CatalogHeader } from '../../components/catalogHeader';
import { ProductList } from '../../components/productList';
import styles from './FavouritePage.module.scss';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

export const FavouritePage = () => {
  const { likedProducts } = useAppSelector(
    (state: RootState) => state.favourite,
  );

  return (
    <section className={styles.favouritepage}>
      <div className={styles.favouritepage__content}>
        <CatalogHeader
          products={likedProducts}
          category={'Favourites'}
          withoutDrop={true}
        />
        <ProductList products={likedProducts} pagination={false} />

        {likedProducts.length === 0 && (
          <p className={styles.favouritepage__errormsj}>
            Your favorite products will be collected here 😉
          </p>
        )}
      </div>
    </section>
  );
};
