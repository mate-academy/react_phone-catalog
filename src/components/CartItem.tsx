import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';

type Props = {
  product: Product,
  amount: number,
  handleListChange: (id: string, action: string) => void,
};

export const CartItem:React.FC <Props> = ({
  product,
  amount,
  handleListChange = () => {},
}) => {
  const [currentAmount, setCurrentAmount] = useState<number>(amount);

  const handleAmountChange = (change: number) => {
    const action = change > 0 ? 'add' : 'reduce';

    handleListChange(product.id, action);
    setCurrentAmount(prevState => prevState + change);
  };

  return (
    <div className="cart__element cart-item text__body">
      <div className="cart-item__left-part">
        <div
          className="icon icon--cross"
          role="presentation"
          onClick={() => handleListChange(product.id, 'remove')}
        />
        <div className="cart-item__left-part__image-cover">
          <img
            className="cart-item__left-part__image"
            src={`new/${product.image}`}
            alt={product.name}
          />
        </div>
        <Link
          to={`/phones/${product.itemId}`}
          className="cart-item__left-part__name"
        >
          {product.name}
        </Link>
      </div>

      <div className="cart-item__right-part">
        <div className="cart-item__right-part__buttons">
          <button
            type="button"
            aria-label="slider-button"
            className="slider-button slider-button__minus"
            onClick={() => handleAmountChange(-1)}
            disabled={amount === 1}
          />
          <p>{currentAmount}</p>
          <button
            type="button"
            aria-label="slider-button"
            className="slider-button slider-button__plus"
            onClick={() => handleAmountChange(1)}
            disabled={amount === product.count}
          />
        </div>
        <h2>
          {`$${product.price * amount}`}
        </h2>
      </div>
    </div>
  );
};
