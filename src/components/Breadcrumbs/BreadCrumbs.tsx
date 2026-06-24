import React from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import styles from "./BreadCrumbs.module.scss";
import { getAssetPath } from "../../utils";

const formatSegment = (segment: string) => {
  if (!segment) {
    return "";
  }

  return segment[0].toUpperCase() + segment.slice(1);
};

export const BreadCrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  const items = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;

    return {
      href,
      label: formatSegment(segment),
      isLast: index === segments.length - 1,
    };
  });

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link to="/" className={styles.home}>
            <img src={getAssetPath("img/general/icons/home.svg")} alt="home" />
          </Link>
        </li>

        {items.map(({ href, label, isLast }) => (
          <li
            key={href}
            className={classNames(styles.item, {
              [styles.itemCut]: isLast,
            })}
          >
            <img
              src={getAssetPath("img/general/icons/arrow.svg")}
              alt="arrow"
              className={styles.arrow}
            />

            {isLast ? (
              <span className={classNames(styles.whiteLink, "text-small")}>
                {label}
              </span>
            ) : (
              <Link className={classNames(styles.link, "text-small")} to={href}>
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
