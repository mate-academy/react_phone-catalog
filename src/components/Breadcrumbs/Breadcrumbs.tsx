import classNames from 'classnames';
import { Icon } from '../Icon';
import styles from './Breadcrumbs.module.scss';
import '../../styles/main.scss';

// type BreadcrumbItem = {
//   name: string;
//   path: string;
// }

// type  BreadcrumbsProps = {
//   items: BreadcrumbItem[];
//   separator?: string;
// }

const Breadcrumbs = () => {
  return (
    <div id="breadcrumbs" className="breadcrumbs">
      <nav aria-label="breadcrumb" className={styles.breadcrumbs__nav}>
        <ul
          className={classNames('nav__list', styles['breadcrumbs__nav-list'])}
        >
          <li className={styles['breadcrumbs__nav-item']}>
            <a href="#" className={styles['breadcrumb__nav-link']}>
              <Icon iconName="home" />
            </a>
          </li>
          <li className={styles['breadcrumbs__nav-item']}>
            <span className={styles['breadcrumbs__nav-link-separator']}>
              <Icon iconName="right" />
            </span>
            <a href="#" className={styles['breadcrumbs__nav-link']}>
              Phones
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
