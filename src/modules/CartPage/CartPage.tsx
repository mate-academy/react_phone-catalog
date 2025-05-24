import { GoBack } from '../../components/GoBack';
import { useCart } from '../../contexts/CartContext/CartContext';
import './CartPage.module.scss';
import Close from '../../../public/img/icons/Close.svg';
import EmptyCart from '../../../public/img/cart-is-empty.png';

export const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    if (
      confirm('Checkout is not implemented yet. Do you want to clear the Cart?')
    ) {
      clearCart();
    }
  };

  return (
    <>
      {totalItems > 0 ? (
        <div className="container">
          <div className="cart">
            <GoBack />
            <h2 className="cart_title">Cart</h2>
            <div className="cart_wrapper">
              <div className="cart_list">
                {cart.map(item => (
                  <div className="cart_card" key={item.id}>
                    <div className="cart_card_top">
                      <button
                        className="cart_card_remove"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <img width={12} src={Close} alt="close icon" />
                      </button>
                      <div className="cart_card_img_wrapper">
                        <img
                          className="cart_card_img"
                          src={item.product.images[0]}
                          alt="product"
                        />
                      </div>
                      <p className="cart_card_name">{item.product.name}</p>
                    </div>
                    <div className="cart_card_bottom">
                      <div className="cart_card_bottom_wrapper">
                        <button
                          className={
                            item.quantity === 1
                              ? 'cart_card_minus cart_card_quantity-btn cart_card_quantity-btn--disabled'
                              : 'cart_card_quantity-btn'
                          }
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          –
                        </button>
                        <p className="cart_card_quantity">{item.quantity}</p>
                        <button
                          className="cart_card_plus cart_card_quantity-btn"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <p className="cart_card_price">
                        $
                        {item.product.priceDiscount
                          ? item.product.priceDiscount
                          : item.product.priceRegular}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart_checkout">
                <p className="cart_checkout_price">${totalPrice}</p>
                <p className="cart_checkout_total">
                  Total for{' '}
                  {totalItems > 1
                    ? `${totalItems} items`
                    : `${totalItems} item`}
                </p>
                <div className="cart_checkout_line"></div>
                <button className="cart_checkout_btn" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="err">
          <img className="err_img" src={EmptyCart} alt="no items image" />
        </div>
      )}
    </>
  );
};
