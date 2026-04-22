import { Link } from 'react-router-dom';
import styles from './ColorSelector.module.scss';

interface Props {
  colorsAvailable: string[];
  currentColor: string;
  productId: string;
}

const colorMap: Record<string, string> = {
  black: '#1f2020',
  green: '#aee1cd',
  yellow: '#ffe681',
  white: '#f9f6ef',
  purple: '#d1cdda',
  red: '#ba0c2e',
  spacegray: '#535150',
  midnightgreen: '#4e5851',
  gold: '#f9e5c9',
  silver: '#ebebe3',
  rosegold: '#b76e79',
  midnight: '#171e27',
  blue: '#215e7c',
  pink: '#fae0d8',
};

export const ColorSelector: React.FC<Props> = ({
  colorsAvailable,
  currentColor,
  productId,
}) => {
  return (
    <div className={styles.colorsBlock}>
      <div className={styles.colorsHeader}>
        <span className={styles.label}>Available colors</span>
        {/* <span className={styles.productId}>ID: {productId}</span> */}
        <span className={styles.productId}>
          ID: {productId.split('-').pop()}
        </span>
      </div>

      <div className={styles.colorsList}>
        {colorsAvailable.map((color: string) => {
          const newProductId = productId.replace(currentColor, color);

          return (
            <Link
              key={color}
              to={`/product/${newProductId}`}
              // onClick={() => console.log(`${newProductId}`)}
              className={`${styles.colorCircle} ${
                currentColor === color ? styles.colorCircleActive : ''
              }`}
              style={{ backgroundColor: colorMap[color] || '#cccccc' }}
            />
          );
        })}
      </div>
    </div>
  );
};
