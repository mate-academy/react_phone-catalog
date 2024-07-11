/* eslint-disable prettier/prettier */
import classNames from 'classnames';
import { ProductCard } from '../ProductCard';
import './ProductsList.scss';
import React, { useState } from 'react';
import { Sort } from '../../types/Sort';
import { sortProducts } from '../../utils/heplerFunctions';
import { Gadget } from '../../types/Gadget';

type Props = {
  products: Gadget[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  const [isSortActive, setIsSortActive] = useState(false);
  const [isPagActive, setIsPagActive] = useState(false);
  const [sortCriteria, setSortCriteria] = useState<Sort>(Sort.BY_YEAR);

  const onSortTrigger = () => {
    setIsSortActive(!isSortActive);
    setIsPagActive(false);
  };

  const onPagTrigger = () => {
    setIsPagActive(!isPagActive);
    setIsSortActive(false);
  };

  const handleSortOptionClick = (criteria: Sort) => {
    setSortCriteria(criteria);
    setIsSortActive(false);
  };

  const sortedProductList = sortProducts(products, sortCriteria);

  return (
    <div className="products">
      <div className="products__dropdown">
        <div className="dropdown">
          <p className="dropdown__label">Sort by</p>

          <div className="dropdown__box">
            <span className="dropdown__box--text">{sortCriteria}</span>
            <button
              className="dropdown__box--trigger"
              onClick={onSortTrigger}
            >
              {isSortActive ? (
                <svg className="icon icon-dropdown-up">
                  <use href="img/icons.svg#icon-arrow-up"></use>
                </svg>
              ) : (
                <svg className="icon icon-dropdown-down">
                  <use href="img/icons.svg#icon-arrow-down"></use>
                </svg>
              )}
            </button>
          </div>

          <ul className={classNames('dropdown__options', {
            'visually-hidden': !isSortActive,
          }
          )}>
            <li
              className="dropdown__options--option"
              data-value={Sort.BY_YEAR}
              onClick={() => handleSortOptionClick(Sort.BY_YEAR)}
            >
              Newest
            </li>
            <li
              className="dropdown__options--option"
              data-value={Sort.BY_NAME}
              onClick={() => handleSortOptionClick(Sort.BY_NAME)}
            >
              Alphabetically
            </li>
            <li
              className="dropdown__options--option"
              data-value="cheapest"
              onClick={() => handleSortOptionClick(Sort.BY_PRICE)}
            >
              Cheapest
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <p className="dropdown__label">Items on page</p>

          <div className="dropdown__box">
            <span className="dropdown__box--text">4</span>
            <button
              className="dropdown__box--trigger"
              onClick={onPagTrigger}
            >
              {isPagActive ? (
                <svg className="icon icon-dropdown-up">
                  <use href="img/icons.svg#icon-arrow-up"></use>
                </svg>
              ) : (
                <svg className="icon icon-dropdown-down">
                  <use href="img/icons.svg#icon-arrow-down"></use>
                </svg>
              )}

            </button>
          </div>

          <ul className={classNames('dropdown__options', {
            'visually-hidden': !isPagActive,
          }
          )}
          >
            <li className="dropdown__options--option" data-value="4">4</li>
            <li className="dropdown__options--option" data-value="8">8</li>
            <li className="dropdown__options--option" data-value="16">16</li>
            <li className="dropdown__options--option" data-value="all">
              All
            </li>
          </ul>
        </div>
      </div>
      <div className="products__product">
        {sortedProductList.map(product => (
          <ProductCard
            key={product.id}
            gadget={product}
          />
        ))}
      </div>
    </div>
  );
};
