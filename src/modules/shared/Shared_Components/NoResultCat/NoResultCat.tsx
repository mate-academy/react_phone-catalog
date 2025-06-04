import { useLocation } from 'react-router-dom';
import { ActiveTab } from '../../Types/types';
import classNames from 'classnames';
import { DarkModeContext } from '../../../../Store/StoreThemeMode';
import { useContext } from 'react';

export const NoResultCat = () => {
  const { isDark } = useContext(DarkModeContext);
  const { pathname } = useLocation();
  const normalizedPathname = pathname.replace('/', '');

  return (
    <div className="no-goods">
      <h2
        className={classNames('title title--h2', {
          'title--is-Dark': isDark,
        })}
      >
        {normalizedPathname === ActiveTab.favorites
          ? 'There are no favourites yet...'
          : `There are no ${normalizedPathname} matching the query...`}
      </h2>

      <div className="no-goods__image" />
    </div>
  );
};
