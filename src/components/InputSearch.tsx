import { useCallback, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductContext } from 'src/contexts/ProductContext';
import { hasMatches } from 'src/utils/helpers/hasMatches';
import { getSearchWith } from 'src/utils/helpers/searchHelper';
import { debounce } from 'ts-debounce';
import { ClearIcon } from './Icons/ClearIcon';
import { SearchIcon } from './Icons/SearchIcon';

export const InputSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const {
    setVisibleProducts,
    currentProducts,
    visibleProducts,
  } = useContext(ProductContext);
  const {
    isProductsFetched,
    setIsProductsFetched,
  } = useContext(ProductContext);

  useEffect(() => {
    if (visibleProducts.length > 0) {
      setIsProductsFetched(true);
    }
  }, [visibleProducts]);

  const updateDebounce = useCallback(
    debounce((val: string) => {
      const filteredProducts = currentProducts
        .filter((el) => {
          return hasMatches(el.name, val);
        });

      setVisibleProducts(filteredProducts);
    }, 500), [visibleProducts],
  );

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: event.target.value || null,
      }),
    );
  };

  useEffect(() => {
    if (query) {
      updateDebounce(query);
    }
  }, [isProductsFetched, query]);

  const handleOnClear = () => {
    setVisibleProducts(currentProducts);
    setSearchParams(
      getSearchWith(searchParams, { query: null, page: '1' }),
    );
  };

  return (
    <div className="header__search-control">
      <input
        className="header__search"
        type="text"
        placeholder="Search favourites..."
        maxLength={40}
        value={query}
        onChange={handleOnChange}
      />
      {!query.length
        ? (
          <i className="header__search__icon">
            <SearchIcon />
          </i>
        )
        : (
          <button
            type="button"
            className="header__search__icon header__clear-icon"
            onClick={handleOnClear}
          >
            <ClearIcon />
          </button>
        )}
    </div>
  );
};
