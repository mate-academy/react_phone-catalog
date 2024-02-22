/* eslint-disable max-len */
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { StateStore } from '../../store/StoreContext';
import { UpgratedProduct } from '../../types/UpgratedProduct';
import { ICONS } from '../../images/icons/icons';
import { BASE_API_URL } from '../../utils/fetch';
import './CartPage.scss';

export const CartPage = () => {
  const navigate = useNavigate();
  const { localStorage, handleAction } = useContext(StateStore);
  const [message, setMessage] = useState(false);

  const products = [...localStorage].filter(product => product.addedToCart);

  const totalCartPrice = products
    .reduce((prev, acc) => prev + acc.price * acc.quantity, 0);

  const totalCartQuantity = products
    .reduce((prev, acc) => prev + acc.quantity, 0);

  const removeProduct = (product: UpgratedProduct) => {
    handleAction(product, 'remove');
  };

  const minusQuantity = (product: UpgratedProduct) => {
    handleAction(product, 'minusQuantity');
  };

  const plusQuantity = (product: UpgratedProduct) => {
    handleAction(product, 'plusQuantity');
  };

  const handleShowMessage = () => {
    setMessage(!message);
  };

  return (
    <div className="cartPage">
      <section className="cartPage__navigation">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="button cartPage__navigation--link"
          data-cy="backButton"
        >
          <img
            src={ICONS.arrowLeft}
            alt="Arrow back"
          />
          <p className="smallText cartPage__navigation--link--text">
            Back
          </p>
        </button>
      </section>

      <section className="cartPage__content">
        {products.length
          ? (
            <>
              <div className="cartPage__content--title">
                <h1>Cart</h1>
              </div>

              <div className="cartPage__content--products">
                <ul className="cartPage__content--products__list">
                  {
                    products.map(product => {
                      const {
                        name,
                        image,
                        quantity,
                        price,
                      } = product;

                      const fullPrice = price * quantity;

                      return (
                        <li
                          key={name}
                          className="cartPage__content--products__item"
                        >
                          <button
                            data-cy="cartDeleteButton"
                            type="button"
                            className="button cartPage__content--products__item--button"
                            onClick={() => removeProduct(product)}
                          >
                            <img
                              src={ICONS.close}
                              alt="Delete product"
                            />
                          </button>

                          <img
                            src={`${BASE_API_URL + image}`}
                            alt="Phone"
                            className="cartPage__content--products__item--image"
                          />

                          <p
                            className="cartPage__content--products__item--name"
                          >
                            {name}
                          </p>

                          <div
                            className="cartPage__content--products__item--quantity"
                          >
                            <button
                              type="button"
                              onClick={() => minusQuantity(product)}
                              disabled={quantity === 1}
                              className={classNames('smallButton', {
                                'smallButton--disabled': quantity === 1,
                              })}
                            >
                              <img
                                src={ICONS.minus}
                                alt="Minus"
                              />
                            </button>
                            <p
                              data-cy="productQauntity"
                              className="cartPage__content--products__item--quantity--counter"
                            >
                              {quantity}
                            </p>
                            <button
                              type="button"
                              onClick={() => plusQuantity(product)}
                              className="smallButton"
                            >
                              <img
                                src={ICONS.plus}
                                alt="Plus"
                              />
                            </button>
                          </div>

                          <h2
                            className=" cartPage__content--products__item--totalPrice"
                          >
                            {`$${fullPrice}`}
                          </h2>
                        </li>
                      );
                    })
                  }
                </ul>

                <div className="cartPage__content--products__bill">
                  <h1 className="cartPage__content--products__bill--total">
                    {`$${totalCartPrice}`}
                  </h1>

                  <p className="cartPage__content--products__bill--counter">
                    {
                      totalCartQuantity === 1
                        ? `Total for ${totalCartQuantity} item`
                        : `Total for ${totalCartQuantity} items`
                    }
                  </p>

                  <div className="cartPage__content--products__bill--line" />

                  <button
                    type="button"
                    className="button cartPage__content--products__bill--button"
                    onClick={handleShowMessage}
                  >
                    Checkout
                  </button>

                  {
                    message && (
                      <p
                        className="smallText cartPage__content--products__bill--message"
                      >
                        We are sorry, but this feature is not implemented yet
                      </p>
                    )
                  }
                </div>
              </div>
            </>
          ) : (
            <h1>Your cart is empty</h1>
          )}
      </section>
    </div>
  );
};
