import { Product } from '../interface/Product';

interface CartItemProps {
  item: Product;
  total: number;
  quantity: number;
}

const CartItem = ({ item, total, quantity }: CartItemProps) => {
  return (
    <div className="cart__item" key={item.name}>
      <div className="cart__close">
        <img src="/img/close.svg" alt="Close" />
      </div>
      <img src={item.image} alt={item.name} className="cart__image" />
      <span className="cart__name">{item.name}</span>
      <div className="cart__quantity">
        <span className="cart__quantity-btn">+</span>
        <span className="cart__quantity-value">{quantity}</span>
        <span className="cart__quantity-btn">-</span>
      </div>
      <span className="cart__price">${total}</span>
    </div>
  );
};

export default CartItem;
