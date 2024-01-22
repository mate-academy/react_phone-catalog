/* eslint-disable jsx-a11y/control-has-associated-label */
import './CartPage.scss';
import { Link } from 'react-router-dom';

import { useContext, useMemo, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { BackButton } from '../../components/BackButton';
import { ComingSoon } from '../../components/ComingSoon';
import { BASE_URL } from '../../helpers/constants';
import { CartEmpty } from '../../components/CartEmpty';

export const CartPage = () => {
  const {
    cart,
    visibleProducts,
    countProductInCart,
    removeProduct,
    decrease,
    increase,
  } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, product) => sum + product.price, 0);
  }, [cart]);

  const handleCheckoutClick = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 4000);
  };

  return (
    <div className="CartPage">
      <BackButton />

      <h1 className="CartPage__title">Cart</h1>

      {!cart.length ? (
        <CartEmpty />
      ) : (
        <div className="CartPage__content">
          <ul className="CartPage__list">
            {visibleProducts.map(product => {
              const {
                id,
                itemId,
                category,
                name,
                image,
                price,
              } = product;

              return (
                <li key={id} className="CartPage__list-item">
                  <div className="CartPage__list-item-left-container">
                    <button
                      data-cy="cartDeleteButton"
                      type="button"
                      className="CartPage__list-item-button"
                      onClick={() => removeProduct(id)}
                    >
                      <div className="icon icon--remove" />
                    </button>

                    <div className="CartPage__list-item-photo">
                      <img
                        src={`${BASE_URL}${image}`}
                        alt="Product"
                        className="CartPage__list-item-img"
                      />
                    </div>

                    <Link
                      to={`/${category}/${itemId}`}
                      className="CartPage__list-item-name"
                    >
                      {name}
                    </Link>
                  </div>

                  <div className="CartPage__list-item-right-container">
                    <div className="CartPage__list-item-control">
                      <button
                        type="button"
                        className="CartPage__list-item-control-button"
                        onClick={() => decrease(id)}
                        disabled={countProductInCart(id) === 1}
                      >
                        <div className="icon icon--minus" />
                      </button>

                      <p className="CartPage__list-item-control-amount">
                        {countProductInCart(id)}
                      </p>

                      <button
                        type="button"
                        className="CartPage__list-item-control-button"
                        onClick={() => increase(product)}
                      >
                        <div className="icon icon--plus" />
                      </button>
                    </div>

                    <p className="CartPage__list-item-price">{`$${price}`}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="CartPage__checkout">
            <div className="CartPage__checkout-total">
              <p className="CartPage__checkout-total-price">{`$${totalPrice}`}</p>
              <p
                data-cy="productQauntity"
                className="CartPage__checkout-total-amount"
              >
                {cart.length === 1
                  ? 'Total for 1 item'
                  : `Total for ${cart.length} items`}
              </p>
            </div>

            <button
              type="button"
              className="CartPage__checkout-button"
              onClick={handleCheckoutClick}
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (<ComingSoon onClose={setIsModalOpen} />)}
    </div>
  );
};
