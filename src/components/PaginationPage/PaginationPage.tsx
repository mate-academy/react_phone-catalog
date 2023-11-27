import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PaginationBlock } from '../PaginationBlock/PaginationBlock';
import { getSearchWith } from '../../helpers/searchHelpers';

type Props = {
  total: number;
};

export const PaginationPage: FC<Props> = ({ total }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const previousPage = searchParams.get('previousPage') || '8';

  const handlePageSelect = (pageNumber: number) => {
    const paramsToUpdate = { page: !pageNumber ? null : `${pageNumber}` };

    setSearchParams(getSearchWith(searchParams, paramsToUpdate));
  };

  return (
    <PaginationBlock
      total={total}
      perPage={+previousPage}
      currentPage={+page}
      onPageChange={handlePageSelect}
    />
  );
};
