import { Link } from 'react-router-dom';

function Cart({ cart, removeFromCart }) {
if (cart.length === 0) {
return (
<div className="catalog">
<h1 className="catalog-title">🛒 Cart</h1>
<p>Your cart is empty.</p>
</div>
);
}

const total = cart.reduce(
(sum, item) => sum + item.priceDiscount,
0
);

return (
<div className="catalog">
<h1 className="catalog-title">🛒 Cart</h1>

{cart.map(product => (
<div key={product.configId} className="product-card">
<Link
to={`/${product.category}/${product.id}`}
className="product-link"
>
<h3 className="product-title">{product.name}</h3>
</Link>

<p className="product-price">
${product.priceDiscount}
</p>

<div className="product-actions">
<button
type="button"
className="neon-text-btn"
onClick={() => removeFromCart(product.configId)}
>
✕ Remove
</button>
</div>
</div>
))}

<h3 style={{ marginTop: 24 }}>
Total: ${total}
</h3>
</div>
);
}

export default Cart;
