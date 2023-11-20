import { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { Selector } from '../Selector/Selector';
import { Pagination } from '../Pagination/Pagination';
import { Product } from '../../types/Product';
import { QueryContext } from '../../context/QueryContext';
import { ProductsList } from '../ProductsList/ProductsList';
import { PageContext } from '../../context/PageContext';
import { filteringByQuery } from '../../utils/filteringByQuery';
import { NoSearchResults } from '../NoSearchResults/NoSearchResults';

const sortOptions = ['Newest', 'Alphabetically', 'Cheapest'];
const sortingCriteria = ['age', 'name', 'price'];
const itemsPerPageOptions = ['4', '8', '16', 'all'];
const labels = ['Sort by', 'Items on page'];

type Props = {
  products: Product[];
  title: string;
};

export const PageDetails: React.FC<Props> = ({ products, title }) => {
  const { appliedQuery } = useContext(QueryContext);
  const {
    sortBy,
    currentPage,
    handleSort,
    handlePerPage,
    handleCurrentPage,
    endItem,
    startItem,
    setSearchWith,
    sortedProducts,
    setCurrentPage,
    itemsOnPage,
  } = useContext(PageContext);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentPage(1);
    setSearchWith({ page: '1' });
  }, [appliedQuery]);

  const filteredProducts = filteringByQuery(sortedProducts, appliedQuery);
  const visibleProducts = filteredProducts.slice(startItem, +endItem);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Loader />}

      {!isLoading && (
        <div className="pageDetails">
          <h2 className="pageDetails__title">
            {title}
          </h2>
          <p className="pageDetails__subtitle">{`${products.length} models`}</p>

          <div className="pageDetails__sort">
            <div className="pageDetails__sortBy">
              <Selector
                sortBy={sortBy}
                label={labels[0]}
                handleChange={handleSort}
                sortKeys={sortOptions}
                sortValues={sortingCriteria}
              />
            </div>

            <div className="pageDetails__perPage">
              <Selector
                sortBy={itemsOnPage}
                label={labels[1]}
                handleChange={(event) => handlePerPage(event)}
                sortKeys={itemsPerPageOptions}
                sortValues={itemsPerPageOptions}
              />
            </div>
          </div>

          {visibleProducts && <ProductsList arrOfItems={visibleProducts} />}

          {visibleProducts.length !== 0 ? (
            <Pagination
              total={filteredProducts.length}
              perPage={itemsOnPage}
              currentPage={currentPage}
              onPageChange={handleCurrentPage}
            />
          ) : (
            <NoSearchResults />
          )}
        </div>
      )}
    </>
  );
};
