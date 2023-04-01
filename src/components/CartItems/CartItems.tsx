import { FC } from 'react';
import { CardItem } from '../../types/CardItem';
import { Product } from '../../types/Product';
import { CartItem } from '../CartItem/CartItem';

type Props = {
  products: Product[];
  cart: CardItem[];
  deleteCart: (product: Product) => void;
  decreaseCountCart: (product: Product) => void;
  increaseCountCart: (product: Product) => void;
};

export const CartItems: FC<Props> = ({
  products,
  cart,
  deleteCart,
  decreaseCountCart,
  increaseCountCart,
}) => (
  <div className="cart__items">
    {products.map(product => (
      <CartItem
        key={product.id}
        product={product}
        cart={cart}
        deleteCart={deleteCart}
        decreaseCountCart={decreaseCountCart}
        increaseCountCart={increaseCountCart}
      />
    ))}
  </div>
);
