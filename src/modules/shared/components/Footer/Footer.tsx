import { IconType } from '../../types/IconType';
import { Icon } from '../Icon/Icon';
import { Logo } from '../Logo';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className={styles.footer__logo_container}>
        <Logo />
      </div>
      <div className={styles.footer__menu}>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className={styles.footer__menu_link}
        >
          Github
        </a>
        <a href="#" className={styles.footer__menu_link}>
          Contacts
        </a>
        <a href="#" className={styles.footer__menu_link}>
          Rights
        </a>
      </div>
      <button className={styles.footer__button} onClick={scrollToTop}>
        <div className={styles.footer__button_text}>Back to top</div>
        <div className={styles.footer__icon_container}>
          <Icon iconType={IconType.Up} address="#" />
        </div>
      </button>
    </>
  );
};
