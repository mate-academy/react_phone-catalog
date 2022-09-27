import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import debounce from 'lodash/debounce';

import './SearchPanel.scss';

export const SearchPanel: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [searchPlaceholder, setSearchPlaceholder] = useState<string>('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('search') || '';
  const history = useNavigate();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
      case '/cart':
        setSearchPlaceholder('');
        setText(search);
        break;
      case '/phones':
        setSearchPlaceholder('phones');
        setText(search);
        break;
      case '/tablets':
        setSearchPlaceholder('tablets');
        setText(search);
        break;
      case '/accessories':
        setSearchPlaceholder('accessories');
        setText('');
        break;
      case '/favorites':
        setSearchPlaceholder('favorites');
        setText(search);
        break;
      default:
        break;
    }
  }, [location.pathname]);

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        searchParams.set('search', newQuery);
      } else {
        searchParams.delete('search');
      }

      history(`?${searchParams.toString()}`);
    }, 500),
    [],
  );

  const handleChange = (
    event: { target: { value: string }; },
  ) => {
    setText(event.target.value);
    applyQuery(event.target.value);
  };

  return (
    <div className="SearchPanel">
      <input
        className="SearchPanel__input"
        type="text"
        value={text}
        placeholder={`Search in ${searchPlaceholder}...`}
        onChange={handleChange}
      />
      {text && (
        <button
          type="button"
          className="SearchPanel__btn"
          onClick={() => {
            setText('');
            applyQuery('');
          }}
        >
          <i className="icon-Close" />
        </button>
      )}
    </div>
  );
};
