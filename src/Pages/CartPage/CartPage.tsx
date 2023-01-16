/* eslint-disable max-len */
import { useContext } from 'react';

import './CardPage.scss';
import { NoProductsWaring } from '../../components/NoProductsWaring';
import { ReturnButton } from '../../components/ProductDetails/ProductParts/ReturnButton';
import { ProductsContext } from '../../ProductsContext';
import { Product } from '../../types/Product';

export const CartPage = () => {
  const { cart, setCart } = useContext(ProductsContext);

  const removeFromCart = (cartItem: Product) => {
    setCart(cart.filter(cartProduct => cartProduct.id !== cartItem.id));
  };

  const handleIncrement = (cardId: string) => {
    setCart(cartItem => cartItem.map(item => (cardId === item.id ? {
      ...item, quantity: item.quantity + (item.quantity < 10 ? 1 : 0),
    } : item)));
  };

  const handleDecrement = (cardId: string) => {
    setCart(cartItem => cartItem.map(item => (cardId === item.id ? {
      ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0),
    } : item)));
  };

  const getTotalPrice = cart.map(x => x.fullPrice * x.quantity).reduce((x, y) => x + y, 0);

  return (
    <div className="section">
      <div className="container">
        <ReturnButton />
        <h1 className="title has-text-weight-bold">
          Cart
        </h1>
        {cart.length !== 0 ? (
          <div className="columns">
            <div className="column is-two-thirds">
              {cart.map(cartItem => (
                <div className="box" key={cartItem.id}>
                  <div className="is-flex is-justify-content-space-between">
                    <div className="is-flex is-align-items-center">
                      <button
                        style={{ border: 'none' }}
                        type="button"
                        className="button"
                        onClick={() => {
                          removeFromCart(cartItem);
                        }}
                      >
                        <span className="icon">
                          <i className="fa-solid fa-xmark has-text-grey-light" />
                        </span>
                      </button>
                      <figure>
                        <img className="image imageSmall" src={`../_new/${cartItem.image}`} alt="Img" />
                      </figure>
                      <p>{cartItem.name}</p>
                    </div>
                    <div style={{ gap: 20 }} className="is-flex">
                      <div className="is-flex is-align-items-center">
                        <button
                          disabled={cartItem.quantity === 1}
                          type="button"
                          className="button is-small"
                          onClick={() => {
                            handleDecrement(cartItem.id);
                          }}
                        >
                          <span className="icon">
                            <i className="fa-solid fa-minus" />
                          </span>
                        </button>
                        <p
                          className="has-text-centered"
                          style={{ width: 30 }}
                        >
                          {cartItem.quantity}
                        </p>
                        <button
                          type="button"
                          className="button is-small"
                          onClick={() => {
                            handleIncrement(cartItem.id);
                          }}
                        >
                          <span className="icon">
                            <i className="fa-solid fa-plus" />
                          </span>
                        </button>
                      </div>
                      <div
                        style={{ width: 70 }}
                        className="is-flex is-align-items-center has-text-weight-bold"
                      >
                        <i className="fa-solid fa-dollar-sign" />
                        {(cartItem.fullPrice) * cartItem.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="column">
              <div className="box">
                <p className="has-text-centered has-text-weight-bold is-size-4">
                  <i className="fa-solid fa-dollar-sign" />
                  {getTotalPrice}
                </p>
                <p
                  className="has-text-centered has-text-grey-light is-size-7"
                >
                  {`Total for ${cart.length} items`}
                </p>
                <hr />
                <button
                  type="button"
                  className="button is-fullwidth has-background-dark has-text-light"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (<NoProductsWaring />)}
      </div>
    </div>
  );
};
