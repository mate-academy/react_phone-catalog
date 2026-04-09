import { FavoriteProduct } from '../../types/FavoriteProduct';
import CardCounter from './CardCounter.tsx/CardCounter';
import './BasketCard.scss';

type BasketCardProps = {
  basketProduct: FavoriteProduct;
  baskets: FavoriteProduct[];
};

const BasketCard = ({ basketProduct, baskets }: BasketCardProps) => {
  return (
    <>
      <div className="basket-card">
        <button className="basket-card__button--delete"></button>
        <img className="basket-card__image" src={basketProduct.image} alt="" />
        <div className="basket-card__name">{basketProduct.name}</div>
        <CardCounter />
        <div className="basket-card__price">${basketProduct.price}</div>
      </div>
    </>
  );
};

export default BasketCard;
