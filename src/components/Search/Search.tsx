import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import searcIcon from '../../images/Icons/Search.svg';
import closeIcon from '../../images/Icons/Close_black.svg';
import { getSearchWith } from '../../helpers/searchHelper';

const allProducts = [
  { id: 1, name: 'Apple iPhone 8 64GB Gold' },
  { id: 2, name: 'Apple iPhone 11 Pro 64GB Gold' },
  { id: 3, name: 'Apple iPhone XS 64GB Gold' },
];

const Search = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = location;

  const searchField = pathname.slice(1);

  const query = searchParams.get('query') || '';
  const [, setDisplayedProducts] = useState(allProducts);

  const onQueryChange = (event: { target: { value: string; }; }) => {
    const inputQuery = event.target.value.toLowerCase();
    const inputWords = inputQuery.split(' ');

    const filteredProducts = allProducts.filter((product) => {
      const productName = product.name.toLowerCase();

      return inputWords.every((word: string) => productName.includes(word));
    });

    setDisplayedProducts(filteredProducts);

    setSearchParams(getSearchWith(searchParams, { query: inputQuery || null }));
  };

  const handleClearSearch = () => {
    setDisplayedProducts(allProducts);
    setSearchParams('');
  };

  return (
    <div className="search">
      <label className="search__label">
        <input
          placeholder={`Search in ${searchField}...`}
          type="text"
          className="search__input"
          value={query}
          onChange={onQueryChange}
        />
      </label>

      <button
        type="button"
        className="search__button"
        onClick={handleClearSearch}
        data-cy="searchDelete"
      >
        {query ? (
          <img src={closeIcon} alt="Close" />
        ) : (
          <img src={searcIcon} alt="Search" />
        )}
      </button>
    </div>
  );
};

export default Search;
