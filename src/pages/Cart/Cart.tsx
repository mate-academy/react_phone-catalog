import { useContext, useMemo } from 'react';
import './Cart.scss';
import { CartContext } from '../../contexts/CartContext';
import CartItem from './CartItem/CartItem';
import CartTotal from './CartTotal/CartTotal';

const Cart = () => {
  const { cart, delCard, changeCardCount } = useContext(CartContext);

  const totalPrice = useMemo(() => {
    return cart
      .reduce((prev, next) => (prev + next.product.price) * next.count, 0);
  }, [cart]);

  return (
    <section className="page__section cart">
      <div className="container">
        <h3 className="page__title">Cart</h3>

        <div className="cart__shop-wrapper">
          <ul className="cart__list">
            {cart.map(({
              product: {
                name,
                image,
                price,
                phoneId,
                category,
              },
              count,
              id,
            }) => (
              <CartItem
                key={name}
                phoneId={phoneId}
                category={category}
                name={name}
                image={image}
                price={price}
                delCard={delCard}
                count={count}
                id={id}
                changeCardCount={changeCardCount}
              />
            ))}
          </ul>

          {!!cart.length && (
            <CartTotal
              totalPrice={totalPrice}
              visibleCartLength={cart.length}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
