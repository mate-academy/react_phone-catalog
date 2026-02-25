import React, { useEffect } from 'react';
import { Pagination } from '../Pagination';
import { useSearchWith } from '../../hooks/useSearchWith';
import { DEFAULT_ITEM_COUNT } from '../../constants/DEFAUL_ITEM_COUNT';
import { VALID_PER_PAGE } from '../../constants/VALID_PER_PAGE';

interface Props {
  classNames?: string;
  totalItem: number;
}

export const SearchPagination: React.FC<Props> = ({
  totalItem,
  classNames,
}) => {
  const { searchParams, setSearchWith } = useSearchWith();

  const pageParam = searchParams.get('page');
  const perPageParam = searchParams.get('perPage');

  let itemsPerPage = perPageParam ? Number(perPageParam) : DEFAULT_ITEM_COUNT;

  const totalPage = Math.ceil(totalItem / itemsPerPage);

  const currPage = pageParam ? Number(pageParam) : 1;

  useEffect(() => {
    const newParams: { page?: number | null; perPage?: number | null } = {};

    if (!VALID_PER_PAGE.includes(itemsPerPage)) {
      newParams.perPage = null;
    }

    if (currPage < 1) {
      newParams.page = null;
    } else if (currPage > totalPage) {
      newParams.page = totalPage;
    }

    if (Object.keys(newParams).length > 0) {
      setSearchWith(newParams);
    }
  }, [itemsPerPage, currPage, totalPage, setSearchWith]);

  const handlePageChange = (page: number) => {
    setSearchWith({ page: page === 1 ? null : page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <Pagination
      classNames={classNames}
      totalItem={totalItem}
      itemsPerPage={itemsPerPage}
      currPage={currPage}
      onPageChange={page => handlePageChange(page)}
    />
  );
};
