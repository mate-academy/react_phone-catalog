import classNames from 'classnames';
import { Icon } from '../ui/Icon';
import styles from './Breadcrumbs.module.scss';
import '../../styles/main.scss';
import { Link, useLocation } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const segments = pathname.split('/').filter(Boolean);
  const isCatalogPage = segments.length === 1;
  const category = capitalizeFirstLetter(segments[0]);
  const getProductName = () => {
    if (segments.length > 1) {
      const lastSegment = segments[segments.length - 1].replace(/[:\-]/g, ' ');

      return capitalizeFirstLetter(lastSegment);
    }

    return '';
  };

  const productName = getProductName();

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
            {isCatalogPage ? (
              <span className={styles['breadcrumbs__nav-text']}>
                {category}
              </span>
            ) : (
              <Link
                to={`/${segments[0]}`}
                className={styles['breadcrumbs__nav-link']}
              >
                {category}
              </Link>
            )}
          </li>

          {productName && (
            <li className={styles['breadcrumbs__nav-item']}>
              <span className={styles['breadcrumbs__nav-link-separator']}>
                <Icon iconName="right" />
              </span>
              <span className={styles['breadcrumbs__nav-text']}>
                {productName}
              </span>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
