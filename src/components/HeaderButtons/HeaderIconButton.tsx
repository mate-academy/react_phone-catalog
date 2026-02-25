import React from "react";
import styles from "./HeaderIconButton.module.scss";
import { NavLink, NavLinkRenderProps } from "react-router-dom";
import { routes } from "../../Root";
import classNames from "classnames";

const iconToPath = {
  heart: "/img/general/icons/heart.svg",
  cart: "/img/general/icons/cart.svg",
};

type Props = {
  count: number;
  icon: "heart" | "cart";
  buttonStyles?: React.CSSProperties;
  counterStyles?: React.CSSProperties;
  iconStyles?: React.CSSProperties;
};

export const HeaderIconButton: React.FC<Props> = ({
  count,
  icon,
  buttonStyles,
  counterStyles,
  iconStyles,
}) => {
  const displayCount = count > 99 ? "99+" : count;

  const getClassLink = ({ isActive }: NavLinkRenderProps) =>
    classNames(styles.button, { [styles.underline]: isActive });

  return (
    <NavLink
      style={buttonStyles}
      to={icon === "heart" ? routes.favorites : routes.cart}
      className={getClassLink}
    >
      <img
        className={styles.icon}
        alt={icon}
        src={iconToPath[icon]}
        style={iconStyles}
      />
      {count > 0 && (
        <span className={styles.linkButton} style={counterStyles}>
          {displayCount}
        </span>
      )}
    </NavLink>
  );
};
