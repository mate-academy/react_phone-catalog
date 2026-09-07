import { SetURLSearchParams } from 'react-router-dom';

export const updateParams = (
  setSearchParams: SetURLSearchParams,
  newParams: { page?: number; perPage?: string; sort?: string },
  currentParams: { page: number; perPage: string; sort: string },
) => {
  const { page, perPage, sort } = currentParams;

  const updatedParams: { page?: string; perPage?: string; sort?: string } = {};

  if (newParams.page && newParams.page !== page) {
    updatedParams.page = newParams.page.toString();
  }

  if (newParams.perPage && newParams.perPage !== perPage) {
    updatedParams.perPage = newParams.perPage;
  } else if (!newParams.perPage) {
    updatedParams.perPage = perPage;
  }

  if (newParams.sort && newParams.sort !== sort) {
    updatedParams.sort = newParams.sort;
  } else if (!newParams.sort) {
    updatedParams.sort = sort;
  }

  setSearchParams(updatedParams);
};
