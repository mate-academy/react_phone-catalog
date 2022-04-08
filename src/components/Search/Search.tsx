import {
  ChangeEventHandler,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import debounce from 'lodash/debounce';

// Styles
import './Search.scss';

// Components
import { Button } from '../Button';

export const Search: FunctionComponent = () => {
  const [query, setQuery] = useState('');
  const [isFilled, setIsFilled] = useState(false);
  const [searchParams] = useSearchParams();
  const location = useLocation().pathname.slice(1);
  const navigate = useNavigate();

  const deleteQuery = () => {
    setIsFilled(false);
    searchParams.delete('query');
  };

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        setIsFilled(true);
        searchParams.set('query', newQuery.toLowerCase());
      } else {
        deleteQuery();
      }

      navigate(`?${searchParams.toString()}`);
    }, 500),
    [location],
  );

  const queryHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;

    setQuery(value.trimLeft());
    applyQuery(value.trimLeft());
  };

  const remuveQuery = () => {
    setQuery('');
    deleteQuery();

    navigate(`?${searchParams.toString()}`);
  };

  useEffect(() => {
    setQuery('');
    deleteQuery();
  }, [location]);

  return (
    <div className="Search">
      <input
        type="text"
        value={query}
        className={classNames('Search__input', {
          'Search__input--filled': isFilled,
        })}
        placeholder={`Search in ${location}...`}
        onChange={queryHandler}
      />

      {isFilled && (
        <div className="Search__button">
          <Button
            disablet={false}
            classModificator="Button--close"
            callback={remuveQuery}
          />
        </div>
      )}
    </div>
  );
};
