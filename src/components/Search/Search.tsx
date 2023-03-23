import React, {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { debounce } from '../../utils/debounce';

import './Search.scss';

export const Search: FC = () => {
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [isFilled, setIsFilled] = useState(false);
  const [searchParams] = useSearchParams();
  const location = useLocation().pathname.slice(1);
  const navigate = useNavigate();

  const deleteQuery = () => {
    setIsFilled(false);
    searchParams.delete('query');
  };

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const queryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setQuery(value.trim());
    applyQuery(value.trim());
  };

  const removeQuery = () => {
    setQuery('');
    setAppliedQuery('');
    deleteQuery();

    navigate(`?${searchParams.toString()}`);
  };

  useEffect(() => {
    if (appliedQuery) {
      setIsFilled(true);
      searchParams.set('query', appliedQuery.toLowerCase());
    } else {
      deleteQuery();
    }

    navigate(`?${searchParams.toString()}`);
  }, [appliedQuery]);

  useEffect(() => {
    setQuery('');
    deleteQuery();
  }, [location]);

  return (
    <div className="search">
      <input
        type="text"
        value={query}
        className={classNames('search__input', {
          'search__input--filled': isFilled,
        })}
        placeholder={`Search in ${location}...`}
        onChange={queryHandler}
      />

      {isFilled && (
        <div className="search__button">
          <button
            type="button"
            data-cy="searchDelete"
            className="search__button--close"
            onClick={removeQuery}
          >
            x
          </button>
        </div>
      )}
    </div>
  );
};
