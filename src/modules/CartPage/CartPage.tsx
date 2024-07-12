import { useContext, useEffect, useState } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { GlobalContext } from '../../GlobalContext';
import { NoResults } from '../../components/NoResults';
import { Loader } from '../../components/Loader';
import classes from './CartPage.module.scss';
import { CartItem } from './components/CartItem';
import { Modal } from './components/Modal';
import { ModalContent } from './components/ModalContent';

export const CartPage = () => {
  const { cart, isLoading } = useContext(GlobalContext);

  const [sum, setSum] = useState(0);
  const [amount, setAmount] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(false);

  useEffect(() => {
    if (cart) {
      const total = cart.reduce((p, item) => p + item.price * item.amount, 0);
      const quantity = cart.reduce((p, item) => p + item.amount, 0);

      setSum(total);
      setAmount(quantity);
    }
  }, [cart]);

  return (
    <div className={classes.CartPage}>
      <Breadcrumbs />

      {isLoading && <Loader />}

      {!cart.length && !isLoading && (
        <NoResults title="Your cart is empty" imgUrl="img/cart-is-empty.png" />
      )}

      {cart.length > 0 && !isLoading && (
        <div className={classes.CartPage__container}>
          <h2>Cart</h2>

          <div className={classes.CartPage__content}>
            <div className={classes.CartPage__list}>
              {cart.map(item => (
                <CartItem key={item.id} product={item} />
              ))}
            </div>

            <div className={classes.CartPage__total}>
              <div className={classes.CartPage__sum}>{`$${sum}`}</div>
              <div className={classes.CartPage__number}>
                {`Total for ${amount} item${amount === 1 ? '' : 's'}`}
              </div>
              <div className={classes.CartPage__line} />
              <button
                type="button"
                className={classes.CartPage__button}
                onClick={() => setModalVisibility(true)}
              >
                Checkout
              </button>

              <Modal isOpen={modalVisibility}>
                <ModalContent closeModal={() => setModalVisibility(false)} />
              </Modal>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
