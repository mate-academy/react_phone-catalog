import { FC } from 'react';
import './Pagination.scss';
import { getNumbers } from '../../utils/utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const calcPages = Math.ceil(total / perPage);
  const leftArrowDisabled = currentPage === 1 ? 'disabled' : '';
  const rigthArrowDisabled = currentPage === calcPages ? 'disabled' : '';

  const paginationNumbers = getNumbers(1, calcPages);

  return (
    <ul className="catalog__pagination pagination">
      <li
        className={`pagination__item  pagination__left ${leftArrowDisabled}`}
        onClick={() => onPageChange(currentPage - 1)}
        aria-disabled={!!leftArrowDisabled}
      >
        «
      </li>
      {paginationNumbers.map(number => (
        <li
          onClick={() => onPageChange(number)}
          key={number}
          className={`pagination__item  ${number === currentPage ? 'pagination__item_active' : ''}`}
        >
          {number}
        </li>
      ))}

      <li
        className={`pagination__item  pagination__left ${rigthArrowDisabled}`}
        aria-disabled={!!rigthArrowDisabled}
        onClick={() => onPageChange(currentPage + 1)}
      >
        »
      </li>
    </ul>
  );

  // return (
  //   <ul className="catalog__pagination pagination">
  //     <li className="pagination__item  pagination__left">
  //       <a href="">&#60;</a>
  //     </li>

  //     <li className="pagination__item pagination__item_active">
  //       <a href="">1</a>
  //     </li>

  //     <li className="pagination__item pagination__rigth">
  //       <a href=""></a> &#62;
  //     </li>
  //   </ul>
  // );
};
