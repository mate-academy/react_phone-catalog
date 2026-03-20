import { Pagetoolbar } from '../../components/layout/Pagetoolbar';
import styles from './Cart.module.scss';

export const Cart = () => {
  return (
    <div className={styles.container}>
      <Pagetoolbar breadcrumbs title="Cart" />
    </div>
  );
};
