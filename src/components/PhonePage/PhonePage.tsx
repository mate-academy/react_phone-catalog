// import { useEffect, useRef, useState } from 'react';
import { ProductItem } from '../ProductItem/ProductItem';
import { MyDropdownItems, MyDropdownSortBy } from '../DropDown/DropDow';
import './PhonePage.scss';
import home from '../../../image/home.svg';
import arrow from '../../../image/arrow.svg';

import { usePhonesHooks } from './usePhonesHooks';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '../../types/typeRpoduct';
import { fetchProducts } from '../../utils/api';

export const PhonesPage = () => {
  const path = useLocation();
  const currentCategory = path.pathname.slice(1);
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const {
    phones,
    loading,
    // currentItems,
    currentPage,
    totalPages,
    setCurrentPage,
    handleItemsChange,
    hanleSortChange,
    // setItemPrevPage,
  } = usePhonesHooks();

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    fetchProducts().then(data => {
      const validCategories = ['phones', 'tablets', 'accessories'];

      if (validCategories.includes(currentCategory)) {
        const filteredProducts = data.filter(
          product => product.category === currentCategory,
        );

        setProducts(filteredProducts);
      } else {
        setProducts([]);
      }
    });
  }, [currentCategory]);

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

      <h1 className="mobile__title">
        {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
      </h1>
      <h1 className="mobile__models">{`${phones.length} models`}</h1>

      {!loading && (
        <>
          <div className="mobile__choice">
            <div className="mobile__dropdown">
              <div className="mobile__sortby">
                <h3 className="sortby">Sort by</h3>
                <MyDropdownSortBy onChange={hanleSortChange} />
              </div>

              <div className="mobile__items">
                <h3 className="item__page">Items on page</h3>
                <MyDropdownItems onChange={handleItemsChange} />
              </div>
            </div>

            <div className="mobile__cards">
              {products.map(product => (
                <ProductItem
                  key={product.id}
                  product={product}
                  WithAdditionalPrice
                  onClick={() => setSelectedPhone(product.name)}
                />
              ))}
            </div>

            <div className="mobile__buttons">
              <button
                className="mobile__buttonsbuttonPrev"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              {pageNumbers.map(number => (
                <button
                  key={number}
                  className={`mobile__pagination ${currentPage === number ? 'active' : ''}`}
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </button>
              ))}
              <button
                className="mobile__buttonsbuttonNext"
                onClick={() =>
                  setCurrentPage(prev => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
};
