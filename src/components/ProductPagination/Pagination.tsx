import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

import cn from 'classnames';

interface Props {
  pages: number[];
}

export const Pagination: React.FC<Props> = ({ pages }) => {
  const { pathname, search } = useLocation();

  const [searchParams] = useSearchParams();

  const queryPage = searchParams.get('page') || '1';

  return (
    <>
      {pages.map(page => {
        const params = new URLSearchParams(search);

        params.set('page', String(page));

        if (page === 1) {
          params.delete('page');
        }

        return (
          <NavLink
            to={{
              pathname: pathname,
              search: `?${params.toString()}`,
            }}
            data-value={page}
            key={page}
            className={cn('product-pagination__item', {
              'product-pagination__item--active': page === +queryPage,
            })}
          >
            {page}
          </NavLink>
        );
      })}
    </>
  );
};
