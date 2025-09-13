import { Product } from '../../../types/Product';
import './BasketCard.scss';

type Props = {
  product: Product;
  quantity: number;
  handleTake: () => void;
  handleAdd: () => void;
  removeFromBasket: () => void;
};

export const BasketCard: React.FC<Props> = ({
  product,
  quantity,
  handleTake,
  handleAdd,
  removeFromBasket,
}) => {
  return (
    <div className="card">
      <div className="card__product">
        <div className="card__product--x">
          <img
            src="../../../../img/close.png"
            alt="delete"
            onClick={removeFromBasket}
          />
        </div>
        <div className="card__product--img">
          <img
            src={product.image}
            alt="img"
            className="card__product--img-item"
          />
        </div>
        <div className="card__product--name">{product.name}</div>
      </div>
      <div className="card__info">
        <div className="card__info--quantity">
          <div className="card__info--quantity-button" onClick={handleTake}>
            <img src="../../../../img/minus.png" alt="take" />
          </div>
          <div className="card__info--quantity-number">{quantity}</div>
          <div className="card__info--quantity-button" onClick={handleAdd}>
            <img src="../../../../img/plus.png" alt="add" />
          </div>
        </div>
        <div className="card__info--price">${product.price}</div>
      </div>
    </div>
  );
};
