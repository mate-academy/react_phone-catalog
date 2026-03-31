import { useTranslation } from 'react-i18next';
import { useProductStore } from '@/store/productStore';
import { ProductDetails } from '@/features/products/types/productDetails';
import { Product } from '@/features/products/types/product';
import { Button } from '@/components/ui/Button/Button';
import styles from './ProductInfo.module.scss';
import { ColorSelector } from '@/components/ui/ColorSelector';
import { CapacitySelector } from '@/components/ui/CapacitySelector';
import { FavoriteButton } from '@/components/ui/FavoriteButton';

interface ProductInfoProps {
  product: ProductDetails;
  baseProduct?: Product;
}

export const ProductInfo = ({ product, baseProduct }: ProductInfoProps) => {
  const { t } = useTranslation();
  const { cart, addToCart, removeFromCart, toggleFavorite, favorites } =
    useProductStore();

  const isFavorite = baseProduct ? favorites.includes(baseProduct.id) : false;
  const isInCart = baseProduct
    ? cart.some(item => item.product.id === baseProduct.id)
    : false;

  const handleCartAction = () => {
    if (!baseProduct) {
      return;
    }

    return isInCart ? removeFromCart(baseProduct.id) : addToCart(baseProduct); //дописала ретьорн
  };

  return (
    <div className={styles.info}>
      <div className={styles.IDWrapper}>
        <ColorSelector product={product} />
        <p className={styles.productId}>
          ID: {String(baseProduct?.id).padStart(6, '0')}
        </p>
      </div>

      <div className={styles.dividerTop} />

      <CapacitySelector product={product} />

      <div className={styles.dividerBottom} />

      <div className={styles.priceWrapper}>
        <span className={styles.price}>${product.priceDiscount}</span>
        <span className={styles.priceOld}>${product.priceRegular}</span>
      </div>

      <div className={styles.actions}>
        <Button
          variant={isInCart ? 'selected' : 'primary'}
          onClick={handleCartAction}
        >
          {isInCart
            ? t('products.actions.added')
            : t('products.actions.addToCart')}
        </Button>

        <FavoriteButton
          isFavorite={isFavorite}
          onClick={() => baseProduct && toggleFavorite(baseProduct.id)}
        />
      </div>

      <div className={styles.shortSpecs}>
        {[
          { label: t('products.specs.screen'), value: product.screen },
          { label: t('products.specs.resolution'), value: product.resolution },
          { label: t('products.specs.processor'), value: product.processor },
          { label: t('products.specs.ram'), value: product.ram },
        ].map(({ label, value }) => (
          <div key={label} className={styles.specRow}>
            <span className={styles.specLabel}>{label}</span>
            <span className={styles.specValue}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
