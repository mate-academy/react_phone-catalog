import './CartPage.scss';
import { CartItem } from '../../Components/CardItem/CardItem';
import { useContext, useEffect } from 'react';
import { ProductContext } from '../../helper/ProductContext';

export const CartPage = () => {
  const { card, setCard, setAmountCard } = useContext(ProductContext);
  const totalPrice = card.map(el => {
    return el.quantity * el.price;
  });

  const goBack = () => {
    window.history.back();
  };

  const sum = totalPrice.reduce((value, curValue) => value + curValue, 0);
  const amountItems = card.reduce((acc, c) => c.quantity + acc, 0);

  const handleCheckout = () => {
    const result = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (result) {
      setCard([]);
    } else {
      return;
    }
  };

  useEffect(() => {
    const finalAmount = amountItems !== 0 ? amountItems : card.length;

    setAmountCard(finalAmount);
  }, [amountItems, card.length, setAmountCard]);

  return !card.length ? (
    <div className="cardPage__h1">Your cart is empty</div>
  ) : (
    <div className="cardPage">
      <div className="cardPage__container">
        <button className="cardPage__back" onClick={goBack}>
          <img className="cardPage__arrey" src="img/Vector(Stroke)Back.png" />
          <p>Back</p>
        </button>

        <h1 className="cardPage__h1">Cart</h1>
        <div className="cardPage__items">
          <div className="cardPage__items">
            <div className="cardPage__card">
              <CartItem />
            </div>

            <div className="cardPage__checkout">
              <div className="cardPage__price">{`$${sum}`}</div>
              <p className="cardPage__amount">{`Total for ${amountItems} items`}</p>
              <button className="cardPage__button" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
