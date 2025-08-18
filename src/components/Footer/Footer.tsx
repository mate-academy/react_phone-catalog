import { Link } from 'react-router-dom';
import { ArrowButton } from '../Arrow/ArrowButton';
import { Logo } from '../Logo';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <div className={styles.logo}>
        <Logo location="footer" />
      </div>

      <ul className={styles.list}>
      <li className='uppercaseText'>
          <Link className={styles.listLink} to="https://github.com/Mihakurochkin/">github</Link>
        </li>
        <li className='uppercaseText'>
          <Link className={styles.listLink} to="/">contacts</Link>
        </li>
        <li className='uppercaseText'>
          <Link className={styles.listLink} to="/">rights</Link>
        </li>
      </ul>

      <div className={styles.backToTop}>
        <p className="smallText">Back to top</p>

        <ArrowButton
          direction="up"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        />
      </div>
    </div>
  </footer>
);
