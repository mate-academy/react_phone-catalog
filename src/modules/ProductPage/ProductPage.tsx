import styles from './ProductPage.module.scss';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../shared/Breadcrumbs/Breadcrumbs';
import { useLocation } from 'react-router-dom';
import ProductList from './ProductList';
import { useContext } from 'react';
import { ProductCatalogContext } from '../../ProductContext';
import ProductListMenu from './ProductListMenu';
import ProductPagination from './ProductPagination';
import { useMenuSelectors, useSelectedProduct } from './ProductPage.hooks';
import Messages from '../shared/Message';

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
    sortValue,
    itemsOnPageValue,
    itemsOnPageOptions,
    sortByOptions,
    handleSortChange,
    handleItemsOnPageChange,
  } = useMenuSelectors();

  const { pageProducts, total } = useSelectedProduct(
    products,
    title,
    sortValue,
    itemsOnPageValue,
    currentPage,
  );

  const isProductListEmpty = loaded && count === 0;
  const hasProducts = loaded && count > 0;

  return (
    <div className="container">
      <div>
        <Breadcrumbs marginTop="marginTop" />
        <h1 className={styles.productPage__title}>
          {t(`products_page.${title}`)}
        </h1>
        {loading && 'Loading'}
        {error && <Messages type="error" />}
        {isProductListEmpty && <Messages type="emptyList" category={title} />}

        {hasProducts && (
          <>
            <p>{modelAmount}</p>
            <ProductListMenu
              sortValue={sortValue}
              itemsOnPageValue={itemsOnPageValue}
              handleSortChange={handleSortChange}
              handleItemsOnPageChange={handleItemsOnPageChange}
              sortByOptions={sortByOptions}
              itemsOnPageOptions={itemsOnPageOptions}
            />
            <ProductList />
            {+itemsOnPageValue.value > 0 && (
              <ProductPagination
                total={total}
                perPage={Number(itemsOnPageValue.value)}
                currentPage={currentPage}
              />
            )}
            {pageProducts.map(product => (
              <p key={product.name}>
                {String(product.id).padStart(3, '0')} --- {product.name} *{' '}
                {product.year} * ${product.price}
              </p>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
