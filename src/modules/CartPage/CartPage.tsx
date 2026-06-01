import { useNavigate } from 'react-router-dom';
import { useAdd } from '../../context/AddCartContext';
import { Link } from 'react-router-dom';
import style from './CartPage.module.scss';
import { Container } from '../../components/Container';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';

export const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeItem, updateQuantity, getTotalItems } = useAdd();

  const totalPrice = cartItems.reduce((acc, item) => {
    // Если price нет (undefined), используем 0
    return acc + (item.price || 0) * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div>
        <h1>Your cart is empty</h1>
        <Link to="/">Back to shopping</Link>
      </div>
    );
  }

  return (
    <Container>
      <div className={style.basketBreadcrumbs}>
        <Breadcrumbs
          items={[
            // { link: '/', label: 'Home' },
            {
              label: 'Back',
              onClick: () => navigate(-1),
              icon: (
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
                    d="M10.4708 3.52861C10.2104 3.26826 9.78829 3.26826 9.52794 3.52861L5.52794 7.52861C5.26759 7.78896 5.26759 8.21107 5.52794 8.47141L9.52794 12.4714C9.78829 12.7318 10.2104 12.7318 10.4708 12.4714C10.7311 12.2111 10.7311 11.789 10.4708 11.5286L6.94216 8.00001L10.4708 4.47141C10.7311 4.21107 10.7311 3.78896 10.4708 3.52861Z"
                    fill="#313237"
                  />
                </svg>
              ),
            },
          ]}
          reverseArrow={true}
        />
      </div>
      <div className={style.cartPage}>
        <h1>Cart</h1>
        <div className={style.cartWrapper}>
          <ul className={style.cartList}>
            {cartItems.map(item => (
              <li key={item.id} className={style.cartItem}>
                <div className={style.imageWrapper}>
                  <button
                    onClick={() => removeItem(item.id)}
                    className={style.removeBtn}
                  >
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
                        d="M12.4721 4.47138C12.7324 4.21103 12.7324 3.78892 12.4721 3.52858C12.2117 3.26823 11.7896 3.26823 11.5292 3.52858L8.00065 7.05717L4.47206 3.52858C4.21171 3.26823 3.7896 3.26823 3.52925 3.52858C3.2689 3.78892 3.2689 4.21103 3.52925 4.47138L7.05784 7.99998L3.52925 11.5286C3.2689 11.7889 3.2689 12.211 3.52925 12.4714C3.7896 12.7317 4.21171 12.7317 4.47206 12.4714L8.00065 8.94279L11.5292 12.4714C11.7896 12.7317 12.2117 12.7317 12.4721 12.4714C12.7324 12.211 12.7324 11.7889 12.4721 11.5286L8.94346 7.99998L12.4721 4.47138Z"
                        fill="#B4BDC4"
                      />
                    </svg>
                  </button>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={style.itemImage}
                  />
                  <div className={style.itemInfo}>
                    <h3>{item.name}</h3>
                  </div>
                </div>

                <div className={style.itemActions}>
                  <div className={style.quantityControls}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="31"
                          height="31"
                          stroke="#E2E6E9"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.666 16C10.666 15.6318 10.9645 15.3333 11.3327 15.3333H20.666C21.0342 15.3333 21.3327 15.6318 21.3327 16C21.3327 16.3682 21.0342 16.6666 20.666 16.6666H11.3327C10.9645 16.6666 10.666 16.3682 10.666 16Z"
                          fill="#B4BDC4"
                        />
                      </svg>
                    </button>
                    <span className={style.quantity}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="31"
                          height="31"
                          stroke="#B4BDC4"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.666 11.3334C16.666 10.9652 16.3675 10.6667 15.9993 10.6667C15.6312 10.6667 15.3327 10.9652 15.3327 11.3334V15.3334H11.3327C10.9645 15.3334 10.666 15.6318 10.666 16C10.666 16.3682 10.9645 16.6667 11.3327 16.6667H15.3327V20.6667C15.3327 21.0349 15.6312 21.3334 15.9993 21.3334C16.3675 21.3334 16.666 21.0349 16.666 20.6667V16.6667H20.666C21.0342 16.6667 21.3327 16.3682 21.3327 16C21.3327 15.6318 21.0342 15.3334 20.666 15.3334H16.666V11.3334Z"
                          fill="#313237"
                        />
                      </svg>
                    </button>
                  </div>
                  <p>${item.price}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className={style.summary}>
            <h2> ${totalPrice.toFixed(0)}</h2>
            <p>Total for: {getTotalItems()} items</p>

            <button onClick={() => alert('Checkout is not implemented yet')}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};
