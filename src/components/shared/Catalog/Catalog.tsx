import './Catalog.style.scss';

import { Product } from '../../../types/Product';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { useAppSelector } from '../../../app/hooks';
import { useMemo } from 'react';
import { SearchParams } from '../../../types/SearchParams';
import { useCatalogSearchParams } from '../../../utils/customHooks';
import { sortBySearchParams } from '../../../utils/helpers';
import { Pagination } from '../Pagination/Pagination';
import { ProductList } from '../ProductList/ProductList';
import { Selection } from '../Selection/Selection';

type Props = {
  items: Product[];
  category: 'phones' | 'tablets' | 'accessories';
};

export const Catalog: React.FC<Props> = ({ items, category }) => {
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

  const sortedItems = useMemo(
    () => sortBySearchParams(items, activePageNumber, sortBy, itemsOnPage),
    [items, activePageNumber, sortBy, itemsOnPage],
  );

  const productNumber = {
    phones: useAppSelector(state => state.phones.phones).length,
    tablets: useAppSelector(state => state.tablets.tablets).length,
    accessories: useAppSelector(state => state.accessories.accessories).length,
  };

  const handleSearchParams = (param: Partial<SearchParams>) => {
    updateParams(param);
  };

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
