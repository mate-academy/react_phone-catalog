/* eslint-disable max-len */
import './Cart.scss';
import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductContext';
import { CartList } from './CartList';
import { Total } from './Total';
import { HeaderCart } from './Header';
import { EmptyCart } from './Empty';

export const Cart = () => {
  const { products, addedCartProducts } = useContext(ProductsContext);

  const filterAddedProducts = products.filter(id => {
    return addedCartProducts.some(likeId => {
      return likeId.productId === id.itemId;
    });
  });

  const sumOfPrice = filterAddedProducts.reduce((acc, value) => {
    const cartProduct = addedCartProducts.find(a => {
      return a.productId === value.itemId;
    });

    return acc + value.price * (cartProduct?.quantity ?? 1);
  }, 0);

  const sumOfCounters = addedCartProducts.reduce((acc, value) => {
    return acc + value.quantity;
  }, 0);

  return (
    <main className="cart">
      <HeaderCart />
      {filterAddedProducts.length > 0 && (
        <div className="cart__context">
          <CartList filterAddedProducts={filterAddedProducts} />
          <Total sumOfPrice={sumOfPrice} countProduct={sumOfCounters} />
        </div>
      )}

      {filterAddedProducts.length === 0 && <EmptyCart />}
    </main>
  );
};
