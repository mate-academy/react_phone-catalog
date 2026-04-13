import CardCounter from './CardCounter.tsx/CardCounter';
import './BasketCard.scss';
import { BasketProduct } from '../../types/BasketProduct';

type BasketCardProps = {
  basketProduct: BasketProduct;
  baskets: BasketProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
  removeBasket: (itemid: string) => void;
  handleIncrease: (itemId: string) => void;
  handleDecrease: (itemId: string) => void;
};

const BasketCard = ({
  basketProduct,
  baskets,
  setBaskets,
  removeBasket,
  handleIncrease,
  handleDecrease,
}: BasketCardProps) => {
  return (
    <>
      <div className="basket-card">
        <div className="basket-card__left">
          <button
            className="basket-card__button--delete"
            onClick={() => removeBasket(basketProduct.itemId)}
          ></button>
          <img
            className="basket-card__image"
            src={basketProduct.image}
            alt={basketProduct.name}
          />
          <div className="basket-card__name">{basketProduct.name}</div>
        </div>

        <div className="basket-card__right">
          <CardCounter
            basketProduct={basketProduct}
            setBaskets={setBaskets}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
          />
          <div className="basket-card__price">${basketProduct.price}</div>
        </div>
      </div>
    </>
  );
};

export default BasketCard;
