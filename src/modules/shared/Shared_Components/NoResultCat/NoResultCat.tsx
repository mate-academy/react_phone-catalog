import { useLocation } from 'react-router-dom';
import { ActiveTab } from '../../Types/types';

export const NoResultCat = () => {
  const { pathname } = useLocation();
  const normalizedPathname = pathname.replace('/', '');

  return (
    <div className="no-goods">
      <h2 className="title title--h2">
        {normalizedPathname === ActiveTab.favorites
          ? 'There are no favourites yet...'
          : `There are no ${normalizedPathname} matching the query...`}
      </h2>

      <div className="no-goods__image" />
    </div>
  );
};
