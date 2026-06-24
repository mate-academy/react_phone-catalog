import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import pageNavigation from './PageNavigation.module.scss';
import { AppRoutes } from '../Router';

type Props = {
  isBurgerMenu?: boolean;
  onToggle?: () => void;
};

const getLinkClass = (isActive: boolean, isBurgerMenu: boolean) =>
  classNames('font-uppercase', pageNavigation.navigationLink, {
    [pageNavigation.navigationLinkActive]: isActive,
    [pageNavigation.navigationLinkActiveBurger]: isActive && isBurgerMenu,
  });

export const PageNavigation = ({
  isBurgerMenu = false,
  onToggle = () => {},
}: Props) => (
  <>
    <nav
      className={classNames({
        [pageNavigation.navigation]: !isBurgerMenu,
        [pageNavigation.navigationVertical]: isBurgerMenu,
      })}
    >
      <li>
        <NavLink
          to={AppRoutes.HOME}
          className={props => getLinkClass(props.isActive, isBurgerMenu)}
          onClick={onToggle}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={AppRoutes.PHONES}
          className={props => getLinkClass(props.isActive, isBurgerMenu)}
          onClick={onToggle}
        >
          Phones
        </NavLink>
      </li>
      <li>
        <NavLink
          to={AppRoutes.TABLETS}
          className={props => getLinkClass(props.isActive, isBurgerMenu)}
          onClick={onToggle}
        >
          Tablets
        </NavLink>
      </li>
      <li>
        <NavLink
          to={AppRoutes.ACCESSORIES}
          className={props => getLinkClass(props.isActive, isBurgerMenu)}
          onClick={onToggle}
        >
          Accessories
        </NavLink>
      </li>
    </nav>
  </>
);
