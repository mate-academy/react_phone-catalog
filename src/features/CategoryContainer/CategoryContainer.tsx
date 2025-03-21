import { Breadcrumbs } from '../../shared/components/Breadcrumbs';
import { Product } from '../../shared/types/Product';
import { ProductList } from '../ProductList';
import styles from './CategoryContainer.module.scss';

type Props = {
  goods: Product[];
  title: string;
};

export const CategoryContainer: React.FC<Props> = ({ goods, title }) => {
  return (
    <main className={styles.category}>
      <div className="page-container">
        <div className={styles.category__top}>
          <Breadcrumbs classStyles={styles.category__breads} />
          <h1 className={styles.category__title}>{title}</h1>
          <p>{goods.length} models</p>
        </div>
        <ProductList goods={goods} />
      </div>
    </main>
  );
};
