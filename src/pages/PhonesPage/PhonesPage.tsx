import { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';
import { Catalog } from '../shared/Catalog/Catalog';
import styles from './PhonesPage.module.scss';
import { Breadcrumbs } from '../shared/Breadcrumbs/Breadcrumbs';

export const PhonesPage = () => {
  const { products } = useContext(ProductContext);
  const phones = products.filter(product => product.category === 'phones');

  return (
    <div className={styles.phonesPage}>
      <div className="container">
        <div className={styles.phonesPage__breadcrumbs}>
          <Breadcrumbs category="phones" />
        </div>
        <Catalog title="Mobile phones" products={phones} />
      </div>
    </div>
  );
};
