import React from 'react';
import style from './ProductColors.module.scss';

type Props = {
  colors: string[];
  selectedColor: string | null;
  onChange: (color: string) => void;
  id: string;
};

export const ProductColors: React.FC<Props> = ({
  colors,
  selectedColor,
  onChange,
  id,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const shortId = (id: string) => {
    const parts = id.split('-');

    return parts.slice(0, parts.length - 3).join('-');
  };

  return (
    <div>
      <div className={style.available}>
        <h3 className={style.availableH}>Available colors</h3>
        <p className={style.availableP}>id: {shortId(id)}</p>
      </div>

      <div className={style.colorWrapper}>
        {colors.map(c => (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label key={c} className={style.colorLabel}>
            <input
              type="radio"
              name="color"
              checked={selectedColor === c}
              onChange={() => onChange(c)}
              className={style.input}
            />
            <span
              className={`${style.colorRation} ${
                selectedColor === c ? style.colorRationActive : ''
              }`}
              style={{ backgroundColor: c }}
            />
          </label>
        ))}
      </div>
    </div>
  );
};
