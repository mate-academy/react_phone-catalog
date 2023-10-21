import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelpers';
import { LabelLink } from '../LabelLink';
import './Pagination.scss';

type PropTypes = {
  totalPages: number;
  currentPage: number;
};

export const Pagination: React.FC<PropTypes> = ({
  totalPages,
  currentPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClick = (newPage: number) => {
    setSearchParams(
      getSearchWith(searchParams, { page: `${newPage}` || null }),
    );
  };

  return (
    <ReactPaginate
      containerClassName="pagination__box-select"
      previousLinkClassName="pagination__button"
      nextLinkClassName="pagination__button"
      pageLinkClassName="pagination__button"
      breakLinkClassName="pagination__button"
      activeLinkClassName="pagination__button--active"
      disabledClassName="pagination__disabled"
      marginPagesDisplayed={1}
      forcePage={+currentPage - 1}
      pageRangeDisplayed={4}
      breakLabel="..."
      pageCount={totalPages}
      previousLabel={
        <LabelLink currentPage={currentPage} value="<" />
      }
      nextLabel={
        <LabelLink currentPage={currentPage} value=">" />
      }
      onPageChange={(data) => handleClick(data.selected + 1)}
    />
  );
};
