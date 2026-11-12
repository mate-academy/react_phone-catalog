import { Product } from '../interface/Product';
import { useNavigate } from 'react-router-dom';

interface CartItemProps {
  item: Product;
  quantity: number;
}

const CartItem = ({ item, quantity }: CartItemProps) => {
  const navigate = useNavigate();

  return (
    <div className="cart__item" key={item.name}>
      <button
        className="cart__close"
        onClick={() => {
          const cart = JSON.parse(localStorage.getItem('cart') || '[]');
          const updatedCart = cart.filter((name: string) => {
            return name !== item.name;
          });

          localStorage.setItem('cart', JSON.stringify(updatedCart));
          window.location.reload();
        }}
      >
        <img
          src={`${import.meta.env.VITE_PUBLIC_URL}/img/close.svg`}
          alt="Close"
        />
      </button>
      <button
        className="cart__button"
        onClick={() => navigate(`/products/${encodeURIComponent(item.name)}`)}
      >
        <img src={item.image} alt={item.name} className="cart__image" />
      </button>
      <button
        className="cart__button"
        onClick={() => navigate(`/products/${encodeURIComponent(item.name)}`)}
      >
        <span className="cart__title">{item.name}</span>
      </button>
      <div className="cart__quantity">
        <span className="cart__quantity-btn">+</span>
        <span className="cart__quantity-num">{quantity}</span>
        <span className="cart__quantity-btn">-</span>
      </div>
      <span className="cart__price">${item.price}</span>
    </div>
  );
};

export default CartItem;
