import {
  Outlet,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import styles from './ProductsPage.module.scss';
import { ProductCard } from '../../components/ProductCard';
import { Pagination } from '../../components/Pagination';
import { SortProduct } from '../../components/SortProducts';
import { useEffect, useMemo, useState } from 'react';
import { SortBy } from '../../types/SortBy';
import { filterProducts } from '../../utils/filterProducts';
import { Product } from '../../types/Product';
import { ProductListContext } from '../../ContextProvider';
import { ItemsPerPage } from '../../types/ItemsPerPage';
import { useDebounce } from '../../hooks/useDebounce';
import { getProducts } from '../../utils/getProducts';
import { FetchDataType } from '../../types/FetchDataType';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useTranslation } from 'react-i18next';

export const ProductsPage = () => {
  const { t } = useTranslation('common');
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');

  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const { productId } = useParams();

  const productType = pathname
    .split('/')
    .filter(location => !!location)[0] as FetchDataType;
  const title =
    productType === FetchDataType.phones
      ? t('productCategory.mobilePhones')
      : productType === FetchDataType.tablets
        ? t('productCategory.tablets')
        : t('productCategory.accessories');
  const itemsPerPage = searchParams.get('perPage') || ItemsPerPage.four;
  const sortBy = (
    (Object.keys(SortBy).includes(String(searchParams.get('sortBy'))) &&
      searchParams.get('sortBy')) ||
    SortBy.newest
  ).toLowerCase();
  const currentPage = +(searchParams.get('page') || 1);
  const query = searchParams.get('query') || '';
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    getProducts(productType)
      .then(setProductList)
      .finally(() => setTimeout(() => setLoading(false)));
    // .catch(e => setError(e));
  }, [productType]);

  const [filteredProductListPerPage, filteredProductList] = useMemo(
    () => filterProducts(sortBy, productList, itemsPerPage, currentPage, query),
    [
      sortBy,
      itemsPerPage,
      currentPage,
      productType,
      debouncedQuery,
      productList,
    ],
  );

  useEffect(() => {
    window.scroll(0, 0);
  }, [currentPage]);

  return loading ? (
    <p>Loading</p>
  ) : (
    <section className={styles.productsPageWrapper}>
      <Breadcrumbs productList={productList} />
      {productId ? (
        <ProductListContext.Provider value={{ productList }}>
          <Outlet />
        </ProductListContext.Provider>
      ) : (
        <div className={styles.productsPageContainer}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.categoryNumModels}>
            {t('models', { count: filteredProductList.length })}
          </p>
          <SortProduct />
          {!!filteredProductListPerPage.length ? (
            <>
              <div className={styles.productsContainer}>
                {filteredProductListPerPage.map(product => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>

              <Pagination
                totalCount={filteredProductList.length}
                currentPage={currentPage}
              />
            </>
          ) : (
            <>
              <div className={styles.noResultImg}>
                <span className={styles.noResultImgText}>
                  {t('noResult.noResult')}
                </span>
              </div>
              <p className={styles.noResultText}>
                {t('noResult.noProductsFound', {
                  productType: t(`noResult.${productType}`),
                })}
              </p>
            </>
          )}
        </div>
      )}
    </section>
  );
};
