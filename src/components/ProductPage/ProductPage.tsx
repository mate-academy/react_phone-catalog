import { useState } from 'react';
import { useProductHook } from './useProductHook';
import home from '../../assets/icons/home.svg';
import back from '../../assets/icons/arrowLeftL.svg';
import backDis from '../../assets/icons/arrowLeft.svg';
import goto from '../../assets/icons/arrowRightL.svg';
import gotoDis from '../../assets/icons/arrowRight.svg';
import { NavLink } from 'react-router-dom';
import { Loader } from '../Loader';
import { DDNum, DDSortBy } from '../DropDown';
import { Product, SortOption } from '../../types/ProductTypes';
import { ProductItem } from '../ProductItem';
import styles from './ProductPage.module.scss';

export const ProductPage = () => {
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);

  const {
    itemPrevPage,
    currentItems,
    products,
    loading,
    error,
    currentCategory,
    currentPage,
    totalPages,
    handleSortChange,
    handleItemsPerPageChange,
    handlePageChange,
  } = useProductHook();

  const slisedCurrentCategory =
    currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);

  return (
    <main className={styles.main__phonepage}>
      <div className={styles.mobilelink}>
        <NavLink to="/">
          <img src={home} alt="home" />
        </NavLink>
        {/* mb goto*/}
        <span>
          <img src={back} alt="back" />
        </span>
        <p className={styles.mobilelink__title}>
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
            Something went wrong... Please, check your connection and try later
          </p>
        </div>
      )}

      {!error && (
        <>
          <h1 className={styles.mobile__title}>
            {slisedCurrentCategory === 'Phones'
              ? 'Mobile phones'
              : slisedCurrentCategory}
          </h1>
          <h1
            className={styles['mobile__title-description']}
          >{`${products.length} models`}</h1>
        </>
      )}

      {loading && (
        <div className={styles['loadere-container']}>
          <Loader />
        </div>
      )}
      {!loading && !error && (
        <>
          <div className={styles.mobile__choise}>
            <div className={styles.mobile__dropdown}>
              <div className={styles.mobile__sortBy}>
                <h3 className={styles.sortby}>Sort By</h3>
                <DDSortBy
                  onChange={option => {
                    handleSortChange(option.value as SortOption);
                  }}
                />
              </div>
              <div className={styles.mobile__items}>
                <h3 className={styles.sortby}>Items on page</h3>
                <DDNum
                  onChange={option => {
                    handleItemsPerPageChange(
                      option.value === 'all' ? 'all' : Number(option.value),
                    );
                  }}
                />
              </div>
            </div>
            <div className={styles.mobile__cards}>
              {currentItems.map((product: Product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  AdditionalPrice
                  onClick={() => setSelectedPhone}
                />
              ))}
            </div>

            {itemPrevPage !== 'all' && (
              <div className={styles.mobile__buttons}>
                <button
                  className={`${styles.mobile__buttonPrev} ${currentPage === 1 ? styles.disabled : ''}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <img src={currentPage === 1 ? backDis : back} alt="Back" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  number => (
                    <button
                      key={number}
                      className={`${styles.mobile__pagination} ${currentPage === number ? styles.active : ''}`}
                      onClickCapture={() => handlePageChange(number)}
                      disabled={currentPage === number}
                    >
                      {number}
                    </button>
                  ),
                )}
                <button
                  className={`${styles.mobile__buttonNext} ${currentPage === totalPages ? styles.disabled : ''}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <img
                    src={currentPage === totalPages ? gotoDis : goto}
                    alt="Goto"
                  />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
};
