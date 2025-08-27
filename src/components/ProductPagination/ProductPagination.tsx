import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

import './ProductPagination.scss';
import cn from 'classnames';

import { Pagination } from './Pagination';
import { useEffect } from 'react';

interface Props {
  pages: number[];
}

type Way = 'next' | 'back';

export const ProductPagination: React.FC<Props> = ({ pages }) => {
  const { pathname, search } = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [search]);

  const queryPage = searchParams.get('page') || '1';

  function handleDirection(way: Way) {
    const params = new URLSearchParams(search);

    if (way === 'back') {
      if (+queryPage > 2) {
        params.set('page', `${+queryPage - 1}`);
      } else {
        params.delete('page');
      }
    } else {
      if (+queryPage < pages.length) {
        params.set('page', `${+queryPage + 1}`);
      } else {
        params.delete('page');
      }
    }

    return params.toString();
  }

  return (
    <nav className="product-pagination product-pagination--margin">
      <NavLink
        to={{
          pathname: pathname,
          search: handleDirection('back'),
        }}
        className={cn(
          'product-pagination__item',
          'product-pagination__item--arrow',
          'product-pagination__item--left',
          {
            'product-pagination__item--visibility': +queryPage === 1,
          },
        )}
      ></NavLink>

      <Pagination pages={pages} />

      <NavLink
        to={{
          pathname: pathname,
          search: handleDirection('next'),
        }}
        className={cn(
          'product-pagination__item',
          'product-pagination__item--arrow',
          'product-pagination__item--right',
          {
            'product-pagination__item--visibility': +queryPage === pages.length,
          },
        )}
      ></NavLink>
    </nav>
  );
};
