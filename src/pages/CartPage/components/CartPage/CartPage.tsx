import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../../context/AppContext';
import { CartItem } from '../CartItem';
import { BackLink } from '../../../shared/components/BackLink';
import { CartProduct } from '../../../../types/CartProduct';
import './CartPage.scss';
import '../../../../styles/main.scss';

export const CartPage: React.FC = () => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isShowingModal, setIsShowingModal] = useState<boolean>(false);

  const { cartProducts, clearCart } = useContext(CartContext);

  useEffect(() => {
    const newProducts: CartProduct[] = [];

    for (const key in cartProducts) {
      newProducts.push({
        product: cartProducts[key].product,
        quantity: cartProducts[key].quantity,
      });
    }

    setProducts(newProducts);
  }, [cartProducts]);

  const totalAmount = products.reduce(
    (sum, currentCartProduct: CartProduct) => {
      return (
        sum + currentCartProduct.product.price * currentCartProduct.quantity
      );
    },
    0,
  );

  const totalItemsQuantity = products.reduce(
    (sum, currentCartProduct: CartProduct) => {
      return sum + currentCartProduct.quantity;
    },
    0,
  );

  return (
    <main className="cart-page">
      <section className="cart-page__top section--full-width">
        <BackLink />
        <h1 className="cart-page__title title--1">Cart</h1>
      </section>

      {!products.length ? (
        <p className="cart-page__empty body-text--14">Your cart is empty</p>
      ) : (
        <>
          <section className="cart-page__items section--full-width">
            {products.map((item: CartProduct) => {
              return (
                <div style={{ display: 'flex' }} key={item.product.id}>
                  <CartItem product={item.product} quantity={item.quantity} />
                </div>
              );
            })}
          </section>
          <section className="cart-page__total section--full-width">
            <div className="cart-total">
              <div className="cart-total__top">
                <h2 className="cart-total__amount">${totalAmount}</h2>
                <p className="cart-total__item-count body-text--14">
                  Total for {totalItemsQuantity} item
                  {totalItemsQuantity !== 1 ? 's' : ''}
                </p>
              </div>
              <hr className="cart-total__divider" />
              <button
                className="cart-total__checkout button-dark"
                onClick={() => {
                  setIsShowingModal(true);
                }}
              >
                Checkout
              </button>
            </div>
          </section>

          {isShowingModal && (
            <dialog className="dialog">
              <p className="dialog__text body-text--14">
                Checkout is not implemented yet. <br /> Do you want to clear the
                Cart?
              </p>

              <div className="dialog__buttons">
                <button
                  className="dialog__button default-button-text"
                  onClick={() => {
                    clearCart();
                    setIsShowingModal(false);
                  }}
                >
                  Clear the cart
                </button>
                <button
                  className="dialog__button default-button-text"
                  onClick={() => {
                    setIsShowingModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </dialog>
          )}
        </>
      )}
    </main>
  );
};
