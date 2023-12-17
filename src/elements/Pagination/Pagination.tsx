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

  function findNextPage() {
    // let nextPage;

    // if (+curPage < pages.length) {
    //   nextPage = String((+curPage) + 1);
    // }

    // return nextPage || String(pages[pages.length - 1]);

    return (+curPage < pages.length)
      ? String((+curPage) + 1)
      : String(pages[pages.length - 1]);
  }

  function findPrevPage() {
    let prevPage;

    if (+curPage > 1) {
      prevPage = String((+curPage) - 1);
    }

    return prevPage || '1';
  }

  return (
    <ul className="pagination">
      <li className="paginalion__item">
        <ButtonIcon
          type="link"
          shape="left-light"
          path={{
            search: getSearchWith({
              page: findPrevPage(),
            }, searchParams),
          }}
        />
      </li>

      {pages.map(page => (
        <li className="paginalion__item">
          <ButtonIcon
            type="link"
            text={page}
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
        shape="right-light"
        path={{
          search: getSearchWith({
            page: findNextPage(),
          }, searchParams),
        }}
      />
    </ul>
  );
};
