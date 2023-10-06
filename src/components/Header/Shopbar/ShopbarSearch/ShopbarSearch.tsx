import './ShopbarSearch.scss';
import { ChangeEvent, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getSearchWith } from '../../../../helpers/searchHelper';

const ShopbarSearch = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const onClickHandle = () => {
    setSearchParams(
      getSearchWith(searchParams, { query: null }),
    );

    inputRef.current?.focus();
  };

  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: e.target.value || null }),
    );
  };

  return (
    <>
      <input
        ref={inputRef}
        className="shopbar__search"
        type="text"
        value={query}
        onChange={onChangeHandle}
        placeholder="Search in favorites..."
      />
      {query.length
        ? (
          <button
            type="button"
            onClick={onClickHandle}
            data-cy="addToFavorite"
          >
            <img src="./icons/cancel.svg" alt="icon" />
          </button>
        )
        : <img src="./icons/search.svg" alt="icon" />}
    </>
  );
};

export default ShopbarSearch;
