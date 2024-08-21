import classNames from 'classnames';
import styles from './MenuLink.module.scss';
import { Device, MenuLinkSVGOption } from '../../types/types';
import { NavLink } from 'react-router-dom';
import { SettingsSVG } from '../SVGs/SettingsSVG';
import { HeartSVG } from '../SVGs/HeartSVG';
import { BagSVG } from '../SVGs/BagSVG';
import { BurgerSVG } from '../SVGs/BurgerSVG';

type Props = {
  to: string;
  alt: string;
  device: Device;
  svgOption: MenuLinkSVGOption;
};

export const MenuLink: React.FC<Props> = ({ to, alt, device, svgOption }) => {
  let icon: React.JSX.Element;

  switch (svgOption) {
    case MenuLinkSVGOption.Settings:
      icon = <SettingsSVG className={styles.Icon} />;
      break;
    case MenuLinkSVGOption.Heart:
      icon = <HeartSVG className={styles.Icon} />;
      break;
    case MenuLinkSVGOption.Bag:
      icon = <BagSVG className={styles.Icon} />;
      break;
    case MenuLinkSVGOption.Burger:
      icon = <BurgerSVG className={styles.Icon} />;
      break;
    default:
      throw new Error('Menu link SVG option is not valid!!!');
  }

  return (
    <NavLink
      className={({ isActive }) =>
        classNames(
          styles.MenuLink,
          styles[`MenuLink_device_${device}`],
          isActive && styles.MenuLink_active,
        )
      }
      to={to}
      aria-label={alt}
      aria-current="page"
    >
      {icon}
    </NavLink>
  );
};
