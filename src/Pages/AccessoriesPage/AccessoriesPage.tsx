/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom';
import { ProductList } from '../../Components/ProductList/ProductList';
import { getAccessories } from '../../Helpers/api';
import './AccessoriesPage.scss';
import { Loader } from '../../Components/Loader/Loader';
import { Pagination } from '../../Components/Pagination/Pagination';
import { NoResults } from '../../Components/NoResults/NoResults';
import { filterFunction, useProductPage } from '../../Helpers/functions';
import { useSearch } from '../../Helpers/SearchContext';

export const AccessoriesPage: React.FC = () => {
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
  } = useProductPage(getAccessories, 'age', 4);

  const { searchQuery } = useSearch();
  const filteredProducts = filterFunction(products, searchQuery);

  return (
    <>
      {products.length === 0 ? (
        <NoResults category="Accessories" />
      ) : (
        <section className="accessories">
          <div className="accessories__links">
            <Link to="/">
              <img
                src="images/Home.svg"
                alt="HomeIcon"
                className="accessories__icon"
              />
            </Link>

            <img
              src="images/DisabledArrow.svg"
              alt="Arrow"
              className="accessories__icon"
            />

            <p className="accessories__string">Accessories</p>
          </div>

          <h1 className="accessories__title">Accessories</h1>

          <p className="accessories__quantity">
            {products.length}
            &nbsp;models
          </p>

          <div className="accessories__dropdowns">
            <label className="accessories__label accessories__string">
              Sort by
              <select
                value={sortingOption}
                onChange={(e) => setSortingOption(e.target.value)}
                className="accessories__sorting"
              >
                <option value="age">Newest</option>
                <option value="name">Alphabetically</option>
                <option value="price">Cheapest</option>
              </select>
            </label>

            <label className="accessories__label accessories__string">
              Items on page
              <select
                value={perPage}
                onChange={handlePerPageChange}
                className="accessories__sorting"
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
      )}
    </>
  );
};
