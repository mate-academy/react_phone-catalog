import styles from './ProductsPage.module.scss';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../shared/Breadcrumbs/Breadcrumbs';
import { useLocation } from 'react-router-dom';

export const ProductsPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const title =
    typeof location.state === 'string'
      ? location.state
      : location.pathname.split('/').at(-1);

  return (
    <div className="container">
      <div>
        <Breadcrumbs marginTop="marginTop" />
        <h1 className={styles.productPage__title}>
          {t(`products_page.${title}`)}
        </h1>
      </div>
    </div>
  );
};

export default ProductsPage;
