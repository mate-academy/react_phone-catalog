import styles from './ProductOptions.module.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../../../types/Product';

type ProductOptionsProps = {
  product: Product;
  productVariants: Product[];
  availableColors: string[];
  availableCapacity: string[];
};

export const ProductOptions = ({
  product,
  productVariants,
  availableColors,
  availableCapacity,
}: ProductOptionsProps) => {
  const colors = {
    black: '#111111',
    white: '#fff',
    gold: '#f3e8ac',
    silver: '#C0C0C0',
    graphite: '#5E5E5E',
    sierrablue: '#9BB7D4',
    'space gray': '#535353',
    midnight: '#1d1d1f',
    purple: '#9180c0',
    'deep purple': '#594f63',
    red: '#ff0000',
    green: '#4f5b3d',
    yellow: '#ffe136',
    blue: '#007AFF',
    pink: '#ffc0cb',
  };

  return (
    <section className={styles.product_options}>
      <div className={styles.product_options__color_id}>
        <p className={styles.product_options__color_id__color_text}>
          Available colors
        </p>
        <p className={styles.product_options__color_id__id_text}>
          ID: {product.id}
        </p>
      </div>

      <div className={styles.product_options__colors}>
        {availableColors.map(color => {
          const colorVariant = productVariants.find(variant =>
            variant.color
              .toLowerCase()
              .trim()
              .includes(color.toLowerCase().trim()),
          );

          if (!colorVariant) {
            return null;
          }

          return (
            <Link
              className={styles.product_options__colors__link}
              key={color}
              to={`/product/${colorVariant.itemId}`}
              style={{
                backgroundColor: colors[color as keyof typeof colors],
              }}
            />
          );
        })}
      </div>

      <div className={styles.product_options__capacity}>
        <p className={styles.product_options__capacity__title}>
          Select capacity
        </p>

        <div className={styles.product_options__capacity__list}>
          {availableCapacity.map(capacity => {
            const capacityVariant = productVariants.find(
              variant => variant.capacity === capacity,
            );

            if (!capacityVariant) {
              return null;
            }

            return (
              <Link
                className={`${styles.product_options__capacity__link} ${
                  product.capacity === capacity
                    ? styles['product_options__capacity__link--active']
                    : ''
                }`}
                key={capacity}
                to={`/product/${capacityVariant.itemId}`}
              >
                {capacity}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
