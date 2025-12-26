import ReactPaginate from 'react-paginate';
import './Pagination.scss';

type Props = {
  pageCount: number;
  currentPage: number;
  onChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({ pageCount, currentPage, onChange }) => {
  const handlePageChange = (event: { selected: number }) => {
    onChange(event.selected + 1);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={handlePageChange}
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
