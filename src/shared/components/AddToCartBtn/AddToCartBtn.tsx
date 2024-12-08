import { useCallback, useMemo } from 'react';

import cn from 'classnames';
import toast from 'react-hot-toast';

import { Button } from '@shared/base/Button';
import { useStoredProducts } from '@shared/contexts/StoredProducts';

import styles from './AddToCartBtn.module.scss';

interface AddToCartProps {
  productId?: string;
  title: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AddToCartBtn: React.FC<AddToCartProps> = ({
  className,
  productId,
  size = 'md',
  title,
}) => {
  const { storedProducts, updateStoredProducts } = useStoredProducts();

  const isSelected = useMemo(
    () =>
      storedProducts.cartProducts.some(
        product => productId === product.productId,
      ),
    [storedProducts, productId],
  );

  const handleAdd = useCallback(() => {
    if (!productId) {
      return;
    }

    updateStoredProducts({
      storedKey: 'cartProducts',
      productId,
      action: 'toggle',
      storedProducts,
      callback: doneAction => {
        if (doneAction === 'added') {
          toast.success(`${title} has been added to the cart successfully`);
        } else {
          toast.success(`${title} has been removed from the cart successfully`);
        }
      },
    });
  }, [productId, storedProducts, updateStoredProducts, title]);

  return (
    <Button
      className={cn(styles.btn, className)}
      selected={isSelected}
      onClick={handleAdd}
      disabled={!productId}
      size={size}
    >
      {isSelected ? 'Added to cart' : 'Add to cart'}
    </Button>
  );
};
