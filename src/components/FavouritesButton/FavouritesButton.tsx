import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useAppSelector } from '../../helpers/hooks';

export const FavouritesButton: React.FC = () => {
  const favorites = useAppSelector(state => state.favorites);

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

      {!!favorites.length && (
        <span className="header__count">{favorites.length}</span>
      )}
    </NavLink>
  );
};
