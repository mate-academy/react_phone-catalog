import classNames from 'classnames';
import styles from './Pagination.module.scss';
import arrowLeft from '../../img/icons/ArrowLeft.svg';
import arrowRight from '../../img/icons/ArrowRight.svg';

import { Icon } from '../Icon';

type Props = {
  nextPage: () => void,
  prevPage: () => void,
  setPage: (num: number) => void,
  totalPages: number,
  page: number,
};

export const Pagination: React.FC<Props> = ({
  nextPage,
  prevPage,
  setPage,
  totalPages,
  page,
}) => {
  const buttons = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <ul className={styles.pagination} data-cy="pagination">
      <li data-cy="paginationLeft">
        <Icon
          icon={arrowLeft}
          stylesName={classNames([styles.paginationArrowLeft], {
            [styles.paginationArrowDisabled]: page === 1,
          })}
          onClick={prevPage}
        />
      </li>

      {buttons.map(el => (
        <li key={el}>
          <button
            type="button"
            className={classNames([styles.paginationNum], {
              [styles.paginationNumActive]: page === el,
            })}
            onClick={() => setPage(el)}
          >
            {el}
          </button>
        </li>
      ))}

      <li data-cy="paginationRight">
        <Icon
          icon={arrowRight}
          stylesName={classNames([styles.paginationArrowRight], {
            [styles.paginationArrowDisabled]: page === totalPages,
          })}
          onClick={nextPage}
        />

      </li>
    </ul>
  );
};
