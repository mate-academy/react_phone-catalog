/* eslint-disable max-len */
import { ColorPicker } from 'src/components/ColorPicker/ColorPicker';
import { CapacityPicker } from 'src/components/CapacityPicker/CapacityPicker';
import { PrimaryButton } from 'src/components/ui/PrimaryButton/PrimaryButton';
import { FavoritesButton } from 'src/components/ui/FavouritesButton/FavoritesButton';
import styles from './ProductPurchase.module.scss';
import { ProductDetails } from 'src/types/Types';
import { HTMLAttributes } from 'react';
import cn from 'classnames';
import { useStoreContext } from 'src/context/StoreContext';

type Props = { product: ProductDetails } & HTMLAttributes<HTMLDivElement>;

export const ProductPurchase = ({ className, product, ...props }: Props) => {
  const { products, toggleCart } = useStoreContext();
  const { isProductInCart, action } = toggleCart(product.name);
  const favoriteProduct = products.find(el => el.itemId === product.id);
  const productId = favoriteProduct?.id;

  return (
    <div className={cn(styles.productPurchase, className)} {...props}>
      <span className={styles.productId}>ID: {productId}</span>
      <div className={styles.purchaseContent}>
        <ColorPicker currentProduct={product} className={styles.colorPicker} />
        <hr className={styles.divider} style={{ marginBottom: 24 }} />
        <CapacityPicker
          currentProduct={product}
          className={styles.capacityPicker}
        />
        <hr className={styles.divider} style={{ marginBottom: 32 }} />
        <p className={styles.price}>
          <span className={styles.currentPrice}>${product.priceDiscount}</span>
          <span className={styles.oldPrice}>${product.priceRegular}</span>
        </p>
        <div className={styles.actions}>
          <PrimaryButton onClick={action} isProductInCart={isProductInCart}>
            {isProductInCart ? 'Added to cart' : 'Add to cart'}
          </PrimaryButton>

          {favoriteProduct && <FavoritesButton product={favoriteProduct} />}
        </div>
        <div className={styles.quickSpecs}>
          <ul className={styles.specsList}>
            <li>
              <span>Screen</span>
              <span>{product.screen}</span>
            </li>
            <li>
              <span>Resolution</span>
              <span>{product.resolution}</span>
            </li>
            <li>
              <span>Processor</span>

              <span>{product.processor}</span>
            </li>
            <li>
              <span>RAM</span>
              <span>{product.ram}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
