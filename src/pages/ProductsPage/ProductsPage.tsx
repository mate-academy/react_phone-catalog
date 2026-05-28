import { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import styles from './ProductsPage.module.scss';
import Loader from '../../components/Loader/Loader';
import { getProducts } from '../../api/api';
import { Products } from '../../types/Products';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';
import { useSearchParams } from 'react-router-dom';
import Filters from '../../components/FiltersСomponent/Filters';
import Pagination from '../../components/Pagination/Pagination';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export type Category = 'phones' | 'tablets' | 'accessories';

const titles = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

type Props = {
  category: Category;
};

export const ProductsPage: React.FC<Props> = ({ category }) => {
  //#region Usestates
  const [products, setProducts] = useState<Products[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams({
    sort: 'age',
    perPage: 'all',
    page: '1',
  });
  //#endregion

  //#region Зміних
  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const page = searchParams.get('page') || '1';
  const currentPage = Number(page);
  const start = (currentPage - 1) * Number(perPage);
  const end = start + Number(perPage);
  //#endregion

  //#region Handles
  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    const isDefault =
      (key === 'page' && value === '1') ||
      (key === 'perPage' && value === 'all');

    if (key === 'sort' || key === 'perPage') {
      params.delete('page');
    }

    if (isDefault) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params);
  };

  const filteredByCategory = products.filter(
    product => product.category === category,
  );

  const getProductsList = () => {
    setIsLoading(true);
    setErrorMessage('');

    getProducts()
      .then(data => {
        setProducts(data);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getProductsList();
  }, []);

  const sortedProducts = [...filteredByCategory].sort((a, b) => {
    switch (sort) {
      case 'price':
        return a.price - b.price;

      case 'title':
        return a.name.localeCompare(b.name);

      case 'age':
      default:
        return b.year - a.year;
    }
  });
  //#endregion

  const totalPages = Math.ceil(sortedProducts.length / Number(perPage));

  const visibleProducts =
    perPage === 'all' ? sortedProducts : sortedProducts.slice(start, end);

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  if (!isLoading && errorMessage) {
    return (
      <ErrorMessage errorMessage={errorMessage} onReload={getProductsList} />
    );
  }

  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <div className={styles.productTitleInfo}>
        <h1 className={styles.title}>{titles[category]}</h1>

        <div className={styles.modelsCount}>
          {filteredByCategory.length} models
        </div>
      </div>

      {!isLoading && filteredByCategory.length === 0 && !errorMessage ? (
        <div className={styles.emptyMessage}>
          {`There are no ${category} yet`}
        </div>
      ) : (
        <>
          <div className={styles.sorts}>
            <Filters
              sort={sort}
              updateParams={updateParams}
              perPage={perPage}
            />
          </div>

          <ProductsGrid products={visibleProducts} />

          {(perPage !== 'all' || totalPages > 1) && (
            <Pagination
              updateParams={updateParams}
              totalPages={totalPages}
              currentPage={currentPage}
              onChange={(p: number) => {
                updateParams('page', String(p));
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;
