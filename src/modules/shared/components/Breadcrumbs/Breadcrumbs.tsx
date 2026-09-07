import React from 'react';
import '@/styles/main.scss';
import styles from './Breadcrumbs.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface Props {
  links: string[];
}

export const Breadcrumbs: React.FC<Props> = ({ links }) => {
  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.breadcrumbs__home}>
        <i className="icon icon--home"></i>
      </Link>
      {links.map((link: string, i: number) => {
        return (
          <React.Fragment key={i}>
            <i className="icon icon--right"></i>
            {i === links.length - 1 ? (
              <p className={classNames(styles.breadcrumbs__text, 'text__body')}>
                {link}
              </p>
            ) : (
              <Link
                to={`/${link.toLowerCase()}`}
                className={classNames(styles.breadcrumbs__text, 'text__body')}
              >
                {link}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
