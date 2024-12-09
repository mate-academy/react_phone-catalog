/* eslint-disable react/react-in-jsx-scope */
import { Link, useLocation } from 'react-router-dom';

import { Logo } from '../Logo';

import styles from './Footer.module.scss';
import top from '../../images/icons/arrow_up.svg';
import { handleClickToTop } from '../../helpers/scrollToTop';

export const Footer = () => {
  const { pathname } = useLocation();

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
    <div className={styles.footer}>
      <Logo className={styles.footer__logo} />

      <div className={styles.footer__link_container}>
        {footerLinks.map(link => (
          <Link
            key={link.title}
            to={link.path}
            className={styles.footer__item}
            target="_blank"
          >
            {link.title}
          </Link>
        ))}
      </div>

      <div className={styles.footer__button_container}>
        <span className={styles.footer__text} onClick={handleClickToTop}>
          Back to top
        </span>
        <button className={styles.footer__button} onClick={handleClickToTop}>
          <img src={top} alt="Arrow-Up" className={styles.footer__image} />
        </button>
      </div>
    </div>
  );
};
