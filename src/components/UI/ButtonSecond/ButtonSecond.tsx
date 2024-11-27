import { useContext } from 'react';
import { ProductsContext } from '../../../store/ProductsContext';
import { CartProduct } from '../../../types/CartProduct';
import { ProductSpecs } from '../../../types/Product';
import styles from './ButtonSecond.module.scss';

interface ButtonProps {
  product: ProductSpecs | null;
}

export const ButtonSecond: React.FC<ButtonProps> = ({ product }) => {
  const { SetAddToCart, SetRemoveFromCart, cart } = useContext(ProductsContext);

  console.log('Product in ButtonSecond:', product);

  if (!product) {
    return null;
  }

  const handleCartAction = () => {
    const isInCart = cart.some(item => item.id === product?.id);

    if (isInCart) {
      SetRemoveFromCart(product?.id);
    } else {
      const cartProduct: CartProduct = {
        id: product.id,
        name: product.name,
        price: product.priceDiscount,
        priceRegular: product.priceRegular,
        image: product.images[0],
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
      className={isInCart ? styles.addedToCartBtn : styles.addToCartBtn}
    >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
