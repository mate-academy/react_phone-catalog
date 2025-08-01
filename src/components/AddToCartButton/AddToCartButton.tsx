import { useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductsContext';
import { Product } from '../../types/Product';
import { ProductDetailed } from '../../types/ProductDetailed';
import styles from './AddToCartButton.module.scss';
import { Button } from '../Button';

type Props = {
  product: Product | ProductDetailed;
};

export const AddToCartButton: React.FC<Props> = ({ product }) => {
  const { products } = useProducts();
  const { cartItems, addToCart, removeFromCart } = useCart();

  const matchedProduct = useMemo(() => {
    if ('itemId' in product) {
      return product as Product;
    }

    return products.find(p => p.itemId === product.id) ?? null;
  }, [product, products]);

  const isAlreadyInCard = matchedProduct
    ? cartItems.some(item => item.product?.itemId === matchedProduct.itemId)
    : false;

  const handleAddToCart = () => {
    if (!matchedProduct) return;

    if (isAlreadyInCard) {
      removeFromCart(matchedProduct.itemId);
    } else {
      addToCart(matchedProduct);
    }
  };

  return (
    <Button
      option={isAlreadyInCard ? 'outline' : 'primary'}
      className={styles.button}
      onClick={handleAddToCart}
    >
      {isAlreadyInCard ? 'Added' : 'Add to cart'}
    </Button>
  );
};
