import React from "react";
import styles from "./HeaderIconButton.module.scss";
import { NavLink, NavLinkRenderProps } from "react-router-dom";
import { routes } from "../../Root";
import classNames from "classnames";
import { AppSettingsContext } from "../../providers/AppSettingsProvider";
import { getAssetPath } from "../../utils";

const iconToPath = {
  heart: getAssetPath("img/general/icons/heart.svg"),
  cart: getAssetPath("img/general/icons/cart.svg"),
};

type Props = {
  count: number;
  icon: "heart" | "cart";
  buttonClassName?: string;
  buttonStyles?: React.CSSProperties;
  counterStyles?: React.CSSProperties;
  iconStyles?: React.CSSProperties;
  onClick?: () => void;
};

export const HeaderIconButton: React.FC<Props> = ({
  count,
  icon,
  buttonClassName,
  buttonStyles,
  counterStyles,
  iconStyles,
  onClick,
}) => {
  const { theme } = React.useContext(AppSettingsContext);
  const displayCount = count > 99 ? "99+" : count;

  const getClassLink = ({ isActive }: NavLinkRenderProps) =>
    classNames(styles.button, buttonClassName, {
      [styles.underline]: isActive,
    });

  return (
    <NavLink
      style={buttonStyles}
      to={icon === "heart" ? routes.favorites : routes.cart}
      className={getClassLink}
      onClick={onClick}
    >
      <img
        className={classNames(styles.icon, {
          [styles.iconLight]: theme === "light",
        })}
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
