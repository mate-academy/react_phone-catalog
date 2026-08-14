import { useContext, useEffect, useState } from 'react';
import { Button } from '../../base/Button/Button';
import { StatesContext } from '../../base/store/GlobalStateProvider';

export const CartCheckout: React.FC = () => {
  const { totalCartItems, cart } = useContext(StatesContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cart.reduce((acc, prod) => {
      const price = prod.price || prod.discountPrice || 0;
      const quantity = prod.quantity || 1;

      return acc + price * quantity;
    }, 0);

    setTotalPrice(total);
  }, [cart]);

  return (
    <div className="cartCheckout">
      <div className="cartCheckout__container">
        <h2 className="cartCheckout__price">${totalPrice}</h2>
        <div className="cartCheckout__totalItems">
          Total for {totalCartItems} {totalCartItems === 1 ? 'item' : 'items'}
        </div>
      </div>
      <div className="cartCheckout__button">
        <Button title="Checkout" buttonUse="checkout" onClick={() => {}} />
      </div>
    </div>
  );
};
