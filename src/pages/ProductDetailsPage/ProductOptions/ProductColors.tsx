import styles from './ProductOptions.module.scss';

type Props = {
  colors: string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
  productId?: string | number;
};

const colorMap: Record<string, string> = {
  black: '#000',
  white: '#fff',
  yellow: '#ffe681',
  green: '#aee1cd',
  purple: '#d6c8f5',
  red: '#EB5757',
  gold: '#f7e7ce',
  silver: '#E2E6E9',
  blue: '#476DF4',
  spacegray: '#0F0F11',
  'space gray': '#0F0F11',
  midnight: '#1B1F2A',
};

export const ProductColors: React.FC<Props> = ({
  colors,
  selectedColor,
  onColorSelect,
  productId,
}) => {
  return (
    <>
      <div className={styles.labels}>
        <p className={styles.label}>Available colors</p>
        <p className={styles.label}>ID: {productId}</p>
      </div>

      <div className={styles.colors}>
        {colors.map(color => (
          <button
            key={color}
            type="button"
            onClick={() => onColorSelect(color)}
            className={`${styles.color} ${
              color === selectedColor ? styles.activeColor : ''
            }`}
            style={{ backgroundColor: colorMap[color] || color }}
          />
        ))}
      </div>
    </>
  );
};
