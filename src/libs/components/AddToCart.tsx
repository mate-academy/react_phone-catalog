import { useCallback, useContext } from 'react';

import { StateContext } from './state-provider/state-context';
import { Button } from './button/Button';
import { ProductInCartType, ProductType } from '../types';
import { isProductInList, getUpdatedListWithProduct } from '../helpers';

type Props = {
  product: ProductType,
  className?: string,
};

export const AddToCart: React.FC<Props> = ({ product, className }) => {
  const { cart, setCart } = useContext(StateContext);

  const isInCart = isProductInList(cart, product.id);

  const handleAddToCart = useCallback(() => {
    const cartProducts = getUpdatedListWithProduct<ProductInCartType>(
      cart,
      { ...product, quantity: 1 },
      isInCart,
    );

    setCart(cartProducts);
  }, [cart, product, isInCart, setCart]);

  return (
    <Button
      className={className}
      selected={isInCart}
      onClick={handleAddToCart}
    >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </Button>
  );
};
