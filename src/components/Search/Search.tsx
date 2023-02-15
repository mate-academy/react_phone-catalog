import { useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  query: string | null,
};

export const Search: React.FC<Props> = ({ query }) => {
  const [seachParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  return (
    <label className="navbar__search">
      <input
        value={query || ''}
        className="navbar__input"
        type="text"
        placeholder={`Search in ${location.pathname.slice(1)}...`}
        onChange={(e) => {
          setSearchParams(getSearchWith(seachParams, {
            page: null,
            query: e.target.value || null,
          }));
        }}
      />
      {query
        ? (
          <button
            type="button"
            className="navbar__inputDelete"
            data-cy="searchDelete"
            onClick={() => {
              setSearchParams(getSearchWith(seachParams, {
                page: null,
                query: null,
              }));
            }}
          >
            <img
              src="../../img/cross.svg"
              alt="cross"
              className="icon"
            />
          </button>
        )
        : (
          <img
            src="../../img/search.svg"
            alt="search"
            className="icon"
          />
        )}
    </label>
  );
};
