import React from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { ProductDetail } from '@/types/ProductDetail';
import { Product } from '@/types/Product';
import { COLOR_MAP } from '@/types/ColorMap';
import styles from './ProductActions.module.scss';
import { ButtonPrimary } from '@/modules/shared/ui/ButtonPrimary';
import { ButtonFavorite } from '@/modules/shared/ui/ButtonFavorite';
import { Price } from '@/modules/shared/ui/Price';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';

interface Props {
  product: ProductDetail;
}

export const ProductActions: React.FC<Props> = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const isAdded = cartItems.some(item => item.itemId === product.id);
  const favorite = isFavorite(product?.id || '');

  const getProductForStorage = (): Product => ({
    id: 0,
    itemId: product.id,
    name: product.name,
    fullPrice: product.priceRegular,
    price: product.priceDiscount,
    screen: product.screen,
    capacity: product.capacity,
    ram: product.ram,
    image: product.images[0],
    color: product.color,
    category: product.category,
    year: 2022,
  });

  const handleCartClick = () => {
    if (!isAdded) {
      addToCart(getProductForStorage());
    }
  };

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(getProductForStorage());
    }
  };

  const navigate = useNavigate();
  const {
    namespaceId,
    colorsAvailable,
    color: currentColor,
    capacityAvailable,
    capacity: currentCapacity,
  } = product;

  // Helper to generate the new URL when a variant is selected
  const handleVariantChange = (newColor: string, newCapacity: string) => {
    const colorSlug = newColor.toLowerCase().replace(/\s+/g, '-');
    const capacitySlug = newCapacity.toLowerCase();

    const newId = `${namespaceId}-${capacitySlug}-${colorSlug}`;

    navigate(`/product/${newId}`);
  };

  // Helper to get the correct hex or CSS color name
  const getBtnColor = (color: string) => {
    const normalizedInput = color.toLowerCase().replace(/\s+/g, '');

    return COLOR_MAP[normalizedInput] || normalizedInput;
  };

  return (
    <div className={styles.actions}>
      <div className={styles.section}>
        <div className={styles.label}>Available colors</div>

        <div className={styles.colors}>
          {colorsAvailable.map(color => (
            <button
              key={color}
              type="button"
              title={color}
              className={cn(styles.colorBtn, {
                [styles.colorBtnActive]: color === currentColor,
              })}
              style={{ backgroundColor: getBtnColor(color) }}
              onClick={() => handleVariantChange(color, currentCapacity)}
            />
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <div className={styles.label}>Select capacity</div>

        <div className={styles.capacities}>
          {capacityAvailable.map(cap => (
            <button
              key={cap}
              type="button"
              className={cn(styles.capacityBtn, {
                [styles.capacityBtnActive]: cap === currentCapacity,
              })}
              onClick={() => handleVariantChange(currentColor, cap)}
            >
              {cap}
            </button>
          ))}
        </div>
      </div>

      <div className={cn(styles.divider, styles.dividerPrice)} />

      <div className={styles.priceSection}>
        <Price
          price={product.priceDiscount}
          fullPrice={product.priceRegular}
          isLarge={true}
        />
      </div>

      <div className={styles.buttons}>
        <ButtonPrimary isSelected={isAdded} onClick={handleCartClick} />
        <ButtonFavorite isFavorite={favorite} onClick={handleFavoriteClick} />
      </div>

      <div className={styles.shortSpecs}>
        <div className={styles.specRow}>
          <span>Screen</span>
          <span>{product.screen}</span>
        </div>
        <div className={styles.specRow}>
          <span>Resolution</span>
          <span>{product.resolution}</span>
        </div>
        <div className={styles.specRow}>
          <span>Processor</span>
          <span>{product.processor}</span>
        </div>
        <div className={styles.specRow}>
          <span>RAM</span>
          <span>{product.ram}</span>
        </div>
      </div>
    </div>
  );
};
