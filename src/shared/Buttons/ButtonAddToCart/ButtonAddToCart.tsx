import React from 'react';
import styles from './ButtonAddToCart.module.scss';
import cn from 'classnames';
import { useActions } from '../../../store/useActions';
import { IProductCard } from '../../../interfaces/ProductCard.interface';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

const ButtonAddToCart: React.FC<{ product: IProductCard }> = ({ product }) => {
  const { addToCart, deleteWithCart } = useActions();
  const { items } = useTypedSelector(state => state.cart);
  const existingItem = items.find(item => item.id === product.id);

  const handleAddToCart = () => {
    if (existingItem) {
      deleteWithCart(existingItem);
    } else {
      addToCart({
        id: product.id,
        product,
        quantity: 1,
        price: product.price,
      });
    }
  };

  return (
    <button
      className={cn(styles.btn, { [styles.selected]: existingItem })}
      onClick={handleAddToCart}
    >
      {existingItem ? 'Added' : 'Add to cart'}
    </button>
  );
};

export default ButtonAddToCart;
