import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { MenuLinkSVGOption } from '../../types/enums';
import { HandleBurgerMenuLinkClick } from '../../types/handlers';
import { getMenuLinkSVG } from '../../functions/functions';
import styles from './BurgerMenuMenuLink.module.scss';

type Props = {
  to: string;
  alt: string;
  svgOption: MenuLinkSVGOption;
  onClick: HandleBurgerMenuLinkClick;
  className?: string;
};

export const BurgerMenuMenuLink: React.FC<Props> = ({
  to,
  alt,
  svgOption,
  onClick,
  className,
}) => {
  return (
    <li className={classNames(styles.BurgerMenuMenuLink, className)}>
      <NavLink
        className={({ isActive }) =>
          classNames(styles.Link, isActive && styles.Link_active)
        }
        to={to}
        aria-label={alt}
        aria-current="page"
        onClick={onClick}
      >
        {getMenuLinkSVG(svgOption, styles.Icon)}
      </NavLink>
    </li>
  );
};
