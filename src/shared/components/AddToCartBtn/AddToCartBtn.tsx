import { useCallback, useMemo } from 'react';

import cn from 'classnames';
import toast from 'react-hot-toast';

import { Button } from '@shared/base/Button';
import { useStoredProducts } from '@shared/contexts/StoredProducts';

import styles from './AddToCartBtn.module.scss';

interface AddToCartProps {
  productId: string;
  title: string;
  className?: string;
}

export const AddToCartBtn: React.FC<AddToCartProps> = ({
  className,
  productId,
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
    const { doneAction } = updateStoredProducts({
      storedKey: 'cartProducts',
      productId,
      action: 'toggle',
      storedProducts,
    });

    if (doneAction === 'added') {
      toast.success(`${title} has been added to the cart successfully`);
    } else {
      toast.success(`${title} has been removed from the cart successfully`);
    }
  }, [productId, storedProducts, updateStoredProducts]);

  return (
    <Button
      className={cn(styles.btn, className)}
      selected={isSelected}
      onClick={handleAdd}
    >
      {isSelected ? 'Added to cart' : 'Add to cart'}
    </Button>
  );
};
