import { Link } from 'react-router-dom';
import { getImg } from '../../../../utils/getImageUrl';
import styles from './Breadcrumbs.module.scss';

type BreadcrumbItem = {
  label: string;
  path?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export const Breadcrumbs = ({ items }: Props) => {
  return (
    <nav className={styles.breadcrumbs} aria-label="breadcrumbs">
      <Link to="/" className={styles.home}>
        <img src={getImg('/img/icons/home.svg')} alt="Home" />
      </Link>

      {items.map(item => (
        <div key={item.label} className={styles.item}>
          <img
            src={getImg('/img/icons/arrow-right.svg')}
            alt=""
            className={styles.arrow}
          />
          {item.path ? (
            <Link to={item.path} className={styles.link}>
              {item.label}
            </Link>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};
