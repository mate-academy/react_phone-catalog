import classNames from 'classnames';
import { Phone } from '../../../../types/Phone';
import styles from './ProductDetails.styles.module.scss';
import FavoritesHeart from '../../../../assets/icons/favouritesheart.svg?react';
// eslint-disable-next-line max-len
import FavoritesFilled from '../../../../assets/icons/favouritesHeatFilled.svg?react';
import { colorsMap } from '../../../../utils/colors/color';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../../../context';
import { Product } from '../../../../types/Products';
import { useCart } from '../../../../context/CartContext';

type Props = {
  product: Phone;
  cardProduct: Product;
};

export const ProductDetails: React.FC<Props> = ({ product, cardProduct }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart, isInCart } = useCart();

  const favorite = isFavorite(cardProduct.itemId);
  const inCart = isInCart(cardProduct.itemId);

  const specs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
  ];

  const navigate = useNavigate();

  const handleColorChange = (color: string) => {
    const newProductId = `${product.namespaceId}-${product.capacity.toLowerCase()}-${color}`;

    navigate(`/product/${newProductId}`);
  };

  const handleCapacityChange = (capacity: string) => {
    const newProductId = `${product.namespaceId}-${capacity.toLowerCase()}-${product.color}`;

    navigate(`/product/${newProductId}`);
  };

  return (
    <div className={styles.details}>
      <div className={styles.colors}>
        <div className={styles.availableTitle}>
          <span className={styles.colorsTitle}>Available colors</span>
          <span className={styles.productId}>id: {product.id}</span>
        </div>
        <div className={styles.colorOptions}>
          {product.colorsAvailable.map(color => (
            <button
              key={color}
              type="button"
              className={classNames(styles.colorButton, {
                [styles.active]: product.color === color,
              })}
              aria-label={color}
              onClick={() => handleColorChange(color)}
            >
              <span
                className={styles.colorCircle}
                style={{ backgroundColor: colorsMap[color] ?? color }}
              />
            </button>
          ))}
        </div>
      </div>
      <div className={styles.capacity}>
        <span className={styles.capacityTitle}>Select capacity</span>
        <div className={styles.capacityOptions}>
          {product.capacityAvailable.map(capacity => (
            <button
              key={capacity}
              type="button"
              className={classNames(styles.capacityButton, {
                [styles.activeCapacity]: product.capacity === capacity,
              })}
              onClick={() => handleCapacityChange(capacity)}
            >
              {capacity}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.price}>
        <div className={styles.priceValues}>
          <span className={styles.priceDiscount}>${product.priceDiscount}</span>
          <span className={styles.priceRegular}>${product.priceRegular}</span>
        </div>
        <div className={styles.product__buttons}>
          <button
            type="button"
            className={classNames(styles.addToCart, {
              [styles.added]: inCart,
            })}
            onClick={() => addToCart(cardProduct)}
          >
            {inCart ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            type="button"
            className={styles.addToFavorite}
            onClick={() => toggleFavorite(cardProduct)}
          >
            {favorite ? <FavoritesFilled /> : <FavoritesHeart />}
          </button>
        </div>
      </div>
      <div className={styles.specsPreview}>
        {specs.map(spec => (
          <div key={spec.label} className={styles.infoRow}>
            <span className={styles.infoLabel}>{spec.label}</span>
            <span className={styles.infoValue}>{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
