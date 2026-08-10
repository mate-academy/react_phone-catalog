import { CatalogPage } from '../shared/CatalogPage';
import styles from './TabletsPage.module.scss';

export const TabletsPage = () => (
  <div className={styles.page}>
    <CatalogPage category="tablets" />
  </div>
);
