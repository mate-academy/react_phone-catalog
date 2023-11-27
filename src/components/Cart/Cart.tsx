import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router';
import { CatalogContext } from '../../context';
import { CartList } from '../CartList';
import { Button } from '../Button';
import './cart.scss';

export const Cart = () => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const { cart } = useContext(CatalogContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShow(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [isShow]);

  const totalCartPrice = useMemo(
    () => cart
      .reduce((total, curr) => total + (curr.quantity * curr.price), 0), [cart],
  );
  const cartItemsTotal = useMemo(
    () => cart.reduce((total, curr) => total + curr.quantity, 0), [cart],
  );

  return (
    <div className="container">
      <div className="cart">
        <button
          type="button"
          className="cart__back-btn"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <h1 className="cart__title">
          Cart
        </h1>

        <div className="cart__content">
          <div className="cart__items-block">
            <CartList />
          </div>

          <div className="cart__total-block">
            <h1 className="cart__amount">
              {`$${totalCartPrice}`}
            </h1>

            <span className="cart__items-count">
              {`Total for ${cartItemsTotal} items`}
            </span>

            <div className="cart__line" />

            <Button
              width="100%"
              height="48px"
              type="button__action"
              handler={() => setIsShow(true)}
            >
              Checkout
            </Button>

            {isShow && (
              <div className="cart__message">
                We are sorry, but this feature is not implemented yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
