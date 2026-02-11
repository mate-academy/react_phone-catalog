import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import styles from './Footer.module.scss';
import { Button } from '@/modules/shared/components/Button';
import { FaAngleUp } from 'react-icons/fa6';
import classNames from 'classnames';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={classNames('container', styles.footerContent)}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <ul className={styles.contacts}>
          <li className={styles.contactsItem}>
            <Link to="/" className={styles.contactsLink}>
              Github
            </Link>
          </li>
          <li className={styles.contactsItem}>
            <Link to="/" className={styles.contactsLink}>
              Contacts
            </Link>
          </li>
          <li className={styles.contactsItem}>
            <Link to="/" className={styles.contactsLink}>
              Rights
            </Link>
          </li>
        </ul>

        <div className={styles.btnContainer}>
          <label className={styles.btnText} htmlFor="back-to-top">
            <span>Back to top</span>
            <Button
              id="back-to-top"
              variant="outline"
              className={styles.backToTopBtn}
              squareBtn
              onClick={handleScrollToTop}
              size="medium"
            >
              <FaAngleUp size={16} />
            </Button>
          </label>
        </div>
      </div>
    </footer>
  );
};
