import classNames from 'classnames';
import { motion } from 'framer-motion';
import styles from './Aside.module.scss';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../context/PageTheme';

interface Props {
  isVisible: boolean;
  setVisible: (v: boolean) => void;
  theme: 'dark' | 'light';
  cartLength: number;
  favLength: number;
}

const links = ['home', 'phones', 'tablets', 'accessories'];
const linksUA = ['головна', 'смартфони', 'планшети', 'aксесуари'];

export const Aside: React.FC<Props> = ({
  isVisible,
  setVisible,
  theme,
  cartLength,
  favLength,
}) => {
  const { i18n } = useTranslation();
  const { setTheme } = useTheme();

  return (
    <motion.aside
      initial={{ transform: 'translateX(-100%)', opacity: 0 }}
      animate={{
        transform: isVisible ? 'translateX(0%)' : 'translateX(-100%)',
        opacity: isVisible ? 1 : 0,
      }}
      exit={{ transform: 'translateX(-100%)', opacity: 0 }}
      className={classNames(styles.aside, {
        [styles['aside--visible']]: isVisible,
      })}
    >
      <div className={styles.asideLinks}>
        {(i18n.language === 'en' ? links : linksUA).map((item, index) => {
          const isActive = location.pathname.includes(
            links[i18n.language === 'en' ? index : index],
          );
          const path = `/${links[index]}`;

          return (
            <NavLink
              key={item}
              onClick={() => setVisible(false)}
              className={classNames(styles.links__item, {
                [styles.active]: isActive,
              })}
              style={{
                color: theme === 'light' ? 'black' : 'white',
                textTransform: 'uppercase',
              }}
              to={path}
            >
              {i18n.language === 'en' ? item : linksUA[index]}{' '}
            </NavLink>
          );
        })}
      </div>

      <div className={styles.asideIcons}>
        <button
          onClick={() =>
            i18n.changeLanguage(i18n.language === 'en' ? 'uk' : 'en')
          }
          className={styles.asideIcon}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
          }}
        >
          <img
            src={
              i18n.language === 'en'
                ? `${import.meta.env.BASE_URL}/img/icons/uk_logo.png`
                : `${import.meta.env.BASE_URL}/img/icons/en_logo.png`
            }
            alt="flag logo"
          />
        </button>

        <button
          className={styles.asideIcon}
          style={{
            backgroundColor: theme === 'light' ? 'transparent' : '#2c2c2c',
            border: 'none',
          }}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <NavLink to="/favourites" className={styles.links__item}>
            <img
              src={
                theme === 'light'
                  ? `${import.meta.env.BASE_URL}/img/icons/theme_light.png`
                  : `${import.meta.env.BASE_URL}/img/icons/theme_dark.png`
              }
              alt="theme"
            />
          </NavLink>
        </button>

        <div
          className={styles.asideIcon}
          style={{
            borderBottom: location.pathname.includes('favourites')
              ? '3px solid black'
              : 'none',
          }}
        >
          <NavLink
            to="/favourites"
            className={styles.links__item}
            onClick={() => setVisible(false)}
          >
            <img
              src={
                theme === 'light'
                  ? `${import.meta.env.BASE_URL}/img/icons/favourites.svg`
                  : `${import.meta.env.BASE_URL}/img/icons/dark_like.svg`
              }
              alt="favourites"
            />
            {favLength > 0 && (
              <div className={classNames(styles.count, styles.favouritesCount)}>
                {favLength}
              </div>
            )}
          </NavLink>
        </div>

        <div
          className={styles.asideIcon}
          style={{
            borderBottom: location.pathname.includes('case')
              ? '3px solid black'
              : 'none',
          }}
        >
          <NavLink
            to="/case"
            className={styles.links__item}
            onClick={() => setVisible(false)}
          >
            <img
              src={
                theme === 'light'
                  ? `${import.meta.env.BASE_URL}/img/icons/case.svg`
                  : `${import.meta.env.BASE_URL}/img/icons/dark_cart.svg`
              }
              alt="case"
            />
            {cartLength > 0 && (
              <div className={classNames(styles.count, styles.cartCount)}>
                {cartLength}
              </div>
            )}
          </NavLink>
        </div>
      </div>
    </motion.aside>
  );
};
