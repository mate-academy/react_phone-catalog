import { ProductItem } from '../ProductItem/ProductItem';
import { MyDropdownItems, MyDropdownSortBy } from '../DropDown/DropDow';
import './ProductPage.scss';
import home from '../../../image/home.svg';
import arrow from '../../../image/arrow.svg';
import { useProductHooks } from './usePhonesHooks';
import { useState } from 'react';
import { Product } from '../../types/ProductTypes';
import { Loader } from '../Loader/Loader';

export const ProductPage = () => {
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  const [itemsPrePage, setItemsPrePage] = useState<number | 'all'>(8);

  const {
    products,
    sortBy,
    loading,
    error,
    currentCategory,
    currentPage,
    totalPages,
    setCurrentPage,
    handleSortChange,
  } = useProductHooks();

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

  const itemsPerPage = itemsPrePage === 'all' ? products.length : itemsPrePage;
  const totalsPages = Math.ceil(products.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = sortedProducts.slice(startIndex, endIndex);

  const handleItemsPrePageChange = (option: { value: string }) => {
    const newItemsPerPage =
      option.value === 'all' ? 'all' : Number(option.value);

    setItemsPrePage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <main className="main__phonepage">
      <div className="mobilelink">
        <img src={home} alt="mobilelink__home" />
        <span>
          <img src={arrow} alt="mobilelink__arrow" />
        </span>
        <p className="mobilelink__title">
          {currentCategory}
          {/* Phones */}
          {selectedPhone && (
            <>
              <span>
                <img src={arrow} alt="mobilelink__arrow" />
              </span>
              {selectedPhone}
            </>
          )}
        </p>
      </div>
      {error && (
        <div className="error__container">
          <p className="error-message">
            Oops, something went wrong, please check your connection 🫶💻. Try
            again later ❤️.
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
        <div className="loader-container">
          <Loader />
        </div>
      )}
      {!loading && !error && (
        <>
          <div className="mobile__choice">
            <div className="mobile__dropdown">
              <div className="mobile__sortby">
                <h3 className="sortby">Sort by</h3>
                <MyDropdownSortBy
                  onChange={option => {
                    handleSortChange(option.value);
                  }}
                />
              </div>
              <div className="mobile__items">
                <h3 className="item__page">Items on page</h3>
                <MyDropdownItems onChange={handleItemsPrePageChange} />
              </div>
            </div>
            <div className="mobile__cards">
              {displayedProducts.map((product: Product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  WithAdditionalPrice
                  onClick={() => setSelectedPhone(product.name)}
                />
              ))}
            </div>

            {itemsPrePage !== 'all' && (
              <div className="mobile__buttons">
                <button
                  className={`mobile__buttonsbuttonPrev ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage(prev => prev - 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                {Array.from({ length: totalsPages }, (_, i) => i + 1).map(
                  number => (
                    <button
                      key={number}
                      className={`mobile__pagination ${currentPage === number ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentPage(number);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      {number}
                    </button>
                  ),
                )}
                <button
                  className={`mobile__buttonsbuttonNext ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={() => {
                    if (currentPage < totalPages) {
                      setCurrentPage(prev => prev + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
};
