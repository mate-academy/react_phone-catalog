import { useCatalogPage } from '../../shared/hooks/useCatalogPage';

export const usePhonesPage = () => {
  const {
    items,
    visibleItems,
    isLoading,
    sort,
    perPage,
    page,
    totalPages,
    paginationItems,
    handleSortChange,
    handlePerPageChange,
    handlePageChange,
  } = useCatalogPage('api/phones.json');

  return {
    phones: items,
    visiblePhones: visibleItems,
    isLoading,
    sort,
    perPage,
    page,
    totalPages,
    paginationItems,
    handleSortChange,
    handlePerPageChange,
    handlePageChange,
  };
};
