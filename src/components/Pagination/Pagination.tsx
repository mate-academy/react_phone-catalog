import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';

import './Pagination.scss';

type Props = {
  onPageClick: (data: { selected: number }) => void;
  pageCount: number;
};

export const Pagination: React.FC<Props> = ({ onPageClick, pageCount }) => {
  const [searchParams] = useSearchParams();
  const currentPage = +(searchParams.get('page') || 1) - 1;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=""
      previousLabel=""
      onPageChange={onPageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={0}
      pageCount={pageCount}
      forcePage={currentPage}
      renderOnZeroPageCount={null}
      containerClassName={'pagination'}
      pageClassName={'pagination__item'}
      pageLinkClassName={'pagination__link'}
      previousClassName={'pagination__item'}
      previousLinkClassName={'pagination__link pagination__prev'}
      nextClassName={'pagination__item'}
      nextLinkClassName={'pagination__link pagination__next'}
      breakClassName={'pagination__item'}
      breakLinkClassName={'pagination__link'}
      activeLinkClassName={'pagination__link--active'}
      disabledLinkClassName={'pagination__link--disabled'}
    />
  );
};
