import { useContext, useEffect, useState } from 'react';
import { Button } from '../base/Button/Button.component';
import { StatesContext } from '../../store/GlobalStateProvider';

export const CartCheckout: React.FC = () => {
  const { cart } = useContext(StatesContext);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalItems(cart.reduce((acc, prod) => acc + prod.quantity!, 0));
    setTotalPrice(
      cart.reduce((acc, prod) => acc + prod.quantity! * prod.price, 0),
    );
  }, [cart]);

  return (
    <div className="cartCheckout">
      <div className="cartCheckout__container">
        <h2 className="cartCheckout__price">{`$${totalPrice}`}</h2>
        <div className="cartCheckout__totalItems">{`Total for ${totalItems} ${totalItems < 2 ? 'item' : 'items'}`}</div>
      </div>
      <div className="cartCheckout__button">
        <Button title="Checkout" buttonUse="checkout" onClick={() => {}} />
      </div>
    </div>
  );
};
