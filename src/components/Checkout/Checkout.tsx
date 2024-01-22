import './Checkout.scss';

type Props = {
  totalPrice: number,
  totalItems: number,
  handleClick: () => void,
};

export const Checkout: React.FC<Props> = ({
  totalPrice,
  totalItems,
  handleClick,
}) => {
  return (
    <div className="checkout">
      <div className="checkout__top">
        <p className="checkout__total">
          {`$${totalPrice}`}
        </p>
        <p className="checkout__amount">
          {`Total for ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
        </p>
      </div>

      <button
        onClick={handleClick}
        className="button-main"
        aria-label="checkout"
        type="button"
      >
        Checkout
      </button>
    </div>
  );
};
