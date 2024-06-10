import React from 'react';
import './PageSelector.scss';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Product } from '../../helpers/types/Product';
import { getSearchWith } from '../../helpers/utils/getSearchWith';

type Props = {
  products: Product[];
};

export const PageSelector: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();

  const itemsValue = +(searchParams.get('item') || 4) || products.length;
  const currentPage = +(searchParams.get('page') || 1) || 1;

  const countPages = Math.ceil(products.length / itemsValue);

  const items = [];

  for (let i = 1; i <= countPages; i += 1) {
    items.push(i);
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="page-selector">
      <div className="page-selector__container">
        <Link
          to={{
            search: getSearchWith({ page: currentPage - 1 }, searchParams),
          }}
          onClick={scrollToTop}
          className={classNames(
            'page-selector__link',
            'page-selector__link--left',
            'page-selector__link--arrow',
            {
              'page-selector__link--disable-left': currentPage <= 1,
              disable: currentPage <= 1,
            },
          )}
        />
        {items.map(p => (
          <Link
            to={{ search: getSearchWith({ page: p }, searchParams) }}
            key={p}
            onClick={scrollToTop}
            className={classNames('page-selector__link', {
              'page-selector__link--active': p === currentPage,
            })}
          >
            {p}
          </Link>
        ))}
        <Link
          to={{
            search: getSearchWith({ page: currentPage + 1 }, searchParams),
          }}
          onClick={scrollToTop}
          className={classNames(
            'page-selector__link',
            'page-selector__link--right',
            'page-selector__link--arrow',
            {
              'page-selector__link--disable-right': currentPage >= countPages,
              disable: currentPage >= countPages,
            },
          )}
        />
      </div>
    </section>
  );
};
