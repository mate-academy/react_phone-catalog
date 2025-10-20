import { useProduct } from '../../hooks/ProductContext';
import styles from './AvailableColors.module.scss';

export const AvailableColors = () => {
  const { product, setActiveColor, activeColor } = useProduct();

  return (
    <div className={styles.availableColors}>
      <div className={styles.titleAvailable}>
        Available colors
        <span style={{ color: '#4A4D58' }}>ID: {product.id}</span>
      </div>

      <div className={styles.colorsContainer}>
        {product.details?.colorsAvailable?.map((p, i) => (
          <span
            key={i}
            onClick={() => setActiveColor(p)}
            className={`${styles.colorBorder} ${activeColor === p ? styles.activeColor : ''}`}
          >
            <div
              className={styles.color}
              style={{ backgroundColor: `${p}` }}
            ></div>
          </span>
        ))}
      </div>
    </div>
  );
};
