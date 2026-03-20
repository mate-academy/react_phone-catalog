import { Pagetoolbar } from '../../components/layout/Pagetoolbar';
import styles from './Favourites.module.scss';

export const Favourites = () => {
  return (
    <div className={styles.container}>
      <Pagetoolbar breadcrumbs title="Favourites" subtitle="5 items" />
    </div>
  );
};
