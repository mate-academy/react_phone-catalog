import { useSearchParams } from 'react-router-dom';
import { Product } from '../../Types/types';

export const usePagination = (sorted: Product[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const perPage = searchParams.get('perPage') ?? '16';
  const start = (page - 1) * Number(perPage);
  const end = start + Number(perPage);
  const total = sorted.length;

  const paginatedItems =
    perPage === 'all' ? sorted : sorted.slice(start, end);

  const onPageChange = (newPage: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (Number(newPage) <= 1) {
      params.delete('page');
    } else {
      params.set('page', newPage.toString());
    }

    setSearchParams(params);
  };

  const onPerPage = (newPerPage: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (newPerPage === '16') {
      params.delete('perPage');
    } else {
      params.set('perPage', newPerPage.toString());
    }

    setSearchParams(params);
  };

  return {
    page,
    perPage,
    paginatedItems,
    total,
    onPageChange,
    onPerPage,
  };
};
