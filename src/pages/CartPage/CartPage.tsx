/* eslint-disable max-len */
import { useNavigate } from 'react-router-dom';
import './CartPage.scss';
import cn from 'classnames';
import { useContext } from 'react';
import { ProductState } from '../../store/storeContext';
import { UpgratedProduct } from '../../types/UpgratedProduct';
import { ICONS } from '../../images/icons/Icons';

export const CartPage = () => {
  const navigate = useNavigate();
  const { localStorage, handleClearAllCart, handleAction } =
    useContext(ProductState);

  const products = [...localStorage].filter(product => product.addedToCart);

  const totalCartPrice = products.reduce(
    (acc, pro) => acc + pro.price * pro.quantity,
    0,
  );

  const totalCartQuantity = products.reduce(
    (acc, pro) => acc + pro.quantity,
    0,
  );

  const removeProduct = (product: UpgratedProduct) => {
    handleAction(product, 'remove');
  };

  const increase = (product: UpgratedProduct) => {
    handleAction(product, 'increase');
  };

  const decrease = (product: UpgratedProduct) => {
    handleAction(product, 'decrease');
  };

  const handleCheckoutClick = async () => {
    // eslint-disable-next-line no-alert, no-restricted-globals
    const checkout = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (checkout) {
      handleClearAllCart();
    }
  };

  return (
    <div className="cartPage">
      <div className="cartPage__container">
        <section className="cartPage__navigation">
          <button
            type="button"
            onClick={() => navigate(-1)}
            data-cy="backButton"
            className="button cartPage__navigation--link"
          >
            <img src={ICONS.arrowLeft} alt="arrow back" />

            <p className="smallText cartPage__navigation--link--text">Back</p>
          </button>
        </section>

        <section className="cartPage__content">
          {products.length ? (
            <>
              <h1 className="cartPage__content--title">Cart</h1>

              <div className="cartPage__content--products">
                <div className="cartPage__content__container">
                  <ul className="cartPage__content--products__list">
                    {products.map(product => (
                      <li
                        key={product.name}
                        className="cartPage__content--products__item"
                      >
                        <div
                          className="
                        cartPage__content--products__item--leftSide"
                        >
                          <button
                            data-cy="cartDeleteButton"
                            type="button"
                            className="
                            button cartPage__content--products__item--button"
                            onClick={() => removeProduct(product)}
                          >
                            <img src={ICONS.close} alt="Delete product" />
                          </button>
                          <img
                            src={product.image}
                            alt="Phone"
                            className="cartPage__content--products__item--image"
                          />
                          <p
                            className="
                          cartPage__content--products__item--name"
                          >
                            {product.name}
                          </p>
                        </div>

                        <div
                          className="
                        cartPage__content--products__item--rightSide"
                        >
                          <div
                            className="
                          cartPage__content--products__item--quantity"
                          >
                            <button
                              type="button"
                              onClick={() => decrease(product)}
                              disabled={product.quantity === 1}
                              className={cn('smallButton', {
                                'smallButton--disabled': product.quantity === 1,
                              })}
                            >
                              <img src={ICONS.minus} alt="Minus" />
                            </button>
                            <p
                              data-cy="productQauntity"
                              className="
                              cartPage__content--products__item--quantity--counter"
                            >
                              {product.quantity}
                            </p>
                            <button
                              type="button"
                              onClick={() => increase(product)}
                              className="smallButton"
                            >
                              <img src={ICONS.plus} alt="Plus" />
                            </button>
                          </div>
                          <h2
                            className="
                          cartPage__content--products__item--totalPrice"
                          >
                            {`$${product.price * product.quantity}`}
                          </h2>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="cartPage__content--products__bill">
                    <h1 className="cartPage__content--products__bill--total">
                      {`$${totalCartPrice}`}
                    </h1>

                    <p className="cartPage__content--products__bill--counter">
                      {totalCartQuantity === 1
                        ? `Total for ${totalCartQuantity} item`
                        : `Total for ${totalCartQuantity} items`}
                    </p>

                    <div className="cartPage__content--products__bill--line" />

                    <button
                      type="button"
                      className="
                      button cartPage__content--products__bill--button"
                      onClick={handleCheckoutClick}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <h1>Your cart is empty</h1>
          )}
        </section>
      </div>
    </div>
  );
};
