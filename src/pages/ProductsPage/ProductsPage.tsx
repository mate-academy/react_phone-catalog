/* eslint-disable max-len */
import './ProductsPage.scss';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { UpgratedProduct } from '../../types/UpgratedProduct';
import { getPreparedProducts } from '../../helpers/getPreparedProducts';
import { SortBy } from '../../types/sortBy';
import { ItemsPerPage } from '../../types/itemsPerPage';
import { ICONS } from '../../images/icons/Icons';
import { SortByDropdown } from '../../components/Dropdowns/SortByDropdown';
import { DropdownItemOnPage } from '../../components/Dropdowns/DropdownItemOnPage';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Pagination } from '../../components/Pagination/Pagination';
import { NoSearchResults } from '../../components/NoSearchResults/NoSearchResults';

type Props = {
  title: string;
  products: UpgratedProduct[];
};

export const ProductsPage: React.FC<Props> = ({ title, products }) => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'age';
  const itemsPerPage = searchParams.get('perPage') || '8';
  const query = searchParams.get('query') || '';
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const [preparedProducts, count] = getPreparedProducts(
    products,
    query,
    sortBy as keyof typeof SortBy,
    itemsPerPage as ItemsPerPage,
    +page,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setPage(1);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, itemsPerPage]);

  const navigationPath = pathname.slice(1);

  const paginationCounter = Math.ceil(count / +itemsPerPage) || 1;

  return (
    <div className="productsPage">
      <section className="productsPage__navigation">
        <Link to="/" className="productsPage__navigation--link">
          <img src={ICONS.home} alt="Home" />
        </Link>

        <img src={ICONS.arrowRightDisabled} alt="arrow right" />
        <p className="smallText productsPage__navigation--path">
          {navigationPath}
        </p>
      </section>

      <section className="productsPage__description">
        <h1 className="productsPage__description--title">{title}</h1>

        <p className="smallText productsPage__description--models">
          {`${count} models`}
        </p>
      </section>

      <section className="productsPage__content">
        <div className="productsPage__content--sort">
          <SortByDropdown />
          <DropdownItemOnPage />
        </div>

        <div className="productsPage__content--table" data-cy="productList">
          <ProductsList products={preparedProducts} />
        </div>
      </section>

      {paginationCounter > 1 && (
        <Pagination total={paginationCounter} page={page} setPage={setPage} />
      )}

      {!preparedProducts.length && (
        <NoSearchResults category={navigationPath} />
      )}
    </div>
  );
};
