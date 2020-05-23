import React from 'react';
import { Product } from '../../interfaces';
import { CartCard } from '../../components/CartCard/CartCard';

export const CartPage = ({ cart, setCart }: { cart: Product[]; setCart: (cart: Product[]) => void }) => {
  const stringedCart = cart.map(item => JSON.stringify(item));
  const setFromCart = new Set(stringedCart);
  const cards = [...setFromCart]
  .map(item => JSON.parse(item))
  .sort((a, b) => a.name.localeCompare(b.name));


  return (
    <>
      <div>
      {cards.map(product => {
        const count = cart.filter(item => product.id === item.id).length;
        return (
          <CartCard cart={cart} product={product} count={count} setCart={setCart} />
        )
      })
      }
      </div>

       </>
  )

}


