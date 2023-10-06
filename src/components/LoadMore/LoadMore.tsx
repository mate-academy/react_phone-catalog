import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { handleLoadMore, handleSorting } from '../../helpers/pagesMethods';
import { CatalogProduct } from '../../types/CatalogProduct';
import { usePagination } from '../../helpers/usePagination';

type Props = {
  productsList: CatalogProduct[],
  currentProductsList: CatalogProduct[],
  setCurrentProductsList:
  React.Dispatch<React.SetStateAction<CatalogProduct[]>>,
  total: number;
};

export const LoadMore: FC<Props> = ({
  productsList,
  currentProductsList,
  setCurrentProductsList,
  total,
}) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '8';
  const sort = searchParams.get('sort') || '';
  const sortedProducts = handleSorting(productsList, sort);

  const paginationRange = usePagination({
    totalCount: total,
    pageSize: +perPage,
    currentPage: +page,
  });

  const lastPage = paginationRange[paginationRange.length - 1];

  const handleClick = () => {
    handleLoadMore(
      sortedProducts,
      perPage,
      currentProductsList,
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
