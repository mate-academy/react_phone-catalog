import { Fragment, useContext, useMemo, useState } from 'react';
import { BackButton } from '../BackButton';
import { CartContext } from '../../context/CartContext';
import { CartProductCard } from '../CartProductCard';
import { Modal } from '../Modal';

const modalTitle =
  'Checkout is not implemented yet. Do you want to clear the Cart?';

export const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const visibleCart = useMemo(
    () => cart.sort((a, b) => a.id.localeCompare(b.id)),
    [cart],
  );
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const totalPrice = useMemo(() => {
    let sum = 0;

    cart.forEach(item => {
      sum += (item.priceDiscount ?? item.priceRegular) * item.count;
    });

    return sum;
  }, [cart]);

  const totalCount = useMemo(() => {
    let count = 0;

    cart.forEach(item => {
      count += item.count;
    });

    return count;
  }, [cart]);

  const handleCancel = () => {
    setIsVisibleModal(false);
  };

  const handleConfirm = () => {
    setCart([]);
    setIsVisibleModal(false);
  };

  const handleToggleModal = () => {
    setIsVisibleModal(!isVisibleModal);
  };

  return (
    <main className="cart flex">
      {cart.length > 0 ? (
        <Fragment>
          {isVisibleModal && (
            <Modal
              parenClassName="cart"
              title={modalTitle}
              cancelFunction={handleCancel}
              confirmFunction={handleConfirm}
            />
          )}
          <BackButton url="home" parentClassName="cart" />
          <h1 className="cart__title">Cart</h1>
          <section className="cart__products">
            {visibleCart.map(crt => (
              <CartProductCard
                parentClassName="cart"
                key={crt.id}
                price={crt.priceDiscount ?? crt.priceRegular}
                cartItem={crt}
              />
            ))}
          </section>
          <section className="cart__total-price">
            <article className="cart__price-block">
              <h2 className="cart__price">{totalPrice}$</h2>
              <p className="cart__amount body-text">
                Total for {totalCount} items
              </p>
            </article>
            <button
              onClick={handleToggleModal}
              className="cart__check-out button"
            >
              Check out
            </button>
          </section>
        </Fragment>
      ) : (
        <Fragment>
          <BackButton url="home" parentClassName="cart" />
          <h1 className="cart__title">Cart is empty</h1>
        </Fragment>
      )}
    </main>
  );
};
