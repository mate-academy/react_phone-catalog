import {
  useMemo,
  useState,
  ChangeEvent,
} from 'react';
import {
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { debounce } from 'lodash';
import { Icon } from '../Icon';
import { getSearchWith } from '../../utils/searchHelper';
import { IconType } from '../../types/Icon';
import './SearchBar.scss';

export const SearchBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const [inputValue, setInputValue] = useState(query);

  const currentLocation = location.pathname.slice(1);

  useMemo(() => {
    setInputValue(query);
  }, [query]);

  const handleDebounceQuery = debounce(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      navigate({
        search: getSearchWith(
          searchParams,
          { query: value || null },
        ),
      });
    }, 1000,
  );

  const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputValue(value);
    handleDebounceQuery(event);
  };

  return (
    <div
      className="
        top-actions__search
        search-panel"
    >
      <input
        className="search-panel__input"
        type="text"
        placeholder={`Search in ${currentLocation}...`}
        onChange={(event) => handleChangeQuery(event)}
        value={inputValue}
      />

      <Icon
        type={IconType.SEARCH}
        addClassName="search-panel__icon"
      />
    </div>
  );
};
