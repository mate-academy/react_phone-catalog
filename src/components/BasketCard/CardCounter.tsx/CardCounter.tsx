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
  handleIncrease,
  handleDecrease,
}: CardCounterProps) => {
  const isQuantityLow = basketProduct.quantity > 1;

  return (
    <>
      <div className="basket-card__counter">
        <button
          className={`basket-card__counter--decrease ${!isQuantityLow ? 'active' : ''}`}
          onClick={() => handleDecrease(basketProduct.itemId)}
        >
          -
        </button>
        <span className="basket-card__counter--value">
          {basketProduct.quantity}
        </span>
        <button
          className={`basket-card__counter--increase ${!isQuantityLow ? 'active' : ''}`}
          onClick={() => handleIncrease(basketProduct.itemId)}
        >
          +
        </button>
      </div>
    </>
  );
};

export default CardCounter;
