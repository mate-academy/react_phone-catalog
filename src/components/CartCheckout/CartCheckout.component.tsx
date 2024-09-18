import { Button } from '../base/Button/Button.component';
type Props = {
  totalItems: number;
  totalPrice: number;
};

export const CartCheckout: React.FC<Props> = ({ totalItems, totalPrice }) => {
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
