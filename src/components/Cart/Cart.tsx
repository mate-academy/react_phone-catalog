import { currentCartItems, currentCartTotalQuantity, currentCartTotalPrice,
  removeFromCart, updateCartQuantity } from '../../redux/cartSlice';
import { currentTheme } from '../../redux/themeSlice';
import { useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import './Cart.scss';
import { useDispatch } from 'react-redux';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useAppSelector(currentCartItems);
  const totalPrice = useAppSelector(currentCartTotalPrice);
  const totalQuantity = useAppSelector(currentCartTotalQuantity);
  const dispatch = useDispatch();

  const updateQuantityHelper = (item, qty) => {
    if (qty < 1) {
      return;
    } else {
      dispatch(updateCartQuantity({ productId: item.id, quantity: qty }));
    }
  };

  return (
    <div>
      <a
        href="#"
        className="back-link"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        ← Back to previous page
      </a>
      <h1>CART PAGE  ---{'>'} TOTAL PRICE: {`${totalPrice}`} TOTAL QUANTITY: {`${totalQuantity}`}</h1>
      <div>
        {cartItems.map(item => (
          <div className={`cart-item ${currentTheme}`} key={`lol key ${item.id}`}>
            <button className={`cart-remove-button ${currentTheme}`}
              onClick={() => dispatch(removeFromCart(item?.id))
              }>❌</button>
            <img
              src={`../../../public/${item.image}`}
              alt="here should be an image"
              height="200"
            />
            {item.name}
            &emsp;{` ${item.price} $`}
            &emsp;&emsp;&emsp;quantity&emsp;&emsp;
            <button className={`cart-minus-button ${currentTheme}`}
              onClick={() => (
                updateQuantityHelper(
                  item, item.quantity - 1,
                ))
              }
              disabled={item.quantity === 1}
            >➖</button>
            &emsp;{`${item.quantity}`}&emsp;
            <button className={`cart-plus-button ${currentTheme}`}
              onClick={() => (
                updateQuantityHelper(
                  item, item.quantity + 1,
                ))
              }>➕</button>
          </div>
        ))}
      </div>
    </div>
  );
};
