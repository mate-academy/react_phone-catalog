import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { BreadcrumbLink } from './types';
import { getImageUrl } from '../../utils/getImageUrl';

interface Props {
  links: BreadcrumbLink[];
}

export const Breadcrumbs: React.FC<Props> = ({ links }) => {
  return (
    <nav className={styles.breadcrumbs}>
      <ol className={styles.breadcrumbs__list}>
        <li className={styles.breadcrumbs__item}>
          <Link to={'/'} className={styles.breadcrumbs__link}>
            <img src={getImageUrl('/icons/home.svg')} alt="Home" />
          </Link>
        </li>

        {links.map((link, index) => {
          const isLast = index === links.length - 1;
          const label = link.label[0].toUpperCase() + link.label.slice(1);

          return (
            <li className={styles.breadcrumbs__item} key={link.to}>
              {!isLast && link.to ? (
                <Link to={link.to} className={styles.breadcrumbs__link}>
                  {label}
                </Link>
              ) : (
                <span>{label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
