import styles from './Error.module.scss';
import { useTabs } from '../../../../ProductsContext/TabsContext';

export const Error = () => {
  const { reloadData } = useTabs();

  return (
    <div className={styles.container}>
      <p className={styles.title}>Something went wrong</p>
      <div className={styles.reloadButton} onClick={reloadData}>
        Reloading
      </div>
    </div>
  );
};
