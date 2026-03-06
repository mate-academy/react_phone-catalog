import classNames from 'classnames';
import s from './Pagination.module.scss';
import { SearchLink } from '../SearchLink/SearchLink';
import arrowLeft from '../../assets/images/icons/Chevron (Arrow Left).svg';
import arrowRight from '../../assets/images/icons/Chevron (Arrow Right).svg';
import { buildPaginationItems } from '../../utils/BuildPaginationItems';

type Props = {
  total: number;
  currentPage: number;
  perPage: number;
};

export const Pagination: React.FC<Props> = ({ total, perPage, currentPage = 1 }) => {
  const numbersOfPage = Math.ceil(total / perPage);
  const paginationItems = buildPaginationItems(numbersOfPage, currentPage, 5);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numbersOfPage;

  return (
    <div className={s.pagination}>
      <div className={classNames(s.pageItemNav, { [s.disabled]: isFirstPage })}>
        <SearchLink
          params={{ page: isFirstPage ? null : String(currentPage - 1) }}
          className={s.pageLink}
          aria-disabled={isFirstPage}
        >
          <img src={arrowLeft} alt="arrowLeft" className={s.iconArrow} />
        </SearchLink>
      </div>
      <ul className={s.pageList}>
        {paginationItems.map((item, index) => {
          if (typeof item === 'number') {
            return (
              <li
                className={classNames(s.pageItem, { [s.active]: item === currentPage })}
                key={item}
              >
                <SearchLink params={{ page: String(item) }} className={s.pageLink}>
                  {item}
                </SearchLink>
              </li>
            );
          }

          return (
            <li className={s.pageItem} key={`ellipsis-${index}`}>
              <SearchLink
                params={{ page: String(item.to) }}
                className={classNames(s.pageLink, s.ellipsis)}
              >
                ...
              </SearchLink>
            </li>
          );
        })}
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
