import { useContext, useMemo } from 'react';
import './Cart.scss';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { CartContext } from '../../contexts/CartContext';
import CartItem from './CartItem/CartItem';
import CartTotal from './CartTotal/CartTotal';
import Back from '../../components/Back/Back';
import EmptyModal from '../../components/EmptyModal/EmptyModal';

const Cart = () => {
  const { cart, delCard, changeCardCount } = useContext(CartContext);

  const totalPrice = useMemo(() => {
    return cart
      .reduce((prev, next) => (prev + next.product.price) * next.count, 0);
  }, [cart]);

  return (
    <section className="page__section cart">
      <div className="container">
        <Back />

        <h3 className="page__title">Cart</h3>

        {!cart.length
          ? <EmptyModal name="Your cart is empty" />
          : (
            <div className="cart__shop-wrapper">
              <ul>
                <TransitionGroup className="cart__list">
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
                    <CSSTransition
                      key={name}
                      timeout={500}
                      classNames="item"
                    >
                      <CartItem
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
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </ul>

              {!!cart.length && (
                <CartTotal
                  totalPrice={totalPrice}
                  visibleCartLength={cart.length}
                />
              )}
            </div>
          )}
      </div>
    </section>
  );
};

export default Cart;
