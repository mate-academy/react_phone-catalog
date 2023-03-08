import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelper';

import './SearchInput.scss';

type Props = {
  placeholder: string;
};

export const SearchInput: React.FC<Props> = ({ placeholder }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryValue, setQueryValue] = useState('');

  const applyQuery = useCallback(
    debounce(setSearchParams, 1000),
    [],
  );
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryValue(e.target.value);
    applyQuery(
      getSearchWith(searchParams,
        {
          query: e.target.value.replace(/\s+/g, '')
            .trim().toLocaleLowerCase() || null,
          page: '1',
        }),
    );
  };

  return (
    <input
      type="search"
      placeholder={`Search in ${placeholder}...`}
      onChange={handleChangeInput}
      value={queryValue}
      className="search-input"
    />
  );
};
