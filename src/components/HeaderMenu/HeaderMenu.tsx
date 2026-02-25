import styles from "./HeaderMenu.module.scss";
import classNames from "classnames";
import { routes } from "../../Root";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import { AppSettingsContext } from "../../providers/AppSettingsProvider";

interface Props {
  mobile?: boolean;
  onNavigate?: () => void;
}

export const HeaderMenu: React.FC<Props> = ({ mobile = false, onNavigate }) => {
  const { pathname } = useLocation();
  const { labels } = React.useContext(AppSettingsContext);

  const navItems = [
    { to: routes.home, label: labels.navHome },
    { to: routes.phones, label: labels.navPhones },
    { to: routes.tablets, label: labels.navTablets },
    { to: routes.accessories, label: labels.navAccessories },
  ];

  return (
    <nav
      className={classNames(styles.navigation, {
        [styles.navigationMobile]: mobile,
      })}
    >
      <ul
        className={classNames(styles.list, {
          [styles.listMobile]: mobile,
        })}
      >
        {navItems.map(({ to, label }) => (
          <li
            key={to}
            className={classNames(styles.item, {
              [styles.itemMobile]: mobile,
              [styles.underline]: pathname === to,
            })}
          >
            <Link
              to={to}
              className={classNames(styles.link, "text-uppercase")}
              onClick={onNavigate}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
