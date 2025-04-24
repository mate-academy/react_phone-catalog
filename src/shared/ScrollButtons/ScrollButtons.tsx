import classNames from 'classnames';
import s from './ScrollButtons.module.scss';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../context/ProductsContext';

export const ScrollButtons = () => {
  const { products } = useContext(ProductContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const quantityParams = +(searchParams.get('quantity') || 1);
  const pageNumber = +(searchParams.get('page') || 1);
  const { pathname } = useLocation();

  const scrollLength =
    Math.ceil(
      products.filter(item => item.category === 'phones').length /
        quantityParams,
    ) || 1;
  const scrollPages = [];

  for (let i = 1; i <= scrollLength; i++) {
    scrollPages.push(i);
  }

  if (pageNumber <= 0 || pageNumber > scrollLength) {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', '1');
    setSearchParams(newParams);
  }

  return (
    <div
      className={classNames(s.scrolls__wrapper, 'container', 'block-margin')}
    >
      <div className={s.scrolls}>
        <Link
          className={classNames(s.scrolls__back, {
            [s.disabled]: pageNumber <= 1,
          })}
          to={{
            pathname,
            search: new URLSearchParams({
              ...Object.fromEntries(searchParams.entries()),
              page: `${pageNumber - 1}`,
            }).toString(),
          }}
          onClick={e => pageNumber <= 1 && e.preventDefault()}
        >
          <img src="./img/icons/prev.png" alt="previous page" />
        </Link>
        {scrollPages.slice(pageNumber - 1, pageNumber + 3).map(page => (
          <Link
            key={page}
            className={classNames(s.scrolls__page, {
              [s.active]: pageNumber === page,
            })}
            to={{
              pathname,
              search: new URLSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                page: `${page}`,
              }).toString(),
            }}
          >
            {page}
          </Link>
        ))}
        <Link
          className={classNames(s.scrolls__next, {
            [s.disabled]: pageNumber >= scrollLength,
          })}
          to={{
            pathname,
            search: new URLSearchParams({
              ...Object.fromEntries(searchParams.entries()),
              page: `${pageNumber + 1}`,
            }).toString(),
          }}
          onClick={e => pageNumber >= scrollLength && e.preventDefault()}
        >
          <img src="./img/icons/next.png" alt="next page" />
        </Link>
      </div>
    </div>
  );
};
