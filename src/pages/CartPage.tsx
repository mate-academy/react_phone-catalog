import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '../icons';
import { GlobalContext } from '../Context/GlobalContext';
import { CartItem } from '../components/CartItem/CartItem';
import '../style/CartPage.scss';
import { inlineStyles } from '../utils/inlineStyles';

export const CartPage = () => {
  const { localStore } = useContext(GlobalContext);
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const itemsInCart = localStore.filter(item => item.inCart);
  const navigate = useNavigate();
  let totalAmount = 0;
  let totalItems = 0;

  if (itemsInCart.length > 0) {
    totalAmount = itemsInCart
      .map(prod => prod.totalAmount)
      .reduce((a, b) => a + b);

    totalItems = itemsInCart
      .map(prod => prod.count)
      .reduce((a, b) => a + b);
  }

  useEffect(() => {
    if (isCheckout) {
      setTimeout(() => {
        setIsCheckout(false);
      }, 3000);
    }
  }, [isCheckout]);

  return (
    <div className="cart-page">
      <div className="page-navigation">
        <button
          type="button"
          className="return-back"
          onClick={() => navigate(-1)}
        >
          <img src={ICONS.arrowLeft} alt="Return back" />
          <p className="return-back_text small-text-style">Back</p>
        </button>
      </div>
      <h1 className="cart-page_title page-title-style">Cart</h1>
      <div className="cart-items cart-items_container">
        {itemsInCart.length > 0 ? (
          <div className="cart-items_list">
            {itemsInCart.map(product => (
              <CartItem item={product} key={product.id} />
            ))}
          </div>
        ) : (
          <div className="cart-items_info page-title-style">
            <h2>Your cart is empty.</h2>
          </div>
        )}
        <div className="checkout">
          <div className="checkout_container">
            <h2
              className="page-title-style"
              style={{ color: inlineStyles.colors.primaryColor }}
            >
              {`$${totalAmount}`}
            </h2>
            <p className="checkout_count body-text-style">
              {`Total for ${totalItems} items`}
            </p>
            <div className="product-details_break-line" />
            <button
              type="button"
              className="checkout_btn btn-text-style"
              onClick={() => setIsCheckout(true)}
            >
              Checkout
            </button>
          </div>
          {isCheckout && (
            <div className="checkout_warning">
              <h3 className="checkout_warning-text second-text-style">
                We are sorry, but this feature is not implemented yet.
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
