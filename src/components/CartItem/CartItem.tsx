/* eslint-disable jsx-a11y/control-has-associated-label */
import '../../styles/components/CartItem/CartItem.scss';

import { Button } from '../Button';

type Props = {
  title: string;
  imgUrl: string;
  price: number;
  quantity: number;
  onQuantityIncrease: () => void;
  onQuantityDecrease: () => void;
};

export const CartItem: React.FC<Props> = ({
  title,
  imgUrl,
  price,
  quantity,
  onQuantityDecrease,
  onQuantityIncrease,
}) => {
  return (
    <section className="cart-item">
      <button type="button" className="cart-item__discard-button" />

      <img src={imgUrl} alt="item img" className="cart-item__image" />

      <p className="cart-item__title">
        {title}
      </p>

      <div className="cart-item__buttons-container">
        <div className="cart-item__button-container">
          <Button
            content="math"
            sign="minus"
            onClick={onQuantityDecrease}
            disabled={quantity === 1}
          />
        </div>

        <p className="cart-item__items-quantity">{quantity}</p>

        <div className="cart-item__button-container">
          <Button
            content="math"
            sign="plus"
            onClick={onQuantityIncrease}
          />
        </div>
      </div>

      <p className="cart-item__total-price">{`$${price}`}</p>
    </section>
  );
};
