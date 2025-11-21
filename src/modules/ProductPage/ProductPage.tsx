import styles from './ProductPage.module.scss';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../shared/Breadcrumbs/Breadcrumbs';
import { useLocation } from 'react-router-dom';
import ProductList from './ProductList';
import { useContext } from 'react';
import { ProductCatalogContext } from '../../ProductsContext';

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

  return (
    <div className="container">
      <div>
        <Breadcrumbs marginTop="marginTop" />
        <h1 className={styles.productPage__title}>
          {t(`products_page.${title}`)}
        </h1>
        <p>{modelAmount}</p>
        <ProductList />
        {pageProducts.map(product => (
          <p key={product.name}>{product.name}</p>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
