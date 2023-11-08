import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { CatalogProduct } from '../../types/CatalogProduct';
import { handleLoadMore, handleSort } from '../../helpers/pagesMethods';
import { usePagination } from '../../helpers/usePagination';

type Props = {
  productsList: CatalogProduct[];
  currentProducsList: CatalogProduct[];
  setCurrentProductsList: React.Dispatch<React
    .SetStateAction<CatalogProduct[]>>;
  total: number;
};

export const LoadMore: FC<Props> = ({
  productsList,
  currentProducsList,
  setCurrentProductsList,
  total,
}) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const previousPage = searchParams.get('previousPage') || '8';
  const sort = searchParams.get('sort') || '';
  const sortedProducts = handleSort(productsList, sort);

  const paginationRange = usePagination({
    totalCount: total,
    pageSize: +previousPage,
    currentPage: +page,
  });

  const lastPage = paginationRange[paginationRange.length - 1];

  const handleClick = () => {
    handleLoadMore(
      sortedProducts,
      previousPage,
      currentProducsList,
      setCurrentProductsList,
    );
  };

  return (
    <button
      type="button"
      className={classNames(
        'load-more-button',
        { 'load-more-button--hide': +page === +lastPage },
      )}
      onClick={handleClick}
    >
      Load more
    </button>
  );
};
