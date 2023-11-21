import classNames from 'classnames';
import './style.scss';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StateContext } from '../Store';

export const Favorites = () => {
  const { pathname } = useLocation();
  const { favoriteItems } = useContext(StateContext);

  return (
    <div className="favorites">
      <Link
        to="favorites"
        className={classNames(
          'favorites__link',
          {
            'favorites__link--active': pathname === '/favorites',
            'favorites__link--contain': !!favoriteItems.length,
          },
        )}
      >
        {!!favoriteItems.length && (
          <div className="favorites__linkValue">
            {favoriteItems.length}
          </div>
        )}
      </Link>
    </div>
  );
};
