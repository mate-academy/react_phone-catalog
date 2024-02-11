import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ProductContext } from '../../ProductContext';
import { CartItem } from '../CartItem';

export const Cart = () => {
  const { cartItems } = useContext(ProductContext);
  const [massege, setMassege] = useState<boolean>(false);

  const totalQuantity = () => {
    let count = 0;

    cartItems.forEach((item) => {
      count += item.quantity;
    });

    return count;
  };

  const totalPrise = () => {
    let count = 0;

    cartItems.forEach((item) => {
      count += item.product.fullPrice * item.quantity;
    });

    return count;
  };

  const openMassege = () => {
    setMassege(true);

    setTimeout(() => {
      setMassege(false);
    }, 3000);
  };

  return (
    <section className="cart">
      <div className="container">
        <Link
          to="../"
          className="details__back"
          data-cy="backButton"
        >
          Back
        </Link>

        <h1 className="cart__title"> Cart </h1>

        {cartItems.length
          ? (
            <div className="cart__wrap">
              <div className="card__items__wrap">
                {cartItems.map(cart => (
                  <CartItem cart={cart} key={cart.id} />
                ))}
              </div>

              <div className="cart__total">
                <h1 className="cart__total__prise">
                  {`$${totalPrise()}`}
                </h1>

                <p className="cart__total__text">
                  {`Total for ${totalQuantity()} items`}
                </p>

                <button
                  type="button"
                  className="cart__total__btn"
                  onClick={() => openMassege()}
                >
                  Checkout
                </button>
                {massege && (
                  <p className="cart__massege">
                    We are sorry, but this feature is not implemented yet
                  </p>
                )}

              </div>
            </div>
          )
          : (<h1>Your cart is empty</h1>)}
      </div>
    </section>
  );
};
