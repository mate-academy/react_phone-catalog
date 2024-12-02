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
import { useContext, useEffect, useMemo, useState } from 'react';
import { SortBy } from '../../types/SortBy';
import { filterProducts } from '../../utils/filterProducts';
import { ProductListContext } from '../../ContextProvider';
import { ItemsPerPage } from '../../types/ItemsPerPage';
import { useDebounce } from '../../hooks/useDebounce';
import { getProducts } from '../../utils/getProducts';
import { FetchDataType } from '../../types/FetchDataType';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import classNames from 'classnames';
// eslint-disable-next-line max-len
import { SkeletonProductCard } from '../../components/Skeletons/SkeletonProductCard';

export const ProductsPage = () => {
  const { t } = useTranslation('common');
  const { productList, setProductList } = useContext(ProductListContext);
  const [isLoading, setIsLoading] = useState(false);
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
    if (productList.some(({ category }) => category === productType)) {
      setIsLoading(false);

      return;
    }

    const controller = new AbortController();

    setIsLoading(true);

    const timerID = setTimeout(() => {
      getProducts(productType, controller.signal)
        .then(data => setProductList([...productList, ...data]))
        .finally(() => setIsLoading(false));
    }, 1500);
    // .catch(e => setError(e));

    return () => {
      controller.abort();
      clearTimeout(timerID);
      setIsLoading(false);
    };
  }, [productType]);

  const [filteredProductListPerPage, filteredProductList] = useMemo(
    () =>
      filterProducts(
        sortBy,
        productList,
        itemsPerPage,
        currentPage,
        query,
        productType,
      ),
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

  return (
    <section className={styles.productsPageWrapper}>
      {!productId && <Breadcrumbs productList={productList} />}
      {productId ? (
        <Outlet />
      ) : (
        <div className={styles.productsPageContainer}>
          <h1 className={styles.title}>{title}</h1>
          {isLoading ? (
            <SkeletonTheme baseColor="#3B3E4A" highlightColor="#4A4D58">
              <Skeleton
                className={classNames(
                  styles.categoryNumModels,
                  styles.categoryNumModelsSkeleton,
                )}
              />
            </SkeletonTheme>
          ) : (
            <p className={styles.categoryNumModels}>
              {t('models', { count: filteredProductList.length })}
            </p>
          )}

          <SortProduct />
          {isLoading ? (
            <>
              <div className={styles.productsContainer}>
                <SkeletonTheme baseColor="#3B3E4A" highlightColor="#4A4D58">
                  {Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <SkeletonProductCard isCategory={true} key={index} />
                    ))}
                </SkeletonTheme>
              </div>

              <SkeletonTheme baseColor="#3B3E4A" highlightColor="#4A4D58">
                <div className={styles.paginationSkeletonContainer}>
                  {Array(8)
                    .fill(0)
                    .map((_, index) => {
                      if (index === 5) {
                        return (
                          <p key={index} className={styles.SkeletonDOTS}>
                            ...
                          </p>
                        );
                      }

                      return (
                        <Skeleton
                          key={index}
                          circle={true}
                          className={classNames(styles.paginationSkeletonItem, {
                            [styles.paginationSkeletonItemFirst]: index === 0,
                            [styles.paginationSkeletonItemLast]: index === 7,
                          })}
                        />
                      );
                    })}
                </div>
              </SkeletonTheme>
            </>
          ) : !!filteredProductListPerPage.length ? (
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
