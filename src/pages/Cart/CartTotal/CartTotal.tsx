import './CartTotal.scss';

type Props = {
  totalPrice: number;
  visibleCartLength: number;
};

const CartTotal: React.FC<Props> = ({
  totalPrice,
  visibleCartLength,
}) => {
  const onClickHandle = () => {
    // eslint-disable-next-line no-console
    console.log('We are sorry, but this feature is not implemented yet');
  };

  return (
    <div className="cart-total">
      <span className="cart-total__price">
        {`$${totalPrice}`}
      </span>
      <span className="cart-total__for">
        {`Total for ${visibleCartLength} items`}
      </span>
      <div className="line cart-total__line" />
      <button
        className="cart-total__checkout"
        type="button"
        onClick={onClickHandle}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartTotal;
