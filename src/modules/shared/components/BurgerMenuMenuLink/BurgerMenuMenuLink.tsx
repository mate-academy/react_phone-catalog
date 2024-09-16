import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { MenuLinkSVGOption } from '../../types/enums';
import { getMenuLinkSVG } from '../../functions/functions';
import styles from './BurgerMenuMenuLink.module.scss';
import { useBurgerMenu } from '../Contexts/BurgerMenuContext';

type Props = {
  to: string;
  alt: string;
  svgOption: MenuLinkSVGOption;
  className?: string;
};

export const BurgerMenuMenuLink: React.FC<Props> = ({
  to,
  alt,
  svgOption,
  className,
}) => {
  const { isBurgerMenuOpened, closeBurgerMenu } = useBurgerMenu();

  const handleClick = () => {
    closeBurgerMenu();
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
      </NavLink>
    </li>
  );
};
