import { useCatalogPage } from '../../shared/hooks/useCatalogPage';

export const useTabletsPage = () => {
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
  } = useCatalogPage('/api/tablets.json');

  return {
    tablets: items,
    visibleTablets: visibleItems,
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
