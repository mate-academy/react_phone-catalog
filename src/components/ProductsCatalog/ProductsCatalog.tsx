import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useOnclickOutside from 'react-cool-onclickoutside';
import { getSearchWith } from '../../utils/searchHelper';
import { Pagination } from '../Pagination/Pagination';
import { ProductsList } from '../ProductsList/ProductsList';
import { Product } from '../../types/Product';
import { NoResults } from '../NoResults/NoResults';
import { NoSearchResults } from '../NoSearchResults/NoSearchResults';
import './ProductsCatalog.scss';

type Props = {
  products: Product[],
  category: string,
};

export const ProductsCatalog: React.FC<Props> = ({ products, category }) => {
  const [openSortMenu, setOpenSortMenu] = useState<boolean>(false);
  const [openPerPageMenu, setOpenPerPageMenu] = useState<boolean>(false);
  const [seachParams, setSearchParams] = useSearchParams();
  const sortBy = seachParams.get('sortBy' || '');
  const itemsPerPage = seachParams.get('itemsPerPage' || '');
  const page = seachParams.get('page' || '');
  const query = seachParams.get('query' || '');

  const searchProducts = () => {
    if (query) {
      return products.filter(item => item.name.toLowerCase()
        .includes(query.toLowerCase()));
    }

    return products;
  };

  const searchedProducts = useMemo(searchProducts, [products, query]);

  const sortProducts = () => {
    searchedProducts.sort((a, b) => {
      switch (sortBy) {
        case 'age':
          return a.age - b.age;

        case 'price':
          return (a.price - a.price * (a.discount / 100))
        - (b.price - b.price * (b.discount / 100));

        case 'name':
          return a.name.localeCompare(b.name);

        default:
          return 0;
      }
    });

    return searchedProducts;
  };

  const sortedProducts
    = useMemo(sortProducts, [products, searchedProducts, sortBy]);

  const pages = Array.from(Array(Math
    .ceil(sortedProducts.length
      / (itemsPerPage && itemsPerPage !== 'all'
        ? +itemsPerPage
        : +sortedProducts.length) || 16) + 1)
    .keys()).slice(1);

  return (
    <div className="productsCatalog">
      <h1 className="productsCatalog__title">{category}</h1>
      <p className="productsCatalog__subtitle">{`${products.length} models`}</p>

      <div className="productsCatalog__sort">
        <div
          className="productsCatalog__configuration"
          ref={useOnclickOutside(() => {
            setOpenSortMenu(false);
          })}
        >
          <p className="productsCatalog__text">Sort by</p>
          <button
            type="button"
            className="productsCatalog__select"
            onClick={() => {
              setOpenSortMenu(!openSortMenu);
            }}
          >
            {!sortBy && 'Newest'}
            {sortBy === 'age' && 'Newest'}
            {sortBy === 'price' && 'Cheapest'}
            {sortBy === 'name' && 'Alphabetically'}

            {openSortMenu
              ? <img src="../../img/arrowUpDisabled.svg" alt="arrowUp" />
              : <img src="../../img/arrowDownDisabled.svg" alt="arrowDown" />}
          </button>

          {openSortMenu && (
            <div
              className="productsCatalog__options
                productsCatalog__options--sortBy"
            >
              <button
                type="button"
                className="productsCatalog__option"
                onClick={() => {
                  setSearchParams(getSearchWith(seachParams, {
                    page: null,
                    sortBy: 'age',
                  }));
                  setOpenSortMenu(false);
                }}
              >
                Newest
              </button>
              <button
                type="button"
                className="productsCatalog__option"
                onClick={() => {
                  setSearchParams(getSearchWith(seachParams, {
                    page: null,
                    sortBy: 'name',
                  }));
                  setOpenSortMenu(false);
                }}
              >
                Alphabetically
              </button>
              <button
                type="button"
                className="productsCatalog__option"
                onClick={() => {
                  setSearchParams(getSearchWith(seachParams, {
                    page: null,
                    sortBy: 'price',
                  }));
                  setOpenSortMenu(false);
                }}
              >
                Cheapest
              </button>
            </div>
          )}
        </div>

        <div
          className="productsCatalog__configuration"
          ref={useOnclickOutside(() => {
            setOpenPerPageMenu(false);
          })}
        >
          <p className="productsCatalog__text">Items on page</p>
          <button
            type="button"
            className="productsCatalog__select
              productsCatalog__select--visibleItems"
            onClick={() => {
              setOpenPerPageMenu(!openPerPageMenu);
            }}
          >

            {(itemsPerPage === 'all' ? 'All' : itemsPerPage) || 16}

            {openPerPageMenu
              ? <img src="../../img/arrowUpDisabled.svg" alt="arrowUp" />
              : <img src="../../img/arrowDownDisabled.svg" alt="arrowDown" />}
          </button>

          {openPerPageMenu && (
            <div className="productsCatalog__options
            productsCatalog__options--visibleItems"
            >
              <button
                type="button"
                className="productsCatalog__option"
                onClick={() => {
                  setSearchParams(getSearchWith(seachParams, {
                    page: null,
                    itemsPerPage: String(4),
                  }));
                  setOpenPerPageMenu(false);
                }}
              >
                4
              </button>
              <button
                type="button"
                className="productsCatalog__option"
                onClick={() => {
                  setSearchParams(getSearchWith(seachParams, {
                    page: null,
                    itemsPerPage: String(8),
                  }));
                  setOpenPerPageMenu(false);
                }}
              >
                8
              </button>
              <button
                type="button"
                className="productsCatalog__option"
                onClick={() => {
                  setSearchParams(getSearchWith(seachParams, {
                    page: null,
                    itemsPerPage: String(16),
                  }));
                  setOpenPerPageMenu(false);
                }}
              >
                16
              </button>

              <button
                type="button"
                className="productsCatalog__option"
                onClick={() => {
                  setSearchParams(getSearchWith(seachParams, {
                    page: null,
                    itemsPerPage: 'all',
                  }));
                  setOpenPerPageMenu(false);
                }}
              >
                All
              </button>
            </div>
          )}
        </div>
      </div>

      {products.length === 0
        ? <NoResults />
        : (
          <>
            {searchedProducts.length === 0
              ? (
                <NoSearchResults />
              )
              : (
                <>
                  <ProductsList
                    sortedProducts={sortedProducts}
                    page={page || null}
                    itemsPerPage={itemsPerPage || null}
                  />

                  { pages.length > 1 && (
                    <Pagination pages={pages} />
                  )}
                </>
              )}
          </>
        )}

    </div>
  );
};
