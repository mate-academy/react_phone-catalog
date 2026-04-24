import CardCounter from './CardCounter.tsx/CardCounter';
import './BasketCard.scss';
import { BasketProduct } from '../../../types/BasketProduct';
import { Link } from 'react-router-dom';
import useAppContext from '../../../useAppContext';

type BasketCardProps = {
  basketProduct: BasketProduct;
};

const BasketCard = ({ basketProduct }: BasketCardProps) => {
  const { removeBaskets } = useAppContext();

  return (
    <>
      <div className="basket-card">
        <div className="basket-card__left">
          <button
            className="basket-card__button--delete"
            onClick={() => removeBaskets(basketProduct.itemId)}
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
          <CardCounter basketProduct={basketProduct} />
          <div className="basket-card__price">${basketProduct.price}</div>
        </div>
      </div>
    </>
  );
};

export default BasketCard;
