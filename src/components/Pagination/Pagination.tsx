import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelper';

import './Pagination.scss';

type Props = {
  pageCount: number,
};

export const Pagination = ({ pageCount }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const handlePageClick = (
    { selected: selectedPage }: { selected: number; },
  ) => {
    window.scrollTo(0, 0);

    setSearchParams(
      getSearchWith(searchParams, { page: `${selectedPage + 1}` }),
    );
  };

  return (
    <ReactPaginate
      previousLabel="<"
      nextLabel=">"
      pageCount={pageCount}
      onPageChange={handlePageClick}
      containerClassName="pagination"
      previousLinkClassName="pagination__link pagination__link--prev"
      pageLinkClassName="pagination__link"
      nextLinkClassName="pagination__link pagination__link--next"
      disabledClassName="pagination__link--disabled"
      activeClassName="pagination__link--active"
      forcePage={+page - 1}
      prevRel="prevButton"
      data-cy="pagination"
    />
  );
};
