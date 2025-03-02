import ReactPaginate from 'react-paginate';
import './Pagination.scss';

type Props = {
  pageCount: number;
  currentPage: number;
  onChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({ pageCount, currentPage, onChange }) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={event => {
        onChange(event.selected + 1);
      }}
      nextLabel=""
      previousLabel=""
      renderOnZeroPageCount={null}
      marginPagesDisplayed={0}
      pageRangeDisplayed={4}
      containerClassName="pagination"
      pageClassName="pageNumber"
      pageLinkClassName="pageLink"
      activeClassName="activePage"
      forcePage={currentPage ? +currentPage - 1 : 0}
    />
  );
};
