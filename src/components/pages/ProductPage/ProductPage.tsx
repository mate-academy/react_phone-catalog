import React, {
  useContext,
  useEffect, useMemo, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../Breadcrumbs';
import { Select } from '../../Select';
import { ProductsList } from '../../ProductsList';
import { Loader } from '../../Loader';
import { Pagination } from '../../Pagination';
import { NoResults } from '../../NoResults';
import { ProductsContext } from '../../ProductProvider';
import { NoSearchResults } from '../../NoSearchResults';

type Props = {
  products: Product[];
  title: string;
};

export const ProductPage: React.FC<Props> = ({
  products, title,
}) => {
  const { loading } = useContext(ProductsContext);
  const optionsSortBy = ['Newest', 'Alphabetically', 'Cheapest'];
  const optionsItemsOnPage = ['all', '4', '8', '16'];
  const [sortBy, setSortBy] = useState<string>('Newest');
  const [perPage, setPerPage] = useState<string>('4');
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const appliedQuery = searchParams.get('query') || '';

  const foundProducts: Product[] = useMemo(() => {
    if (appliedQuery) {
      return products.filter(
        product => product.name.toLowerCase().includes(
          appliedQuery.toLowerCase(),
        ),
      );
    }

    return [];
  }, [appliedQuery]);

  useEffect(() => {
    if (products.length === 0) {
      const keys = Object.keys(Object.fromEntries(searchParams.entries()));

      keys.forEach(key => {
        searchParams.delete(key);
      });

      setSearchParams(searchParams);
    } else {
      switch (sortBy) {
        case 'Newest':
          searchParams.set('sort', 'age');
          break;
        case 'Alphabetically':
          searchParams.set('sort', 'name');
          break;
        case 'Cheapest':
          searchParams.set('sort', 'price');
          break;
        default:
          break;
      }

      searchParams.set('page', `${page}`);
      searchParams.set('perPage', `${perPage}`);

      setSearchParams(searchParams);
    }
  }, [products, sortBy, page, perPage]);

  const visibleProducts: Product[] = useMemo(() => {
    let currentProducts;

    if (sort) {
      switch (sort) {
        case 'age':
          currentProducts = products.sort(
            (p1, p2) => p1[sort] - p2[sort],
          );
          break;
        case 'price':
          currentProducts = products.sort((p1, p2) => (
            p1[sort] - (p1[sort] * (p1.discount / 100)) - (
              p2[sort] - (p2[sort] * (p2.discount / 100))
            )));
          break;
        case 'name':
          currentProducts = products.sort(
            (p1, p2) => p1[sort].localeCompare(p2[sort]),
          );
          break;
        default:
          break;
      }
    }

    currentProducts = products;

    if (perPage === 'all') {
      return currentProducts;
    }

    const lastIndex = page * +perPage;
    const firstIndex = lastIndex - +perPage;

    return currentProducts.slice(firstIndex, lastIndex);
  }, [products, sort, page, perPage]);

  const pageChange = (number: number) => {
    setPage(number);
  };

  const prevPage = () => {
    setPage(currentPage => currentPage - 1);
  };

  const nextPage = () => {
    setPage(currentPage => currentPage + 1);
  };

  return (
    <div className="productsPage">
      {appliedQuery
        ? (
          <>
            {foundProducts.length > 0
              ? (
                <>
                  <div className="
                    productsPage__number
                    productsPage__number--found"
                  >
                    {`${foundProducts.length} ${foundProducts.length > 1 ? 'results' : 'result'}`}
                  </div>
                  <ProductsList products={foundProducts} />
                </>
              )
              : (
                <NoSearchResults query={appliedQuery} />
              )}
          </>
        )

        : (
          <>
            <div className="productsPage__nav">
              <Breadcrumbs />
            </div>

            {products.length === 0
              ? <NoResults title={title} />
              : (
                <>
                  <div className="productsPage__top">
                    <h1 className="productsPage__title">{title}</h1>
                    <div className="productsPage__number">
                      {`${products.length} ${products.length > 1 ? 'models' : 'model'}`}
                    </div>
                  </div>
                  <div className="productsPage__sort-block">
                    <Select
                      title="Sort by"
                      options={optionsSortBy}
                      value={sortBy}
                      onChange={option => setSortBy(option)}
                    />
                    <Select
                      title="Items on page"
                      options={optionsItemsOnPage}
                      value={perPage}
                      onChange={option => {
                        setPerPage(option);
                        setPage(1);
                      }}
                    />
                  </div>
                </>
              )}

            <div className="productsPage__productList">
              { !loading
                ? <Loader />
                : <ProductsList products={visibleProducts} />}
            </div>

            {(perPage !== 'all'
        && +perPage < products.length
        && products.length > 0)
        && (
          <div className="productsPage__pagination">
            <Pagination
              total={products.length}
              perPage={perPage}
              page={page}
              onPageChange={pageChange}
              onPrevPage={prevPage}
              onNextPage={nextPage}
            />
          </div>
        )}
          </>
        )}
    </div>
  );
};
