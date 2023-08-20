/* eslint-disable max-len */
/* eslint-disable operator-assignment */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Iphone } from './types/Iphone';
import { NotFoundItems } from './NotFound';

type Props = {
  phonesToBuy: Iphone[],
  removeIphone: (iphoneId: string) => void,
};

export const Basket: React.FC<Props> = ({
  phonesToBuy,
  removeIphone,
}) => {
  useEffect(() => {
    localStorage.setItem('phonesToBuy', JSON.stringify(phonesToBuy));
  }, [phonesToBuy]);

  const sum = phonesToBuy.reduce((prev, current) => prev + current.price, 0);

  const baseUrl = 'https://mate-academy.github.io/react_phone-catalog/_new/';
  const [total, setTotal] = useState(sum);
  const [totalItems, setTotalItems] = useState(0);
  const [counts, setCounts] = useState(phonesToBuy.map(() => 1));

  const handleAdd = (index: number) => {
    setCounts(prevCounts => {
      const newCounts = [...prevCounts];

      newCounts[index] = newCounts[index] + 1;

      const selectedPhone = phonesToBuy[index];

      setTotal(prevTotal => prevTotal + selectedPhone.price);
      setTotalItems(prevTotalItems => prevTotalItems + 1);

      return newCounts;
    });
  };

  const handleRemove = (index: number) => {
    setCounts(prevCounts => {
      const newCounts = [...prevCounts];

      if (newCounts[index] > 1) {
        newCounts[index] = newCounts[index] - 1;
      }

      const selectedPhone = phonesToBuy[index];

      setTotal(prevTotal => prevTotal - selectedPhone.price);
      setTotalItems(prevTotalItems => prevTotalItems - 1);

      return newCounts;
    });
  };

  return (
    phonesToBuy.length > 0 ? (
      <div className="basket">
        <a href="#liked" className="page__link">
          Back
        </a>
        <h1 className="basket-title">Cart</h1>
        <div className="basket__container">
          <div className="basket__items--mobile">
            {phonesToBuy.map((phone, index) => {
              return (
                <div className="basket__cart--mobile">
                  <div className="basket__cart--mobile--first-row">
                    <div className="basket__cart--mobile--first-row-item">
                      <button
                        type="button"
                        className="basket__cart-button--cres"
                        onClick={() => removeIphone(phone.id)}
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
                      <img src={`${baseUrl}${phone.image}`} alt="iphoneImg" className="basket__cart-img" />

                    </div>
                    <div className="basket__cart-title">{phone.name}</div>

                  </div>

                  <div className="basket__cart--mobile--second-row">
                    <div
                      className="basket__cart--mobile--second-row__button-container"
                    >
                      <button
                        type="button"
                        className="basket__cart-button
                        basket__cart-button--remove--mobile"
                        onClick={() => handleRemove(index)}
                        disabled={counts[index] === 1}
                      >
                        -

                      </button>
                      <div className="basket__cart-count--mobile">{counts[index]}</div>
                      <button
                        type="button"
                        className="basket__cart-button basket__cart-button--add--mobile"
                        onClick={() => handleAdd(index)}
                      >
                        +
                      </button>

                    </div>
                    <p className="basket__cart-price--mobile">{`$${phone.price * counts[index]}`}</p>

                  </div>

                </div>
              );
            })}

          </div>

          <div className="basket__items basket__items--mobile">
            {phonesToBuy.map((phone, index) => {
              return (
                <div className="basket__cart basket__cart--tablet">
                  <button
                    type="button"
                    className="basket__cart-button--cres"
                    onClick={() => removeIphone(phone.id)}
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
                  <img src={`${baseUrl}${phone.image}`} alt="iphoneImg" className="basket__cart-img" />
                  <div className="basket__cart-title">{phone.name}</div>

                  <button
                    type="button"
                    className="basket__cart-button basket__cart-button--remove"
                    onClick={() => handleRemove(index)}
                    disabled={counts[index] === 1}
                  >
                    -

                  </button>
                  <div className="basket__cart-count">{counts[index]}</div>
                  <button
                    type="button"
                    className="basket__cart-button basket__cart-button--add"
                    onClick={() => handleAdd(index)}
                  >
                    +

                  </button>
                  <p className="basket__cart-price">{`$${phone.price * counts[index]}`}</p>
                </div>
              );
            })}

          </div>

          <div className="basket__checkout">
            <p className="basket__checkout-price">{`$${total}`}</p>
            <p className="basket__checkout-text">
              Total for
              {' '}
              {totalItems + phonesToBuy.length}
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
