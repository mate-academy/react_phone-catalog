import { useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { Breadcrumb } from '../../components/Breadcrumb';
import { CartItem } from './components/CartItem';
import { ProductsContext } from '../../Context/ProductsContext';
import { ModalCheckout } from './components/ModalCheckout';
import { asset } from '../../hooks/utils';

import s from './CartPage.module.scss';

export const CartPage = () => {
  const cartProds = useContextSelector(ProductsContext, ctx => ctx.cartProds);
  const clearCart = useContextSelector(ProductsContext, ctx => ctx.clearCart);
  const [modalOpen, setModalOpen] = useState(false);

  const totalSumm = cartProds.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  const totalQuantity = cartProds.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );

  const onConfirmHandle = () => {
    clearCart();
    setModalOpen(false);
  };

  return (
    <>
      <Breadcrumb />

      <h2 className="title is-size-3-mobile is-size-1 mb-5">Cart</h2>
      {cartProds.length === 0 ? (
        <div className={`${s.big_img} ${s.not_found}`}>
          <h2 className={`title mb-2 ${s.home_titles} has-text-centered`}>
            Your cart is empty
          </h2>
          <figure className={`image ${s.big_img__figure} ${s.not_found}`}>
            <img src={asset('img/cart-is-empty.png')} alt={'cart is empty'} />
          </figure>
        </div>
      ) : (
        <div className="columns cart">
          <div className={`column ${s.cart_items_column} px-0 `}>
            {cartProds.map(product => (
              <CartItem key={product.id} product={product} />
            ))}
          </div>
          <div
            className={`column is-narrow has-text-centered px-0 ${s.cart_items_column}`}
          >
            <div className={`box ${s.box}`}>
              <div className={`${s.bottom_bordered}`}>
                <p className="title is-3 mb-0">$ {totalSumm}</p>
                <p className={`${s.box__text}`}>
                  Total for {totalQuantity} item
                  {totalQuantity === 1 ? '' : 's'}
                </p>
              </div>
              <button
                className={`${s.checkout_button}`}
                type="button"
                onClick={() => setModalOpen(true)}
              >
                Checkout
              </button>
            </div>
          </div>
          {modalOpen && (
            <ModalCheckout
              onClose={() => setModalOpen(false)}
              onConfirm={() => onConfirmHandle()}
            />
          )}
        </div>
      )}
    </>
  );
};
