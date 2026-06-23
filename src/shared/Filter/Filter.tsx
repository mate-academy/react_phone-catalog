import './Filter.scss';
import { FC, useCallback, useContext, useEffect, useMemo } from 'react';
import { icons } from '../../constants/icons';
import { Icon } from '../Icon';
import { useLocation, useSearchParams } from 'react-router-dom';

import { GlobalContext } from '../../context/GlobalContext';
import { getSearchWith } from '../../utils/getSearchWith';

/*import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

const DebouncedInput = () => {
  const [value, setValue] = useState('');

  const handleInput = useCallback(
    debounce(inputValue => {
      console.log('Debounced value:', inputValue);
    }, 300),
    [],
  );

  const onChange = event => {
    setValue(event.target.value);
    handleInput(event.target.value);
  };

  return <input type="text" value={value} onChange={onChange} />;
};

export default DebouncedInput;
*/

type Param = string | number;
type Params = {
  [key: string]: Param[] | Param | null;
};
export const Filter: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const { theme } = useContext(GlobalContext);

  const location = useLocation();

  const isShowSearch = useMemo(
    () =>
      ['/phones', '/tablets', '/accessories', '/favorites'].includes(
        location.pathname,
      ),
    [location.pathname],
  );

  const clearInput = useCallback(() => {
    //setQuery('');
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      newParams.delete('query');

      return newParams;
    });
  }, [setSearchParams]);

  const setSearchWith = useCallback(
    (params: Params) => {
      //const newParams = new URLSearchParams(searchParams);
      const search = getSearchWith(params, searchParams);

      //params.set("userId", event.target.value);
      setSearchParams(search);
    },
    [searchParams, setSearchParams],
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchWith({ query: event.target.value.trim() || null });
    },
    [setSearchWith],
  );

  useEffect(() => {
    clearInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    isShowSearch && (
      <div className="header__search-wrapper">
        <input
          type="text"
          placeholder="Search product..."
          className="header__search-input"
          value={query}
          onChange={handleInputChange}
        />
        {query ? (
          <div className="header__clear-button" onClick={clearInput}>
            <Icon icon={icons.close[theme]} />
          </div>
        ) : (
          <Icon icon={icons.search[theme]} />
        )}
      </div>
    )
  );
};
