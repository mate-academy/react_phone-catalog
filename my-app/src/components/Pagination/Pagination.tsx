import ReactPaginate from 'react-paginate';
import './Pagination.scss';
import React from 'react';

type Props = {
  initialPage: string | null;
  pageCount: number;
  onChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({ initialPage, pageCount, onChange }) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={event => {
        onChange(event.selected);
      }}
      breakLabel="..."
      nextLabel=""
      previousLabel=" "
      renderOnZeroPageCount={null}
      marginPagesDisplayed={0}
      pageRangeDisplayed={4}
      containerClassName="pagination"
      pageClassName="pageNumber"
      pageLinkClassName="pageLink"
      activeClassName="activePage"
      forcePage={initialPage ? +initialPage - 1 : 0}
    />
  );
};
