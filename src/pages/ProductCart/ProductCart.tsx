/* eslint-disable no-restricted-syntax */
import '../../styles/pages/ProductCart/ProductCart.scss';

import { CartItem } from '../../components/CartItem';
import { Product } from '../../types/product';
import { Item } from '../../types/storageItem';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { CartTotal } from '../../components/CartTotal';
import { GoBackButton } from '../../components/GoBackButton';

type Props = {
  cart: Item<Product>[],
  onDiscardItem: (item: Item<Product>) => void;
  onQuantityDecrease: (item: Item<Product>) => void;
  onQuantityIncrease: (item: Item<Product>) => void;
};

export const ProductCart: React.FC<Props> = ({
  cart,
  onDiscardItem,
  onQuantityDecrease,
  onQuantityIncrease,
}) => {
  const [totalPrice, itemsQuantity] = calcTotalPrice(cart);

  return (
    <main className="cart">
      <div className="cart__back-link">
        <GoBackButton />
      </div>

      <h1 className="cart__title">
        Cart
      </h1>

      {cart.length === 0 ? (
        <h1 className="products-page__sad-message">Your cart is empty</h1>
      ) : (
        <div className="cart__content-container">
          <div className="cart__cart-items">
            {cart.map(item => (
              <CartItem
                item={item}
                onQuantityDecrease={item.quantity <= 1
                  ? onDiscardItem
                  : onQuantityDecrease}
                onQuantityIncrease={onQuantityIncrease}
                onDiscardItem={onDiscardItem}
              />
            ))}
          </div>

          <div className="cart_cart-total">
            <CartTotal price={totalPrice} quantity={itemsQuantity} />
          </div>
        </div>
      )}
    </main>
  );
};
