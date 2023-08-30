import { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from '../Icon/Icon';
import { useAppSelector } from '../../app/hooks';
import { Counter } from '../Counter/Counter';
import { PhoneCatalogContext } from '../../context/PhoneCatalogContext';

export const Favorites: FC = () => {
  const { isMobile, setIsMenuClicked } = useContext(PhoneCatalogContext);
  const { favorites } = useAppSelector(store => store.favorites);

  const navLinkClassName = !isMobile
    ? ({ isActive }: { isActive: boolean }) => classNames(
      'header__top-actions header__top-actions--favorites', {
        'header__top-actions--active': isActive,
      },
    )
    : 'menu-mobile__icon';

  const handleClick = () => {
    if (setIsMenuClicked) {
      setIsMenuClicked(false);
    }
  };

  return (
    <NavLink
      to="/favorites"
      className={navLinkClassName}
      onClick={handleClick}
    >
      <Icon type="favorites" />
      <Counter quantity={favorites.length} />
    </NavLink>
  );
};
