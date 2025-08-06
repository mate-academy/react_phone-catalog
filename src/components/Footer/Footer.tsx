import { Link } from 'react-router-dom';
import { Arrow } from '../Arrow';
import { Logo } from '../Logo';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => (
  <div className={styles.footer}>
    <footer className={styles.footerContent}>
      <div className={styles.logo}>
        <Logo location="footer" />
      </div>

      <ul className={styles.list}>
        <li className={`uppercaseText`}>
          <Link to="https://github.com/Mihakurochkin/">github</Link>
        </li>
        <li className={`uppercaseText`}>
          <Link to="/">contacts</Link>
        </li>
        <li className={`uppercaseText`}>
          <Link to="/">rights</Link>
        </li>
      </ul>

      <div className={styles.backToTop}>
        <p className="smallText">Back to top</p>

        <Arrow
          direction="up"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        />
      </div>
    </footer>
  </div>
);
