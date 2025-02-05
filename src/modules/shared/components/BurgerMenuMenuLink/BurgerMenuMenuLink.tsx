import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { MenuLinkSVGOption } from '../../types/enums';
import { getMenuLinkSVG } from '../../functions';
import styles from './BurgerMenuMenuLink.module.scss';
import { useBurgerMenu } from '../Contexts/BurgerMenuContext';
import { QuantityNotification } from '../QuantityNotification';

type Props = {
  to: string;
  alt: string;
  svgOption: MenuLinkSVGOption;
  notificationQuantity?: number;
  className?: string;
};

export const BurgerMenuMenuLink: React.FC<Props> = ({
  to,
  alt,
  svgOption,
  notificationQuantity,
  className,
}) => {
  const { isBurgerMenuOpened, handleCloseBurgerMenu } = useBurgerMenu();

  const handleClick = () => {
    handleCloseBurgerMenu();
  };

  return (
    <li className={classNames(styles.BurgerMenuMenuLink, className)}>
      <NavLink
        className={({ isActive }) =>
          classNames(styles.Link, isActive && styles.Link_active)
        }
        to={to}
        aria-label={alt}
        aria-current="page"
        tabIndex={isBurgerMenuOpened ? 0 : -1}
        onClick={handleClick}
      >
        {getMenuLinkSVG(svgOption, styles.Icon)}

        {!!notificationQuantity && (
          <QuantityNotification
            quantity={notificationQuantity}
            className={styles.Notification}
          />
        )}
      </NavLink>
    </li>
  );
};
