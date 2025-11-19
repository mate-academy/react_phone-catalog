import React from 'react';
import { Product } from '../../../../types/ProductTypes/Product';
import { useCart } from '../../../CartPage/CartContext';
import styles from './AddToCart.module.scss';
type AddToCartButtonProps = {
  product: Product;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <button className={styles.botao} onClick={() => addToCart(product.itemId)}>
  <p>Add to cart</p>
</button>
  );
};

export default AddToCartButton;
