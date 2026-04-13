import { BasketProduct } from '../../../types/BasketProduct';
import './CardCounter.scss';

type CardCounterProps = {
  basketProduct: BasketProduct;
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
  handleIncrease: (itemId: string) => void;
  handleDecrease: (itemId: string) => void;
};

const CardCounter = ({
  basketProduct,
  setBaskets,
  handleIncrease,
  handleDecrease,
}: CardCounterProps) => {
  return (
    <>
      <div className="basket-card__counter">
        <button
          className="basket-card__counter--decrease"
          onClick={() => handleDecrease(basketProduct.itemId)}
        >
          -
        </button>
        <span className="basket-card__counter--value">
          {basketProduct.quantity}
        </span>
        <button
          className="basket-card__counter--increase"
          onClick={() => handleIncrease(basketProduct.itemId)}
        >
          +
        </button>
      </div>
    </>
  );
};

export default CardCounter;
