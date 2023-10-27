import './ProductPageContent.scss';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getAccessories, getPhones, getProducts, getTablets,
} from '../../api/products';
import { Product } from '../../types/Product';
import { SearchParams, getSearchWith } from '../../helpers/searchHelpers';
import { filterProducts } from '../../utils/productFilter';
import { Loader } from '../Loader';
import { ProductsList } from '../ProductsList';
import { Pagination } from '../Pagination';
import { NoResults } from '../NoResults';
import { Dropdown } from '../DropDown';

type Props = {
  title: string
};

// const dropdownSortOptions = [
//   { age: 'Newest' },
//   { name: 'Alphabetically' },
//   { price: 'Cheapest' },
// ];

const listOfOptions = [4, 8, 16];

export const ProductPageContent: React.FC<Props> = ({ title }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +(searchParams.get('page') || 1);
  const perPage = +(searchParams.get('perPage') || 16);
  const sortType = searchParams.get('sort') || 'age';

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const totalProducts = products.length;
  const totalPages = totalProducts / perPage;

  const indexOfLastProduct = currentPage * perPage;
  const indexOfFirstProduct = indexOfLastProduct - perPage;

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handlePerPageChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    setSearchWith({
      page: '1',
      perPage: evt.target.value,
    });
  }

  function handlePerPageChange2(val: number | string) {
    setSearchWith({
      page: '1',
      perPage: val.toString(),
    });
  }

  function handleOptionChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    setSearchWith({
      page: '1',
      sort: evt.target.value,
    });
  }

  useEffect(() => {
    setIsLoading(true);
    let fetch;

    switch (title) {
      case 'Mobile phones':
        fetch = getPhones;
        break;
      case 'Tablets':
        fetch = getTablets;
        break;
      case 'Accessories':
        fetch = getAccessories;
        break;
      default:
        fetch = getProducts;
        break;
    }

    fetch()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, [title]);

  const filteredProducts: Product[] = useMemo(() => {
    return filterProducts(products, sortType);
  }, [products, sortType]);

  const listToRender = filteredProducts
    .slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="products">
      <section className="products__section">
        <h1 className="products__title">
          {title}
        </h1>

        <p className="products__count">
          {products.length}
        </p>
      </section>

      <section className="products__section products__section--small">
        <div className="products__filters">
          <div className="products__filter">
            <label
              className="products__filter-dropdown-label"
              htmlFor="filter-dropdown"
            >
              Sort by
            </label>

            <select
              className="
              products__filter-dropdown
              products__filter-dropdown--sort
              "
              id="filter-dropdown"
              onChange={handleOptionChange}
              defaultValue={sortType}
            >
              <option
                value="age"
              >
                Newest
              </option>

              <option
                value="name"
              >
                Alphabetically
              </option>

              <option
                value="price"
              >
                Cheapest
              </option>
            </select>
          </div>

          <Dropdown
            options={listOfOptions}
            defaultOption={perPage}
            selectedOption={perPage}
            changeOption={(val) => handlePerPageChange2(val)}
          />

          <div className="products__filter">
            <label
              className="products__filter-dropdown-label"
              htmlFor="filter-dropdown"
            >
              Items on page
            </label>

            <select
              className="
              products__filter-dropdown
              products__filter-dropdown--perPage
              "
              onChange={handlePerPageChange}
              defaultValue={perPage}
              id="filter-dropdown"
            >
              {listOfOptions.map(option => (
                <option
                  value={option}
                  key={option}
                >
                  {option}
                </option>
              ))}
              <option
                value={totalProducts}
              >
                all
              </option>
            </select>
          </div>
        </div>
      </section>

      {products.length > 0 && !isLoading && (
        <section className="products__section">
          <ProductsList
            products={listToRender}
          />
        </section>
      )}

      {totalPages > 1 && (
        <Pagination
          total={totalProducts}
          perPage={perPage}
          currentPage={currentPage}
        />
      )}

      {isLoading && !products.length && (
        <Loader />
      )}

      {!products.length && !isLoading && (
        <NoResults
          category={title}
        />
      )}
    </div>
  );
};
