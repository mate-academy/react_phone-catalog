import React, { useContext } from 'react';
import './BtnAdd.scss';
import { NotifDispatchContext } from '../../../reducer/NotificationReduce';
import {
  DispatchCartContext,
  StateCartContext,
} from '../../../../shared/reducer/CartReducer';
import { Product } from '../../../types/Product';
import '../../../../../i18next';
import { TranslationContext } from '../../../../../i18next/shared/TranslationContext';
import classNames from 'classnames';
import { ProductListContext } from '../../../context/ProductListContext';

type BtnAddProps = {
  selectedProductID: string;
};

export const BtnAdd: React.FC<BtnAddProps> = ({ selectedProductID }) => {
  const notifDispatch = useContext(NotifDispatchContext);
  const cartState = useContext(StateCartContext);
  const cartDispatch = useContext(DispatchCartContext);
  const { productList } = useContext(ProductListContext);
  const { cartList } = cartState;
  const { btnsTitle, additionalText } = useContext(TranslationContext);

  const product: Product = productList.filter(
    p => p.itemId === selectedProductID,
  )[0];

  const isAdded: boolean = cartState.cartList.some(
    item => item.id === selectedProductID,
  );

  const addToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!product) {
      return;
    }

    if (isAdded) {
      cartDispatch({ type: 'removeItem', payload: selectedProductID });

      return;
    }

    try {
      if (cartList.length === 0) {
        cartDispatch({
          type: 'addItem',
          payload: {
            id: product.itemId,
            quantity: 1,
            product: {
              name: product.name,
              image: product.image,
              price: product.price,
            },
          },
        });

        notifDispatch({
          type: 'addProduct',
          payload: `${cartState.cartList.length + 1} ${additionalText.itemsInCart}`,
        });
      }

      cartDispatch({
        type: 'addItem',
        payload: {
          id: product.itemId,
          quantity: 1,
          product: {
            name: product.name,
            image: product.image,
            price: product.price,
          },
        },
      });
      notifDispatch({
        type: 'addProduct',
        payload: `${cartState.cartList.length + 1} ${additionalText.itemsInCart}`,
      });
    } finally {
      setTimeout(() => notifDispatch({ type: 'cancel' }), 4000);
    }
  };

  return (
    <button
      onClick={addToCart}
      className={classNames('btn-add', {
        'btn-add--added': isAdded,
      })}
    >
      {isAdded ? btnsTitle.added : btnsTitle.add}
    </button>
  );
};
