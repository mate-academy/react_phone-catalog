import {
  useContext,
} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CartItem } from '../../components/CartItem';
import { HistoryButton } from '../../components/HistoryButton';
import { Title } from '../../components/Title';
import './CartPage.scss';
import { ProductsContext } from '../../context/ProductsContext';
import { CartTotal } from '../../components/CartTotal';
import { getTotalPrice } from '../../helpers/getTotalPrice';
import { Notification } from '../../components/Notification';
import { useErrorTimer } from '../../helpers/useErrorTimer';

export const CartPage = () => {
  const { cart } = useContext(ProductsContext);
  const { error, setErrorTimer } = useErrorTimer();

  return (
    <div className="CartPage">
      <CSSTransition
        in={error.isError}
        timeout={300}
        classNames="notification"
        mountOnEnter
        unmountOnExit
      >
        <Notification key={error.id} type={error.type} text={error.text} />
      </CSSTransition>
      <HistoryButton text="Back" />
      <div className="CartPage__title">
        <Title title="Cart" />
      </div>
      {!cart.length && <p className="CartPage__empty">It&apos;s empty here</p>}
      {!!cart.length && (
        <div className="CartPage__total">
          <CartTotal
            total={getTotalPrice(cart)}
            itemsCount={cart
              .reduce((acc, item) => acc + (item.quantity || 1), 0)}
            setNotification={setErrorTimer}
          />
        </div>
      )}
      <TransitionGroup component={null}>
        {cart.map((item) => (
          <CSSTransition
            key={item.id}
            timeout={300}
            classNames="cart-item"
            mountOnEnter
            unmountOnExit
          >
            <CartItem setError={setErrorTimer} item={item} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};
