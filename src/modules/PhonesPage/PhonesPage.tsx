import { CatalogPage } from '../shared/CatalogPage';
import styles from './PhonesPage.module.scss';

export const PhonesPage = () => (
  <div className={styles.page}>
    <CatalogPage category="phones" />
  </div>
);
