import { useMemo } from 'react';
import { useCart } from '../../contexts/Cart';
import { useProducts } from '../../contexts/Products';
import { Product } from '../../types/Product';
import { CartItem } from '../../components/CartItem';

import './CatrPage.scss';

export const Cart = () => {
  const { cartList, count } = useCart();
  const { phones, tablets, accessories } = useProducts();

  const allProducts = useMemo(
    () => [...(phones.items ?? []), ...(tablets.items ?? []), ...(accessories.items ?? [])],
    [phones.items, tablets.items, accessories.items],
  );

  const cartProducts: Product[] = useMemo(
    () =>
      cartList
        .map(cartPr => allProducts.find(p => p.id === cartPr.id))
        .filter((p): p is Product => Boolean(p)),
    [cartList, allProducts],
  );

  const totalPrice = useMemo(() => {
    return cartList.reduce((acc, item) => {
      const product = allProducts.find(pr => pr.id === item.id);
      const price = product ? product.priceDiscount : 0;
      return acc + price * item.quantity;
    }, 0);
  }, [cartList, allProducts]);

  const totalItems = useMemo(() => {
    return cartList.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartList]);

  return (
    <div className="cart">
      <h1 className="cart__title">Cart</h1>

      <div className="cart__wrapper">
        <div className="cart__content">
          {cartProducts.map(product => (
            <CartItem
              key={product.id}
              product={product}
              cartItem={cartList.find(i => i.id === product.id)}
            />
          ))}
        </div>

        <div className="cart__checkout">
          <div className="cart__checkout__details">
            <p className="cart__checkout__price">{`$${totalPrice}`}</p>
            <p className="cart__checkout__items">Total for {totalItems} items</p>
          </div>
          <div className="cart__checkout__br"></div>
          <div className="cart__checkout__btn">Checkout</div>
        </div>
      </div>
    </div>
  );
};
