/* eslint-disable jsx-a11y/control-has-associated-label */
import '../../styles/components/CartItem/CartItem.scss';
import { Product } from '../../types/product';
import { Item } from '../../types/storageItem';
import { Button } from '../Button';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

type Props = {
  item: Item<Product>;
  onQuantityIncrease: (item: Item<Product>) => void;
  onQuantityDecrease: (item: Item<Product>) => void;
  onDiscardItem: (item: Item<Product>) => void;
};

export const CartItem: React.FC<Props> = ({
  item,
  onQuantityDecrease,
  onQuantityIncrease,
  onDiscardItem,
}) => {
  const { quantity, value } = item;

  const { name, image, price } = value;

  return (
    <section className="cart-item">
      <div className="cart-item__content-container">
        <button
          type="button"
          className="cart-item__discard-button"
          onClick={() => onDiscardItem(item)}
        />

        <img
          src={BASE_URL + image}
          alt="item img"
          className="cart-item__image"
        />

        <p className="cart-item__title">
          {name}
        </p>
      </div>

      <div className="cart-item__price-buttons-containter">
        <div className="cart-item__buttons-container">
          <div className="cart-item__button-container">
            <Button
              content="math"
              sign="minus"
              onClick={() => onQuantityDecrease(item)}
            />
          </div>

          <p className="cart-item__items-quantity">{quantity}</p>

          <div className="cart-item__button-container">
            <Button
              content="math"
              sign="plus"
              onClick={() => onQuantityIncrease(item)}
            />
          </div>
        </div>

        <p className="cart-item__total-price">{`$${price * quantity}`}</p>
      </div>
    </section>
  );
};
