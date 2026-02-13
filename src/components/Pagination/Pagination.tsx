import classNames from 'classnames';
import { getNumbers } from '../../utils/utils';
import s from './Pagination.module.scss';
import { SearchLink } from '../SearchLink/SearchLink';
import arrowLeft from '../../assets/images/icons/Chevron (Arrow Left).svg';
import arrowRight from '../../assets/images/icons/Chevron (Arrow Right).svg';

type Props = {
  total: number;
  currentPage: number;
  perPage: number;
};

export const Pagination: React.FC<Props> = ({ total, perPage, currentPage = 1 }) => {
  const numbersOfPage = Math.ceil(total / perPage);
  const pageArray = getNumbers(1, numbersOfPage);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageArray.length;
  return (
    <div className={s.pagination}>
      <div className={classNames(s.pageItemNav, { [s.disabled]: isFirstPage })}>
        <SearchLink
          params={{ page: isFirstPage ? '1' : String(currentPage - 1) }}
          className={s.pageLink}
          aria-disabled={isFirstPage}
        >
          <img src={arrowLeft} alt="arrowLeft" className={s.iconArrow} />
        </SearchLink>
      </div>
      <ul className={s.pageList}>
        {pageArray.map((n) => (
          <li className={classNames(s.pageItem, { [s.active]: n === currentPage })} key={n}>
            <SearchLink params={{ page: String(n) }} className={s.pageLink}>
              {n}
            </SearchLink>
          </li>
        ))}
      </ul>
      <div className={classNames(s.pageItemNav, { [s.disabled]: isLastPage })}>
        <SearchLink
          params={{ page: isLastPage ? String(numbersOfPage) : String(currentPage + 1) }}
          className={s.pageLink}
          aria-disabled={isLastPage}
        >
          <img src={arrowRight} alt="arrowRight" className={s.iconArrow} />
        </SearchLink>
      </div>
    </div>
  );
};
