import { Pagetoolbar } from '../../components/layout/Pagetoolbar';
import styles from './PageNotFound.module.scss';

export const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <Pagetoolbar title="Page not found" />
    </div>
  );
};
