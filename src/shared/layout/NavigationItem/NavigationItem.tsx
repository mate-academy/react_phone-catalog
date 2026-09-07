import React from 'react';
import styles from './NavigationItem.module.scss';
import { Link, useLocation } from 'react-router-dom';
import arrowRight from '../../../../public/img/icons/icon-arrow-right.svg';
import homeIcon from '../../../../public/img/icons/icon-home.svg';

export const NavigationItem: React.FC = () => {
  const { pathname } = useLocation();
  const pathes = pathname.split('/').filter(Boolean);

  return (
    <div className={styles['navigation-item']}>
      <div className={styles['navigation-item__constructor']}>
        <Link to={'/'} className={styles['navigation-item__home']}>
          <img src={homeIcon} alt="home" />
        </Link>

        {pathes.map((path, index) => {
          const isLast = index === pathes.length - 1;

          return (
            <React.Fragment key={index}>
              {index === 0 ? (
                <div className={styles['navigation-item__image']}>
                  <img src={arrowRight} alt="arrow-right" />
                </div>
              ) : (
                ''
              )}

              <Link to={`/${path}`} className={styles['navigation-item__path']}>
                {path[0].toUpperCase() + path.slice(1)}
              </Link>

              {!isLast && (
                <div className={styles['navigation-item__image']}>
                  <img src={arrowRight} alt="arrow-right" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
