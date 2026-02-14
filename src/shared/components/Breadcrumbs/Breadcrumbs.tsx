import { Link, useLocation } from 'react-router-dom';
import { HomeIcon } from '../Icons/HomeIcon';

import styles from './Breadcrumbs.module.scss';
import { ArrowIconRight } from '../Icons/ArrowIcon/ArrowIcon';

type Props = {
  classStyles?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ classStyles }) => {
  const location = useLocation();
  const pathSegments = location.pathname
    .split('/')
    .filter(segment => segment !== '');

  let path = '';

  return (
    <nav className={classStyles}>
      <ul className={styles.list}>
        <li>
          <Link to="/" className={styles.item}>
            <HomeIcon />
          </Link>
        </li>

        {pathSegments.map(segment => {
          path += `/${segment}`;

          return (
            <li key={segment} className={styles.item}>
              <ArrowIconRight />
              <Link to={path}>{segment}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
