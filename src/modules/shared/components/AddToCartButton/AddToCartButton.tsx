import { useContext, useMemo } from 'react';
import { CartContext } from '../../../../context/CartContext';
import { ProductsContext } from '../../../../context/ProductsContext';
import { Product, ProductDetailed } from '../../../../types/types';
import styles from './AddToCartButton.module.scss';
import { Button } from '../Button';

type Props = {
  product: Product | ProductDetailed;
};

export const AddToCartButton: React.FC<Props> = ({ product }) => {
  const { goods } = useContext(ProductsContext);
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const matchedProduct = useMemo(() => {
    if ('itemId' in product) {
      return product;
    }

    return goods?.find(item => item.itemId === product.id) ?? null;
  }, [product, goods]);

  const isInCart = cartItems.some(item => item.product?.itemId === matchedProduct?.itemId);

  const handleAddToCart = () => {
    if (matchedProduct) {
      if (isInCart) {
        removeFromCart(matchedProduct?.itemId);
      } else {
        addToCart(matchedProduct);
      }
    }
  };

  return (
    <Button
      option={isInCart ? 'outline' : 'primary'}
      onClick={handleAddToCart}
      className={styles.button}
    >
      {isInCart ? 'Added' : 'Add to cart'}
    </Button>
  );
};
