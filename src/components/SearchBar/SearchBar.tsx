import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { SearchItem } from '../SearchItem';
import { GlobalContext } from '../../context/GlobalContext';
import './SearchBar.scss';

type Props = {
  isSearchBarOpen: boolean;
  onSearchBarOpen: (value: boolean) => void;
};

export const SearchBar: React.FC<Props> = ({
  isSearchBarOpen,
  onSearchBarOpen,
}) => {
  const [query, setQuery] = useState('');
  const { allProducts } = useContext(GlobalContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const normQuery = useMemo(() => {
    return query.trim().toLocaleLowerCase();
  }, [query]);

  useEffect(() => {
    if (!isSearchBarOpen) {
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onSearchBarOpen(false);
        inputRef.current?.blur();
      }
    };

    const onClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        onSearchBarOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isSearchBarOpen, onSearchBarOpen]);

  useEffect(() => {
    if (isSearchBarOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchBarOpen]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const queryKeys = useMemo(() => {
    return normQuery.split(' ');
  }, [normQuery]);

  const filteredProducts = useMemo(() => {
    return [...allProducts]
      .filter(p => queryKeys.every(key => p.itemId.includes(key)))
      .sort((a, b) => b.year - a.year);
  }, [allProducts, queryKeys]);

  return (
    <div className="search" ref={searchRef}>
      <div className="search__content search__content--active">
        <div className="search__bar">
          <input
            className="search__input"
            id="search-input"
            type="text"
            ref={inputRef}
            value={query}
            autoComplete="off"
            placeholder="Search"
            onChange={handleQueryChange}
          />
          {query && (
            <div
              className="search__clear"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
            />
          )}
        </div>
        
        {query && (
          <div className="search__results-list">
            {filteredProducts.map(product => (
              <div key={product.id} className="search__result">
                <SearchItem
                  product={product}
                  queryKeys={queryKeys}
                  onSearchBarOpen={onSearchBarOpen}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
