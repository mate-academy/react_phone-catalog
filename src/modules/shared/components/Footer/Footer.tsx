import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";

import styles from "./Footer.module.scss";

export const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handlerLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 0);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={classNames(styles.footerInner, "container", "grid")}>
        <Link className={styles.footerLogo} to={"/"} onClick={handlerLogoClick}>
          <img src="src/assets/img/logo.svg" alt="Nice Gadgets Logo" />
        </Link>
        <ul className={styles.footerList}>
          <li>
            <Link
              className={styles.footerLink}
              to={"https://github.com/IvanRyabukha"}
              target="_blank"
            >
              Github
            </Link>
          </li>
          <li>
            <Link
              className={styles.footerLink}
              to={"https://github.com/IvanRyabukha"}
              target="_blank"
            >
              Contacts
            </Link>
          </li>
          <li>
            <Link
              className={styles.footerLink}
              to={"https://github.com/IvanRyabukha"}
              target="_blank"
            >
              Rights
            </Link>
          </li>
        </ul>

        <button
          className={styles.footerBackTop}
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className={styles.footerBackTopText}>Back to top</div>
          <div className={styles.footerBackTopIcon}>
            <img src="src/assets/icons/arrow-left.svg" alt="Arrow Left" />
          </div>
        </button>
      </div>
    </footer>
  );
};
