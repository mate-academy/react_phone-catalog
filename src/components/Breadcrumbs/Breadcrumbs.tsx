import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { getChevronIconSrc, getHomeIconSrc } from '../../servises/iconSrc';
import styles from './Breadcrumbs.module.scss';
import { Link, useLocation } from 'react-router-dom';

type Props = {};

export const Breadcrumbs: React.FC<Props> = () => {
  const { theme } = useTheme();
  const { pathname } = useLocation();

  const homeIconSrs = getHomeIconSrc(theme);
  const chevronIconSrc = getChevronIconSrc(theme);

  const pathSegments = pathname.split('/').filter(Boolean);
  const createPathToSegment = (index: number) =>
    `/${pathSegments.slice(0, index + 1).join('/')}`;

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/">
        <img src={homeIconSrs} alt="home" className={styles.homeIcon} />
      </Link>

      {pathSegments.map((segment, index) => {
        const capitalizedSegment =
          segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <React.Fragment key={index}>
            <img
              src={chevronIconSrc}
              alt="chevron"
              className={styles.chevronIcon}
            />
            <Link to={createPathToSegment(index)} className={styles.link}>
              <p className={styles.segment}>{capitalizedSegment} </p>
            </Link>
          </React.Fragment>
        );
      })}
    </nav>
  );
};
