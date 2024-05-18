import { Link } from 'react-router-dom';
import './CartPage.scss';
import { CartItem } from '../../Components/CardItem/CardItem';
import { useContext } from 'react';
import { ProductContext } from '../../helper/ProductContext';

export const CartPage = () => {
  const { card, setCard } = useContext(ProductContext);
  const totalPrice = card.map(el => {
    return el.quantity * el.price;
  });

  const sum = totalPrice.reduce((value, curValue) => value + curValue, 0);

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

  return !card.length ? (
    <div className="cardPage__h1">Your cart is empty</div>
  ) : (
    <div className="cardPage">
      <div className="cardPage__container">
        <div className="cardPage__back details__back">
          <Link to="/phones" className="details__back-link">
            <img className="details__arrey" src="img/Vector (Stroke).png" />
            <p>Back</p>
          </Link>
        </div>
        <h1 className="cardPage__h1">Cart</h1>
        <div className="cardPage__items">
          <div className="cardPage__items">
            <div className="cardPage__card">
              <CartItem />
            </div>

            <div className="cardPage__checkout">
              <div className="cardPage__price">{`$${sum}`}</div>
              <p className="cardPage__amount">{`Total for ${card.length} items`}</p>
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
