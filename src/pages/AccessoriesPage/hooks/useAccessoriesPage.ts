import { useCatalogPage } from '../../shared/hooks/useCatalogPage';

export const useAccessoriesPage = () => {
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
  } = useCatalogPage('api/accessories.json');

  return {
    accessories: items,
    visibleAccessories: visibleItems,
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
