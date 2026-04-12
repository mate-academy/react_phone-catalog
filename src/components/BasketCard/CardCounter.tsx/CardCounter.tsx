import { BasketProduct } from '../../../types/BasketProduct';
import './CardCounter.scss';

type CardCounterProps = {
  basketProduct: BasketProduct;
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
};

const CardCounter = ({ basketProduct, setBaskets }: CardCounterProps) => {
  return (
    <>
      <div className="basket-card__counter">
        <button className="basket-card__counter--decrease">-</button>
        <span className="basket-card__counter--value">
          {basketProduct.quantity}
        </span>
        <button className="basket-card__counter--increase">+</button>
      </div>
    </>
  );
};

export default CardCounter;
