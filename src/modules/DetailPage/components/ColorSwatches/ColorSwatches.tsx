import { colorMap } from '../../../../utils/colors';
import styles from './ColorSwatches.module.scss';

type Props = {
  colors: string[];
  activeColor: string;
  onChange: (color: string) => void;
  className?: string;
};

export const ColorSwatches: React.FC<Props> = ({
  colors,
  activeColor,
  onChange,
  className,
}) => {
  return (
    <div className={`${styles.swatches} ${className ?? ''}`}>
      {colors.map(color => (
        <div
          key={color}
          className={`${styles.swatchWrapper} ${color === activeColor ? styles.active : ''}`}
          onClick={() => onChange(color)}
        >
          <div
            className={styles.swatch}
            style={{ backgroundColor: colorMap[color] ?? color }}
            title={color}
          />
        </div>
      ))}
    </div>
  );
};
