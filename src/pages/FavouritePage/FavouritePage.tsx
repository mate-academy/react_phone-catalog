import { useContext, useEffect } from 'react';
import { CatalogHeader } from '../../components/catalogHeader';
import { ProductList } from '../../components/productList';
import styles from './FavouritePage.module.scss';
import { AppContext } from '../../store/context';
import { ProductInfo } from '../../types/ProductInfo';

export const FavouritePage = () => {
  const { likedProducts, setLikedProducts } = useContext(AppContext);

  useEffect(() => {
    const likedProductFromStorage = localStorage.getItem('likedProducts');

    if (likedProductFromStorage) {
      const parsedProducts: ProductInfo[] = JSON.parse(likedProductFromStorage);

      if (JSON.stringify(parsedProducts) !== JSON.stringify(likedProducts)) {
        setLikedProducts(parsedProducts);
      }
    }
  }, [setLikedProducts]);

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
