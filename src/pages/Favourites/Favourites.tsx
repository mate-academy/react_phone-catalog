import { useContext, useEffect, useState } from 'react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Loader } from '../../components/Loader';
import { ProductGeneral } from '../../types/ProductGeneral';
import { ProductContext } from '../../store/ProductContext';
import { Error } from '../../components/Error';
import { ProductsList } from '../../components/Catalog';
import styles from './Favourites.module.scss';
import { ErrorText } from '../../constants/errorText';

export const Favourites = () => {
  const [products, setProducts] = useState<ProductGeneral[]>([]);
  const { products: productsGeneral, likedItems } = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorText | ''>('');

  useEffect(() => {
    setLoading(true);
    try {
      const newProducts = productsGeneral.filter(product =>
        likedItems.includes(product.itemId),
      );

      if (newProducts.length === 0) {
        setError(ErrorText.noTablets);
      }

      setProducts(newProducts);
    } catch {
      setError(ErrorText.default);
    } finally {
      setLoading(false);
    }
  }, [productsGeneral, likedItems]);

  return (
    <section className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <Error errorText={error} />
          ) : (
            <>
              <div className={styles.location}>
                <Breadcrumb />
              </div>
              <h1 style={{ display: 'none' }}>Favourites page</h1>
              <div className={styles.title}>
                <h2 className="text--page-title">Favourites</h2>
                <p
                  className={`${styles.title__text} text--grey`}
                >{`${products.length} models`}</p>
              </div>
              <div className={styles.catalog}>
                <ProductsList products={products} />
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};
