import { useSearchParams } from 'react-router-dom';

export interface PaginationParams {
  page: number;
  perPage: number | 'all';
}

export const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlPage = searchParams.get('page');
  const urlPerPage = searchParams.get('perPage');

  const page = urlPage ? parseInt(urlPage, 10) : 1;
  const perPage: PaginationParams['perPage'] =
    urlPerPage === 'all' || !urlPerPage ? 'all' : parseInt(urlPerPage, 10);

  const setPagination = (nextParams: Partial<PaginationParams>) => {
    const finalPage = nextParams.page !== undefined ? nextParams.page : page;
    const finalPerPage =
      nextParams.perPage !== undefined ? nextParams.perPage : perPage;

    const newParams = new URLSearchParams(searchParams);

    if (finalPage <= 1) {
      newParams.delete('page');
    } else {
      newParams.set('page', finalPage.toString());
    }

    if (finalPerPage === 'all') {
      newParams.delete('perPage');
    } else {
      newParams.set('perPage', finalPerPage.toString());
    }

    setSearchParams(newParams);
  };

  return {
    page,
    perPage,
    setPagination,
  };
};
