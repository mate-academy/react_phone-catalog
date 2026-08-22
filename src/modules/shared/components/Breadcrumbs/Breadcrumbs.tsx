import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import styles from './Breadcrumbs.module.scss';

type Props = {
  category: string;
  categoryPath: string;
  productName: string;
};

export const Breadcrumbs: React.FC<Props> = ({
  category,
  categoryPath,
  productName,
}) => (
  <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
    <Link to="/" className={styles.breadcrumbs__link} aria-label="Home">
      <Icon name="home" />
    </Link>

    <Icon name="chevron-right" className={styles.breadcrumbs__sep} />

    <Link to={categoryPath} className={styles.breadcrumbs__link}>
      {category}
    </Link>

    <Icon name="chevron-right" className={styles.breadcrumbs__sep} />

    <span className={styles.breadcrumbs__current}>{productName}</span>
  </nav>
);
