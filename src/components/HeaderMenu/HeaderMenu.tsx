import styles from "./HeaderMenu.module.scss";
import classNames from "classnames";
import { routes } from "../../Root";
import { Link, useLocation } from "react-router-dom";
import React from "react";

interface Props {
  listStyles?: React.CSSProperties;
  itemStyles?: React.CSSProperties;
  wrapperStyles?: React.CSSProperties;
}

export const HeaderMenu: React.FC<Props> = ({
  listStyles,
  itemStyles,
  wrapperStyles,
}) => {
  const { pathname } = useLocation();

  return (
    <nav className={styles.navigation} style={wrapperStyles}>
      <ul className={classNames(styles.list)} style={listStyles}>
        <li
          style={itemStyles}
          className={classNames(styles.item, {
            [styles.underline]: pathname === routes.home,
          })}
        >
          <Link
            to={routes.home}
            className={classNames(styles.link, "text-uppercase")}
          >
            Home
          </Link>
        </li>
        <li
          style={itemStyles}
          className={classNames(styles.item, {
            [styles.underline]: pathname === routes.phones,
          })}
        >
          <Link
            to={routes.phones}
            className={classNames(styles.link, "text-uppercase")}
          >
            Phone
          </Link>
        </li>
        <li
          style={itemStyles}
          className={classNames(styles.item, {
            [styles.underline]: pathname === routes.tablets,
          })}
        >
          <Link
            to={routes.tablets}
            className={classNames(styles.link, "text-uppercase")}
          >
            Tablets
          </Link>
        </li>
        <li
          style={itemStyles}
          className={classNames(styles.item, {
            [styles.underline]: pathname === routes.accessories,
          })}
        >
          <Link
            to={routes.accessories}
            className={classNames(styles.link, "text-uppercase")}
          >
            Accessories
          </Link>
        </li>
      </ul>
    </nav>
  );
};
