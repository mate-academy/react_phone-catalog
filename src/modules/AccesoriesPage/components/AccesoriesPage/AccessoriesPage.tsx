import { AccessoriesCatalog } from '../AccesoriesCatalog';
import styles from './AccessoriesPage.module.scss';

export const AccessoriesPage = () => {
  return (
    <div className={styles.phones}>
      <AccessoriesCatalog />
    </div>
  );
};
