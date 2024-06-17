import { useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Loader } from '../../components/Loader';
import { getFilteredItems } from '../../utils/getFilteredItems';
import { ProductGeneral } from '../../types/ProductGeneral';
import { getPhones } from '../../api/phones';
import { ProductContext } from '../../store/ProductContext';
import styles from './Phones.module.scss';
import { Dropdown } from '../../components/Dropdown';
import { Error } from '../../components/Error';
import { ProductsList } from '../../components/Catalog';
import { ErrorText } from '../../constants/errorText';
export const Phones = () => {
  const [products, setProducts] = useState<ProductGeneral[]>([]);
  const { products: productsGeneral } = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorText | ''>('');
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';
  const query = searchParams.get('query') || '';

  useEffect(() => {
    setLoading(true);
    getPhones()
      .then(phonesFromServer => {
        const phonesIds = phonesFromServer.map(phones => phones.id);
        const phones = productsGeneral.filter(product =>
          phonesIds.includes(product.itemId),
        );

        if (phones.length === 0) {
          setError(ErrorText.noPhones);
        }

        setProducts(phones);
      })
      .catch(() => {
        setError(ErrorText.default);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    return getFilteredItems(products, sortBy, query);
  }, [products, sortBy, query]);

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
                <h1 style={{ display: 'none' }}>Phones page</h1>
                <p className="text--page-title">Mobile Phones</p>
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
