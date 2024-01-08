import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductType } from '../../helpers/types/ProductType';
import { getSearchWith } from '../../helpers/getFunctions/getSearch';
import { ButtonLink } from '../Buttons/ButtonLink/ButtonLink';
import './Pagination.scss';

type Props = {
  products: ProductType[];
};

export const Pagination: React.FC<Props> = ({
  products,
}) => {
  const [searchParams] = useSearchParams();
  const curPage = +(searchParams.get('page') || '1');
  const perPage = searchParams.get('perPage') || '8';
  const totalPages = Math.ceil(products.length / +perPage);
  const [visiblePages, setVisiblePages] = useState<string[]>([]);

  useEffect(() => {
    const pages = Array.from({ length: totalPages }, (_, i) => String(i + 1));

    if (totalPages <= 3) {
      setVisiblePages(pages);
    } else {
      const start = Math.max(0, curPage - 2);
      const end = Math.min(start + 3, totalPages);

      setVisiblePages(pages.slice(start, end));
    }
  }, [curPage, totalPages]);

  function findNextPage(direction: string) {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (direction === 'next') {
      return Math.min(curPage + 1, totalPages).toString();
    }

    return Math.max(curPage - 1, 1).toString();
  }

  function isArrowDisabled(direction: string) {
    if (direction === 'next') {
      return curPage + 1 > totalPages;
    }

    return curPage - 1 < 1;
  }

  return (
    <ul className="pagination">
      <li className="paginalion__item">
        <ButtonLink
          shape="left"
          disable={isArrowDisabled('prev')}
          path={{
            search: getSearchWith({
              page: findNextPage('prev'),
            }, searchParams),
          }}
        />
      </li>

      {visiblePages.map(page => (
        <li className="paginalion__item" key={page}>
          <ButtonLink
            text={page}
            shape="num"
            dynamicClasses={String(curPage) === page ? ['link-active'] : ['']}
            path={{
              search: getSearchWith({
                page,
              }, searchParams),
            }}
          />
        </li>
      ))}

      {curPage !== totalPages && (<p className="pagination__dots">...</p>)}

      <ButtonLink
        shape="right"
        disable={isArrowDisabled('next')}
        path={{
          search: getSearchWith({
            page: findNextPage('next'),
          }, searchParams),
        }}
      />
    </ul>
  );
};
