import { useNavigate, useLocation } from 'react-router-dom';

import './NoSearchResults.scss';

export const NoSearchResults = () => {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const searchParams = new URLSearchParams(search);

  const resetSearchQuery = () => {
    searchParams.delete('query');

    navigate({
      pathname,
      search: searchParams.toString(),
    });
  };

  const handleClick = () => {
    resetSearchQuery();
  };

  return (
    <div className="NoSearchResults">
      <h1 className="NoSearchResults__title">Oops!</h1>
      <p className="NoSearchResults__paragpraph">
        Seems like we couldn&apos;t find any products matching your search.
      </p>
      <button
        type="button"
        className="NoSearchResults__button"
        onClick={handleClick}
      >
        Reset your search
      </button>
    </div>
  );
};
