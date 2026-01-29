import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Product } from '../../types/Product';
import { TypesOfProducts } from '../../types/TypesOfProducts';
import { COLOR_MAP } from '../../types/Сolors';
import styles from './ProductControl.module.scss';

type Props = {
  product: Product;
  productWithDetails: TypesOfProducts;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
};

export const ProductControl = ({
  product,
  productWithDetails,
  onColorChange,
  onCapacityChange,
}: Props) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart, isInCart } = useCart();

  const active = product && product.itemId ? isFavorite(product.itemId) : false;

  return (
    <div className={styles.control}>
      <span className={styles.control__title}>Available colors</span>
      <div className={styles.control__colors}>
        {productWithDetails.colorsAvailable.map(color => {
          const colorKey = color
            .toLowerCase()
            .replaceAll(' ', '')
            .replaceAll('-', '');

          const hex = COLOR_MAP[colorKey];

          return (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label key={color} className={styles.control__colors__color}>
              <input
                type="radio"
                name="color"
                value={color}
                checked={color === productWithDetails.color}
                onChange={() => onColorChange(color)}
                className={styles.control__colors__input}
              />

              <span
                className={styles.control__colors__circle}
                style={{ backgroundColor: hex }}
              />
            </label>
          );
        })}
      </div>

      <div className={styles.control__divider}></div>

      <span
        className={`${styles.control__title} ${styles.control__title__capacity}`}
      >
        Select capacity
      </span>
      <div className={styles.control__capacities}>
        {productWithDetails.capacityAvailable.map(capacity => (
          <label
            key={capacity}
            className={styles.control__capacities__capacity}
          >
            <input
              type="radio"
              name="capacity"
              value={capacity}
              checked={capacity === productWithDetails.capacity}
              onChange={() => onCapacityChange(capacity)}
              className={styles.control__capacities__input}
            />

            <span className={styles.control__capacities__value}>
              {capacity}
            </span>
          </label>
        ))}
      </div>

      <div className={styles.control__divider}></div>

      <div className={styles.control__price}>
        <div className={styles.control__price__discount}>
          ${productWithDetails.priceDiscount}
        </div>
        <div className={styles.control__price__full}>
          ${productWithDetails.priceRegular}
        </div>
      </div>

      <div className={styles.control__buttons}>
        <button
          className={`${styles.control__addButton} ${
            isInCart(product.itemId)
              ? styles['control__addButton--added']
              : styles['control__addButton--add']
          }`}
          onClick={() => addToCart(product.itemId)}
          disabled={isInCart(product.itemId)}
        >
          {isInCart(product.itemId) ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          className={`${styles.control__buttonFav} ${
            isFavorite(product.itemId)
              ? styles['control__buttonFav--added']
              : styles['control__buttonFav--add']
          }`}
          onClick={() => toggleFavorite(product)}
        >
          <img
            src={
              active
                ? './img/icons/icon-heart-filled.svg'
                : './img/icons/icon-heart.svg'
            }
            alt="icon-heart"
            className={styles.control__buttonFav__icon}
          />
        </button>
      </div>

      <ul className={styles.control__specs}>
        <li className={styles.control__specs__item}>
          <span className={styles.control__specs__name}>Screen</span>
          <span className={styles.control__specs__value}>
            {productWithDetails.screen}
          </span>
        </li>

        <li className={styles.control__specs__item}>
          <span className={styles.control__specs__name}>Resolution</span>
          <span className={styles.control__specs__value}>
            {productWithDetails.resolution}
          </span>
        </li>

        <li className={styles.control__specs__item}>
          <span className={styles.control__specs__name}>Processor</span>
          <span className={styles.control__specs__value}>
            {productWithDetails.processor}
          </span>
        </li>

        <li className={styles.control__specs__item}>
          <span className={styles.control__specs__name}>RAM</span>
          <span className={styles.control__specs__value}>
            {productWithDetails.ram}
          </span>
        </li>
      </ul>
    </div>
  );
};
