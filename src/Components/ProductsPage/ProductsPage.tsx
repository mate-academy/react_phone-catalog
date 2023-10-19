import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { deductDiscount } from '../../Helpers/functions/deductDiscount';
import { Product } from '../../Helpers/types/Product';
import { Quantity } from '../../Helpers/types/Quantity';
import { Sorter } from '../../Helpers/types/Sorter';
import { SearchPage } from '../../Pages/SearchPage';
import { QueryContext } from '../Context/QueryContext';
import { Breadcrumbs } from '../Breadcrumbs';
import { NoResults } from '../NoResults';
import { Pagination } from '../Pagination';
import { ProductsList } from '../ProductsList';
import { Select } from '../Select';

type Props = {
  productsFromServer: Product[],
  title: string,
  qtyOptions: Quantity[]
};

const sortOptions = [Sorter.age, Sorter.name, Sorter.price];

export const ProductsPage: React.FC<Props> = ({
  productsFromServer, title, qtyOptions,
}) => {
  const [products, setProducts] = useState(productsFromServer);
  const { query, setQuery } = useContext(QueryContext);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setQuery('');
  }, []);

  const [qtyValue, setQtyValue] = useState<string>(
    searchParams.get('perPage') || Quantity.all,
  );
  const sortValue = searchParams.get('sort') || Sorter.age;
  const perPage = searchParams.get('perPage') || products.length;
  const page = searchParams.get('page') || '1';

  const indexOfLastProduct = +page * +perPage;
  const indexOfFirstProduct = indexOfLastProduct - +perPage;
  const currentProducts = products.slice(
    indexOfFirstProduct, indexOfLastProduct,
  );

  useMemo(() => {
    setProducts(products.sort((a: Product, b: Product) => {
      switch (sortValue) {
        case Sorter.price:
          return deductDiscount(a) - deductDiscount(b);
        case Sorter.name:
          return a.name.localeCompare(b.name);
        case Sorter.age:
        default:
          return a.age - b.age;
      }
    }));
  }, [sortValue]);

  const setPerPage = (param: string) => {
    setQtyValue(param);
    searchParams.delete('page');

    if (param === 'All') {
      searchParams.delete('perPage');
    } else {
      searchParams.set('perPage', param);
    }

    setSearchParams(searchParams);
  };

  const setSortValue = (param: string) => {
    searchParams.set('sort', param);
    setSearchParams(searchParams);
  };

  return (
    <div className="ProductsPage page__section">
      <div className="container">

        {query && <SearchPage appliedQuery={query} products={products} />}
        {!query && products.length === 0 && <NoResults category={title} />}
        {!query && products.length > 0 && (
          <>
            <Breadcrumbs />
            <h1 className="title page__title--products">{title}</h1>
            <p className="body-text body-text--light ProductsPage__models">{`${products.length} models`}</p>

            <div className="ProductsPage__selects">
              <div className="ProductsPage__select-container">
                <label className="text ProductsPage__label" htmlFor="sorter">
                  Sort by
                </label>
                <Select
                  options={sortOptions}
                  selectedValue={sortValue}
                  handler={setSortValue}
                  id="sorter"
                  isSmall={false}
                />
              </div>

              <div className="ProductsPage__select-container">
                <label className="text ProductsPage__label" htmlFor="pager">
                  Items on page
                </label>
                <Select
                  options={qtyOptions}
                  selectedValue={qtyValue}
                  handler={setPerPage}
                  id="pager"
                  isSmall
                />
              </div>
            </div>

            <ProductsList products={currentProducts} />

            {products.length !== 0 && (
              <Pagination
                total={products.length}
                perPage={perPage}
                currentPage={+page}
                onPageChange={(newPage: number) => {
                  searchParams.set('page', `${newPage}`);
                  setSearchParams(searchParams);
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
