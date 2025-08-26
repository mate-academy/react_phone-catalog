import { useCart } from '../../context/CartContext';

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

      <ul style={{ display: 'grid', gap: 12, marginTop: 12 }}>
        {items.map(i => (
          <li
            key={i.id}
            style={{ border: '1px solid #eee', borderRadius: 10, padding: 12 }}
          >
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <img
                src={i.product.image}
                alt=""
                style={{ width: 64, height: 64, objectFit: 'contain' }}
              />
              <div style={{ flex: 1 }}>
                <div>{i.product.name}</div>
                <div>${i.product.price}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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

      <div
        style={{
          marginTop: 16,
          display: 'flex',
          gap: 16,
          alignItems: 'center',
        }}
      >
        <strong>Total: ${totalAmount}</strong>
        <span>({totalQty} items)</span>
        <button onClick={checkout} style={{ marginLeft: 'auto' }}>
          Checkout
        </button>
      </div>
    </div>
  );
};
