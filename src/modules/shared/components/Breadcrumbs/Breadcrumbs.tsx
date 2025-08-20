import React from 'react';
import '@/styles/main.scss';
import styles from './Breadcrumbs.module.scss';
import classNames from 'classnames';

interface Props {
  links: string[];
}

export const Breadcrumbs: React.FC<Props> = ({ links }) => {
  return (
    <div className={styles.breadcrumbs}>
      <a href="#" className={styles.breadcrumbs__home}>
        <i className="icon icon--home"></i>
      </a>
      {links.map((link: string) => {
        return (
          <>
            <i className="icon icon--right"></i>
            <a
              href="#"
              className={classNames(styles.breadcrumbs__text, 'text__body')}
            >
              {link}
            </a>
          </>
        );
      })}
    </div>
  );
};
