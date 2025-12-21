import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductCardShared } from '../HomePage/ProductCardShared';
import styles from './ProductSpec.module.scss';

type Props = {
  product: ProductDetails;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onColorChange: (color: string) => void;
  handleCapacitySelect: (capacity: string) => void;
  activeCapacityIndex: number;
  setActiveCapacityIndex: (index: number) => void;
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
  midnight: '#23292eff',
  starlight: '#f4edc6',
  skyblue: '#87CEEB',
  spaceblack: '#0d0d0d',
};

const normalizeColor = (color: string) =>
  color.replace(/\s|-/g, '').toLowerCase();

export const ProductSpec: React.FC<Props> = ({
  product,
  activeIndex,
  setActiveIndex,
  onColorChange,
  handleCapacitySelect,
  activeCapacityIndex,
  setActiveCapacityIndex,
  showDiscount,
}) => {
  const selectedCapacity = product.capacityAvailable[activeCapacityIndex];
  const capacityOption = product.capacityOptions?.find(
    option => option.capacity === selectedCapacity,
  );

  const adaptedProduct: Product = {
    id: Number(product.id),
    itemId: `${product.namespaceId}-${product.colorsAvailable[activeIndex]}-${selectedCapacity}`,
    name: product.name,
    category: product.category,
    fullPrice: capacityOption?.priceRegular ?? product.priceRegular,
    price: capacityOption?.priceDiscount ?? product.priceDiscount,
    screen: product.screen,
    capacity: selectedCapacity,
    color: product.color,
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
          {product.colorsAvailable.map((color, index) => {
            const isActive = index === activeIndex;
            const normalized = normalizeColor(color);
            const displayColor = COLOR_MAP[normalized] || color;

            return (
              <div
                className={`${styles.spec_color} ${isActive ? styles['spec_color--active'] : ''}`}
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  onColorChange(color);
                }}
              >
                <p
                  className={styles.spec_item_color}
                  style={{ backgroundColor: displayColor }}
                ></p>
              </div>
            );
          })}
        </div>
        <div className={styles.spec_divide_line}></div>
      </div>

      <div className={styles.spec_capacity_container}>
        <p className={styles.spec_title}>Select capacity</p>
        <div className={styles.spec_capacity_list}>
          {product.capacityAvailable.map((capacity, index) => {
            const isActive = index === activeCapacityIndex;

            return (
              <div
                className={`${styles.spec_capacity_item_block} ${isActive ? styles['spec_capacity_item_block--active'] : ''}`}
                key={index}
                onClick={() => {
                  setActiveCapacityIndex(index);
                  handleCapacitySelect(capacity);
                }}
              >
                <p className={styles.spec_capacity_item}>{capacity}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={`${styles.spec_divide_line} ${styles.spec_divide_line_last}`}
      ></div>

      <ProductCardShared product={adaptedProduct} showDiscount={showDiscount} />
    </div>
  );
};
