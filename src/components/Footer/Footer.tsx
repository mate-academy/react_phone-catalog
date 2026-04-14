import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import classNames from 'classnames';
import { Button } from '../Button';
import { Icon } from '../../components/Icon';
import { scrollToTop } from '../../modules/shared/utils/scrollToTop';
import { Logo } from '../Logo';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={classNames('container', styles.content, 'grid')}>
        <Logo className={styles.footerLogo} />

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className={classNames(styles.navLink, 'uppercase')}
              >
                Github
              </a>
            </li>
            <li>
              <Link to="/contacts" className={classNames(styles.navLink, 'uppercase')}>
                Contacts
              </Link>
            </li>
            <li>
              <Link to="/rights" className={classNames(styles.navLink, 'uppercase')}>
                Rights
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.backToTop}>
          <span className="small-text">Back to top</span>
          <Button variant="slider" onClick={() => scrollToTop('smooth')}>
            <Icon variant="arrow-up" />
          </Button>
        </div>
      </div>
    </footer>
  );
};
