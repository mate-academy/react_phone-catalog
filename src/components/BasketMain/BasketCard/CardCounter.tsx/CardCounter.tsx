import { BasketProduct } from '../../../../types/BasketProduct';
import useAppContext from '../../../../useAppContext';
import './CardCounter.scss';

type CardCounterProps = {
  basketProduct: BasketProduct;
};

const CardCounter = ({ basketProduct }: CardCounterProps) => {
  const { handleIncrease, handleDecrease } = useAppContext();
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
