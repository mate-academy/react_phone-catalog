import './CartItem.scss';
import { BASE_URL } from '../../pages/ProductDetailsPage/ProductDetailsPage';
import {
  CartItemWithQuantity, useCartFavorites,
} from '../../providers/CartFavoritesProvider';

export const CartItem = ({ item }: { item: CartItemWithQuantity }) => {
  const {
    removeFromCart, incrementQuantity, decrementQuantity,
  } = useCartFavorites();

  const handleRemoveFromCart = () => {
    removeFromCart(item.id);
  };

  const handleIncrementQuantity = () => {
    incrementQuantity(item.id);
  };

  const handleDecrementQuantity = () => {
    decrementQuantity(item.id);
  };

  return (
    <div className="cartitem">
      <button
        className="cartitem_button_delete"
        onClick={handleRemoveFromCart}
        aria-label="delete"
        type="button"
      />
      <img
        src={BASE_URL + (('images' in item) ? item.images?.[0] : item.image)}
        className="cartitem_image"
        alt={item.name}
      />
      <p className="cartitem_name">{item.name}</p>
      <button
        className="cartitem_button_minus"
        onClick={handleDecrementQuantity}
        aria-label="minusitem"
        type="button"
      />
      <div className="cartitem_quantity">{item.quantity}</div>
      <button
        className="cartitem_button_plus"
        onClick={handleIncrementQuantity}
        aria-label="plusitem"
        type="button"
      />
      <h2 className="cartitem_price">
        $
        {(('priceDiscount' in item)
          ? item.priceDiscount : item.price) * item.quantity}
      </h2>
    </div>
  );
};
