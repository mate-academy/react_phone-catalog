import React, { useContext } from 'react';
import './BtnAdd.scss';
import { DispatchContext } from '../../reduce/NotificationReduce';
import {
  DispatchCartContext,
  StateCartContext,
} from '../../reduce/CartReducer';
import { Product } from '../../types/Product';
import '../../../../i18next';
import { ProductsState } from '../../reduce/ProductPageReducer';
import '../../../../i18next';
import { TranslationContext } from '../../../../i18next/shared';

type BtnAddProps = {
  selectedProductID: string;
};

export const BtnAdd: React.FC<BtnAddProps> = ({ selectedProductID }) => {
  const dispatch = useContext(DispatchContext);
  const cartState = useContext(StateCartContext);
  const cartDispatch = useContext(DispatchCartContext);
  const { currentProducts } = useContext(ProductsState);
  const { cartList } = cartState;
  const { btnsTitle, additionalText } = useContext(TranslationContext);

  const product: Product | null = currentProducts.find(
    p => p.itemId === selectedProductID,
  );

  const addToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!product) {
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

        dispatch({
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
      dispatch({
        type: 'addProduct',
        payload: `${cartState.cartList.length + 1} ${additionalText.itemsInCart}`,
      });
    } finally {
      setTimeout(() => dispatch({ type: 'cancel' }), 2000);
    }
  };

  return (
    <button onClick={addToCart} className="btn-add">
      {btnsTitle.add}
    </button>
  );
};
