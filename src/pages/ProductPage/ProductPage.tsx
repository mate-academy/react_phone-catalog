import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select } from '../../components/Select';
import { Product } from '../../types/Product';
import { priceWithDiscount } from '../../helpers/priceWithDiscount';
import { Pagination } from '../../components/Pagination';
import { ProductList } from '../../components/ProductList/ProductList';
import { Search } from '../../components/Search';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import './ProductPage.scss';

const sortOptions = ['Newest', 'Alphabetically', 'Cheapest'];
const perPageOptions = ['4', '8', '16', 'All'];

type Props = {
  pageName: string;
  products: Product[];
};

const debounce = (f: (query: string) => void, delay: number) => {
  let timerId: number;

  return (...args: string[]) => {
    clearTimeout(timerId);

    timerId = window.setTimeout(f, delay, ...args);
  };
};

export const ProductPage: React.FC<Props> = ({
  pageName,
  products,
}) => {
  const [filteredProduct, setFilteredProducts] = useState(products);
  const [sortedProducts, setSortedProducts] = useState(products);
  const [sortValue, setSortValue] = useState(sortOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(
    perPageOptions[perPageOptions.length - 1],
  );
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const navigate = useNavigate();
  const visibleProducts: Product[] = [];
  const productName = pageName.toLowerCase();

  let start = 0;
  let finish: number = sortedProducts.length;

  if (perPage !== 'All') {
    start = currentPage * +perPage - +perPage;
    finish = Math.min(currentPage * +perPage, sortedProducts.length);
  }

  for (let i: number = start; i < finish; i += 1) {
    visibleProducts.push(sortedProducts[i]);
  }

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000), [],
  );

  const sortProducts = () => {
    switch (sortValue) {
      case 'Newest':
        setSortedProducts(
          [...filteredProduct].sort((a, b) => a.age - b.age),
        );
        break;

      case 'Alphabetically':
        setSortedProducts(
          [...filteredProduct].sort((a, b) => a.name.localeCompare(b.name)),
        );
        break;

      case 'Cheapest':
        setSortedProducts(
          [...filteredProduct].sort(
            (a, b) => priceWithDiscount(a) - priceWithDiscount(b),
          ),
        );
        break;

      default:
        return products;
    }

    return 0;
  };

  useEffect(() => {
    const filter = products.filter(
      product => product.name.toLocaleLowerCase()
        .includes(appliedQuery.toLocaleLowerCase()),
    );

    setFilteredProducts(filter);
  }, [appliedQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [perPage, appliedQuery]);

  useEffect(() => {
    sortProducts();

    if (filteredProduct.length === 1) {
      navigate(
        `/${filteredProduct[0].type}s/${filteredProduct[0].id}`,
      );
    }

    if (products.length && !filteredProduct.length) {
      setErrorMessage('No products matching your request');
    }

    if (products.length && filteredProduct.length) {
      setErrorMessage('');
    }
  }, [filteredProduct]);

  useEffect(() => {
    if (!products.length) {
      setErrorMessage(`No ${productName} available at the moment`);
    }
  }, []);

  return (
    <div className="ProductPage">
      <div className="ProductPage__nav">
        <Breadcrumbs />
      </div>

      <h1 className="ProductPage__title">
        {pageName}
      </h1>

      <span className="ProductPage__subtitle text text--light">
        {`${filteredProduct.length} models`}
      </span>

      {products.length > 0
        && (
          <Search
            pageName={productName}
            query={query}
            setQuery={setQuery}
            applyQuery={applyQuery}
            setCurrentPage={setCurrentPage}
          />
        )}

      {!errorMessage
        ? (
          <div className="container">
            <div className="container container--start">
              <span
                className="
                  ProductPage__select-label small-text small-text--light
                "
              >
                Sort By
              </span>
              <Select
                currentOption={sortValue}
                setCurrentOption={setSortValue}
                options={sortOptions}
              />
            </div>

            <div className="container container--start">
              <span
                className="
                  ProductPage__select-label small-text small-text--light
                "
              >
                Items on page
              </span>
              <Select
                currentOption={perPage}
                setCurrentOption={setPerPage}
                options={perPageOptions}
              />
            </div>
          </div>
        ) : (
          <h2>{errorMessage}</h2>
        )}

      <div
        data-cy="cardsContainer"
        className="container"
      >
        <ProductList productList={visibleProducts} />
      </div>

      <div className="ProductPage__pagination">
        <Pagination
          total={sortedProducts.length}
          perPage={perPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};
