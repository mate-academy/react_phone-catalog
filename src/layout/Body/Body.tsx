import { AppRoutes } from '../../app/AppRoutes';
import styles from './Body.module.scss';

export const Body = () => {
  return (
    <main className={styles.body}>
      <AppRoutes />
    </main>
  );
};
