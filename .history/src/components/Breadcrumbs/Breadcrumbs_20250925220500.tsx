/* eslint-disable max-len */
import React, { useContext } from 'react';
import styles from './Breadcrumbs.module.scss';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../ThemeProvider';

type Props = {
  categoryTitle: string;
  gadgetTitle?: string;
};

export const Breadcrumbs: React.FC<Props> = ({
  categoryTitle,
  gadgetTitle,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.container}>
      <NavLink to="/" className={styles.link}>
        <img className={styles.home} src={theme === '"images/Home.svg"} />
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
