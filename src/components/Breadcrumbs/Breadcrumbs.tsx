import styles from './Breadcrumbs.module.scss';
import { Link } from 'react-router-dom';

type Crumb = {
  label: string;
  path?: string;
};

type Props = {
  items: Crumb[];
};

export const Breadcrumbs: React.FC<Props> = ({ items }) => {
  return (
    <nav className={styles.breadcrumbs}>
      <ol className={styles.breadcrumbs__list}>
        <li className={styles.breadcrumbs__item}>
          <Link to="/" className={styles.breadcrumbs__link}>
            <img src="img/icons/icon-home.png" alt="Home" />
          </Link>
          <span className={styles.breadcrumbs__separator}>
            <img src="img/icons/arrow-right-gray.png" alt="Separator" />
          </span>
        </li>

        {items.map((item, index) => (
          <li key={item.label} className={styles.breadcrumbs__item}>
            {item.path ? (
              <Link to={item.path} className={styles.breadcrumbs__link}>
                {item.label}
              </Link>
            ) : (
              <span className={styles.breadcrumbs__current}>{item.label}</span>
            )}

            {index < items.length - 1 && (
              <span className={styles.breadcrumbs__separator}>
                <img src="img/icons/arrow-right-gray.png" alt="Separator" />
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
