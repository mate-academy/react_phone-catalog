import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useFavourites } from '../../../Context/FavoriteContext';
import { ProductList } from '../../components/ProductList';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../../api/products';
import { Product } from '../../../types/Product';
import { ErrorMessage } from '../../../types/ErrorMessage';
import styles from './Favourites.module.scss';
import { useLoading } from '../../../Context/LoadingContext';
import { Loader } from '../../components/Loader';

export const Favourites = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const { favourites } = useFavourites();
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

  useEffect(() => {
    startLoading();
    getAllProducts()
      .then(products => {
        if (!products && products.length === 0) {
          setErrorMessage(ErrorMessage.No_product_on_server);
        } else {
          setAllProducts(products);
        }
      })
      .catch(() => setErrorMessage(ErrorMessage.Other_problems))
      .finally(() => stopLoading());
  }, []);

  const favouriteProducts = allProducts.filter(product =>
    favourites.includes(product.id.toString()),
  );

  return (
    <div className={styles.favourite}>
      {isLoading && <Loader />}
      {!isLoading && !errorMessage && (
        <>
          <Breadcrumbs product={null} />
          <h1 className={styles.favourite__title}>Favourites</h1>
          {favouriteProducts.length === 0 ? (
            <p className={styles['favourite__not-found']}>
              No favourite items found
            </p>
          ) : (
            <>
              <span className={styles.favourite__count}>
                {favourites.length} items
              </span>
              <div className={styles.favourite__product__list}>
                <ProductList products={favouriteProducts} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
