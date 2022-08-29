import './CheckOut.scss';

type Props = {
  totalPrice: number;
  numberOfProducts: number;
};

export const CheckOut: React.FC<Props> = ({ totalPrice, numberOfProducts }) => {
  return (
    <div className="CheckOut">
      <h1 className="CheckOut__price">
        {`$${totalPrice}`}
      </h1>
      <h1 className="CheckOut__text">
        {`Total for ${numberOfProducts} items`}
      </h1>
      <button
        type="button"
        className="CheckOut__btn"
      >
        Checkout
      </button>
    </div>
  );
};
