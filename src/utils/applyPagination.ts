import { AccessoriesModel, PhoneModel, TabletModel } from '../types/model';

export const applyPagination = (
  data: PhoneModel[] | AccessoriesModel[] | TabletModel[],
  page: string | number,
  quantity: string,
  setSearchParams: (params: URLSearchParams) => void,
  searchParams: URLSearchParams,
) => {
  if (quantity === 'all') {
    const params = new URLSearchParams(searchParams);

    if (params.has('page')) {
      params.delete('page');
      setSearchParams(params);
    }

    return data;
  }

  const itemsPerPage = Number(quantity);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  let currentPage = Number(page) || 1;

  if (currentPage > totalPages && totalPages > 0) {
    currentPage = totalPages;
    const params = new URLSearchParams(searchParams);

    params.set('page', String(currentPage));
    setSearchParams(params);
  } else if (currentPage <= 0) {
    // Коригування, якщо сторінка < 1
    currentPage = 1;
    const params = new URLSearchParams(searchParams);

    params.set('page', String(currentPage));
    setSearchParams(params);
  }

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  // Обрізаємо масив
  return data.slice(Math.max(0, firstItemIndex), lastItemIndex);
};
