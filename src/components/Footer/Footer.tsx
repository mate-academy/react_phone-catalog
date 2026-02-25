import React from "react";
import styles from "./Footer.module.scss";
import classNames from "classnames";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <a className={styles.logo} href="#">
            <img
              className="logo__image"
              alt="logo"
              src="/img/general/icons/logo-bottom.svg"
            />
          </a>
          <nav className={styles.navigation}>
            <ul className={styles.list}>
              <li className="footer__item">
                <a
                  href="#"
                  className={classNames(styles.link, " text-uppercase")}
                >
                  Github
                </a>
              </li>
              <li className="footer__item">
                <a
                  href="#"
                  className={classNames(styles.link, " text-uppercase")}
                >
                  Contacts
                </a>
              </li>
              <li className="footer__item">
                <a
                  href="#"
                  className={classNames(styles.link, " text-uppercase")}
                >
                  rights
                </a>
              </li>
            </ul>
          </nav>
          <a className={styles.button} href="#">
            <p className="footer__text-button text-small">Back to top</p>
            <div className={classNames(styles.wrapper, "button")}>
              <img
                className={styles.icon}
                alt="up-arrow"
                src="/img/general/icons/arrow-white.svg"
              />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};
