import { useMyContext } from '../context/context';

export type CartSummaryProps = {
  itemsNum: number
  totalPrice: number
};

export const CartSummary = ({ itemsNum, totalPrice }: CartSummaryProps) => {
  const { handleError } = useMyContext();

  return (
    <div className="cartSummary">
      <h1 className="cartSummary__value h1">
        {`$${totalPrice}`}
      </h1>
      <p className="cartSummary__quantity BodyText" data-cy="productQauntity">
        {`Total for ${itemsNum} items`}
      </p>
      <span className="cartSummary__separator" />
      <button
        type="button"
        className="cartSummary__button buttons buttons__page BodyText"
        onClick={handleError}
      >
        Checkout
      </button>
    </div>
  );
};
