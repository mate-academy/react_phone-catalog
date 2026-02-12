import React from 'react';
import { Product } from '../../../../types/ProductTypes/Product';
import { useCart } from '../../../CartPage/CartContext';
import styles from './AddToCart.module.scss';

type AddToCartButtonProps = {
  product: Product;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addToCart, cart } = useCart();

  const alreadyInCart = cart.some(item => item.id === product.itemId);

  return (
    <button
      className={styles.botao}
      onClick={() => addToCart(product.itemId)}
      disabled={alreadyInCart}
    >
      <span>{alreadyInCart ? 'Already in cart' : 'Add to cart'}</span>
    </button>
  );
};

export default AddToCartButton;
