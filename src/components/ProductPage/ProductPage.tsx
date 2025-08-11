import { ProductItem } from '../ProductItem';
import { DDNum, DDSortBy } from '../DropDown';
import './ProductPage.scss';
import home from '../../img/home.svg';
import back from '../../img/arrowLeft.svg';
import goto from '../../img/arrowRight.svg';
import { useState } from 'react';
import { useProductHook } from './useProductHook';
import { Product } from '../../types/ProductTipes';
import { GlassyOrbLoader } from '../Loader/GlassyOrbLoader';
import { NavLink } from 'react-router-dom';

export const ProductPage = () => {
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);

  const {
    currentItems,
    loading,
    error,
    currentCategory,
    currentPage,
    totalPages,
    handleSortChange,
    handleItemsPerPageChange,
    handlePageChange,
    itemPrevPage,
    products,
  } = useProductHook();

  return (
    <main className="main__phonepage">
      <div className="mobilelink">
        <NavLink to="/">
          <img src={home} alt="home" />
        </NavLink>
        <span>
          <img src={back} alt="Back" />
        </span>
        <p className="mobilelink__title">
          {currentCategory}
          {selectedPhone && (
            <>
              <span>
                <img src={back} alt="Back" />
              </span>
              {selectedPhone}
            </>
          )}
        </p>
      </div>

      {error && (
        <div className="error__container">
          <p className="error__message">
            Something is wrong...please check your connection or try again later
          </p>
        </div>
      )}

      {!error && (
        <>
          <h1 className="page__title">
            {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
          </h1>
          <h1 className="mobile__models">{`${products.length} models`}</h1>
        </>
      )}

      {loading && (
        <div className="loadere-container">
          <GlassyOrbLoader />
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="mobile__choise">
            <div className="mobile__dropdown">
              <div className="mobile__sortby">
                <h3 className="sortby">Sort by</h3>
                <DDSortBy
                  onChange={option => {
                    handleSortChange(option.value);
                  }}
                />
              </div>
              <div className="mobile__items">
                <h3 className="item__page">Items on page</h3>
                <DDNum
                  onChange={option =>
                    handleItemsPerPageChange(Number(option.value))
                  }
                />
              </div>
            </div>

            <div className="mobile__cards">
              {currentItems.map((product: Product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  AdditionalPrice
                  onClick={() => setSelectedPhone(product.name)}
                />
              ))}
            </div>

            {itemPrevPage !== products.length && (
              <div className="mobile__buttons">
                <button
                  className={`mobile__buttonsPrev ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <img src={back} alt="Back" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    className={`mobile__pagination ${currentPage === number ? 'active' : ''}`}
                    onClickCapture={() => handlePageChange(number)}
                    disabled={currentPage === number}
                  >
                    {number}
                  </button>
                ))}

                <button
                  className={`mobile__buttonNext ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <img src={goto} alt="GoTo" />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
};
