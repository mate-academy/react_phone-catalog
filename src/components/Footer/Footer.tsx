import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className={styles.border}></div>
      <div className={styles.container}>
        <Link to="/">
          <img
            src="img/Logo_header_homePage.svg"
            alt="Logo"
            className={styles.img}
          />
        </Link>
        <nav className={styles.footerNav}>
          <ul className={styles.list}>
            <li className={styles.pageLink}>
              <Link
                to="https://github.com/MariiaSuper"
                target="_blank"
                className={styles.item}
              >
                Github
              </Link>
            </li>
            <li className={styles.pageLink}>
              <Link to="contacts" target="_blank" className={styles.item}>
                Contacts
              </Link>
            </li>
            <li className={styles.pageLink}>
              <Link to="rights" target="_blank" className={styles.item}>
                rights
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.backTop}>
          <h4 className={styles.backTopText}>Back to top</h4>
          <button className={styles.button} onClick={scrollToTop}>
            <img src="img/arrowUp.svg" alt="arrowUp" />
          </button>
        </div>
      </div>
    </>
  );
};
