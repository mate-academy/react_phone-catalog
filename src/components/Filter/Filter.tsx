import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export const Filter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

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
        placeholder="Search in phones..."
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
