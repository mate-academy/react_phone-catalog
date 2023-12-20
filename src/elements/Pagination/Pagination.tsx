import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductType } from '../../helpers/types/ProductType';
import { getSearchWith } from '../../helpers/utils/getSearch';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import './Pagination.scss';

type Props = {
  products: ProductType[];
};

export const Pagination: React.FC<Props> = ({
  products,
}) => {
  const [searchParams] = useSearchParams();
  const curPage = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '4';
  const pages = Array.from(
    { length: Math.ceil(products.length / +perPage) }, (_, i) => String(i + 1),
  );

  function findNextPage(direction: string) {
    if (direction === 'next') {
      return (+curPage < pages.length)
        ? String((+curPage) + 1)
        : String(pages[pages.length - 1]);
    }

    return (+curPage > 1)
      ? String((+curPage) - 1)
      : '1';
  }

  function isArrowDisabled(direction: string) {
    if (direction === 'next') {
      return +curPage + 1 > pages.length;
    }

    return +curPage - 1 < 1;
  }

  return (
    <ul className="pagination">
      <li className="paginalion__item">
        <ButtonIcon
          type="link"
          dynamicClasses={isArrowDisabled('prev') ? ['disabled'] : ['']}
          shape={isArrowDisabled('prev') ? 'left' : 'left-light'}
          disable={isArrowDisabled('prev')}
          path={{
            search: getSearchWith({
              page: findNextPage('prev'),
            }, searchParams),
          }}
        />
      </li>

      {pages.map(page => (
        <li className="paginalion__item" key={page}>
          <ButtonIcon
            type="link"
            text={page}
            dynamicClasses={curPage === page ? ['link-active'] : ['']}
            path={{
              search: getSearchWith({
                page,
              }, searchParams),
            }}
          />
        </li>
      ))}

      <ButtonIcon
        type="link"
        dynamicClasses={isArrowDisabled('next') ? ['disabled'] : ['']}
        shape={isArrowDisabled('next') ? 'right' : 'right-light'}
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
