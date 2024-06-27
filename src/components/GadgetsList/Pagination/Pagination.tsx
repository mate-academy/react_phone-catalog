import { useSearchParams } from 'react-router-dom';
import { IconLeft } from '../../Icons/IconLeft';
import { IconRight } from '../../Icons/IconRight';
import style from './Pagination.module.scss';
import { useContext } from 'react';
import { ProductsContext } from '../../../store/ProductsProvider';
import classNames from 'classnames';
import { SearchLink } from '../../../utils/SearchLink';

type Props = {
  perPage: string;
};
export const Pagination: React.FC<Props> = ({ perPage }) => {
  const { gadgets } = useContext(ProductsContext);
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || '1';
  const paginationQuantity = Math.ceil(
    gadgets.gadgets.length / Number(perPage),
  );
  const pages = Array.from({ length: paginationQuantity }, (_, i) => i + 1);
  const allPages = pages.length !== 0 ? pages : ['1'];

  const cutdownPage = (
    initialArray: number[] | string[],
    currentPage: number,
    lengthPages = 5,
  ) => {
    const start = Math.max(0, currentPage - 3);
    const end = currentPage + 3;
    const readyLength = [];

    if (initialArray.length > 1) {
      if (start <= 0 && end <= initialArray.length) {
        readyLength.push(...initialArray.slice(start, lengthPages));
      }

      if (start > 0 && end <= initialArray.length) {
        readyLength.push(...initialArray.slice(start, currentPage));
      }

      if (end <= initialArray.length && start > 0) {
        readyLength.push(...initialArray.slice(currentPage, end - 1));
      }

      if (end - 1 >= initialArray.length && initialArray.length - lengthPages > 0) {
        readyLength.push(...initialArray.slice(initialArray.length - lengthPages));
      }

      if (end - 1 >= initialArray.length && initialArray.length - lengthPages < 0) {
        readyLength.push(...initialArray.slice(start));
      }

      return readyLength;
    }

    return initialArray;
  };

  return (
    <div className={style.pagination}>
      <SearchLink
        params={{ page: `${+page - 1}` }}
        className={classNames(style.pagination__link, {
          [style.pagination__disabled]: +page === 1,
        })}
      >
        <IconLeft />
      </SearchLink>
      <div className={style.pagination__numbers}>
        {cutdownPage(allPages, +page).map((item, i) => (
          <SearchLink
            params={{ page: String(item) }}
            key={i}
            className={classNames(style.pagination__number, {
              [style.pagination__active]: +item === +page || item === 'All',
            })}
          >
            {item}
          </SearchLink>
        ))}
      </div>

      <SearchLink
        params={{ page: `${+page + 1}` }}
        className={classNames(style.pagination__link, {
          [style.pagination__disabled]: +page === allPages.length,
        })}
      >
        <IconRight />
      </SearchLink>
    </div>
  );
};
