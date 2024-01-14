import { useContext, useEffect } from 'react';
import { Pagination } from '../../components/Pagination';
import { PathBlock } from '../../components/PathBlock';
import { ProductsList } from '../../components/ProductsList';
import { MainContext } from '../../context';
import { NotFoundProducts } from '../../components/NotFoundProducts';

export const Tablets = () => {
  const {
    setCurrentPage,
    currentPage,
    tablets,
  } = useContext(MainContext);

  useEffect(() => {
    setCurrentPage('Tablets');
  }, []);

  return (
    <div className="product__page">
      <PathBlock currentPage={currentPage} />
      <h1 className="page__title">{currentPage}</h1>
      <p className="products-range">{`${tablets.length} models`}</p>
      {tablets.length === 0
        ? <NotFoundProducts />
        : (
          <>
            <div className="selectors__wrapper">
              <div className="select__sort-by">
                <p className="selector__title">Sort by</p>
                <select
                  name="sort-by"
                  className="select__field select__field--sort"
                >
                  <option value="No sorting">No sorting</option>
                  <option value="Newest">Newest</option>
                  <option value="Alphabetically">Alphabetically</option>
                  <option value="Cheapest">Cheapest</option>
                </select>
              </div>
              <div className="select__items-on-page">
                <p className="selector__title">Items on page</p>
                <select
                  name="items-on-page"
                  className="select__field select__field--items"
                >
                  <option value="All">All</option>
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                </select>
              </div>
            </div>
            <div className="product-list__wrapper">
              <ProductsList products={tablets} />
            </div>
            <Pagination />
          </>
        )}

    </div>
  );
};
