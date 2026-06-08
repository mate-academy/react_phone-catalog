import styles from './Home.module.scss';
import { Main } from '../../components/Main/Main';

export const HomePage = () => {
  return (
    <div>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>
      <Main />
    </div>
  );
};
