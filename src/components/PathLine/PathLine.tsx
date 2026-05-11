import React from 'react';
import styles from './PathLine.module.scss';
import { Icon } from '../Icon';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const PathLine = () => {
  const { pathname } = useLocation();

  const elements = pathname.trim().split('/').filter(Boolean);

  return (
    <div className={styles.path}>
      <div className={styles.path__icon}>
        <Link to="/">
          <Icon name="home" className={styles.home} />
        </Link>
      </div>
      {elements &&
        elements.map((el, i) => (
          <>
            <div className={styles.path__icon} key={i}>
              <Icon name="arrowright" />
            </div>
            <div className={styles.path__icon} key={i}>
              {i !== elements.length - 1 ? (
                <Link to={`/${el}`} className={styles.path__text}>
                  {el}
                </Link>
              ) : (
                <div
                  className={classNames(
                    styles.path__text,
                    styles['path__text-last'],
                  )}
                >
                  {el}
                </div>
              )}
            </div>
          </>
        ))}
    </div>
  );
};
