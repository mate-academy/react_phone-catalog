/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProgressBar } from 'react-loader-spinner';
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
  } = useData();
  const [productsPerPage, setProductsPerPage] = useState(16);
  const [searchParams] = useSearchParams();
  const page = +(searchParams.get('page') || 1);

  useEffect(() => {
    const perPage = searchParams.get('perPage') || '16';

    if (perPage !== 'all') {
      setProductsPerPage(+perPage);
    }

    if (products && perPage === 'all') {
      setProductsPerPage(products.length);
    }
  }, [products, searchParams]);

  if (!products) {
    return (
      <div className="loader">
        <ProgressBar
          visible
          height="80"
          width="80"
          barColor="#4fa94d"
          borderColor="#51E5FF"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  const indexOfLastProduct = page * productsPerPage;
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
          currentValue={productsPerPage > 16 ? 'All' : productsPerPage.toString()}
          title="Items on page"
        />
      </div>

      <div className="phones-page__content">
        <ProductList
          currentProducts={(productsPerPage < 17) ? currentProducts : products}
        />
      </div>

      {productsPerPage < 17
        && (
          <div className="phone-page__pagination">
            <Pagination
              pages={nPages}
            />
          </div>
        )}
    </div>
  );
};
