import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartPage.scss';

export const CartPage = () => {
  const navigate = useNavigate();

  const {
    items,
    removeFromCart,
    increase,
    decrease,
    totalPrice,
    totalCount,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <div className="cartPage">
      <button className="cartPage__back" onClick={() => navigate(-1)}>
        <img src="img/ChevronLeft.png" alt="back" />
        Back
      </button>

      <h1 className="cartPage__title">Cart</h1>

      {items.length === 0 && (
        <div className="cartPage__empty">Your cart is empty</div>
      )}

      {items.length > 0 && (
        <div className="cartPage__main">
          <div className="cartPage__items">
            {items.map(item => {
              const product = item.product;

              const image = product.images[0];

              const price = product.priceDiscount ?? product.price;

              return (
                <div className="cartPage__item" key={item.id}>
                  <button
                    className="cartPage__itemRemove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <img src="img/Union.png" alt="remove" />
                  </button>

                  <Link
                    to={`/${product.category}/${product.itemId}`}
                    className="cartPage__itemLink"
                  >
                    {image && (
                      <div className="cartPage__itemImage">
                        <img src={image} alt={product.name} />
                      </div>
                    )}

                    <div className="cartPage__itemInfo">
                      {product.name}
                      <span> {product.capacity}</span>
                      <span> • </span>
                      <span>{product.color}</span>
                    </div>
                  </Link>

                  <div className="cartPage__itemQuantity">
                    <button
                      disabled={item.quantity === 1}
                      onClick={() => decrease(item.id)}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increase(item.id)}>+</button>
                  </div>

                  <div className="cartPage__itemPrice">
                    ${price * item.quantity}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cartPage__summary">
            <div className="cartPage__summaryTop">
              <div className="cartPage__summaryPrice">${totalPrice}</div>

              <div className="cartPage__summaryCount">{totalCount} items</div>
            </div>

            <div className="cartPage__summaryBottom">
              <button className="cartPage__checkout" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
