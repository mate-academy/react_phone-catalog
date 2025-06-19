import { useEffect, useState } from 'react';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { ProductList } from '@components/ProductList';
import { Loader } from '@components/Loader';
import { Product } from '@models/Product';
import { ErrorMessage } from '@models/ErrorMessage';
import { useFavourites } from '@context/FavoriteContext';
import { useLoading } from '@context/LoadingContext';
import { getAllProducts } from '@api/products';
import styles from './Favourites.module.scss';

type Props = {
  isLightMode: boolean;
};

export const Favourites: React.FC<Props> = ({ isLightMode }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const { favourites } = useFavourites();
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

  if (allProducts.length === 0) {
    startLoading();
  }

  useEffect(() => {
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
          <Breadcrumbs product={null} isLightMode={isLightMode} />
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
                <ProductList
                  products={favouriteProducts}
                  isLightMode={isLightMode}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
