/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context';

import { Button, Typography } from '../../ui/base';
import { NoProducts, Modal, CartItem, ButtonBack } from '../../ui/components';

import { ProductCart } from '../../types';
import './CartPage.scss';

type Props = {};

export const CartPage: React.FC<Props> = () => {
  const [isOpenErrorMessage, setIsOpenErrorMessage] = useState<boolean>(false);
  const [totalSum, setTotalSum] = useState<number>(0);
  const [totalItems, setTotaltems] = useState<number>(0);
  const { cartItems, updateProductCartQty, addDelProductCart }
    = useContext(ProductContext);

  const itemsQty = cartItems.length;

  const onChangeQty = (idX: string, qty: number) => {
    return updateProductCartQty(idX, qty);
  };

  const onDeleteItem = (item: ProductCart) => {
    return addDelProductCart(item);
  };

  useEffect(() => {
    const total = cartItems.reduce((totalValue, item) => {
      return totalValue + item.cartQty * item.price;
    }, 0);

    const totalItemsQty = cartItems.reduce((totalValue, item) => {
      return totalValue + item.cartQty;
    }, 0);

    setTotalSum(total);
    setTotaltems(totalItemsQty);
  }, [cartItems]);

  return (
    <div className="cart-page">
      <ButtonBack className="cart-page__back" />
      <Typography type="title" level="1" className="cart-page__title">
        Cart
      </Typography>
      {itemsQty > 0 ? (
        <div className="cart-page__content">
          <div className="cart-page__list">
            {cartItems.map(item => (
              <CartItem
                key={item.itemId}
                item={item}
                onChangeQty={onChangeQty}
                onDeleteItem={onDeleteItem}
              />
            ))}
          </div>
          <div className="cart-page__right">
            <div className="cart-page__checkout">
              <div className="cart-page__summary">
                <Typography type="title" level="2" className="cart-page__sum">
                  {`$ ${totalSum}`}
                </Typography>
                <Typography type="text" className="cart-page__qty">
                  {`Total for ${totalItems !== 1 ? `${totalItems} items` : '1 item'}`}
                </Typography>
              </div>
              <Button
                type="primary"
                onClickHandler={() => setIsOpenErrorMessage(true)}
                fullWidth
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <NoProducts label="Your cart is empty" />
      )}
      <Modal
        text="We are sorry, but this feature is not implemented yet"
        isOpen={isOpenErrorMessage}
        onClose={setIsOpenErrorMessage}
      />
    </div>
  );
};
