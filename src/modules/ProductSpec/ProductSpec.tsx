import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductCardShared } from '../HomePage/ProductCardShared';
import styles from './ProductSpec.module.scss';

type Props = {
  product: ProductDetails;
  activeColor: string;
  setActiveColor: (color: string) => void;
  activeCapacity: string;
  setActiveCapacity: (capacity: string) => void;
  showDiscount?: boolean;
};

const COLOR_MAP: Record<string, string> = {
  spacegray: '#6b6b6b',
  silver: '#c0c0c0',
  rosegold: '#DEA193',
  gold: '#D4AF37',
  midnightgreen: '#004953',
  sierrablue: '#BFDAF7',
  graphite: '#5c5c5c',
  midnight: '#23292e',
  starlight: '#f4edc6',
  skyblue: '#87CEEB',
  spaceblack: '#0d0d0d',
};

const normalizeColor = (color: string) =>
  color.replace(/\s|-/g, '').toLowerCase();

export const ProductSpec: React.FC<Props> = ({
  product,
  activeColor,
  setActiveColor,
  activeCapacity,
  setActiveCapacity,
  showDiscount,
}) => {
  const capacityOption = product.capacityOptions?.find(
    option => option.capacity === activeCapacity.toLowerCase(),
  );

  const adaptedProduct: Product = {
    id: product.databaseId,
    itemId: product.id,
    name: product.name,
    category: product.category,
    fullPrice: capacityOption?.priceRegular ?? product.priceRegular,
    price: capacityOption?.priceDiscount ?? product.priceDiscount,
    screen: product.screen,
    capacity: activeCapacity.toLowerCase(),
    color: activeColor,
    ram: product.ram,
    year: product.year,
    image: product.images[0],
    type: product.category,
  };

  return (
    <div className={styles.spec}>
      <div className={styles.spec_colors}>
        <p className={styles.spec_title}>Available colors</p>

        <div className={styles.spec_colors_container}>
          {product.colorsAvailable.map(color => {
            const isActive =
              normalizeColor(color) === normalizeColor(activeColor);

            const displayColor = COLOR_MAP[normalizeColor(color)] || color;

            return (
              <div
                key={normalizeColor(color)}
                className={`${styles.spec_color} ${
                  isActive ? styles['spec_color--active'] : ''
                }`}
                onClick={() => setActiveColor(color)}
              >
                <p
                  className={styles.spec_item_color}
                  style={{ backgroundColor: displayColor }}
                />
              </div>
            );
          })}
        </div>

        <div className={styles.spec_divide_line} />
      </div>

      <div className={styles.spec_capacity_container}>
        <p className={styles.spec_title}>Select capacity</p>

        <div className={styles.spec_capacity_list}>
          {product.capacityAvailable.map(capacity => {
            const isActive = capacity === activeCapacity;

            return (
              <div
                key={capacity}
                className={`${styles.spec_capacity_item_block} ${
                  isActive ? styles['spec_capacity_item_block--active'] : ''
                }`}
                onClick={() => setActiveCapacity(capacity)}
              >
                <p className={styles.spec_capacity_item}>{capacity}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={`${styles.spec_divide_line} ${styles.spec_divide_line_last}`}
      />

      <ProductCardShared product={adaptedProduct} showDiscount={showDiscount} />
    </div>
  );
};
