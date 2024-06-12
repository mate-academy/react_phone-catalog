import Button from '../../UI/Buttons/Button';
import { IoIosArrowUp } from 'react-icons/io';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import useDarkThemeStore from '../../store/darkThemeStore';

const Footer = () => {
  const { theme } = useDarkThemeStore();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer_content}>
          <div className={styles.footer__logo_container}>
            <Link to="/" className={styles.footer__logo_link}>
              <img
                className={styles.footer__logo}
                src={`img/${theme === 'dark' ? 'logo-dark.svg' : 'logo.svg'}`}
                alt="Nice gadgets logo"
              />
            </Link>
          </div>
          <div className={styles.footer__link__container}>
            <Link
              to="https://github.com/FS-MAR24-Code-Busters/react_phone-catalog"
              className={styles.footer__link}
              target="_blank"
            >
              github
            </Link>
            <Link
              to="https://github.com/orgs/FS-MAR24-Code-Busters/people"
              className={styles.footer__link}
              target="_blank"
            >
              contacts
            </Link>
            <Link to="#" className={styles.footer__link} target="_blank">
              rights
            </Link>
          </div>
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={styles.back_to_top_content}
          >
            <Link to="#" className={styles.back__to__top_link}>
              <span className={styles.back__to__top}>back to top</span>
              <Button variant="icon">
                <IoIosArrowUp />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
