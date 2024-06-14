import { useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Loader } from '../../components/Loader';
import { getFilteredItems } from '../../utils/getFilteredItems';
import { ProductGeneral } from '../../types/ProductGeneral';
import { ProductContext } from '../../store/ProductContext';
import { Dropdown } from '../../components/Dropdown';
import { Error } from '../../components/Error';
import { ProductsList } from '../../components/Catalog';
import { getAccessories } from '../../api/accessories';
import styles from './Accessories.module.scss';
import { ErrorText } from '../../constants/errorText';

export const Accessories = () => {
  const [products, setProducts] = useState<ProductGeneral[]>([]);
  const { products: productsGeneral } = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorText | ''>('');
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  useEffect(() => {
    setLoading(true);
    getAccessories()
      .then(productsFromServer => {
        const newProductsIds = productsFromServer.map(item => item.id);
        const newProducts = productsGeneral.filter(product =>
          newProductsIds.includes(product.itemId),
        );

        if (newProducts.length === 0) {
          setError(ErrorText.noAccessories);
        }

        setProducts(newProducts);
      })
      .catch(() => {
        setError(ErrorText.default);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productsGeneral]);

  const filteredProducts = useMemo(() => {
    return getFilteredItems(products, sortBy);
  }, [products, sortBy]);

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
              <div className={styles.title}>
                <h1 style={{ display: 'none' }}>Accessories page</h1>
                <p className="text--page-title">Accessories</p>
                <p
                  className={`text--grey ${styles.title__text}`}
                >{`${products.length} models`}</p>
              </div>

              <Dropdown />
              <div className={styles.catalog}>
                <ProductsList products={filteredProducts} />
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};
