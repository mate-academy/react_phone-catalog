import { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';
import { Catalog } from '../shared/Catalog/Catalog';
import { Breadcrumbs } from '../shared/Breadcrumbs/Breadcrumbs';
import styles from './AccessoriesPage.module.scss';

export const AccessoriesPage = () => {
  const { products } = useContext(ProductContext);
  const accessories = products.filter(
    product => product.category === 'accessories',
  );

  return (
    <div className={styles.accessoriesPage}>
      <div className="container">
        <div className={styles.accessoriesPage__breadcrumbs}>
          <Breadcrumbs category="accessories" />
        </div>
        <Catalog title="Accessories" products={accessories} />
      </div>
    </div>
  );
};
