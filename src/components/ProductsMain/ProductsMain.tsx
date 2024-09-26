import { useLocation, useSearchParams } from 'react-router-dom';
import { PerPageOptions } from '../../utils/PerPageOptions';
import { getPreparedProducts } from '../../utils/getPreparedProducts';
import { getSearchWith } from '../../utils/searchHelper';
import React, { useContext, useEffect, useState } from 'react';
import { Dropdown } from '../Dropdown/Dropdown';
import { Pagination } from '../Pagination/Pagination';
import { SortOptions } from '../../utils/SortOptions';
import { getProducts } from '../../api/api';
import styles from './ProductsMain.module.scss';
import { ProductType } from '../../api/type/ProductType';
import { Card } from '../Card/Card';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { ErrorTypes } from '../../utils/ErrorTypes';
import { ProductCategories } from '../../utils/ProductCategories';
import { FavoritesContext } from '../../context/FavoritesContext';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

type Props = {
  pageLabel: string;
  productsCategory: ProductCategories;
};

export const ProductsMain: React.FC<Props> = ({ pageLabel, productsCategory }) => {
  const defaultPage = 1;

  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(ErrorTypes.NO_ERROR);
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = (searchParams.get('itemsPerPage') as PerPageOptions) || PerPageOptions.ALL;
  const currentPage = searchParams.get('page') || defaultPage;
  const sortParam = (searchParams.get('sort') as SortOptions) || SortOptions.NEWEST;
  const preparedProducts = getPreparedProducts(products, itemsPerPage, sortParam);
  const { theme } = useContext(FavoritesContext);
  const { t } = useTranslation();
  const location = useLocation();

  console.log(pageLabel);
  const pageLabelName = location.pathname.split('/')[1];

  const handlePerPageSelectorChange = (option: PerPageOptions) => {
    if (option === PerPageOptions.ALL) {
      setSearchParams(getSearchWith(searchParams, { page: null, itemsPerPage: null }));
    } else {
      setSearchParams(
        getSearchWith(searchParams, { page: `${defaultPage}`, itemsPerPage: option }),
      );
    }
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams(getSearchWith(searchParams, { page: `${newPage}` }));
  };

  const handleSortChange = (sort: SortOptions) => {
    if (sort === SortOptions.NEWEST) {
      setSearchParams(getSearchWith(searchParams, { sort: null }));
    } else {
      setSearchParams(getSearchWith(searchParams, { sort: sort }));
    }
  };

  const init = () => {
    setIsLoading(true);
    setError(ErrorTypes.NO_ERROR);

    getProducts()
      .then((productsFromServer) => {
        if (productsFromServer.length === 0) {
          switch (productsCategory) {
            case ProductCategories.PHONES:
              setError(ErrorTypes.NO_PHONES);
              break;
            case ProductCategories.TABLETS:
              setError(ErrorTypes.NO_TABLETS);
              break;
            case ProductCategories.ACCESSORIES:
              setError(ErrorTypes.NO_ACCESSORIES);
              break;
            default:
              setError(ErrorTypes.LOAD);
          }
        } else {
          const neededProducts = productsFromServer.filter(
            (product) => product.category === productsCategory,
          );

          setProducts(neededProducts);
        }
      })
      .catch(() => {
        setError(ErrorTypes.LOAD);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    init();
  }, []);

  console.log(sortParam);
  

  return (
    <>
       {isLoading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )} 

      {!isLoading && error && (
        <div className={styles.error}>
          <ErrorMessage message={error} onRetry={init} />
        </div>
      )}

      {!isLoading &&  !error && (
        <>
          <div className={styles.products_main}>
            <div className={styles.category_info}>
              <h2
                className={classNames(styles.category_name, {
                  [styles.dark]: theme === 'dark',
                })}
              >
                {t(pageLabelName)}
              </h2>

              <p className={styles.category_models}>{`${products.length} ${t('models')}`}</p>
            </div>
            <Dropdown
              label={t('Sortby')}
              options={Object.values(SortOptions)}
              activeOption={t(sortParam)}
              onChange={handleSortChange}
            />

            <Dropdown
              label={t('itemsOnPage')}
              options={Object.values(PerPageOptions)}
              activeOption={itemsPerPage}
              onChange={handlePerPageSelectorChange}
            />


            <div className={styles.product_cards}>
              {preparedProducts.length !== 0 &&
                preparedProducts[+currentPage - 1].map((product) => (
                  <div key={product.id} className={styles.product_card}>
                    <Card product={product} />
                  </div>
                ))}
            </div>
          </div>

          {preparedProducts.length > 1 && (
            <Pagination
              total={products.length}
              perPage={itemsPerPage}
              currentPage={+currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </>
  );
};
