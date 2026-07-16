import { useMemo } from 'react';
import './ProductPage.scss';
import { ProductsList } from '../shared/components/ProductsList';
import { Filter } from './components/Filter';
import { Pagination } from './components/Pagination';
import { Product } from '../../types/Product';
import { useLocation } from 'react-router-dom';
import { getSearchWith } from '../../utils/getSearchWith';
import { useGlobalContext } from '../../context/GlobalContext';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { Search } from './components/Search/Search';
import { useLanguage } from '../../context/LanguageContext';
import { ItemsPage, Option, SortBy } from './components/Filter/Filter';
import { Category } from '../../types/Category';

const sortBy: Option[] = [
  {
    value: 'newest',
    id: 0,
  },
  {
    value: 'alphabetically',
    id: 1,
  },
  {
    value: 'cheapest',
    id: 2,
  },
];
const itemsPage: Option[] = [
  {
    value: '4',
    id: 0,
  },
  {
    value: '8',
    id: 1,
  },
  {
    value: '16',
    id: 2,
  },
  {
    value: 'all',
    id: 3,
  },
];

export const ProductPage = () => {
  const { allProducts, searchParams, setSearchParams } = useGlobalContext();
  const { texts } = useLanguage();
  const location = useLocation();
  const category = location.pathname.slice(1);
  const activeCategory = location.pathname.slice(1) as Category;

  const perPage = useMemo(() => {
    return (searchParams.get('perPage') as ItemsPage) || '4';
  }, [searchParams]);

  const sort = useMemo(() => {
    return (searchParams.get('sort') as SortBy) || 'newest';
  }, [searchParams]);

  const currentPage = useMemo(() => {
    return searchParams.get('page') || '1';
  }, [searchParams]);

  const searchValue = useMemo(() => {
    return searchParams.get('query') || '';
  }, [searchParams]);

  const categoryProducts = useMemo(() => {
    return allProducts.filter(product => product.category === category);
  }, [category, allProducts]);

  const filteredProducts = useMemo(() => {
    let sorted: Product[] = [...categoryProducts].sort(
      (firstProduct, nextProduct) => nextProduct.year - firstProduct.year,
    );

    if (searchValue.length > 0) {
      sorted = sorted.filter(product =>
        product.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    switch (sort) {
      case 'alphabetically':
        sorted = [...sorted].sort((firstProduct, nextProduct) =>
          firstProduct.name.localeCompare(nextProduct.name),
        );
        break;

      case 'cheapest':
        sorted = [...sorted].sort(
          (firstProduct, nextProduct) => firstProduct.price - nextProduct.price,
        );
        break;

      default:
        break;
    }

    return sorted;
  }, [searchValue, categoryProducts, sort]);

  const variableProducts = useMemo(() => {
    const startProduct = (+currentPage - 1) * +perPage;
    const lastProduct = startProduct + +perPage;

    return filteredProducts.slice(startProduct, lastProduct);
  }, [filteredProducts, currentPage, perPage]);

  const showPagination = perPage !== 'all' && filteredProducts.length > 0;

  const handleSearchParams = (
    key: 'sort' | 'page' | 'perPage' | 'query',
    value: string | null,
  ) => {
    let paramsToUpdate = {
      [key]: value,
    };

    if (key === 'perPage') {
      paramsToUpdate = {
        ...paramsToUpdate,
        page: '1',
      };
    }

    const newSearchParams = getSearchWith(paramsToUpdate, searchParams);

    setSearchParams(newSearchParams);
  };

  return (
    <div className="product-page">
      <div className="container container--product-page">
        <section className="section section--head">
          <Breadcrumbs
            className="product-page__breadcrumbs"
            category={activeCategory}
          />
        </section>
        <section className="section section--main">
          <div className="main">
            <h1 className="product-page__title">{`${texts[activeCategory]}`}</h1>
            <p className="product-page__count">{`${categoryProducts.length} ${texts.models}`}</p>
          </div>
          {categoryProducts.length > 0 && (
            <div className="product-page__sort">
              <div className="product-page__filter-area">
                <Filter
                  options={sortBy}
                  className="product-page__filter"
                  title={texts.sortBy}
                  id="sort-by"
                  value={sort}
                  onChange={val => handleSearchParams('sort', val)}
                />
                <Filter
                  options={itemsPage}
                  className="product-page__filter"
                  title={texts.itemsOnPage}
                  id="items-on-page"
                  value={perPage}
                  onChange={val => handleSearchParams('perPage', val)}
                />
              </div>
              <Search
                className="product-page__search"
                placeholder={texts.enterText}
                label={texts.productSearch}
                searchValue={searchValue}
                onChange={val => handleSearchParams('query', val)}
              />
            </div>
          )}
        </section>
        <section className="section section--products-list">
          {filteredProducts.length > 0 && (
            <ProductsList
              products={perPage === 'all' ? filteredProducts : variableProducts}
              className="product-page__products-list"
            />
          )}
          {filteredProducts.length === 0 && (
            <>
              <h2 className="product-page__no-products-yet">
                {`${texts.thereAreNoProductsInThisCategoryForYourSearch}:
                ${searchParams.get('query')}`}
              </h2>
              <img
                className="product-page__not-found-product"
                src="img/product-not-found.png"
                alt="product-not-found"
              />
            </>
          )}
          {categoryProducts.length === 0 && (
            <h2 className="product-page__no-products-yet">
              {`${texts.thereAreNo} ${category} ${texts.yet}`}
            </h2>
          )}
        </section>
        {showPagination && (
          <section className="section section--pagination">
            <Pagination
              totalProducts={filteredProducts.length}
              perPage={+perPage}
              currentPage={+currentPage}
              handleSearchParams={handleSearchParams}
            />
          </section>
        )}
      </div>
    </div>
  );
};
