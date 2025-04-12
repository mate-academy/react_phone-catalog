import './Catalog.style.scss';

import { useEffect, useMemo } from 'react';

import { Product } from '../../../types/Product';
import { SearchParams } from '../../../types/SearchParams';

import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { useCatalogSearchParams, useProductNumbers } from '../../../utils/customHooks';
import { useAppDispatch } from '../../../app/hooks';

import { sortBySearchParams } from '../../../utils/helpers';

import { Pagination } from '../Pagination/Pagination';
import { ProductList } from '../ProductList/ProductList';
import { Selection } from '../Selection/Selection';

import { resetCrumbs } from '../../../features/CrumbsSlice/CrumbsSlice';

type Props = {
  items: Product[];
  category: 'phones' | 'tablets' | 'accessories';
};

export const Catalog: React.FC<Props> = ({ items, category }) => {
  const dispatch = useAppDispatch();

  const {
    itemsOnPageRaw,
    itemsOnPage,
    sortBy,
    totalPages,
    visiblePages,
    activePageNumber,
    firstVisiblePage,
    lastVisiblePage,
    updateParams,
  } = useCatalogSearchParams(items.length);

  const productNumber = useProductNumbers();

  const sortedItems = useMemo(
    () => sortBySearchParams(items, activePageNumber, sortBy, itemsOnPage),
    [items, activePageNumber, sortBy, itemsOnPage],
  );

  const handleSearchParams = (param: Partial<SearchParams>) => {
    updateParams(param);
  };

  useEffect(() => {
    dispatch(resetCrumbs([category]))
  }, [category])

  return (
    <div className="catalog">
      <Breadcrumbs />

      <div className="catalog__title">
        <h1 className="catalog__title__heading">
          {category === 'phones'
            ? 'Mobile phones'
            : category.slice(0, 1).toUpperCase().concat(category.slice(1))}
        </h1>

        <p className="catalog__title__subtitle">
          {`${productNumber[category]} models`}
        </p>
      </div>

      {items.length > 0 ? (
        <>
          <Selection
            sortBy={sortBy}
            itemsOnPageRaw={itemsOnPageRaw}
            handleSelection={handleSearchParams}
          />

          <ProductList products={sortedItems} />

          {itemsOnPage !== Infinity && (
            <Pagination
              totalPages={totalPages}
              visiblePages={visiblePages}
              activePageNumber={activePageNumber}
              firstVisiblePage={firstVisiblePage}
              lastVisiblePage={lastVisiblePage}
              handlePagination={handleSearchParams}
            />
          )}
        </>
      ) : (
        <p>There are no {category} yet</p>
      )}
    </div>
  );
};
