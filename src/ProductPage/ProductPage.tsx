import React, { useContext, useMemo, useState } from 'react';
import { IconsBar } from '../IconsBar/IconsBar';
import { ProductCard } from '../ProductCard/ProductCard';

import './ProductPage.scss';
import { ProductContext } from '../utils/contexts';
import { ButtonWithNumber } from '../Button/Button';

type Props = {
  pageType: 'phones' | 'tablets' | 'accessories';
};

export const ProductPage: React.FC<Props> = ({ pageType }) => {
  const [buttonNumber, setButtonNumber] = useState(1);
  const [selectedButtonNumber, setSelectedButtonNumber] = useState(1);
  const [itemsOnPage, setItemsOnPage] = useState(16);
  const [sortType, setSortType] = useState('newest');

  const products = useContext(ProductContext);

  const memoizedProducts = useMemo(() => products || [], [products]);

  const sortedProducts = useMemo(() => {
    return [...memoizedProducts]
      .filter(product => product.category === pageType)
      .sort((first, second) => {
        if (sortType === 'newest') {
          return second.year - first.year;
        }

        if (sortType === 'cheapest') {
          return first.price - second.price;
        }

        if (sortType === 'expensive') {
          return second.price - first.price;
        }

        return 0;
      });
  }, [memoizedProducts, pageType, sortType]);

  const productsToShow = sortedProducts.slice(
    (buttonNumber - 1) * itemsOnPage,
    buttonNumber * itemsOnPage,
  );

  const totalPages = Math.ceil(sortedProducts.length / itemsOnPage);
  const numbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (number: number) => {
    setButtonNumber(number);
    setSelectedButtonNumber(number);
  };

  return (
    <div className="product-page">
      <div className="product-page__container">
        <IconsBar pageType={pageType} />
        <h2 className="product-page__title">{pageType}</h2>
        <span className="product-page__amount">{`${sortedProducts.length} models`}</span>

        <div
          className={`product-page__select-wrapper 
          product-page__select-wrapper--sort-type`}
        >
          <label
            htmlFor="dropdown-sort-type"
            className="product-page__label-for-select"
          >
            Sort by
          </label>
          <select
            className="product-page__select"
            id="dropdown-sort-type"
            name="dropdown-sort-type"
            value={sortType}
            onChange={e => {
              setSortType(e.target.value);
              handlePageChange(1);
            }}
          >
            <option className="product-page__option" value="newest">
              Newest
            </option>
            <option className="product-page__option" value="cheapest">
              Cheapest
            </option>
            <option className="product-page__option" value="expensive">
              Most Expensive
            </option>
          </select>
        </div>

        <div
          className={`product-page__select-wrapper 
          product-page__select-wrapper-items`}
        >
          <label
            htmlFor="dropdown-items-per-page"
            className="product-page__label-for-select"
          >
            Items on page
          </label>
          <select
            className="product-page__select"
            id="dropdown-items-per-page"
            name="dropdown-items-per-page"
            value={itemsOnPage}
            onChange={e => {
              setItemsOnPage(Number(e.target.value));
              handlePageChange(1);
            }}
          >
            <option className="product-page__option" value="16">
              16
            </option>
            <option className="product-page__option" value="32">
              32
            </option>
            <option className="product-page__option" value="48">
              48
            </option>
          </select>
        </div>

        <div className="product-page__products">
          {productsToShow.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>

        <div className="product-page__buttons">
          <button
            className="product-page__button product-page__button--previous"
            onClick={() => {
              if (buttonNumber > 1) {
                handlePageChange(buttonNumber - 1);
                window.scrollTo(0, 0);
              }
            }}
            disabled={buttonNumber === 1}
          ></button>

          {numbers.map(number => (
            <ButtonWithNumber
              number={number}
              key={number}
              setButtonNumber={handlePageChange}
              selectedButtonNumber={selectedButtonNumber}
              setSelectedButtonNumber={setSelectedButtonNumber}
            />
          ))}

          <button
            className="product-page__button product-page__button--next"
            onClick={() => {
              if (buttonNumber < totalPages) {
                handlePageChange(buttonNumber + 1);
                window.scrollTo(0, 0);
              }
            }}
            disabled={buttonNumber === totalPages}
          ></button>
        </div>
      </div>
    </div>
  );
};
