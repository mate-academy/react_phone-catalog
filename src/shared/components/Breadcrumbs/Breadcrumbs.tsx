import { useContext } from 'react';
import { Link } from 'react-router-dom';

import ArrowIcon from '@/assets/icons/arrow-up.svg?react';
import HomeIcon from '@/assets/icons/home.svg?react';
import { ROUTES } from '@/shared/constants';
import { BreadcrumbContext } from '@/shared/context/BreadcrumbContext';
import { cn } from '@/shared/utils';

import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  const { breadcrumbs } = useContext(BreadcrumbContext);

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link to={ROUTES.HOME} className={styles.home}>
            <HomeIcon className={styles.homeIcon} />
          </Link>
        </li>
        {breadcrumbs.map((item, index) => {
          const isLastElement = index === breadcrumbs.length - 1;

          return (
            <li key={item.name} className={styles.item}>
              <ArrowIcon aria-hidden="true" className={styles.arrow} />

              {item.to && !isLastElement ? (
                <Link to={item.to} className={cn(styles.text, styles.link)}>
                  {item.name}
                </Link>
              ) : (
                <span
                  className={cn(styles.text, styles.current)}
                  aria-current={isLastElement ? 'page' : undefined}
                >
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
