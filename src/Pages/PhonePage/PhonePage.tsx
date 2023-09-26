/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom';
import { ProductList } from '../../Components/ProductList/ProductList';
import { getPhones } from '../../Helpers/api';
import './PhonePage.scss';
import { Loader } from '../../Components/Loader/Loader';
import { Pagination } from '../../Components/Pagination/Pagination';
import {
  filterFunction,
  noResult,
  useProductPage,
} from '../../Helpers/functions';
import { useSearch } from '../../Helpers/SearchContext';
import {
  NoSearchResults,
} from '../../Components/NoSearchResults/NoSearchResults';

export const PhonePage: React.FC = () => {
  const {
    products,
    isLoading,
    sortingOption,
    currentPage,
    perPage,
    totalItems,
    handlePerPageChange,
    setSortingOption,
    setCurrentPage,
  } = useProductPage(getPhones, 'age', 4);

  const { searchQuery } = useSearch();
  const filteredProducts = filterFunction(products, searchQuery);
  const isNoResult = noResult(products, searchQuery);
  let content = null;

  if (searchQuery !== '' && !isNoResult) {
    content = <NoSearchResults />;
  } else {
    content
      = (
        <>
          <ProductList
            products={
              filteredProducts.slice(
                (currentPage - 1) * perPage, currentPage * perPage,
              )
            }
          />

          <Pagination
            total={totalItems}
            perPage={perPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      );
  }

  return (
    <>
      <section className="phone">
        <div className="phone__links">
          <Link to="/">
            <img src="images/Home.svg" alt="HomeIcon" className="phone__icon" />
          </Link>

          <img
            src="images/DisabledArrow.svg"
            alt="Arrow"
            className="phone__icon"
          />

          <p className="phone__string">Phones</p>
        </div>

        <h1 className="phone__title">Mobile phones</h1>

        <p className="phone__quantity">
          {products.length}
          &nbsp;models
        </p>

        <div className="phone__dropdowns">
          <label className="phone__label phone__string">
            Sort by
            <select
              value={sortingOption}
              onChange={(e) => setSortingOption(e.target.value)}
              className="phone__sorting"
            >
              <option value="age">Newest</option>
              <option value="name">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
          </label>

          <label className="phone__label phone__string">
            Items on page
            <select
              value={perPage}
              onChange={handlePerPageChange}
              className="phone__sorting"
            >
              <option key="all" value="all">all</option>
              <option key="4" value="4">4</option>
              <option key="8" value="8">8</option>
              <option key="16" value="16">16</option>
            </select>
          </label>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          content
        )}
      </section>
    </>
  );
};
