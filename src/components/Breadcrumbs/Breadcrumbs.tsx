import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

type Props = {
  category: string;
};

export const Breadcrumbs: React.FC<Props> = ({ category }) => {
  const getLink = () => {
    switch (category) {
      case 'phones':
        return { path: '/phones', label: 'Phones' };
      case 'tablets':
        return { path: '/tablets', label: 'Tablets' };
      case 'accessories':
        return { path: '/accessories', label: 'Accessories' };
      default:
        return { path: '/', label: 'Home' };
    }
  };

  const { path, label } = getLink();

  return (
    <div className={styles.breadcrumbs}>
      <ul className={styles.breadcrumbs__list}>
        <li className={styles.breadcrumbs__item}>
          <Link className={styles.breadcrumbs__link} to="/">
            <img
              className="breadcrumbs__img"
              src="/img/icons/home.svg"
              alt="Home icon"
            />
          </Link>
        </li>
        <li className={styles.breadcrumbs__item}>
          <Link className={styles.breadcrumbs__link} to={path}>
            {label}
          </Link>
        </li>
      </ul>
    </div>
  );
};
