import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../../store/store';
import { Icon } from '../../atoms/Icon/Icon';
import { ICONS } from '../../../constants/icons';
import { Search } from 'lucide-react';
import cn from 'classnames';

const normalizeSearchText = (value: string) => {
  const normalizedValue = value.trim().toLowerCase();
  const applePrefix = 'apple ';

  return normalizedValue.startsWith(applePrefix) ?
      normalizedValue.slice(applePrefix.length)
    : normalizedValue;
};

export const SearchBar = () => {
  const phones = useAppState((state) => state.phones);
  const tablets = useAppState((state) => state.tablets);
  const accessories = useAppState((state) => state.accessories);

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [panelLeft, setPanelLeft] = useState(0);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchRootRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const products = [...phones, ...tablets, ...accessories];

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    if (!isOpen && !isResultsOpen) {
      return;
    }

    const closeSearch = () => {
      setIsOpen(false);
      setIsResultsOpen(false);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !searchRootRef.current?.contains(event.target)
      ) {
        closeSearch();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSearch();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isResultsOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const updatePanelPosition = () => {
      setPanelLeft(searchButtonRef.current?.getBoundingClientRect().left ?? 0);
    };

    window.addEventListener('resize', updatePanelPosition);
    return () => window.removeEventListener('resize', updatePanelPosition);
  }, [isOpen]);

  useEffect(() => {
    const breakpoint = window.matchMedia('(min-width: 768px)');
    const resetSearch = () => {
      setIsOpen(false);
      setIsResultsOpen(false);
      setPanelLeft(0);
    };

    breakpoint.addEventListener('change', resetSearch);
    return () => breakpoint.removeEventListener('change', resetSearch);
  }, []);

  const normalizedQuery = normalizeSearchText(debouncedQuery);
  const isQuerySettled = query === debouncedQuery;
  const matches =
    normalizedQuery ?
      products
        .filter((product) =>
          normalizeSearchText(product.name).includes(normalizedQuery),
        )
        .slice(0, 5)
    : [];

  const toggleSearch = () => {
    if (isOpen) {
      setIsOpen(false);
      setIsResultsOpen(false);
      return;
    }

    setPanelLeft(searchButtonRef.current?.getBoundingClientRect().left ?? 0);
    setIsOpen(true);
    setIsResultsOpen(Boolean(normalizedQuery));
  };

  return (
    <div
      ref={searchRootRef}
      className="relative ml-auto h-full w-12 shrink-0 em:ml-auto em:mr-2 em:flex em:w-auto em:min-w-0 em:max-w-50 em:flex-1 em:items-center"
    >
      <button
        ref={searchButtonRef}
        type="button"
        aria-label={isOpen ? 'Close search' : 'Open search'}
        aria-expanded={isOpen}
        onClick={toggleSearch}
        className={cn(
          'flex h-full w-12 items-center justify-center border-l border-elements em:hidden',
          { 'hover-zoom-small': isOpen },
        )}
      >
        <Icon src={isOpen ? ICONS.CLOSE : ICONS.SEARCH} />
      </button>

      <div
        className={cn(
          isOpen ? 'block' : 'hidden',
          'fixed top-14 z-50 em:static em:flex em:h-full em:w-full em:items-center',
        )}
        style={isOpen ? { left: panelLeft, right: 0 } : undefined}
      >
        <div className="relative em:-translate-y-1">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex translate-y-1 items-center text-primary dark:text-white">
            <Search
              size={16}
              strokeWidth={2}
            />
          </span>

          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQuery('');
                searchInputRef.current?.focus();
              }}
              className="absolute right-2 top-1/2 mt-0.5 -translate-y-1/2 hover-zoom-small"
            >
              <Icon src={ICONS.CLOSE} />
            </button>
          )}
          <input
            ref={searchInputRef}
            type="text"
            inputMode="search"
            value={query}
            placeholder="Search"
            aria-label="Search"
            className="h-8 w-full min-w-0 rounded-sm border border-elements bg-white pl-8 pr-8 text-sm text-black placeholder:text-secondary dark:bg-primary dark:text-white dark:placeholder:text-secondary"
            onChange={(event) => {
              setQuery(event.target.value);
              setIsResultsOpen(true);
            }}
            onFocus={() => setIsResultsOpen(true)}
          />

          {normalizedQuery && isResultsOpen && isQuerySettled && (
            <div className="absolute left-0 top-full z-10 mt-1 max-h-60 w-full overflow-y-auto border border-elements bg-white dark:bg-primary">
              {matches.map((product) => (
                <Link
                  key={`${product.category}-${product.id}`}
                  to={`/${product.category}/${product.id}`}
                  onClick={() => {
                    setQuery('');
                    setIsOpen(false);
                    setIsResultsOpen(false);
                  }}
                  className="block px-3 py-2 text-sm text-black hover:bg-elements dark:text-white dark:hover:bg-surface-2-dark"
                >
                  {product.name.replace(/^Apple\s+/i, '')}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
