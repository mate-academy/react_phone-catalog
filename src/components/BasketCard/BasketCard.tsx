import CardCounter from './CardCounter.tsx/CardCounter';
import './BasketCard.scss';
import { BasketProduct } from '../../types/BasketProduct';
import { Link } from 'react-router-dom';

type BasketCardProps = {
  basketProduct: BasketProduct;
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
  removeBasket: (itemId: string) => void;
  handleIncrease: (itemId: string) => void;
  handleDecrease: (itemId: string) => void;
};

const BasketCard = ({
  basketProduct,
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
          <Link to={`/${basketProduct.category}/${basketProduct.itemId}`}>
            <img
              className="basket-card__image"
              src={basketProduct.image}
              alt={basketProduct.name}
            />
          </Link>
          <Link
            to={`/${basketProduct.category}/${basketProduct.itemId}`}
            className="basket-card__name"
          >
            {basketProduct.name}
          </Link>
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
