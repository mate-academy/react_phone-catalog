import { Pagination } from '../../shared/ui/Pagination';
import { TopPageBlock } from '../../components/TopPageBlock';
import { ProductList } from '../../components/ProductsList';
import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../../store/ProductContext';
import { usePaginate } from '../../store/PaginationContext';
import { SkeletonList } from '../../shared/ui/Skeletons/SkeletonList';

export const TabletsPage = React.memo(() => {
  const { loadProducts, isDataReady, loading, products } =
    useContext(ProductContext);
  const paginate = usePaginate();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div>
      <TopPageBlock title="Tablets" />
      {loading && <SkeletonList count={products.length || 12} />}

      {!loading && isDataReady && products && (
        <ProductList products={paginate.paginatedItems} />
      )}
      {paginate.itemsPerPage?.value !== 'all' && <Pagination />}
    </div>
  );
});

TabletsPage.displayName = 'TabletsPage';
