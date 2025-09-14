import { useState } from 'react';
import { useProductHook } from './useProductHook';
import home from '../../../public/img/home.svg';
import back from '../../../public/img/arrowLeft.svg';
import goto from '../../../public/img/arrowRight.svg';
import { NavLink } from 'react-router-dom';
import { Loader } from '../Loader';
import { DDNum, DDSortBy } from '../DropDown';
import { Product } from '../../types/ProductTypes';
import { ProductItem } from '../ProductItem';
import './ProductPage.module.scss';

export const ProductPage = () => {
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  // eslint-disable-next-line
  const [itemsOnPage, setItemsOnPage] = useState<number | 'all'>(8);

  const {
    products,
    sortBy,
    loading,
    error,
    currentCategory,
    currentPage,
    totalPages,
    handleSortChange,
    handleItemsPerPageChange,
    handlePageChange,
  } = useProductHook();

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'Newest') {
      return b.year - a.year;
    }

    if (sortBy === 'Alphabetically') {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === 'Cheapest') {
      return a.fullPrice - b.fullPrice;
    }

    return a.name.localeCompare(b.name);
  });

  const itemsPerPage = itemsOnPage === 'all' ? products.length : itemsOnPage;
  const totalPagess = Math.ceil(products.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts = sortedProducts.slice(startIndex, endIndex);

  return (
    <main className="main__phonepage">
      <div className="mobilelink">
        <NavLink to="/">
          <img src={home} alt="home" />
        </NavLink>
        {/* mb goto*/}
        <span>
          <img src={back} alt="back" />
        </span>
        <p className="mobilelink__title">
          {currentCategory}
          {selectedPhone && (
            <>
              <span>
                <img src={back} alt="back" />
              </span>
              {selectedPhone}
            </>
          )}
        </p>
      </div>
      {error && (
        <div className="error__container">
          <p className="error__message">
            Something went wrong...
            <br>Please, check your connection and try later</br>
          </p>
        </div>
      )}

      {!error && (
        <>
          <h1 className="page__title">
            {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
          </h1>
        </>
      )}

      {loading && (
        <div className="loadere-container">
          <Loader />
        </div>
      )}
      {!loading && !error && (
        <>
          <div className="mobile__choise">
            <div className="mobile__dropdown">
              <div className="mobile__sortBy">
                <h3 className="sortby">Sort By</h3>
                <DDSortBy
                  onChange={option => {
                    handleSortChange(option.value);
                  }}
                />
              </div>
              <div className="mobile__items">
                <h3 className="sortby">Sort By</h3>
                <DDNum
                  onChange={option => {
                    handleItemsPerPageChange(Number(option.value));
                  }}
                />
              </div>
            </div>
            <div className="mobile__cards">
              {visibleProducts.map((product: Product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  AdditionalPrice
                  onClick={() => setSelectedPhone}
                />
              ))}
            </div>

            {itemsOnPage !== 'all' && (
              <div className="mobile__buttons">
                <button
                  className={`mobile__buttonPrev ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <img src={back} alt="Back" />
                </button>
                {Array.from({ length: totalPagess }, (_, i) => i + 1).map(
                  number => (
                    <button
                      key={number}
                      className={`mobile__pagination ${currentPage === number ? 'active' : ''}`}
                      onClickCapture={() => handlePageChange(number)}
                      disabled={currentPage === number}
                    >
                      {number}
                    </button>
                  ),
                )}
                <button
                  className={`mobile__buttonNext ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <img src={goto} alt="Goto" />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
};
