import styles from './ProductPage.module.scss';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../shared/Breadcrumbs/Breadcrumbs';
import { useLocation } from 'react-router-dom';
import ProductList from '../shared/ProductList';
import { useContext } from 'react';
import { ProductCatalogContext } from '../../ProductCatalogContext';
import ProductListMenu from './ProductListMenu';
import ProductPagination from './ProductPagination';
import { useMenuSelectors, useSelectedProduct } from './ProductPage.hooks';
import Messages from '../shared/Message';
import InputSearch from './InputSearch';

export const ProductPage: React.FC = () => {
  const { t } = useTranslation();
  const { products, categories, loading, loaded, error } = useContext(
    ProductCatalogContext,
  );
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPage = Number(searchParams.get('page')) || 1;
  const title = location.pathname.split('/').at(-1) || '';
  const count = title ? categories[title] : 0;
  const modelAmount = t('products_page.models', { count });

  const {
    selectedSort,
    selectedPerPage,
    perPageOptions,
    sortOptions,
    handleSortChange,
    handleItemsOnPageChange,
  } = useMenuSelectors();

  const { pageProducts, total } = useSelectedProduct({
    products,
    title,
    selectedSort,
    selectedPerPage,
    currentPage,
  });

  const isProductListEmpty = loaded && count === 0;
  const hasProducts = loaded && count > 0;
  const handleSearchChange = (searchString: string) => {
    /* eslint-disable no-console */
    console.log(searchString);
  };

  return (
    <>
      <div className="container">
        <InputSearch handleSearchChange={handleSearchChange} />

        <div>
          <Breadcrumbs />
          <h1 className={styles.productPage__title}>
            {t(`products_page.${title}`)}
          </h1>
          {loading && 'Loading'}
          {error && <Messages type="error" />}
          {isProductListEmpty && (
            <Messages
              type="emptyList"
              text={t('messages.emptyList', {
                category: t('messages.' + title),
              })}
            />
          )}

          {hasProducts && (
            <>
              <p className={styles.productPage__counter}>{modelAmount}</p>
              <ProductListMenu
                sortValue={selectedSort}
                itemsOnPageValue={selectedPerPage}
                handleSortChange={handleSortChange}
                handleItemsOnPageChange={handleItemsOnPageChange}
                sortByOptions={sortOptions}
                itemsOnPageOptions={perPageOptions}
              />
              <ProductList pageProducts={pageProducts} />
              {+selectedPerPage.value > 0 && (
                <ProductPagination
                  total={total}
                  perPage={Number(selectedPerPage.value)}
                  currentPage={currentPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
