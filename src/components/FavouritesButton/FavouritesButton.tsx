import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const FavouritesButton: React.FC = () => {
  return (
    <NavLink
      to="/favourites"
      className={({ isActive }) => classNames(
        'header__icon-link',
        { 'header__icon-link--active': isActive },
      )}
    >
      <img
        src="img/icons/like.svg"
        alt="like"
      />
    </NavLink>
  );
};
