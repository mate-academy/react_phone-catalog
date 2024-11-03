import styles from './Footer.module.scss';
import logo from '../../assets/icons/logo.png';
import classNames from 'classnames';

export const Footer = () => {
  const handleBackToTop: React.MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.contentWrapper}>
        <a href="#" className={styles.footerLogo} onClick={handleBackToTop}>
          <img src={logo} alt="Nice gadgets logo" />
        </a>
        <div className={styles.reachMeContainer}>
          <a
            href="https://github.com/modeltoIT"
            target="_blank"
            rel="noreferrer"
            className={styles.reachMeItem}
          >
            Github
          </a>
          <a
            href="mailto:dmtivasenko@gmail.com?subject=Job opportunity"
            className={styles.reachMeItem}
          >
            Contacts
          </a>
          <a
            href="https://github.com/modeltoIT"
            className={styles.reachMeItem}
            target="_blank"
            rel="noreferrer"
          >
            Rights
          </a>
        </div>
        <a href="#" className={styles.toTop} onClick={handleBackToTop}>
          Back to top
          <button
            className={classNames('buttonArrowUp', styles.toTopBtn)}
          ></button>
        </a>
      </div>
    </footer>
  );
};
