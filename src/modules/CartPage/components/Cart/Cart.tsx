import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line max-len
import { useCart } from '@modules/shared/components/Context/';
// eslint-disable-next-line max-len
import { Title } from '@modules/shared/components/Title/';
import { CartElement } from '../CartElement/';
// eslint-disable-next-line max-len
import { BackLink } from '../../../../modules/shared/components/BackLink/';
import { Modal } from '@modules/shared/components/Modal';
import { ModalHeader } from '@modules/shared/components/Modal/';
import { ModalFooter } from '@modules/shared/components/Modal/';
import { Icon } from '@modules/shared/components/Icon';

export const Cart: React.FC = () => {
  const { cart, setCart } = useCart();
  const [modalStatus, setModalStatus] = useState(false);
  const [amountOfItems, setAmountOfItems] = useState(0);
  const bodyElement = useRef(document.querySelector('body'));

  const sum = cart?.reduce((prev, elem) => {
    return elem.product.price * elem.amount + prev;
  }, 0);

  const onAccept = () => {
    setModalStatus(false);

    setCart?.([]);
  };

  useEffect(() => {
    if (modalStatus) {
      bodyElement.current?.classList.add('no-scroll');
    } else {
      bodyElement.current?.classList.remove('no-scroll');
    }
  }, [modalStatus]);

  useEffect(() => {
    setAmountOfItems(() => {
      return cart?.reduce((prev, elem) => elem.amount + prev, 0) || 0;
    });
  }, [cart]);

  return (
    <div className="cart">
      <div className="cart__content container">
        {modalStatus && (
          <Modal>
            <ModalHeader
              title="Chekout havent implemented yet"
              description="Do you want to clear your cart ?"
            />
            <ModalFooter>
              <button
                onClick={() => setModalStatus(false)}
                className="modal__button"
              >
                Deny
              </button>

              <button onClick={onAccept} className="modal__button">
                Accept
              </button>
            </ModalFooter>
          </Modal>
        )}
        <BackLink additionalClass="cart__backLink" />

        <Title rawTitle="Cart" additionalClass="cart__title" />

        <div className="cart__main">
          {cart?.length !== 0 ? (
            <React.Fragment>
              <div className="cart__list">
                {cart?.map(elem => {
                  return <CartElement key={elem.product.id} data={elem} />;
                })}
              </div>

              <div className="cart__checkout">
                <div className="cart__priceContainer">
                  <span className="cart__totalPrice">${sum}</span>
                  <span className="cart__amountOfItems">
                    Total for {amountOfItems} items
                  </span>
                </div>
                <button
                  onClick={() => setModalStatus(true)}
                  className="button button--inverted cart__button"
                >
                  Checkout
                </button>
              </div>
            </React.Fragment>
          ) : (
            <h2 className="cart__empty">
              <div className="cart__emptyTextSection">
                <Icon iconSlug="ShoppingBag" toIncludeBaseIconClass={false} />
                <h2 className="cart__emptyText">Your cart is empty</h2>
              </div>
              <img
                src="/public/img/cart-is-empty.png"
                alt="Cart is empty photo"
                className="pageNotFound__photo"
              ></img>
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};
