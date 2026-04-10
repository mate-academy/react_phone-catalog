import styles from './Icon.module.scss';
import classNames from 'classnames';
import { useTheme } from '../../hooks/useTheme';
import { IconName } from '../../types/IconType';

import bag from '../../assets/image/icon/bag.svg';
import bagDark from '../../assets/image/icon/bagDark.svg';
import favorite from '../../assets/image/icon/favorite.svg';
import favoriteDark from '../../assets/image/icon/favoriteDark.svg';
import burger from '../../assets/image/icon/burger.svg';
import burgerDark from '../../assets/image/icon/burgerDark.svg';
import close from '../../assets/image/icon/close.svg';
import closeDark from '../../assets/image/icon/closeDark.svg';
import moon from '../../assets/image/icon/moon-regular.svg';
import sun from '../../assets/image/icon/sun.svg';
import logo from '../../assets/image/logo.png';
import logoDark from '../../assets/image/logoDark.png';
import leftLight from '../../assets/image/icon/leftLight.svg';
import leftDark from '../../assets/image/icon/leftDark.svg';
import rightLight from '../../assets/image/icon/rightLight.svg';
import rightDark from '../../assets/image/icon/rightDark.svg';
import favoriteActive from '../../assets/image/icon/favorite-active.svg';
import upLight from '../../assets/image/icon/arrowUp.svg';
import upDark from '../../assets/image/icon/arrowUpDark.svg';
import closeCart from '../../assets/image/icon/closeCart.svg';
import home from '../../assets/image/icon/home.svg';
import homeDark from '../../assets/image/icon/homeDark.svg';

interface IconProps {
  name: IconName;
  className?: string;
  onClick?: () => void;
}
export const Icon: React.FC<IconProps> = ({ name, className, onClick }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const iconMap: Record<IconName, string> = {
    cart: isDark ? bagDark : bag,
    favourite: isDark ? favoriteDark : favorite,
    menu: isDark ? burgerDark : burger,
    close: isDark ? closeDark : close,
    theme: isDark ? moon : sun,
    logo: isDark ? logoDark : logo,
    right: isDark ? rightDark : rightLight,
    left: isDark ? leftDark : leftLight,
    favoriteActive: favoriteActive,
    up: isDark ? upDark : upLight,
    closeCart: isDark ? closeCart : closeCart,
    home: isDark ? homeDark : home,
  };

  return (
    <span
      className={classNames(styles.iconContainer, className)}
      onClick={onClick}
    >
      <img
        src={iconMap[name]}
        alt={`${name} icon`}
        className={styles.iconImage}
      />
    </span>
  );
};
