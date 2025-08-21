import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../../types/Product';
import { useCart } from '../../../context/CartContext';
import styles from './ProductInfo.module.scss';
import { colorMap } from '../../../styles/colorMap';

type Props = {
  product: Product;
};

const toSlug = (v: string) => v.toLowerCase().trim().replace(/\s+/g, '-');

const getNamespaceId = (p: Product): string | undefined => {
  if ('namespaceId' in p && typeof p.namespaceId === 'string') {
    return p.namespaceId;
  }

  if ('itemId' in p && typeof p.itemId === 'string') {
    return p.itemId.split('-').slice(0, -2).join('-');
  }

  if (typeof p.id === 'string') {
    return p.id;
  }

  return undefined;
};

export const ProductInfo: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();

  const [selectedColor, setSelectedColor] = useState(product.color || '');
  const [selectedCapacity, setSelectedCapacity] = useState(
    product.capacity || '',
  );

  const buildItemId = (capacity: string, color: string): string | null => {
    const ns = getNamespaceId(product);

    if (!ns) {
      return null;
    }

    return `${ns}-${toSlug(capacity)}-${toSlug(color)}`;
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);

    const nextId = buildItemId(selectedCapacity, color);

    if (nextId) {
      navigate(`/product/${nextId}`);
    }
  };

  const handleCapacityChange = (capacity: string) => {
    setSelectedCapacity(capacity);

    const nextId = buildItemId(capacity, selectedColor);

    if (nextId) {
      navigate(`/product/${nextId}`);
    }
  };

  const uniqueId = product.itemId || String(product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className={styles.info}>
      {product.colorsAvailable?.length > 0 && (
        <div className={styles.options}>
          <h4>Available colors</h4>
          <div className={styles.colorOptions}>
            {product.colorsAvailable.map(color => (
              <button
                key={color}
                className={`${styles.color} ${
                  selectedColor === color ? styles.selected : ''
                }`}
                onClick={() => handleColorChange(color)}
                type="button"
              >
                <span style={{ backgroundColor: colorMap[color] || color }} />
              </button>
            ))}
          </div>
        </div>
      )}
      {product.capacityAvailable?.length > 0 && (
        <div className={styles.options}>
          <h4>Select capacity</h4>
          <div className={styles.capacityOptions}>
            {product.capacityAvailable.map(capacity => (
              <button
                key={capacity}
                className={`${styles.capacity} ${
                  selectedCapacity === capacity ? styles.selected : ''
                }`}
                onClick={() => handleCapacityChange(capacity)}
                type="button"
              >
                {capacity}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className={styles.priceBlock}>
        <span className={styles.priceDiscount}>
          ${product.priceDiscount ?? product.price}
        </span>
        {product.priceRegular && (
          <span className={styles.priceRegular}> ${product.priceRegular} </span>
        )}
      </div>
      <button
        className={styles.addToCart}
        onClick={handleAddToCart}
        disabled={isInCart(uniqueId)}
        type="button"
      >
        {isInCart(uniqueId) ? 'In cart' : 'Add to cart'}
      </button>
      <div className={styles.id}>ID: {uniqueId}</div>
    </div>
  );
};
