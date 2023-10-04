import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { generateSlugForProduct } from '../../helpers/utils';
import { Product } from '../../types/Product';
import { CartContext } from '../../contexts/CartContext';

import './CartPage.scss';

type Props = {
  product: Product,
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const {
    price,
    discount,
    imageUrl,
    quantity,
    name,
    type,
    id,
  } = product;

  const priceAfterDiscount = price * ((100 - discount) / 100);
  const { cart, setCart } = useContext(CartContext);
  const slug = generateSlugForProduct(type, id);

  const handleDeleteItem = () => {
    setCart(cart.filter(item => item.id !== product.id));
  };

  const handleIncreaseQuantity = () => {
    const cartCopy = [...cart];
    const newQuantity = quantity ? quantity + 1 : 2;
    const device = cartCopy.find(item => item.id === id);

    if (device) {
      device.quantity = newQuantity;
      setCart(cartCopy);
    }
  };

  const handleDecreaseQuantity = () => {
    const cartCopy = [...cart];
    const newQuantity = quantity ? quantity - 1 : 1;

    const device = cartCopy.find(item => item.id === id);

    if (device) {
      device.quantity = newQuantity;
      setCart(cartCopy);
    }
  };

  return (
    <div className="CartItem">
      <div className="CartItem__section">
        <button
          type="button"
          data-cy="cartDeleteButton"
          className="CartItem__remove-button"
          onClick={handleDeleteItem}
        >
          {' '}
        </button>
        <Link
          to={slug}
          className="CartItem__product-img"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <Link
          to={slug}
          className="CartItem__product-name"
        >
          {name}
        </Link>
      </div>
      <div className="CartItem__section">
        <div className="CartItem__quantity-section">
          <button
            type="button"
            className="
              CartItem__quantity-button
              CartItem__quantity-button--remove
            "
            onClick={handleDecreaseQuantity}
            disabled={!quantity || quantity <= 1}
          >
            {' '}
          </button>
          <div className="CartItem__quantity" data-cy="productQauntity">
            {quantity || 1}
          </div>
          <button
            type="button"
            className="
              CartItem__quantity-button
              CartItem__quantity-button--add
            "
            onClick={handleIncreaseQuantity}
          >
            {' '}
          </button>
        </div>
        <span className="CartItem__price">
          {`$${priceAfterDiscount * (quantity || 1)}`}
        </span>
      </div>
    </div>
  );
};
