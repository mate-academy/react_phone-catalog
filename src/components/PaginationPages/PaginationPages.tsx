import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PaginationBlock } from '../PaginationBlock';
import { getSearchWith } from '../../helpers/searchHelper';

type Props = {
  total: number;
};

export const PaginationPages: FC<Props> = ({ total }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '8';

  const handlePageSelect = (pageNumber: number) => {
    const paramsToUpdate = { page: !pageNumber ? null : `${pageNumber}` };

    setSearchParams(getSearchWith(searchParams, paramsToUpdate));
  };

  return (
    <PaginationBlock
      total={total}
      perPage={+perPage}
      currentPage={+page}
      onPageChange={handlePageSelect}
    />
  );
};
