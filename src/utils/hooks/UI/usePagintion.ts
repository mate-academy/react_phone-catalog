import { useState } from 'react';

export const usePagination = (initialPerPage: number) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(initialPerPage);

  return { page, perPage, setPage, setPerPage };
};
