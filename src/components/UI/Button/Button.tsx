import { useContext } from 'react';
import styles from './Button.module.scss';
import { ProductsContext } from '../../../store/ProductsContext';
import { CartProduct } from '../../../types/CartProduct';
import { Product } from '../../../types/Product';

interface ButtonProps {
  product: Product;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ product, className }) => {
  const { SetAddToCart, SetRemoveFromCart, cart } = useContext(ProductsContext);

  const handleCartAction = () => {
    const isInCart = cart.some(item => item.id === product?.id);

    if (isInCart) {
      SetRemoveFromCart(product?.id);
    } else {
      const cartProduct: CartProduct = {
        id: product.id,
        name: product.name,
        price: product.fullPrice,
        priceRegular: product.price,
        image: product.image,
        quantity: 1,
      };

      SetAddToCart(cartProduct);
    }
  };

  const isInCart = cart.some(item => item.id === product.id);

  return (
    <button
      onClick={event => {
        event.preventDefault();
        event.stopPropagation();
        handleCartAction();
      }}
      className={`${isInCart ? styles.addedToCartBtn : styles.addToCartBtn} ${className || ''}`}
    >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
