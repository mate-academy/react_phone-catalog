import { useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export const Filter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const location = useLocation().pathname.split('/').filter(x => x).join('');

  return (
    <div className="
      control
      has-icons-right
      navbar-item
      navibar__filter
      "
    >
      <input
        className="input is-small navibar__filter-input"
        type="search"
        defaultValue={query}
        placeholder={`search in ${location}`}
        onChange={(event) => {
          searchParams.set('page', '1');
          setSearchParams(getSearchWith(searchParams, {
            query: event.target.value || null,
          }));
        }}
      />
      <i className="fas fa-search" />
    </div>
  );
};
