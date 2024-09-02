import React from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  const logoUrl = `${process.env.PUBLIC_URL}/img/logo.svg`;

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <img src={logoUrl} alt="" className={styles.logo} />
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>
              Github
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>
              Contacts
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>
              Rights
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.backToTopBlock}>
        <p onClick={handleScrollToTop} className={styles.backToTop}>Back to top</p>
        <button
          className={styles.backToTopButton}
          onClick={handleScrollToTop}
        ></button>
      </div>
    </footer>
  );
};
