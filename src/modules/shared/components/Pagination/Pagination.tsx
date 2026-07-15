import classNames from 'classnames';
import { getImageUrl } from '../../utils/getImageUrl';
import { IconButton } from '../IconButton';
import styles from './Pagination.module.scss';
import { generatePagination } from './utils';

interface Props {
  pageCount: number;
  currentPage: number;
  handleChangePage: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  pageCount,
  currentPage,
  handleChangePage,
}) => {
  const pages = generatePagination(currentPage, pageCount);

  return (
    <div className={styles.pagination}>
      <IconButton
        disabled={currentPage === 1}
        onClick={() => handleChangePage(currentPage - 1)}
      >
        <img src={getImageUrl('/icons/arrow-left.svg')} alt="Previous" />
      </IconButton>

      <div className={styles.pagination__pages}>
        {pages.map((page, index) => {
          if (page === '...') {
            return <span key={`ellipsis-${index}`}>...</span>;
          }

          return (
            <IconButton
              key={page}
              onClick={() => handleChangePage(+page)}
              className={classNames({
                [styles['pagination__button-active']]: currentPage == page,
              })}
            >
              {page}
            </IconButton>
          );
        })}
      </div>

      <IconButton
        disabled={currentPage === pageCount}
        onClick={() => handleChangePage(currentPage + 1)}
      >
        <img src={getImageUrl('/icons/arrow-right.svg')} alt="Next" />
      </IconButton>
    </div>
  );
};
