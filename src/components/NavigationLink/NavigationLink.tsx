import classNames from 'classnames';
import pageNavigation from '../PageNavigation/PageNavigation.module.scss';
import { IconFavorite } from '../../shared/IconFavorite/IconFavorite';
import { NavLink } from 'react-router-dom';
import { NavigationLinks, type NavigationLinkType } from './NavigationLinks';
import { IconShoppingCart } from '../../shared/IconShoppingCart';
import { AppRoutes } from '../Router';
import {
  useFavoritesStateValue,
  useShoppingCartStateValue,
} from '../../context';

type Props = {
  navigationType: NavigationLinkType;
  handleClick?: () => void;
};

const defineComponentByType = (
  type: NavigationLinkType,
  favoritesCount: number,
  shoppingCartCount: number,
) => {
  switch (type) {
    case NavigationLinks.Favorite:
      return (
        <span className={pageNavigation.buttonActionIcon}>
          <IconFavorite />
          {favoritesCount > 0 && (
            <span className={pageNavigation.buttonActionCount}>
              {favoritesCount}
            </span>
          )}
        </span>
      );

    case NavigationLinks.Cart:
      return (
        <span className={pageNavigation.buttonActionIcon}>
          <IconShoppingCart />
          {shoppingCartCount > 0 && (
            <span className={pageNavigation.buttonActionCount}>
              {shoppingCartCount}
            </span>
          )}
        </span>
      );
  }

  return null;
};

const getSource = (type: NavigationLinkType) => {
  switch (type) {
    case NavigationLinks.Favorite:
      return AppRoutes.FAVORITE;

    case NavigationLinks.Cart:
      return AppRoutes.CART;
  }

  return AppRoutes.HOME;
};

export const NavigationLink = ({
  navigationType,
  handleClick = () => {},
}: Props) => {
  const favoritesCount = useFavoritesStateValue().products.length;
  const shoppingCartCount = useShoppingCartStateValue().items.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0,
  );

  const component = defineComponentByType(
    navigationType,
    favoritesCount,
    shoppingCartCount,
  );
  const path = getSource(navigationType);

  return (
    <NavLink
      to={path}
      onClick={handleClick}
      className={({ isActive }) =>
        classNames(pageNavigation.buttonAction, {
          [pageNavigation.buttonActionActive]: isActive,
        })
      }
    >
      {component}
    </NavLink>
  );
};
