import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { useContext } from 'react';
import { ProductContext } from '../../ProductContext';
import { getNumbers } from '../../utils/utils';
import { SearchLink } from '../SearchLink';

export const Pagination = () => {
  const { filterdProducts } = useContext(ProductContext);
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '16';

  const paginationNumbs = getNumbers(0, filterdProducts.length);
  const paginationNumb = Math.ceil(filterdProducts.length / +perPage) + 1;

  return (
    <div className="pagination" data-cy="pagination">
      <SearchLink
        data-cy="paginationLeft"
        className={cn('pagination__button pagination__button-prev',
          { disablet: +page === 1 })}
        params={{ page: `${+page - 1}` }}
      >
        <img src="./icon/Left.svg" alt="" />
      </SearchLink>

      {paginationNumbs.slice(1, paginationNumb).map(item => (
        <SearchLink
          key={item}
          className={cn('pagination__link',
            { active: item === +page })}
          params={{ page: `${item}` }}
        >
          {`${item}`}
        </SearchLink>
      ))}

      <SearchLink
        data-cy="paginationRight"
        className={cn('pagination__button pagination__button-next',
          { disablet: +page === paginationNumb - 1 })}
        params={{ page: `${+page + 1}` }}
      >
        <img src="./icon/Right.svg" alt="right" />
      </SearchLink>
    </div>
  );
};
