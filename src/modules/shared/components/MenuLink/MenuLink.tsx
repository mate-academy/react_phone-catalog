import classNames from 'classnames';
import styles from './MenuLink.module.scss';
import { MenuLinkSVGOption } from '../../types/enums';
import { NavLink } from 'react-router-dom';
import { getMenuLinkSVG } from '../../functions';
import { QuantityNotification } from '../QuantityNotification';

type Props = {
  to: string;
  alt: string;
  svgOption: MenuLinkSVGOption;
  notificationQuantity?: number;
};

export const MenuLink: React.FC<Props> = ({
  to,
  alt,
  svgOption,
  notificationQuantity,
}) => {
  return (
    <NavLink
      className={({ isActive }) =>
        classNames(styles.MenuLink, isActive && styles.MenuLink_active)
      }
      to={to}
      aria-label={alt}
      aria-current="page"
    >
      {getMenuLinkSVG(svgOption, styles.Icon)}

      {!!notificationQuantity && (
        <QuantityNotification
          quantity={notificationQuantity}
          className={styles.Notification}
        />
      )}
    </NavLink>
  );
};
