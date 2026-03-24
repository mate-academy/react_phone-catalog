import React from 'react';
import styles from './ColorPicker.module.scss';
type Props = {
  colors: string[];
  selected: string;
  productId: string;
  onChange: (color: string) => void;
};

export const ColorPicker: React.FC<Props> = ({
  colors,
  selected,
  productId,
  onChange,
}) => {
  return (
    <div className={styles.colorPicker}>
      <div className={styles.colorPicker__header}>
        <span className={styles.colorPicker__label}>Available colors</span>
        <span className={styles.colorPicker__id}>ID: {productId}</span>
      </div>

      <div className={styles.colorPicker__list}>
        {colors.map(color => (
          <button
            key={color}
            type="button"
            style={{ backgroundColor: color }}
            aria-label={color}
            className={`${styles.colorPicker__btn} ${
              selected === color ? styles['colorPicker__btn--active'] : ''
            }`}
            onClick={() => onChange(color)}
          />
        ))}
      </div>
    </div>
  );
};
