import React from 'react';
import styles from './CartList.module.scss';
import { ProductType } from '../../../../shared/types/ProductType';
import { CartItem } from '../../../shared/components/CartItem/CartItem';
import { useCart } from '../../../../hooks/context/useCart';
import { SmallCardSkeleton } from '../../../../shared/UI/Skeletons/SmallCardSkeleton';
import { createArray } from '../../../shared/utils/createArray';

interface Props {
  products: ProductType[];
  loading?: boolean;
}

export const CartList: React.FC<Props> = ({ products, loading }) => {
  const {
    addOneProduct,
    deleteOneProduct,
    deleteProductFromBag,
    countItemInBag,
  } = useCart();

  return (
    <div className={styles.cart__list}>
      {loading
        ? createArray(4).map((_, i) => <SmallCardSkeleton key={i} />)
        : products.map(item => (
            <CartItem
              key={item.id}
              product={item}
              quantity={countItemInBag(item.itemId)}
              onClose={() => deleteProductFromBag(item.itemId)}
              onMinus={() => deleteOneProduct(item.itemId)}
              onPlus={() => addOneProduct(item.itemId)}
            />
          ))}
    </div>
  );
};
