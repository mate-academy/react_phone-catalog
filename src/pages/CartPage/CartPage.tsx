import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './CartPage.scss';
import { Card } from '../../components/Card';
import { clearCart } from '../../features/product/productSlice';
import { Product } from '../../types/Product';

function getUniqueObjects(array: Product[]) {
  const uniqueObjects: Product[] = [];
  const ids = new Set();

  array.forEach((obj: Product) => {
    if (!ids.has(obj.id)) {
      ids.add(obj.id);
      uniqueObjects.push(obj);
    }
  });

  return uniqueObjects;
}

export const CartPage = () => {
  const { cart } = useAppSelector(state => state.phones);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const goBack = () => {
    navigate(-1);
  };

  const toralPrice = useMemo(() => {
    return cart.reduce((a, b) => a + b.price, 0);
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.length;
  }, [cart]);

  const cardToRender = useMemo(() => {
    return getUniqueObjects(cart);
  }, [cart]);

  const handleClick = () => {
    dispatch(clearCart());
    localStorage.setItem('cart',
      JSON.stringify([]));

    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <p>NO ITEMS</p>
    );
  }

  return (
    <div className="cart-page">
      <button
        className="cart-page__top"
        onClick={goBack}
        aria-label="go-back"
        type="button"
      >
        <div className="icon icon-prev" />
        <p className="cart-page__text">Back</p>
      </button>

      <div className="cart-page__content">
        <h1 className="title cart-page__title">Cart</h1>

        <div className="cart-page__main">
          <div className="cart-page__cards">
            {cardToRender.map(card => (
              <Card card={card} key={card.id} />
            ))}
          </div>

          <div className="checkout">
            <div className="checkout__top">
              <p className="checkout__total">
                {`$${toralPrice}`}
              </p>
              <p className="checkout__amount">
                {`Total for ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
              </p>
            </div>

            <button
              onClick={handleClick}
              className="checkout__button"
              aria-label="checkout"
              type="button"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
