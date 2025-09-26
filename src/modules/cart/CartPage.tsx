// src/modules/cart/CartPage.tsx - Shopping cart page component
import { useCart } from '../../context/CartContext';
import s from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const { items, inc, dec, remove, totalAmount, totalQty, clear } = useCart();

  const checkout = () => {
    if (
      confirm('Checkout is not implemented yet. Do you want to clear the Cart?')
    ) {
      clear();
    }
  };

  if (items.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div>
      <h1>Cart</h1>

      <ul className={s.itemsList}>
        {items.map(i => (
          <li key={i.id} className={s.item}>
            <div className={s.itemContent}>
              <img src={i.product.image} alt="" className={s.itemImage} />
              <div className={s.itemInfo}>
                <div>{i.product.name}</div>
                <div>${i.product.price}</div>
              </div>

              <div className={s.quantityControls}>
                <button onClick={() => dec(i.id)}>-</button>
                <span>{i.qty}</span>
                <button onClick={() => inc(i.id)}>+</button>
              </div>

              <button onClick={() => remove(i.id)} aria-label="Remove">
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className={s.totalSection}>
        <strong>Total: ${totalAmount}</strong>
        <span>({totalQty} items)</span>
        <button onClick={checkout} className={s.checkoutButton}>
          Checkout
        </button>
      </div>
    </div>
  );
};
