import classNames from 'classnames';
import React from 'react';
import styles from '../../NavBar.module.scss';
import { NavLink } from 'react-router-dom';

// this component does not have its own styles because most of the styles it uses are common to elements from NavBar

interface Props {
  isVisible: boolean;
  setVisible: (v: boolean) => void;
  theme: 'light' | 'dark';
}

export const PhoneNav: React.FC<Props> = ({ isVisible, setVisible, theme }) => {
  return (
    <>
      {isVisible ? (
        <div className={classNames(styles.icon, styles.rightButton)}>
          <NavLink
            to="#"
            onClick={() => setVisible(false)}
            className={styles.link_asideItem}
            style={{ display: 'block' }}
          >
            <img
              src={
                theme === 'light'
                  ? `${import.meta.env.BASE_URL}/img/icons/Close.svg`
                  : `${import.meta.env.BASE_URL}/img/icons/dark_close.svg`
              }
              alt="close"
            />
          </NavLink>
        </div>
      ) : (
        <div className={classNames(styles.icon, styles.rightButton)}>
          <NavLink
            to="#"
            onClick={() => setVisible(true)}
            className={styles.link_asideItem}
          >
            <img
              src={
                theme === 'light'
                  ? `${import.meta.env.BASE_URL}/img/icons/burgerMenu.svg`
                  : `${import.meta.env.BASE_URL}/img/icons/dark_menu.svg`
              }
              alt="menu"
            />
          </NavLink>
        </div>
      )}
    </>
  );
};
