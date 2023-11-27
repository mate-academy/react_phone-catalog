import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const useSearch = () => {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [perPage, setPerPage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useLocation();

  const handleSearch = (searchString: string) => {
    setQuery(searchString);
    setCurrentPage(1);
  };

  const getParamsFromUrl = () => {
    const sortParametr = searchParams.get('sort');
    const perPageParametr = searchParams.get('perPage');
    const pageParametr = searchParams.get('page');
    const searchQuery = searchParams.get('query');

    if (searchQuery) {
      setQuery(searchQuery);
    }

    if (sortParametr) {
      setSortBy(sortParametr);
    }

    if (perPageParametr) {
      setPerPage(perPageParametr);
    }

    if (pageParametr) {
      setCurrentPage(+pageParametr);
    }
  };

  const setParamsToUrl = () => {
    if (query) {
      searchParams.set('query', query);
      setSearchParams(searchParams);
    } else {
      searchParams.delete('query');
      setSearchParams(searchParams);
    }

    if (sortBy) {
      searchParams.set('sort', sortBy);
    }

    if (perPage) {
      searchParams.set('perPage', perPage);
    }

    if (currentPage > 1) {
      searchParams.set('page', currentPage.toString());
    } else {
      searchParams.delete('page');
    }

    setSearchParams(searchParams);
  };

  const resetSearch = () => {
    setQuery('');
    setCurrentPage(1);
    setSortBy('');
    setPerPage('');
  };

  useEffect(() => {
    getParamsFromUrl();
  }, []);

  useEffect(() => {
    setParamsToUrl();
  }, [query, perPage, sortBy, currentPage]);

  useEffect(() => {
    if (!search) {
      resetSearch();
    }
  }, [search]);

  return {
    handleSearch,
    query,
    setQuery,
    sortBy,
    setSortBy,
    perPage,
    setPerPage,
    currentPage,
    setCurrentPage,
  };
};

export default useSearch;
