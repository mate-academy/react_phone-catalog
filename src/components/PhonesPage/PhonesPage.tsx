import { useContext, useEffect, useState } from 'react';
import { Breadcrumbs } from '../Breadcrumbs';
import { PageItemsSelect } from '../PageItemsSelect';
import { SortSelect } from '../SortSelect';
import styles from './PhonesPage.module.scss';
import { getProducts } from '../../api';
import { Product } from '../../types/Product';
import { ShowOldPriceContext } from '../../context/OldPrice';
import { Loader } from '../Loader';
import { ProductCard } from '../ProductCard';
import { PaginationItems } from '../Pagination';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export const PhonesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const price = useContext(ShowOldPriceContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const perPage = searchParams.get('perPage') || 'all';
  const start = perPage.toString() === 'all' ? 0 : (page - 1) * Number(perPage);
  const end =
    perPage.toString() === 'all' ? products.length : start + Number(perPage);
  const visibleProducts = products.slice(start, end);
  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(products.length / Number(perPage));

  function setSearchWith(params: any) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const handlePageChange = (newPage: number) => {
    if (newPage > 1) {
      setSearchWith({ page: newPage.toString() });
    } else {
      setSearchWith({ page: null });
    }
  };

  const handlePerPageChange = (newPerPage: string) => {
    if (newPerPage !== 'all') {
      setSearchWith({ perPage: newPerPage, page: null });
    } else {
      setSearchWith({ perPage: null, page: null });
    }
  };

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .then((products: Product[]) => {
        const phones = products.filter(
          product => product.category === 'phones',
        );

        setProducts(phones);
      })
      .catch(() => {
        setIsError('Unable to load phones');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className={styles.phones}>
      <div className="container">
        <Breadcrumbs />
        <h1 className={styles.phones__title}>Mobile phones</h1>
        <p className={styles.phones__text}>{products.length} models</p>
        <div className={styles.phones__filters}>
          <SortSelect />
          <PageItemsSelect
            perPage={perPage}
            handlePerPageChange={handlePerPageChange}
          />
        </div>
        {isLoading && <Loader />}
        {!isLoading && isError && <p>{isError}</p>}
        {!isLoading && !isError && products.length === 0 && (
          <p>There are no products</p>
        )}
        {!isLoading && !isError && products.length > 0 && (
          <>
            <div className={styles.phones__content}>
              {visibleProducts.map(product => (
                <div key={product.id}>
                  <ProductCard product={product} showOldPrice={price} />
                </div>
              ))}
            </div>
            {perPage !== 'all' && (
              <PaginationItems
                totalPages={totalPages}
                currentPage={page}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};
