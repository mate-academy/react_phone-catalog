import styles from './ProductPage.module.scss';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../shared/Breadcrumbs/Breadcrumbs';
import { useLocation } from 'react-router-dom';
import ProductList from './ProductList';
import { useContext } from 'react';
import { ProductCatalogContext } from '../../ProductsContext';
import ProductListMenu from './ProductListMenu';
import { getSortedProducts, ProductSortTypes } from '../../utils/catalog';
import ProductPagination from './ProductPagination';
import { useMenuSelectors } from './ProductPage.hooks';

export const ProductPage: React.FC = () => {
  const { t } = useTranslation();
  const { products, categories } = useContext(ProductCatalogContext);
  const {
    sortValue,
    itemsOnPageValue,
    itemsOnPageOptions,
    sortByOptions,
    handleSortChange,
    handleItemsOnPageChange,
  } = useMenuSelectors();
  const location = useLocation();
  const title =
    typeof location.state === 'string'
      ? location.state
      : location.pathname.split('/').at(-1);
  const count = title ? categories[title] : 0;
  const modelAmount = t('products_page.models', { count });

  const searchParams = new URLSearchParams(location.search);
  const currentPage = Number(searchParams.get('page')) || 1;

  let pageProducts = getSortedProducts(
    products.filter(product => product.category === (title || '')),
    sortValue.value as ProductSortTypes,
  );

  const hasPagination = Number(itemsOnPageValue.value) > 0;

  if (hasPagination) {
    const perPage = Number(itemsOnPageValue.value);
    const firstElementNumber = (currentPage - 1) * perPage;
    const lastElementNumber = Math.min(
      currentPage * perPage,
      pageProducts.length - 1,
    );

    pageProducts = pageProducts.slice(firstElementNumber, lastElementNumber);
  }

  return (
    <div className="container">
      <div>
        <Breadcrumbs marginTop="marginTop" />
        <h1 className={styles.productPage__title}>
          {t(`products_page.${title}`)}
        </h1>
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
        {hasPagination && (
          <ProductPagination
            total={pageProducts.length}
            perPage={Number(itemsOnPageValue.value)}
            currentPage={currentPage}
          />
        )}
        {pageProducts.map(product => (
          <p key={product.name}>
            {product.name} {product.year} {product.fullPrice}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
