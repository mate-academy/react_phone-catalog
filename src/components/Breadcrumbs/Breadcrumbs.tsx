import classNames from 'classnames';
import { Icon } from '../ui/Icon';
import styles from './Breadcrumbs.module.scss';
import '../../styles/main.scss';
import { Link, useLocation } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

// type BreadcrumbItem = {
//   name: string;
//   path: string;
// }

// type  BreadcrumbsProps = {
//   items: BreadcrumbItem[];
//   separator?: string;
// }

const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const extractSegment = (path: string) => {
    const parts = path.split('/').filter(Boolean);

    return parts[0] || '';
  };

  return (
    <div id="breadcrumbs" className="breadcrumbs">
      <nav aria-label="breadcrumb" className={styles.breadcrumbs__nav}>
        <ul
          className={classNames('nav__list', styles['breadcrumbs__nav-list'])}
        >
          <li className={styles['breadcrumbs__nav-item']}>
            <Link to="/" className={styles['breadcrumb__nav-link']}>
              <Icon iconName="home" />
            </Link>
          </li>
          <li className={styles['breadcrumbs__nav-item']}>
            <span className={styles['breadcrumbs__nav-link-separator']}>
              <Icon iconName="right" />
            </span>
            <span className={styles['breadcrumbs__nav-link']}>
              {capitalizeFirstLetter(extractSegment(pathname))}
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
