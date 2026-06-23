import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useCatalogParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get('sort') || 'age');
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  );

  const [perPage, setPerPage] = useState(searchParams.get('perPage') || 'all');

  useEffect(() => {
    const params = new URLSearchParams();

    if (sort != 'age') {
      params.set('sort', sort);
    }

    if (currentPage != 1) {
      params.set('page', String(currentPage));
    }

    if (perPage !== 'all') {
      params.set('perPage', perPage);
    }

    setSearchParams(params);
  }, [sort, currentPage, perPage, setSearchParams]);

  return {
    sort,
    setSort,
    currentPage,
    setCurrentPage,
    perPage,
    setPerPage,
  };
};
