/* eslint-disable max-len */
import React from 'react';
import styles from './Breadcrumbs.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  categoryTitle: string;
  gadgetTitle?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ categoryTitle, gadgetTitle }) => {
  return (
    <div className={styles.container}>
      <NavLink to="/" className={styles.link}>
        <img className={styles.home} src="images/Home.svg" />
      </NavLink>
      <img className={styles.next} src="images/Chevron (Arrow Right).svg" />
      {gadgetTitle ? (
        <>
          <NavLink to={`/${categoryTitle}`} className={styles.link}>
            {categoryTitle}
          </NavLink>
          <img className={styles.next} src="images/Chevron (Arrow Right).svg" />
          <span className={styles.title}>{gadgetTitle}</span>
        </>
      ) : (
        <span className={styles.title}>{categoryTitle}</span>
      )}
    </div>
  );
};
