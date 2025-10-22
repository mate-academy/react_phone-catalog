import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.scss';

const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.995 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as any },
  },
  exit: { opacity: 0, y: -12, scale: 0.995, transition: { duration: 0.18 } },
};

const totalVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1), 0);
  const navigate = useNavigate();

  console.log(cart);

  return (
    <>
      <button onClick={() => navigate(-1)} className="back-button">
        <span className="back-icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z"
              fill="#ffffff"
            />
          </svg>
        </span>
        Back
      </button>
      <h1 className="cart-title">Cart</h1>

      {cart.length === 0 && (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add items to your cart to see them here.</p>
        </div>
      )}

      <div className="cart">
        <motion.div
          className="cart-list"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {cart.map(item => (
              <motion.div
                className="cart-container"
                key={String(item.id)}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                <div className="cart-card">
                  <button className="cart-remove" onClick={() => removeFromCart(String(item.id))}>
                    <img src="img/icons/CloseCart.svg" alt="" />
                  </button>
                  <img
                    className="cart-img"
                    src={
                      item.images?.[0]
                        ? `/${item.images[0]}`
                        : item.image
                          ? `/${item.image}`
                          : 'img/no-image.webp'
                    }
                    alt={item.name}
                  />
                  <a className="cart-name" href={`${item.category}/${item.itemId}`}>
                    {item.name}
                  </a>

                  <div className="cart-quantity">
                    <button
                      className="cart-minus"
                      onClick={() => decreaseQuantity(String(item.id))}
                    >
                      <svg
                        width="12"
                        height="2"
                        viewBox="0 0 12 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.666016 0.99998C0.666016 0.63179 0.964492 0.333313 1.33268 0.333313H10.666C11.0342 0.333313 11.3327 0.63179 11.3327 0.99998C11.3327 1.36817 11.0342 1.66665 10.666 1.66665H1.33268C0.964492 1.66665 0.666016 1.36817 0.666016 0.99998Z"
                          fill="#4A4D58"
                        />
                      </svg>
                    </button>
                    <span>{item.quantity}</span>
                    <button className="cart-plus" onClick={() => increaseQuantity(String(item.id))}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.66602 3.33335C8.66602 2.96516 8.36754 2.66669 7.99935 2.66669C7.63116 2.66669 7.33268 2.96516 7.33268 3.33335V7.33335H3.33268C2.96449 7.33335 2.66602 7.63183 2.66602 8.00002C2.66602 8.36821 2.96449 8.66669 3.33268 8.66669H7.33268V12.6667C7.33268 13.0349 7.63116 13.3334 7.99935 13.3334C8.36754 13.3334 8.66602 13.0349 8.66602 12.6667V8.66669H12.666C13.0342 8.66669 13.3327 8.36821 13.3327 8.00002C13.3327 7.63183 13.0342 7.33335 12.666 7.33335H8.66602V3.33335Z"
                          fill="#F1F2F9"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="cart-price">${item.price} </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {cart.length >= 1 && (
          <motion.div
            className="cart-totalprice"
            variants={totalVariants}
            initial="hidden"
            animate="visible"
            key="cart-total"
            layout
          >
            <h2>${total}</h2>
            <p>Total for {cart.reduce((sum, item) => sum + (item.quantity ?? 0), 0)} items</p>
            <button>Checkout</button>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Cart;
