import {
  ChangeEvent,
  FC,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../Button/Button';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearSearchQuery,
  setAppliedSearchQuery,
  setIsSearchLoading,
  setSearchQuery,
} from '../../features/searchSlice';
import { getSearchWith } from '../../helpers/searchHelper';

import './Search.scss';

type Props = {
  currentPage: string;
  isSearchButtonClicked: boolean;
  onSearchButtonClicked: (isSearchButtonClicked: boolean) => void;
  isSearchBoxExpanded: boolean;
};

export const Search: FC<Props> = ({
  currentPage,
  isSearchButtonClicked,
  onSearchButtonClicked,
  isSearchBoxExpanded,
}) => {
  const dispatch = useAppDispatch();
  const {
    searchQuery,
  } = useAppSelector(store => store.search);
  const [searchParams, setSearchParams] = useSearchParams();
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onSearchButtonClicked(true);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSearchButtonClicked) {
        onSearchButtonClicked(true);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isSearchButtonClicked]);

  useEffect(() => {
    setSearchParams(
      getSearchWith(searchParams, { query: searchQuery || null }),
    );

    if (searchQuery) {
      dispatch(setIsSearchLoading(true));

      const loadingTimeout = setTimeout(() => {
        dispatch(setIsSearchLoading(false));
      }, 499);

      return () => {
        setSearchParams(
          getSearchWith(searchParams, { query: null }),
        );
        clearTimeout(loadingTimeout);
      };
    }

    dispatch(setIsSearchLoading(false));

    return undefined;
  }, [searchQuery, searchParams]);

  useEffect(() => {
    return () => {
      dispatch(clearSearchQuery());
    };
  }, []);

  const debounceDelay = 500;

  const shouldShowDeleteButton
    = searchQuery && (!isSearchButtonClicked || isSearchBoxExpanded);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isSearchBoxExpanded) {
      onSearchButtonClicked(!isSearchButtonClicked);
    }
  };

  const applySearchQuery = useMemo(
    () => debounce(
      (query) => dispatch(setAppliedSearchQuery(query)),
      debounceDelay,
    ),
    [],
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
    applySearchQuery(event.target.value);
  };

  return (
    <form
      className="search header__top-actions--search"
      ref={formRef}
      onSubmit={handleFormSubmit}
    >
      <input
        type="text"
        value={searchQuery}
        className={classNames(
          'search__input',
          {
            'search__input--hidden':
              isSearchButtonClicked && !isSearchBoxExpanded,
          },
        )}
        placeholder={`Search in ${currentPage}...`}
        onChange={handleInputChange}
      />

      {shouldShowDeleteButton ? (
        <Button
          dataCy="searchDelete"
          className="remove"
          iconType="remove"
          onClick={() => dispatch(clearSearchQuery())}
        />
      ) : (
        <Button
          className="search"
          iconType="search"
          onClick={() => onSearchButtonClicked(!isSearchButtonClicked)}
        />
      )}
    </form>
  );
};
