import './Pagination.scss';
import cn from 'classnames';
import { ButtonArrow } from '../../ui/ButtonArrow/ButtonArrow';
import { useThemeState } from '../../stateManagers/themeState';
import { getPaginationRange } from '../../utils/getPaginationRange/getPaginationRange';

interface PaginationProps {
  amountProduct: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  amountProduct,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const { theme } = useThemeState();
  const pageAmount = Math.ceil(amountProduct / perPage);

  const handlePageClick = (page: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    onPageChange(page);
  };

  const handlePageBefore = (event: React.MouseEvent) => {
    event.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handlePageNext = (event: React.MouseEvent) => {
    event.preventDefault();
    if (currentPage < pageAmount) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className="pagination__item">
        <ButtonArrow
          icon="arrow"
          direction="left"
          onClick={handlePageBefore}
          disabled={currentPage === 1}
        />
      </li>

      {getPaginationRange(currentPage, pageAmount).map((pageLink, i) => (
        <li
          key={i}
          className="pagination__item"
        >
          {pageLink === 'dots' ?
            <span className="pagination__dots">...</span>
          : <button
              className={cn(
                'pagination__number',
                `pagination__number--${theme}`,
                {
                  [`pagination__number--active--${theme}`]:
                    currentPage === pageLink,
                },
              )}
              onClick={handlePageClick(pageLink)}
            >
              {pageLink}
            </button>
          }
        </li>
      ))}

      <li className="pagination__item">
        <ButtonArrow
          icon="arrow"
          direction="right"
          onClick={handlePageNext}
          disabled={currentPage === pageAmount}
        />
      </li>
    </ul>
  );
};
