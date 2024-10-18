import { NavLink, useParams } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import homeIcon from '../../img/icons/home.png';
import homeIconDark from '../../img/icons/night_theme_home.png';

type Props = {
  name: string | undefined;
};
export const Breadcrumbs: React.FC<Props> = ({ name }) => {
  const { category } = useParams();
  const { isDarkTheme } = useTheme();

  return (
    <div className={styles.breadcrumbs}>
      <NavLink to={'/'} style={{ display: 'block' }}>
        <img
          style={{ display: 'block' }}
          src={isDarkTheme ? homeIconDark : homeIcon}
          alt="home icon"
        />
      </NavLink>
      <img src="../src/img/icons/arrow_right_grey.png" alt="arrow icon" />
      <NavLink to={'..'} className={styles['breadcrumbs__prev-page']}>
        {category}
      </NavLink>
      <img src="../src/img/icons/arrow_right_grey.png" alt="arrow icon" />
      <p className={styles['breadcrumbs__current-page']}>{name}</p>
    </div>
  );
};
