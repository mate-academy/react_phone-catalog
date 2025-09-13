import './Basket.scss';
import { useShop } from '../../context/shopContext';
import { BasketCard } from './BasketCard/BasketCard';
import { useState } from 'react';

export const Basket = () => {
  const { basket, removeFromBasket } = useShop();
  const [quantities, setQuantities] = useState<{ [productId: number]: number }>(
    () => Object.fromEntries(basket.map(p => [p.id, 1])),
  );

  const handleTake = (productId: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(prev[productId] - 1, 1),
    }));
  };

  const handleAdd = (productId: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: prev[productId] + 1,
    }));
  };

  const totalPrice = basket.reduce((sum, product) => {
    const quantity = quantities[product.id] || 1;

    return sum + product.price * quantity;
  }, 0);

  return (
    <div className="basket">
      <div className="basket__path">
        <div className="basket__path--arrow">
          <img src="../../../img/arrow-left.png" alt="right" />
        </div>
        <div
          className="basket__path--back"
          onClick={() => window.history.back()}
        >
          Back
        </div>
      </div>
      <div className="basket__title">Cart</div>
      {basket.length === 0 ? (
        <div className="basket__empty">No items in cart</div>
      ) : (
        <div className="basket__container">
          <div className="basket__grid">
            {basket.map(product => {
              return (
                <BasketCard
                  key={product.id}
                  product={product}
                  quantity={quantities[product.id] || 1}
                  handleTake={() => handleTake(product.id)}
                  handleAdd={() => handleAdd(product.id)}
                  removeFromBasket={() => removeFromBasket(product.id)}
                />
              );
            })}
          </div>
          <div className="basket__total">
            <div className="basket__total--price">${totalPrice}</div>
            <div className="basket__total--text">
              Total for {/*eslint-disable-next-line max-len*/}
              {Object.values(quantities).reduce(
                (sum, qty) => sum + qty,
                0,
              )}{' '}
              items
            </div>
            <div className="basket__total--line"></div>
            <div className="basket__total--checkout">Checkout</div>
          </div>
        </div>
      )}
    </div>
  );
};
