import { useContext, useEffect } from 'react';
import { CatalogHeader } from '../../components/catalogHeader';
import { ProductList } from '../../components/productList';
import styles from './FavouritePage.module.scss';
import { AppContext } from '../../store/context';
import { ProductInfo } from '../../types/ProductInfo';

export const FavouritePage = () => {
  const { likedProducts, setLikedProducts } = useContext(AppContext);

  useEffect(() => {
    const selectedProductFromStorage = localStorage.getItem('likedProducts');

    if (selectedProductFromStorage) {
      const parsedProducts: ProductInfo[] = JSON.parse(
        selectedProductFromStorage,
      );

      if (JSON.stringify(parsedProducts) !== JSON.stringify(likedProducts)) {
        setLikedProducts(parsedProducts);
      }
    }
  }, [likedProducts, setLikedProducts]);

  return (
    <section className={styles.favouritepage}>
      <div className={styles.favouritepage__content}>
        <CatalogHeader
          products={likedProducts}
          category={'Favourites'}
          withoutDrop={true}
        />
        <ProductList products={likedProducts} pagination={false} />
      </div>
    </section>
  );
};
