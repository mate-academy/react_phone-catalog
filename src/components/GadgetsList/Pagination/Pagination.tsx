import { useSearchParams } from 'react-router-dom';
import { IconLeft } from '../../Icons/IconLeft';
import { IconRight } from '../../Icons/IconRight';
import style from './Pagination.module.scss';
import { useContext } from 'react';
import { ProductsContext } from '../../../store/ProductsProvider';
import classNames from 'classnames';
import { SearchLink } from '../../../utils/SearchLink';
import { QueryParams } from '../../../enums/QuryParams';

type Props = {
  perPage: string;
};
export const Pagination: React.FC<Props> = ({ perPage }) => {
  const { gadgets } = useContext(ProductsContext);
  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get(QueryParams.page) || 1;
  const paginationQuantity = Math.ceil(
    gadgets.gadgets.length / Number(perPage),
  );

  const totalPages = Array.from(
    { length: paginationQuantity },
    (_, i) => i + 1,
  );

  const pagination = (total: number[], current: number, length = 5) => {
    const nextLength = Math.floor(length / 2);
    const prevLength = Math.ceil(length / 2);

    if (current <= prevLength) {
      return total.slice(0, length);
    }

    if (current >= total.length - nextLength) {
      return total.slice(-length);
    }

    return total.slice(current - prevLength, current + nextLength);
  };

  return (
    <div className={style.pagination}>
      <SearchLink
        params={{ page: `${+currentPage - 1}` }}
        className={classNames(style.pagination__link, {
          [style.pagination__disabled]: +currentPage === 1,
        })}
      >
        <IconLeft />
      </SearchLink>
      <div className={style.pagination__numbers}>
        {pagination(totalPages, +currentPage).map(item => (
          <SearchLink
            params={{ page: String(item) }}
            key={item}
            className={classNames(style.pagination__number, {
              [style.pagination__active]: +item === +currentPage,
            })}
          >
            {item}
          </SearchLink>
        ))}
      </div>

      <SearchLink
        params={{ page: `${+currentPage + 1}` }}
        className={classNames(style.pagination__link, {
          [style.pagination__disabled]: +currentPage === totalPages.length,
        })}
      >
        <IconRight />
      </SearchLink>
    </div>
  );
};
