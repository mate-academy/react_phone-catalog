import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Logo } from '../Logo';
import { handleClickToTop } from '../../helpers/scrollToTop';
import { ThemeContext } from '../../store/ThemeContex';
import { Theme } from '../../types/Theme';
import styles from './Footer.module.scss';
import top from '../../images/icons/arrow_up.svg';
import topDark from '../../images/icons/arrow_up_for_dark.svg';

export const Footer = () => {
  const { pathname } = useLocation();
  const { theme } = useContext(ThemeContext);

  if (pathname === '/menu') {
    return null;
  }

  const footerLinks: { title: string; path: string }[] = [
    {
      title: 'Github',
      path: 'https://github.com/MartaChobaniuk/react_phone-catalog',
    },

    {
      title: 'Contacts',
      path: 'https://www.linkedin.com/in/marta-chobaniuk-1b7995260/',
    },

    {
      title: 'Rights',
      path: 'https://www.linkedin.com/in/marta-chobaniuk-1b7995260/',
    },
  ];

  return (
    <div
      className={cn({
        [styles.footer]: theme === Theme.Light,
        [styles['footer-dark']]: theme === Theme.Dark,
      })}
    >
      <Logo className={styles.footer__logo} />

      <div className={styles.footer__link_container}>
        {footerLinks.map(link => (
          <Link
            key={link.title}
            to={link.path}
            className={cn({
              [styles.footer__item]: theme === Theme.Light,
              [styles['footer__item-dark']]: theme === Theme.Dark,
            })}
            target="_blank"
          >
            {link.title}
          </Link>
        ))}
      </div>

      <div className={styles.footer__button_container}>
        <span
          className={cn({
            [styles.footer__text]: theme === Theme.Light,
            [styles['footer__text-dark']]: theme === Theme.Dark,
          })}
          onClick={handleClickToTop}
        >
          Back to top
        </span>
        <button
          className={cn({
            [styles.footer__button]: theme === Theme.Light,
            [styles['footer__button-dark']]: theme === Theme.Dark,
          })}
          onClick={handleClickToTop}
        >
          <img
            src={theme === Theme.Light ? top : topDark}
            alt="Arrow-Up"
            className={styles.footer__image}
          />
        </button>
      </div>
    </div>
  );
};
