import './CartPage.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCartFavorites } from '../../providers/CartFavoritesProvider';
import { CartItem } from '../../components/CartItem/CartItem';

export const CartPage = () => {
  const { state: { cart } } = useCartFavorites();
  const [checkoutInitiated, setCheckoutInitiated] = useState(false);

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + (('priceDiscount' in item)
      ? item.priceDiscount : item.price) * item.quantity, 0,
  );

  return (
    <div className="Parentcontainer">
      <div className="cartpage">
        <Link to="/" className="cartpage_backlink">
          <p className="cartpage_backlink_arrow" />
          <p className="cartpage_backlink_title">Back</p>
        </Link>
        <h1 className="cartpage_title">Cart</h1>

        {cart.length === 0 ? (
          <h1 className="cartpage_title">Your cart is empty.</h1>
        ) : (
          <div className="cartpage_content">
            <ul className="cartpage_list">
              {cart.map(product => {
                return (
                  <div key={product.id}>
                    <CartItem item={product} />
                  </div>
                );
              })}
            </ul>

            <div className="cartpage_content_withmessage">
              <div className="cartpage_content_checkout">
                <h1 className="cartpage_content_checkout_price">
                  $
                  {totalPrice}
                </h1>
                <p className="cartpage_content_checkout_quantity">
                  {`Total for ${totalQuantity} items`}
                </p>
                <div className="cartpage_content_checkout_line" />
                <button
                  type="button"
                  className="cartpage_content_checkout_button"
                  onClick={() => setCheckoutInitiated(true)}
                >
                  Checkout
                </button>
              </div>
              {checkoutInitiated && (
                <div className="cartpage_content_withmessage_bracket">
                  <p className="cartpage_content_withmessage_bracket_message">
                    This feature is not implemented yet.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
