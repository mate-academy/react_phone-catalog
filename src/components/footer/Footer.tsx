import { Link } from 'react-router-dom';

import Logo from '../../assets/images/logo.svg';

import styles from './Footer.module.scss';

import { ArrowButton } from '../ArrowButton';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.footer}>
      <hr className={styles.footer__line} />
      <img src={Logo} alt="logo" className={styles.footer__logo} />
      <div className={styles.footer__links}>
        <Link
          to="https://github.com/yuron-maker"
          target="_blank"
          className={styles.footer__linkText}
        >
          Github
        </Link>
        <Link
          to="https://www.instagram.com/yurko_kom/"
          target="_blank"
          className={styles.footer__linkText}
        >
          Contacts
        </Link>
        <Link to="" className={styles.footer__linkText}>
          Rights
        </Link>
      </div>
      <div className={styles.footer__toTop}>
        <p className={styles.footer__text}>Back to top</p>
        <ArrowButton
          diraction="top"
          click={() => scrollToTop()}
          disable={false}
        />
      </div>
    </div>
  );
};
