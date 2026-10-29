import './Cart.scss';
import BackIcon from '../../assets/icons/Chevron (Arrow Left).svg';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import DeleteIcon from '../../assets/icons/delete_icon.png';
import MinusIcon from '../../assets/icons/minus_icon.png';
import PlusIcon from '../../assets/icons/plus_icon.png';

export const Cart = () => {
  const { cart, changeQuantity, removeFromCart, totalCount, totalPrice } =
    useCart();
  const navigate = useNavigate();

  return (
    <div className="Cart  grid">
      <button
        type="button"
        className="BackButtons"
        onClick={() => navigate(-1)}
      >
        <img className="BackButtons-icon" src={BackIcon} alt="" />
        <span className="BackButtons-text">Back</span>
      </button>
      <h2 className="Cart-title">Cart</h2>
      <div className="Cart-list">
        {cart.map(({ id, product, quantity }) => (
          <div key={id} className="Cart-list-item">
            <button
              className="Cart-list-item-removeBtn"
              type="button"
              onClick={() => removeFromCart(id)}
            >
              <img
                className="Cart-list-item-removeBtn-icon"
                src={DeleteIcon}
                alt="х"
              />
            </button>
            <Link
              className="Cart-list-item-link"
              to={`/${product.category}/${product.itemId}`}
            >
              <img
                className="Cart-list-item-photo"
                src={product.image}
                alt="Product"
              />
              <span className="Cart-list-item-name ">{product.name}</span>
            </Link>
            <div className="Cart-list-item-quantity">
              <button
                className="Cart-list-item-quantity-button"
                type="button"
                onClick={() => changeQuantity(id, -1)}
              >
                <img
                  className="Cart-list-item-quantity-button-icon"
                  src={MinusIcon}
                  alt="-"
                />
              </button>
              <span className="Cart-list-item-quantity-value">{quantity}</span>
              <button
                className="Cart-list-item-quantity-button"
                type="button"
                onClick={() => changeQuantity(id, 1)}
              >
                <img
                  className="Cart-list-item-quantity-button-icon"
                  src={PlusIcon}
                  alt="+"
                />
              </button>
            </div>
            <span className="Cart-list-item-price">{'$' + product.price}</span>
          </div>
        ))}
      </div>
      <div className="Cart-total">
        <span className="Cart-total-price">${totalPrice}</span>
        <span className="Cart-total-amount">{`Total for ${totalCount} items`}</span>
        <button className="Cart-total-checkout">Checkout</button>
      </div>
    </div>
  );
};
