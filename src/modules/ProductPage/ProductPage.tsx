import styles from './ProductPage.module.scss';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../shared/Breadcrumbs/Breadcrumbs';
import { useLocation } from 'react-router-dom';
import ProductList from './ProductList';
import { useContext, useState } from 'react';
import { ProductCatalogContext } from '../../ProductsContext';
import ProductListMenu from './ProductListMenu';
import { SelectOption } from '../../types/SelectOptions';
import { PRODUCT_LIST_MENU } from '../constants';

export const ProductPage: React.FC = () => {
  const { t } = useTranslation();
  const { products, categories } = useContext(ProductCatalogContext);
  const location = useLocation();
  const title =
    typeof location.state === 'string'
      ? location.state
      : location.pathname.split('/').at(-1);
  const count = title ? categories[title] : 0;
  const modelAmount = t('products_page.models', { count });
  const pageProducts = products.filter(
    product => product.category === (title || ''),
  );

  const sortByOptions: SelectOption[] = PRODUCT_LIST_MENU.sortBy.map(value => ({
    value,
    label: t(`products_page.menu_sort_values.${value}`),
  }));
  const itemsOnPageOptions: SelectOption[] = PRODUCT_LIST_MENU.itemsOnPage.map(
    value => {
      return {
        value,
        label: Number.isInteger(Number(value))
          ? value
          : t(`products_page.menu_items_values.${value}`),
      };
    },
  );
  const [sortValue, setSortValue] = useState<SelectOption>(sortByOptions[0]);
  const [itemsOnPageValue, setItemsOnPageValue] = useState<SelectOption>(
    itemsOnPageOptions[0],
  );

  const handleSortChange = (option: SelectOption | null) => {
    if (option) {
      setSortValue(option);
    }
  };

  const handleItemsOnPageChange = (option: SelectOption | null) => {
    if (option) {
      setItemsOnPageValue(option);
    }
  };

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
        {pageProducts.map(product => (
          <p key={product.name}>{product.name}</p>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
