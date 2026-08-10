import { CatalogPage } from '../shared/CatalogPage';
import styles from './AccessoriesPage.module.scss';

export const AccessoriesPage = () => (
  <div className={styles.page}>
    <CatalogPage category="accessories" />
  </div>
);
