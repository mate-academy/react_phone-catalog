import React, { useContext } from "react";
import styles from "./Footer.module.scss";
import classNames from "classnames";
import { AppSettingsContext } from "../../providers/AppSettingsProvider";
import { getAssetPath } from "../../utils";

export const Footer: React.FC = () => {
  const { theme } = useContext(AppSettingsContext);
  const contactsUrl =
    "https://www.linkedin.com/in/radymyr-loboda-b4020417b/" +
    "overlay/contact-info/";
  const rightsUrl =
    "https://github.com/Radymyr/react_phone-catalog/" + "blob/develop/LICENSE";

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <a className={styles.logo} href="#">
            <img
              className={classNames(
                styles.logoImage,
                theme === "light" && styles.logoImageLight,
              )}
              alt="logo"
              src={getAssetPath("img/general/icons/logo-bottom.svg")}
            />
          </a>
          <nav className={styles.navigation}>
            <ul className={styles.list}>
              <li className="footer__item">
                <a
                  href="https://github.com/Radymyr"
                  className={classNames(styles.link, " text-uppercase")}
                >
                  Github
                </a>
              </li>
              <li className="footer__item">
                <a
                  href={contactsUrl}
                  className={classNames(styles.link, " text-uppercase")}
                >
                  Contacts
                </a>
              </li>
              <li className="footer__item">
                <a
                  href={rightsUrl}
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
                src={
                  theme === "light"
                    ? getAssetPath("img/general/icons/arrow.svg")
                    : getAssetPath("img/general/icons/arrow-white.svg")
                }
              />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};
