import { useContext } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { ProductCard } from '../components/ProductCard/ProductCard';
import '../styles/ProductPage.scss';
import { StorContext } from '../context/StorContext';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { Droplist } from '../components/Droplist/Droplist';

import { SearchWindow } from '../components/SearchWindow/SearchWindow';
import { Pagination } from '../components/Pagination/Pagination';
import { Path } from '../types/PatchName';

const optionsSort = ['Newest', 'Alphabetically', 'Price'];
const optionsItemsPage = ['4', '8', '16', 'all'];

export const ProductPage = () => {
  const {
    loading,
    error,
    product,

  } = useContext(StorContext);

  const { pathname } = useLocation();
  const categoryPhones = product.filter(prod => prod.category === 'phones');
  const categoryTablets = product.filter(prod => prod.category === 'tablets');
  const categoryAccessories = product.filter(
    prod => prod.category === 'accessories',
  );

  const getCategory = () => {
    switch (pathname) {
      case Path.Phones:
        return categoryPhones;
      case Path.Tablets:
        return categoryTablets;
      case Path.Accessories:
        return categoryAccessories;
      default:
        return [];
    }
  };

  const getTitle = () => {
    switch (pathname) {
      case Path.Phones:
        return 'Mobile phones';
      case Path.Tablets:
        return 'Tablets';
      case Path.Accessories:
        return 'Accessories';
      default:
        return '';
    }
  };

  const copyOfProduct = [...getCategory()];
  const count = copyOfProduct.length;

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sortParams = searchParams.get('sortBy') || 'Newest';

  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 8;
  const lastPage = Math.ceil(count / perPage);
  const isPaginationShow = perPage !== count && lastPage > 1;

  const start = currentPage * perPage - perPage;
  const end = currentPage * perPage <= count
    ? currentPage * perPage
    : count;

  const filteredProducts = query === ''
    ? copyOfProduct
    : copyOfProduct.filter(prod => (
      prod.name.toLowerCase().includes(query.toLowerCase())));

  const sortProduct = () => {
    switch (sortParams) {
      case 'Newest':
        return copyOfProduct.sort((a, b) => {
          const year = b.year - a.year;
          const price = b.price - a.price;

          return year !== 0 ? year : price;
        });

      case 'Alphabetically':
        return copyOfProduct.sort((a, b) => a.name.localeCompare(b.name));

      case 'Price':
        return copyOfProduct.sort((a, b) => a.price - b.price);

      default:
        return copyOfProduct;
    }
  };

  const visibleProducts = sortProduct().slice(start, end);

  return (
    <>
      <div className="product">
        {query && (
          <SearchWindow product={filteredProducts} />
        )}

        {!query && (
          <>
            <div className="product__top">
              <Breadcrumbs />

              <h1 className="product__title">{getTitle()}</h1>

              <p className="product__count">
                {count}
                {' '}
                models
              </p>
            </div>

            {count !== 0
              ? (
                <>
                  <div className="product__sort-container">
                    <Droplist
                      options={optionsSort}
                      startValue="Newest"
                      label="Sort by"
                      searchParamsKey="sortBy"
                    />
                    <Droplist
                      options={optionsItemsPage}
                      startValue="8"
                      label="Items on page"
                      searchParamsKey="perPage"
                    />
                  </div>

                  <div className="product__container">
                    {loading && (
                      <Loader />
                    )}

                    {!error && !loading && (
                      visibleProducts.map((prod) => (
                        <ProductCard product={prod} key={prod.id} />
                      ))
                    )}
                  </div>

                  <div className="product__pagination">
                    {isPaginationShow && (
                      <Pagination
                        total={count}
                        perPage={perPage}
                        currentPage={currentPage}
                      />
                    )}
                  </div>
                </>
              ) : (
                <div className="product__nf">
                  <h3 className="product__nf-title">
                    Sorry, product not found!
                  </h3>

                  <Link
                    to="/home"
                    className="product__nf-back"
                  >
                    Go Home
                  </Link>
                </div>
              )}
          </>
        )}
      </div>
    </>
  );
};
