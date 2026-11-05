import { Product } from '../interface/Product';

interface CartItemProps {
  item: Product;
  total: number;
  quantity: number;
}

const CartItem = ({ item, total, quantity }: CartItemProps) => {
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
        <img src="/img/close.svg" alt="Close" />
      </button>
      <img src={item.image} alt={item.name} className="cart__image" />
      <span className="cart__title">{item.name}</span>
      <div className="cart__quantity">
        <span className="cart__quantity-btn">+</span>
        <span className="cart__quantity-num">{quantity}</span>
        <span className="cart__quantity-btn">-</span>
      </div>
      <span className="cart__price">${total}</span>
    </div>
  );
};

export default CartItem;
