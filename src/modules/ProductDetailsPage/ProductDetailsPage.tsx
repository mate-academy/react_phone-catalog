import { Breadcrumb } from '../../components/Breadcrumb';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage: React.FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.head}>
        <Breadcrumb />
      </div>
    </main>
  )
}