//styles
import styles from './Footer.module.scss';

//components
import { Link } from 'react-router-dom';
import { Button } from '../Button';

//assets
import logo from '../../assets/logos/Logo.svg';
import arrowToTop from './assets/icons/Vector (Stroke).svg';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <hr className={styles.hr} />

      <div className={styles.controls}>
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="Nice Gadgets" className={styles.logo} />
        </Link>

        <ul className={styles.list}>
          <li>
            <Link to="https://github.com/Mykyta-snacj" className={styles.link}>
              Github
            </Link>
          </li>
          <li>
            <Link to="https://github.com/Mykyta-snacj" className={styles.link}>
              Contacts
            </Link>
          </li>
          <li>
            <Link to="https://github.com/Mykyta-snacj" className={styles.link}>
              Rights
            </Link>
          </li>
        </ul>

        <div className={styles.toTop}>
          <p>Back to top</p>
          <Button variant="iconType" onClick={scrollToTop} size="xs">
            <img src={arrowToTop} alt="arrow" />
          </Button>
        </div>
      </div>
    </footer>
  );
};
