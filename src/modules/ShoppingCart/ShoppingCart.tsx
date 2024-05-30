import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../store/ShoppingCartContext';
import { ShoppingItem } from './ShoppingItem';
import { BackButton } from '../shared/Buttons/MoveButtons';
import { Product } from '../../types/Product';
import { PRODUCT_URL } from "../constants/URL's/URL's";
import { client } from '../../api';

export const ShoppingCart = React.memo(() => {
  const { shoppingList } = useContext(ShoppingCartContext);
  const naigate = useNavigate();

  const [shoppingProducts, setShoppingProducts] = useState<Product[]>([]);

  const totalPrice = shoppingList.reduce((total, device) => {
    const product = shoppingProducts.find(item => item.itemId === device);

    if (product && device === product.itemId) {
      return total + product.price;
    }

    return total;
  }, 0);

  useEffect(() => {
    client
      .get<Product[]>(PRODUCT_URL)
      .then(data => {
        const getProducts = data.filter(product =>
          shoppingList.includes(product.itemId),
        );

        setShoppingProducts(getProducts);
      })
      .catch(() => {});
  }, [shoppingList]);

  return (
    <div className="shopping-cart">
      <div className="shopping-cart__back">
        <BackButton move={() => naigate(-1)} />
      </div>

      <h1 className="shopping-cart__title primary-title">Cart</h1>

      <div className="shopping-cart__items-container">
        {shoppingProducts.map(item => (
          <ShoppingItem product={item} key={item.id} />
        ))}
      </div>

      <div className="shopping-cart__total">
        <h2 className="shopping-cart__total-price">${totalPrice}</h2>
        <p className="shopping-cart__total-items">
          Total for {shoppingList.length} items
        </p>
        <button
          type="button"
          className="shopping-cart__checkout"
          onClick={() => {}}
        >
          Checkout
        </button>
      </div>
    </div>
  );
});
