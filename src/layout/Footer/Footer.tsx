import classNames from 'classnames';
import { Nav } from '../../components/Nav';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navNames = ['Github', 'Contacts', 'rights'];
  const navPath = ['https://lx-y-ka.github.io/react_phone-catalog/', '/', '/'];
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // плавный скролл
    });
  };

  return (
    <footer className={classNames(styles.footer)}>
      <div className={classNames(styles.footer__container)}>
        <Link
          to={`${import.meta.env.BASE_URL}`}
          className={classNames(styles.footer__logo)}
        >
          <img
            src={`${import.meta.env.BASE_URL}/img/logo.png`}
            alt="logo"
            className={classNames(styles['footer__logo-img'])}
          />
        </Link>
        <div className={classNames(styles.footer__nav)}>
          <Nav names={navNames} targets={navPath} destination={'footer'} />
        </div>
        <div className={classNames(styles.footer__up)}>
          <a
            className={classNames(styles['footer__up-link'])}
            onClick={() => scrollToTop()}
          >
            <div className={classNames(styles['footer__up-text'])}>
              Back to top
            </div>
            <div className={classNames(styles['footer__up-icon'])}></div>
          </a>
        </div>
      </div>
    </footer>
  );
};
