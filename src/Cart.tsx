/* eslint-disable operator-assignment */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { NotFoundItems } from './NotFound';
import { useAppSelector } from './utils/hooks';
import { removeItem } from './redux/cartReducer';

export const Cart = () => {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useDispatch();

  const sum = items.reduce((prev, current) => prev + current.price, 0);

  const baseUrl = 'https://mate-academy.github.io/react_phone-catalog/_new/';

  const initialTotal = parseFloat(localStorage.getItem('sumToSave') || '0');
  const [total, setTotal] = useState(initialTotal);

  const savedCounts = localStorage.getItem('countsToSave');
  const initialCounts = savedCounts ? JSON.parse(savedCounts) : items.map(() => 1);
  const [counts, setCounts] = useState(initialCounts);
  const [totalForAllItems, setTotalForAllItems] = useState(total);

  const calculateTotalForAllItems = () => {
    let totalToBasket = 0;

    for (let i = 0; i < items.length; i++) {
      totalToBasket += items[i].price * counts[i];
    }

    return totalToBasket;
  };

  const calculateTotalItems = () => {
    let totalСounts = 0;

    for (let i = 0; i < counts.length; i++) {
      totalСounts += counts[i];
    }

    return totalСounts;
  };

  useEffect(() => {
    localStorage.setItem('phonesToBuy', JSON.stringify(items));
    localStorage.setItem('sumToSave', sum.toString());
    localStorage.setItem('totalForAllItems', totalForAllItems.toString());
  }, [items, totalForAllItems]);

  useEffect(() => {
    localStorage.setItem('countsToSave', JSON.stringify(counts));
  }, [counts]);

  const handleAdd = (index: number) => {
    setCounts((prevCounts: number[]) => {
      const newCounts = [...prevCounts];

      newCounts[index] = newCounts[index] + 1;
      const selectedPhone = items[index];

      const newTotal = total + selectedPhone.price;

      setTotal(newTotal);
      setTotalForAllItems(totalForAllItems + selectedPhone.price); // Обновляем общую сумму

      return newCounts;
    });
  };

  const handleRemove = (index: number) => {
    setCounts((prevCounts: number[]) => {
      const newCounts = [...prevCounts];

      if (newCounts[index] > 1) {
        newCounts[index] = newCounts[index] - 1;
        const selectedPhone = items[index];
        const newTotal = total - selectedPhone.price;

        setTotal(newTotal);
        setTotalForAllItems(totalForAllItems - selectedPhone.price);
      }

      return newCounts;
    });
  };

  return (
    items.length > 0 ? (
      <div className="basket">
        <div className="filter__nav">
          <div className="filter__nav--1-item">
            <NavLink to="#phones" className="page__link">
              Back
            </NavLink>
          </div>
          <div className="filter__nav--2-item">
            <h1 className="page__title">
              Cart
            </h1>
          </div>
        </div>
        <div className="basket__container">
          <div className="basket__items-container">
            {items.map((phone, index) => {
              return (
                <div className="basket__item">
                  <div className="basket__item--first-row">
                    <button
                      type="button"
                      className="basket__item-button--cres"
                      onClick={() => (dispatch(removeItem(phone)))}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="Icons/Close">
                          <path
                            id="Union"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.4716 4.4714C12.7319 4.21105 12.7319 3.78894
                         12.4716 3.52859C12.2112 3.26824
                         11.7891 3.26824 11.5288 3.52859L8.00016
                         7.05719L4.47157 3.52859C4.21122
                         3.26824 3.78911 3.26824 3.52876
                          3.52859C3.26841 3.78894 3.26841
                           4.21105 3.52876 4.4714L7.05735
                          7.99999L3.52876 11.5286C3.26841
                           11.7889 3.26841 12.211 3.52876
                           12.4714C3.78911 12.7317 4.21122
                           12.7317 4.47157 12.4714L8.00016
                           8.9428L11.5288 12.4714C11.7891
                           12.7317 12.2112 12.7317 12.4716
                           12.4714C12.7319 12.211 12.7319
                           11.7889 12.4716 11.5286L8.94297
                           7.99999L12.4716 4.4714Z"
                            fill="#B4BDC4"
                          />
                        </g>
                      </svg>
                    </button>
                    <img
                      src={`${baseUrl}${phone.image}`}
                      alt="iphoneImg"
                      className="basket__item-img"
                    />
                    <div className="basket__item-title">{phone.name}</div>
                  </div>

                  <div className="basket__item--second-row">
                    <div
                      className="basket__item--second-row__button-container"
                    >
                      <button
                        type="button"
                        className="basket__item-button
                        basket__cart-button--remove--mobile"
                        onClick={() => handleRemove(index)}
                        disabled={counts[index] === 1}
                      >
                        -

                      </button>
                      <div className="basket__cart-count--mobile">
                        {counts[index]}
                      </div>
                      <button
                        type="button"
                        className="basket__item-button basket__cart-button--add--mobile"
                        onClick={() => handleAdd(index)}
                      >
                        +
                      </button>

                    </div>
                    <p className="basket__item-price">
                      {`$${phone.price * counts[index]}`}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

          <div className="basket__checkout">
            <p className="basket__checkout-price">
              {`$${calculateTotalForAllItems()}`}
            </p>
            <p className="basket__checkout-text">
              Total for
              {' '}
              {calculateTotalItems()}
              {' '}
              items
            </p>

            <button
              type="button"
              className="basket__checkout-button"
            >
              <NavLink to="/tablets" className="basket__checkout-button--text">
                Checkout
              </NavLink>

            </button>
          </div>

        </div>
      </div>
    )
      : (
        <NotFoundItems text="Items to buy are" />
      )
  );
};

export default Cart;
