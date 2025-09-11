import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { Item } from '../../types/Item';

type Props = {
  category: string;
  product: Item | undefined;
};

export const Breadcrumbs: React.FC<Props> = ({ category, product }) => {
  return (
    <div className={styles.breadcrumbs}>
      <a href="/" className={styles.breadcrumbs__linkHome}></a>
      <div className={styles.breadcrumbs__arrowRight}></div>

      <Link className={styles.breadcrumbs__category} to={`/${category}`}>
        {category.slice(0, 1).toUpperCase() + category.slice(1, category.length)}
      </Link>

      <div className={styles.breadcrumbs__arrowRight}></div>
      <p className={styles.breadcrumbs__currentLink}>{product?.name}</p>
    </div>
  );
};
