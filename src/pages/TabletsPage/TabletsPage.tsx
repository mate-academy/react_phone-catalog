import { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';
import { Catalog } from '../shared/Catalog/Catalog';
import { Breadcrumbs } from '../shared/Breadcrumbs/Breadcrumbs';
import styles from './TabletsPage.module.scss';

export const TabletsPage = () => {
  const { products } = useContext(ProductContext);
  const tablets = products.filter(product => product.category === 'tablets');

  return (
    <div className={styles.tabletsPage}>
      <div className="container">
        <div className={styles.tabletsPage__breadcrumbs}>
          <Breadcrumbs category="tablets" />
        </div>
        <Catalog title="TabletsPage" products={tablets} />
      </div>
    </div>
  );
};
