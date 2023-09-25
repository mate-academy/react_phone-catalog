/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom';
import { ProductList } from '../../Components/ProductList/ProductList';
import { getTablets } from '../../Helpers/api';
import './TabletsPage.scss';
import { Loader } from '../../Components/Loader/Loader';
import { Pagination } from '../../Components/Pagination/Pagination';
import { filterFunction, useProductPage } from '../../Helpers/functions';
import { useSearch } from '../../Helpers/SearchContext';

export const TabletsPage: React.FC = () => {
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
  } = useProductPage(getTablets, 'age', 4);

  const { searchQuery } = useSearch();
  const filteredProducts = filterFunction(products, searchQuery);

  return (
    <>
      <section className="tablets">
        <div className="tablets__links">
          <Link to="/">
            <img
              src="images/Home.svg"
              alt="HomeIcon"
              className="tablets__icon"
            />
          </Link>

          <img
            src="images/DisabledArrow.svg"
            alt="Arrow"
            className="tablets__icon"
          />

          <p className="tablets__string">Tablets</p>
        </div>

        <h1 className="tablets__title">Tablets</h1>

        <p className="tablets__quantity">
          {products.length}
          &nbsp;models
        </p>

        <div className="tablets__dropdowns">
          <label className="tablets__label tablets__string">
            Sort by
            <select
              value={sortingOption}
              onChange={(e) => setSortingOption(e.target.value)}
              className="tablets__sorting"
            >
              <option value="age">Newest</option>
              <option value="name">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
          </label>

          <label className="tablets__label tablets__string">
            Items on page
            <select
              value={perPage}
              onChange={handlePerPageChange}
              className="tablets__sorting"
            >
              <option key="all" value="all">all</option>
              <option key="4" value="4">4</option>
              <option key="8" value="8">8</option>
              <option key="16" value="16">16</option>
            </select>
          </label>
        </div>

        {isLoading
          ? (<Loader />)
          : (
            <ProductList
              products={
                filteredProducts.slice(
                  (currentPage - 1) * perPage, currentPage * perPage,
                )
              }
            />
          )}

        <Pagination
          total={totalItems}
          perPage={perPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </section>
    </>
  );
};
