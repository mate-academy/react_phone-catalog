import ReactPaginate from 'react-paginate';
import './Pagination.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../../../utils/searchHelper';
import { scrollToTop } from '../../../../../helpers/scrollToTop';
import { useCallback, useContext } from 'react';
import { getIconSrc } from '../../../../../helpers/getIconSrc';
import {
  ThemeContext,
  ThemeType,
} from '../../../../../contexts/ThemeContext/ThemeContext';
import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const { theme } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(total / perPage);
  const firstPage = currentPage === 1;
  const lastPage = currentPage === totalPages;

  const key = `${searchParams.get('perPage')}-${searchParams.get('sort')}`;

  const handlePageChange = useCallback(
    (selectedPage: number) => {
      const newSearchParams = getSearchWith(
        { ['page']: selectedPage === 0 ? null : String(selectedPage + 1) },
        searchParams,
      );

      setSearchParams(newSearchParams);
      scrollToTop('smooth');
    },
    [searchParams, setSearchParams],
  );

  return (
    <div className="pagination">
      <ReactPaginate
        key={key}
        containerClassName={'pagination__content'}
        pageClassName={classNames('pagination__btn text-body', {
          dark: theme === ThemeType.DARK,
        })}
        activeClassName={'pagination__btn--selected'}
        pageLinkClassName={'pagination__btnLink'}
        previousLinkClassName={classNames(
          'pagination__arrow--prev pagination__arrow',
          {
            dark: theme === ThemeType.DARK,
            disabled: firstPage,
          },
        )}
        nextLinkClassName={classNames(
          'pagination__arrow--next pagination__arrow',
          {
            dark: theme === ThemeType.DARK,
            disabled: lastPage,
          },
        )}
        disabledLinkClassName={'pagination__arrow--disabled'}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={event => handlePageChange(event.selected)}
        forcePage={currentPage - 1}
        pageCount={totalPages}
        breakLabel="..."
        previousLabel={
          <img
            src={getIconSrc(
              firstPage ? 'arrow-prev-disabled' : 'arrow-prev',
              theme,
            )}
            className="icon"
          />
        }
        nextLabel={
          <img
            src={getIconSrc(
              lastPage ? 'arrow-next-disabled' : 'arrow-next',
              theme,
            )}
            className="icon"
          />
        }
      />
    </div>
  );
};
