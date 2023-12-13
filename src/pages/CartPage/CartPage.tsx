import {
  useCallback,
  useContext,
  useEffect,
  useState,
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

export const CartPage = () => {
  const { cart } = useContext(ProductsContext);
  const [error, setError] = useState<ErrorType>({
    id: 0,
    isError: false,
    type: 'success',
    text: '',
  });

  const createErrorTimer = useCallback(() => {
    let timerId: NodeJS.Timeout;

    return () => {
      clearTimeout(timerId);

      timerId = setTimeout(() => {
        setError((prev) => ({ ...prev, isError: false }));
      }, 5000);
    };
  }, [setError]);

  const restartErrorInterval
    = useCallback(createErrorTimer(), [createErrorTimer]);

  useEffect(() => {
    if (error.isError) {
      restartErrorInterval();
    }
  }, [error.id]);

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
            setNotification={setError}
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
            <CartItem setError={setError} item={item} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};
