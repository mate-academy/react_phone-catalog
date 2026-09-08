import React from 'react';
import styles from './Breadcrumbs.module.scss';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import HomeIco from '../Icons/HomeIco/HomeIco';
import Arrow from '../Icons/Arrow/Arrow';
import { ArrowDirection } from '../../types/arrowDirection';

type Props = {
  className?: string;
};

const Breadcrumbs: React.FC<Props> = ({ className = '' }) => {
  const location = useLocation();
  const path = location.pathname.split('/').filter(p => p !== '');

  return (
    <nav className={classNames(styles.Breadcrumbs, className)}>
      <ul className={styles.Breadcrumbs__list}>
        <li className={styles.Breadcrumbs__item}>
          <Link to="/" className={styles.Breadcrumbs__link}>
            <HomeIco />
          </Link>{' '}
        </li>

        {path.map(p => (
          <React.Fragment key={p}>
            <Arrow direction={ArrowDirection.right} />
            <li className={styles.Breadcrumbs__item}>
              <Link to={`/${p}`} className={styles.Breadcrumbs__link}>
                {p}
              </Link>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
