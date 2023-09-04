import '../../styles/components/CartTotal/CartTotal.scss';

type Props = {
  price: number;
  quantity: number;
};

export const CartTotal: React.FC<Props> = ({
  price,
  quantity,
}) => {
  return (
    <section className="cart-total">
      <p className="cart-total__price">{`$${price}`}</p>

      <p className="cart-total__quantity">{`Total for ${quantity} items`}</p>

      <button
        type="button"
        className="cart-total__checkout-button"
      >
        Checkout
      </button>
    </section>
  );
};
