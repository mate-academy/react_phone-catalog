/* eslint-disable max-len */
import { useState } from 'react';
import { DropDown } from '../../components/DropDown';
import { Pagination } from '../../components/Pagination';
import { ProductList } from '../../components/ProductList';
import { PublicPath } from '../../components/PublicPath';
import { useData } from '../../helpers/DataContext';

import './PhonesPage.scss';

export const PhonesPage = () => {
  const {
    products,
    sortDropdown,
    perPageDropdown,
    sort,
    perPage,
  } = useData();
  const [currentPage, setCurrentPage] = useState(1);

  if (!products) {
    return <p>idi nahui</p>;
  }

  let productsPerPage;

  if (perPage !== 'all') {
    productsPerPage = +perPage;
  } else {
    productsPerPage = products?.length;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);
  const nPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="phones-page">

      <PublicPath linkName="phones" />

      <div className="phones-page__header">
        <h1 className="text--h1">Mobile phones</h1>
        <span className="text text--small text--gray">{`${products?.length} models`}</span>
      </div>

      <div className="phones-page__dropdowns">
        <DropDown
          dropdown={sortDropdown}
          queryKey={sortDropdown.name}
          currentValue={sort}
          title="Sort by"
        />

        <DropDown
          dropdown={perPageDropdown}
          queryKey={perPageDropdown.name}
          currentValue={productsPerPage.toString()}
          title="Items on page"
        />
      </div>

      {productsPerPage < 16
        ? (
          <>
            <ProductList
              currentProducts={currentProducts}
            />

            <Pagination
              numberOfPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        )
        : (
          <ProductList
            currentProducts={products}
          />
        )}
    </div>
  );
};
