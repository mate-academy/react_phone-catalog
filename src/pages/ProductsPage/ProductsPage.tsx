import React, { memo, useCallback, useMemo } from 'react';
import ProductsList from '../../components/common/ProductsList';
import './ProductsPage.scss';
import { useAppParams } from '../../enhancers/hooks/appParams';
import ErrorMessage from '../../components/common/ErrorMessage';
import { capitalize } from '../../utils/stringHelper';
import { useRequest } from '../../enhancers/hooks/request';
import { getProductsAmount, getProducts } from '../../api/products';
import Dropdown from '../../components/UI/Dropdown';
import Paginator from '../../components/UI/Paginator';
import { PerPageOption, usePagination } from '../../enhancers/hooks/pagination';
import { DropdownOption } from '../../components/UI/Dropdown/Dropdown';
import Placeholder from '../../components/UI/Placeholder';

export const ProductsPage: React.FC = memo(() => {
  const { category } = useAppParams();
  const [productsAmount, amountLoading, amountError] = useRequest(
    () => getProductsAmount(category), [category]
  );

  const perPageOptions: PerPageOption[] = useMemo(() => [4, 8, 16, 'All'], []);

  const amountHandled = amountLoading ? 0 : (productsAmount ?? 0);

  const [page, setPage, perPage, setPerPage] = usePagination({
    perPageOptions,
    itemsAmount: amountHandled,
    defaultIndex: 2,
  });

  const [products, loading, error] = useRequest(() => {
    return getProducts(category, { page, perPage })
  }, [category, page, perPage]);

  if (error || amountError) {
    return <ErrorMessage message={error || amountError} />;
  }

  const perPageIsAll = perPage === 'All';
  const someProducts = amountHandled > 0;
  const showPaginator = !perPageIsAll && someProducts;

  const changePerPage = useCallback((option: DropdownOption) => (
    option === 'All' ? setPerPage('All') : setPerPage(+option)
  ), []);

  return (
    <div className="products-page">
      <h2 className='products-page__title'>{capitalize(category)}</h2>

      {amountLoading && <Placeholder width='40px' height='20px' className='products-page__amount'/>}
      {!amountLoading && (
        <p className='products-page__amount'>
          <data value={amountHandled}>
            {amountHandled}
          </data> models
        </p>
      )}

      {amountLoading && <Placeholder height='40px' width='400px' className='products-page__controls'/>}
      {!amountLoading && someProducts && (
        <div className='products-page__controls'>
          <Dropdown
            options={perPageOptions}
            selectedOption={perPage}
            name='Items on page'
            onChange={changePerPage}
          />
        </div>
      )}

      <ProductsList
        products={products}
        placeholdersAmount={perPageIsAll ? 16 : perPage}
        loading={loading}
      />

      {showPaginator && (
        <Paginator
          className='products-page__paginator'
          itemsPerPage={perPage}
          itemsAmount={productsAmount || 5}
          currentPage={page}
          onChange={setPage}
        />
      )}
    </div>
  );
});
