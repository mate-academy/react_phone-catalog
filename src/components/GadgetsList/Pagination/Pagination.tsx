import { useSearchParams } from 'react-router-dom';
import { IconLeft } from '../../Icons/IconLeft';
import { IconRight } from '../../Icons/IconRight';
import style from './Pagination.module.scss';
import { useContext } from 'react';
import { ProductsContext } from '../../../store/ProductsProvider';
import classNames from 'classnames';
import { SearchLink } from '../../../utils/SearchLink';

type Props = {
  total?: number;
  perPage: string;
  currentPage?: number;
  onPageChange?: (page: number) => void;
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

  return (
    <div className={style.pagination}>
      <SearchLink
        params={{ page: `${+page - 1}` }}
        className={classNames(style.pagination__link, {
          [style.pagination__disabled]: +page === +allPages[0],
        })}
      >
        <IconLeft />
      </SearchLink>
      <div className={style.pagination__numbers}>
        {allPages.map(item => (
          <SearchLink
            params={{ page: String(item) }}
            key={item}
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
